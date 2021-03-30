import { RequestParameter, roleArray } from '../../libs/constants';
import { isIn } from '../../libs/utilities';
import { idValidation, limitSkipValidation } from '../validation';

const listValidation = {
  ...limitSkipValidation,
};

const createValidation = {
  email: {
    // customSanitizer: {
    //   options: (value: string) => {
    //     return JSON.parse(value);
    //   },
    // },
    exists: {
      errorMessage: 'Please Provide email',
    },
    in: [RequestParameter.BODY],
  },
  name: {
    // customSanitizer: {
    //   options: (value: string) => {
    //     return JSON.parse(value);
    //   },
    // },
    exists: {
      errorMessage: 'Please Provide name',
    },
    in: [RequestParameter.BODY],
  },
  password: {
    // customSanitizer: {
    //   options: (value: string) => {
    //     return JSON.parse(value);
    //   },
    // },
    exists: {
      errorMessage: 'Please Provide password',
    },
    in: [RequestParameter.BODY],
  },
  role: {
    custom: {
      errorMessage:
        'role should be from specified list => ' + roleArray.toString(),
      options: (value: string) => {
        const data = value ? isIn(roleArray, value) : true;
        return value ? isIn(roleArray, value) : true;
      },
    },
    // customSanitizer: {
    //   options: (value: string) => {
    //     const data = value ? value : 'CUSTOMER';
    //     console.log('2222222222222', data);
    //     return value ? value : 'CUSTOMER';
    //   },
    // },
    in: [RequestParameter.BODY],
  },
};

const loginValidation = {
  email: {
    isEmail: true,
    // custom: {
    //   errorMessage:
    //     'Email is invalid.',
    //   options: (value: string) => {
    //     const data = value ? isEmail() : true;
    //     return value ? isIn(roleArray, value) : true;
    //   },
    // },
    // customSanitizer: {
    //   options: (value: string) => {
    //     return JSON.parse(value);
    //   },
    // },
    in: [RequestParameter.BODY],
  },
  name: {
    // customSanitizer: {
    //   options: (value: string) => {
    //     return JSON.parse(value);
    //   },
    // },
    in: [RequestParameter.BODY],
  },
  password: {
    // customSanitizer: {
    //   options: (value: string) => {
    //     return JSON.parse(value);
    //   },
    // },
    exists: {
      errorMessage: 'Please Provide password',
    },
    in: [RequestParameter.BODY],
  },
};

const updateValidation = {
  email: {
    // customSanitizer: {
    //   options: (value: string) => {
    //     return JSON.parse(value);
    //   },
    // },
    in: [RequestParameter.BODY],
  },
  name: {
    // customSanitizer: {
    //   options: (value: string) => {
    //     return JSON.parse(value);
    //   },
    // },
    in: [RequestParameter.BODY],
  },
  password: {
    // customSanitizer: {
    //   options: (value: string) => {
    //     return JSON.parse(value);
    //   },
    // },
    in: [RequestParameter.BODY],
  },
  role: {
    custom: {
      errorMessage:
        'role should be from specified list => ' + roleArray.toString(),
      options: (value: string) => {
        const data = value ? isIn(roleArray, value) : true;
        return value ? isIn(roleArray, value) : true;
      },
    },
    // customSanitizer: {
    //   options: (value: string) => {
    //     const data = value ? value : 'CUSTOMER';
    //     console.log('2222222222222', data);
    //     return value ? value : 'CUSTOMER';
    //   },
    // },
    in: [RequestParameter.BODY],
  },
};

/*
 * The location of the field, can be one or more of [body, cookies, headers, params, query].
 * If omitted, all request locations will be checked
 * */
export default Object.freeze({
  create: {
    ...createValidation,
  },
  delete: {
    ...idValidation,
  },
  get: {
    ...idValidation,
  },
  list: {
    ...listValidation,
  },
  login: {
    ...loginValidation,
  },
  update: {
    ...idValidation,
    ...updateValidation,
  },
});
