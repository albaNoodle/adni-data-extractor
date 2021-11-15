import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { Diagnosis } from '../../enums/diagnosis.enum';

export function IsDiagnosis(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    // console.log(`HEYYYY `);
    registerDecorator({
      name: 'isDiagnosis',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: Diagnosis) {
          console.log(`HEYYYY ${Diagnosis[value]}`);
          return !!Diagnosis[value];
        },

        defaultMessage(args: ValidationArguments) {
          return `'${args.property}' is not valid diagnosis`;
        },
      },
    });
  };
}
