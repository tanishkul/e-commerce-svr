import { RequestParameter } from '../../libs/constants';
import { checkType } from '../../libs/utilities';
import { idValidation, limitSkipValidation } from '../validation';

const listValidation = {
  ...limitSkipValidation,
};

const createValidation = {
  description: {
    custom: {
      errorMessage: 'description should be string',
      options: (value: string) => {
        return value ? checkType(value, 'string') : true;
      },
    },
    in: [RequestParameter.BODY],
  },
  price: {
    custom: {
      errorMessage: 'price should be number',
      options: (value: number) => {
        return checkType(value, 'number');
      },
    },
    exists: {
      errorMessage: 'Please Provide price',
    },
    in: [RequestParameter.BODY],
  },
  title: {
    custom: {
      errorMessage: 'title should be string',
      options: (value: string) => {
        return checkType(value, 'string');
      },
    },
    exists: {
      errorMessage: 'Please Provide title',
    },
    in: [RequestParameter.BODY],
  },
};

const updateValidation = {
  description: {
    custom: {
      errorMessage: 'description should be string',
      options: (value: string) => {
        return value ? checkType(value, 'string') : true;
      },
    },
    in: [RequestParameter.BODY],
  },
  price: {
    custom: {
      errorMessage: 'price should be number',
      options: (value: number) => {
        return value ? checkType(value, 'number') : true;
      },
    },
    in: [RequestParameter.BODY],
  },
  title: {
    custom: {
      errorMessage: 'title should be string',
      options: (value: string) => {
        return value ? checkType(value, 'string') : true;
      },
    },
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
  update: {
    ...idValidation,
    ...updateValidation,
  },
});
