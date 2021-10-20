import { INestApplication } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { TestingModule } from '@nestjs/testing';
import { EntityNotFoundExceptionFilter } from '../filters/entity-not-found-exception.filter';
import { QueryFailedExceptionFilter } from '../filters/query-failed-exception.filter';
import { GlobalPipes } from '../pipes/utils';
import { Observable } from 'rxjs';

// export const createAppForTestModule = (module: TestingModule): INestApplication => {
//   const app = module.createNestApplication<NestExpressApplication>();
//   app.useGlobalPipes(...GlobalPipes);
//   app.useGlobalFilters(new EntityNotFoundExceptionFilter(), new QueryFailedExceptionFilter());
//   configureRequestContext(app);
//   app.useLogger(false);
//   return app;
// };

// Ex: //docs.nestjs.com/fundamentals/testing#end-to-end-testing

/**
 * Creates an app instance for testing, appliying same global settings than the main app
 * @param module testing module
 */
export const initAppForTestModule = async (module: TestingModule): Promise<INestApplication> => {
  const app = module.createNestApplication<NestExpressApplication>();
  app.useGlobalPipes(...GlobalPipes);
  app.useGlobalFilters(new EntityNotFoundExceptionFilter(), new QueryFailedExceptionFilter());
  app.useLogger(false);
  return app.init();
};

/**
 * Shallow copies an object, with all dates converted to ISO strings
 * why? because JSON does serialize Dates as ISO strings.
 * we use that for comparing responses and expected objects
 * @param object to convert
 * @returns object with date fiels converted to ISO strings
 */
export const withJSONDates = (object) => {
  if (Array.isArray(object)) {
    return object.map((x) => withJSONDates(x));
  }
  const cloned = { ...object };
  for (const [key, value] of Object.entries(cloned)) {
    if (value && value['toISOString']) {
      const asDate = value as Date;
      cloned[key] = asDate.toISOString();
    }
    // TODO: if value is an object, or array, we can call to the iSO strings recursivelly
  }
  return cloned;
};

/**
 * Mocks the method `withTransaction` we implement in some repositories.
 * The method passed as argument wil be executed inside a DB transaction
 * @param work : the block to execute inside a transaction
 */
export const MockWithTransaction = async <T>(work: () => Promise<T>): Promise<T> => {
  return work();
};

export const EntityManagerMock = () => ({
  transaction: async <T>(isolationLevelOrWork, work: (_manager) => Promise<T>): Promise<T> => {
    if (typeof isolationLevelOrWork === 'string' && typeof work === 'function') {
      return work(null);
    }
    if (!work && typeof isolationLevelOrWork === 'function') {
      return isolationLevelOrWork(null);
    }
  },
});

export const NullClientProxyMock = () => ({
  emit: jest.fn().mockImplementation(
    () =>
      new Observable((subscriber) => {
        subscriber.next(void 0);
        subscriber.complete();
      }),
  ),
});

// export const freezeDate = async (dateLike, fnc) => {
//   MockDate.set(dateLike);
//   let result;
//   try {
//     result = await fnc();
//   } finally {
//     MockDate.reset();
//   }
//   return result;
// };

export const getNow = (options?: { sec?: number; ms?: number }): Date => {
  const date = new Date();
  if (options) {
    const { sec: seconds, ms } = options;
    if (seconds !== undefined) {
      date.setSeconds(seconds, ms || 0);
    } else if (ms !== undefined) {
      date.setMilliseconds(ms);
    }
  }
  return date;
};

export const toSecondsPrecission = (d: Date): number => {
  return (d.getTime() / 1_000) >>> 0;
};

const pad2 = (n) => (n < 10 ? '0' + n : n);
// return something like 2020-11-01T10:35:07-04:00 with the timezone offset instead of 'Z'
export const toISOStringWithOffset = (date: Date): string => {
  return (
    '' +
    pad2(date.getFullYear()) +
    '-' +
    pad2(date.getMonth() + 1) +
    '-' +
    pad2(date.getDate()) +
    'T' +
    pad2(date.getHours()) +
    ':' +
    pad2(date.getMinutes()) +
    ':' +
    pad2(date.getSeconds()) +
    // '.' +
    // pad2(date.getMilliseconds()) +
    toISOTimezoneOffset(date)
  );
};

// returns an ISO string with local time + timezone offset. Ex: "2021-06-04 10:57:29+02:00"
export const toISOTimezoneOffset = (date) => {
  const tzOffset = -date.getTimezoneOffset();
  const sign = tzOffset > 0 ? '+' : '-';
  const absOffset = Math.abs(tzOffset);
  const hourOffset = Math.floor(absOffset / 60);
  const minOffset = absOffset - hourOffset * 60;
  return sign + pad2(hourOffset) + ':' + pad2(minOffset);
};
