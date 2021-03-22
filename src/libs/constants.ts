export const SWAGGER_URL = '/api-docs';
export const API_PREFIX = '/api';

export const ABOUT = {
  description: 'E-Commerce-Server API with Swagger',
  in: 'Headers',
  name: 'Authorization',
  title: 'E-Commerce-Server API',
  type: 'apiKey',
};

// Listing of Environments
export enum EnvVars {
  TEST = 'test',
  LOCAL = 'local',
  DEV = 'dev',
  STG = 'stg',
  PROD = 'prod',
}

export enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  OPTIONS = 'OPTIONS',
}

export enum ERR_MSG {
  FETCH = 'An error occurred while fetching record',
  CREATE = 'An error occurred while creating record',
  UPDATE = 'An error occurred while updating the record',
  DELETE = 'An error occurred while deleting the record',
  INTERNAL_SERVER = 'Internal server error',
  DATA_NOT_FOUND = 'No data found',
  UNABLE_TO_CREATE = 'Unable to Create',
  UNABLE_TO_UPDATE = 'Unable to Update',
  UNABLE_TO_DELETE = 'Unable to Delete',
  REQUEST_FAILED = 'Request Failed',
  LISTED = 'Listed',
  SOMETHING_WENT_WRONG = 'Something went wrong',
  USER_DOES_NOT_EXIST = 'User does not exist',
  PRODUCT_DOES_NOT_EXIST = 'Product does not exist',
  CART_DOES_NOT_EXIST = 'Cart does not exist',
  BAD_ID_FORMAT = 'Bad id Format',
  BAD_ID = 'Bad id',
  BAD_REQUEST = 'Bad Request',
  NETWORK_ERROR = 'Network Error',
}

export enum Params {
  ADVERITY = 'Adverity',
  DAG = 'DAG',
}

export enum SUCCESS_MSG {
  FETCH = 'Data fetched successfully',
  CREATE = 'Data created successfully',
  UPDATE = 'Data updated successfully',
  DELETE = 'Data deleted successfully',
  NO_RECORDS = 'No Record Found',
}

export enum ErrorParameter {
  ID = 'id',
  ORIGINAL_ID = 'OriginalId',
  NO_USER = 'You have entered the id for which User does not exist',
  NO_PRODUCT = 'You have entered the id for which Product does not exist',
  NO_CART = 'You have entered the id for which Cart does not exist',
  UNKNOWN_ERROR = 'Unknown Error Occurred',
  SOMETHING_WENT_BAD = 'Something went bad',
  HEADER = 'header',
}

export enum RequestParameter {
  PARAMS = 'params',
  BODY = 'body',
  QUERY = 'query',
}

export enum StatusCodes {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE = 422,
  INTERNAL_SERVER_ERROR = 500,
}

export const roleArray = ['ADMIN', 'CUSTOMER'];

export declare type Nullable<T> = T | null;
