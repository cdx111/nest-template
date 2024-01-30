import {
  ValidateBy,
  ValidationOptions,
  buildMessage,
  isString,
  matches,
} from 'class-validator';

const IS_PASSWORD = 'IsPassword';
export function IsPassword(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_PASSWORD,
      validator: {
        validate: (value): boolean => {
          if (isString(value)) {
            return matches(
              value,
              /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&+=*!()_{}[\]:;<>,.?/~\\-]{8,20}$/,
            );
          }
          return false;
        },
        defaultMessage: buildMessage((eachPrefix) => {
          return eachPrefix + '至少包含8个字符，包括至少一个字母、一个数字。';
        }, validationOptions),
      },
    },
    validationOptions,
  );
}
