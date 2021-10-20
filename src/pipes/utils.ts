import { PipeTransform, ValidationPipe } from '@nestjs/common';

const ValidateAndTransformPipe = new ValidationPipe({
  transform: true,
  whitelist: true, // remove excess / extranous properties
  transformOptions: { enableImplicitConversion: true }, //, strategy: 'exposeAll', excludeExtraneousValues: true
});

// const buildValidateAndTransformPipe = () => {
//   const options = Object.freeze({
//     transform: true,
//     transformOptions: { enableImplicitConversion: true },
//   });
//   return new ValidationPipe(options);
// };

const GlobalPipes: PipeTransform<any>[] = [ValidateAndTransformPipe];

export { ValidateAndTransformPipe, GlobalPipes };
