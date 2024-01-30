import {
  ValidateBy,
  ValidationOptions,
  buildMessage,
  isString,
  matches,
} from 'class-validator';

const IS_USERNAME = 'IsUsername';
export function IsUsername(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_USERNAME,
      validator: {
        validate: (value): boolean => {
          if (isString(value)) {
            return matches(value, /^[a-zA-Z0-9]{6,20}$/);
          }
          return false;
        },
        defaultMessage: buildMessage((eachPrefix) => {
          return eachPrefix + '用户名必须是数字或字母且不少6位且大于20位';
        }, validationOptions),
      },
    },
    validationOptions,
  );
}
