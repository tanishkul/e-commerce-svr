import { ERR_MSG, RequestParameter } from '../libs/constants';
import { isValidObjectId } from '../libs/utilities';

export const idValidation = {
  id: {
    custom: {
      errorMessage: ERR_MSG.BAD_ID_FORMAT,
      options: (id: string) => isValidObjectId(id),
    },
    exists: {
      errorMessage: 'Please Provide id',
    },
    in: [RequestParameter.PARAMS, RequestParameter.BODY, RequestParameter.QUERY],
  },
};

export const limitSkipValidation = {
  limit: {
    errorMessage: 'limit is wrong',
    in: [RequestParameter.QUERY],
    isInt: true,
    optional: true,
    toInt: true,
  },
  skip: {
    errorMessage: 'skip is wrong',
    in: [RequestParameter.QUERY],
    isInt: true,
    optional: true,
    toInt: true,
  },
};
