import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DataSource } from 'typeorm';

@ValidatorConstraint({ name: 'Exists', async: true })
@Injectable()
export class ExistsConstraint implements ValidatorConstraintInterface {
  constructor(private readonly datasource: DataSource) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const [model, property = 'id'] = args.constraints;

    if (!value || !model) return false;

    try {
      const record = await this.datasource
        .getRepository(model)
        .findOneByOrFail({
          [property]: value,
        });

      console.log('record', record);

      return true;
    } catch (e) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `Not found entity with ${args.property}:${args.value} entered`;
  }
}

export function Exists(
  model: string,
  field: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [model, field],
      validator: ExistsConstraint,
    });
  };
}
