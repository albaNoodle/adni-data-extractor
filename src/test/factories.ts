// import { User } from '../user/user.entity';
// import { PatientAccount } from '../user/patient-account.entity';
// import { ProfessionalAccount } from '../user/prof-account.entity';
// import { Medication } from '../health-entities/medication.entity';
// import { Tracking } from '../tracking/tracking.entity';
// import { Factory } from 'typeorm-factory';
// import { nanoid } from 'nanoid';

// // assign a different preffix for each worker

// // Usage: https://github.com/antonversal/typeorm-factory#usage
// // usage:
// // await UserFactory.build()
// // await UserFactory.create()

// const padNumber = (i, length = 8) => {
//   return `${i}`.padStart(length, '0');
// };

// // note that Jest uses multiple  `workers`
// // const workerId = process.env.JEST_WORKER_ID;
// // const pid = process.pid;
// // const preffix = `${pid}-${workerId}`;
// // it seems that some pids / workers are reused, so we cannot rely on pid+worker until we have transactional tests
// const preffix = nanoid(16);

// export const UserFactory = new Factory(User)
//   .sequence('username', (i) => `username-${preffix}${padNumber(i)}`)
//   .sequence('firstName', (i) => `First${padNumber(i, 4)}`)
//   .sequence('lastName', (i) => `Last${padNumber(i, 4)}`);

// export const PatientAccountFactory = new Factory(PatientAccount)
//   .sequence('email', (i) => `email${preffix}${padNumber(i)}@example.com`)
//   .attr('password', '<invalidPassword>');

// export const ProfessionalAccountFactory = new Factory(ProfessionalAccount)
//   .sequence('email', (i) => `email${preffix}${padNumber(i)}@example.com`)
//   .attr('password', '<invalidPassword>');

// export const MedicationFactory = new Factory(Medication)
//   .sequence('keyname', (i) => `med-${preffix}${padNumber(i)}`)
//   .sequence('name', (i) => `Med ${padNumber(i)}`);

// export const TrackingFactory = new Factory(Tracking)
//   .sequence('name', (i) => `Tracking ${padNumber(i)}`)
//   .sequence('type', (i) => `CustomId${padNumber(i)}`)
//   .attr('inputType', 'binary')
//   .attr('category', 'personal')
//   .attr('isUserDefined', true)
//   .attr('isEnabled', true);

// const counterMap: { [key: string]: number } = {};
// export const counter = (label: string): number => {
//   const counter: number = counterMap[label] || 0;
//   return (counterMap[label] = counter + 1);
// };

// export const resetCounter = (label: string): void => {
//   counterMap[label] = 0;
// };
