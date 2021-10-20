import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { QueryFailedError } from 'typeorm/error/QueryFailedError';
import { Response } from 'express';
import { Logger } from '@nestjs/common';

/**
 * Custom exception filter to convert EntityNotFoundError from TypeOrm to NestJs responses
 * @see also @https://docs.nestjs.com/exception-filters
 */
@Catch(QueryFailedError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  private logger = new Logger('QueryFailedExceptionFilter');

  public catch(exception: QueryFailedError, host: ArgumentsHost) {
    this.logger.error(`Exception: ${JSON.stringify(exception)}`, exception.stack);
    const responseObject = this.buildResponseObject(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    return response.status(responseObject.statusCode).json(responseObject);
  }

  private buildResponseObject = (exception: Error): { statusCode: number; error?: string; message: string[] } => {
    const description: string = exception.message;
    if (/duplicate/i.test(description)) {
      // MYSQL
      return { statusCode: 409, error: 'Unprocessable Entity', message: ['The record already exists'] };
    }

    if (/UNIQUE constraint faile/.test(description)) {
      // SQLLITE
      return { statusCode: 409, error: 'Unprocessable Entity', message: ['The record already exists'] };
    }

    if (/constraint fail/.test(description)) {
      return { statusCode: 422, error: 'Unprocessable Entity', message: [`Constraint Failed: ${description}`] };
    }

    return { statusCode: 500, message: ['Internal Server Error'] };
  };
}
