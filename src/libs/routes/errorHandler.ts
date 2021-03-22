import {
  BadRequestError,
  ConfigurationError,
  DuplicateKeyError,
  ForbiddenError,
  NotFoundError,
  StrapiError,
  UnprocessableError,
} from '../../entities/errors';
import {
  BadRequestResponse,
  ConfigurationErrorResponse,
  ForbiddenResponse,
  InternalServerErrorResponse,
  NotFoundResponse,
  StrapiErrorResponse,
  UnprocessableResponse,
} from '../../entities/responses';
import IResponse from '../../entities/responses/IResponse';
import { EnvVars, StatusCodes } from '../../libs/constants';

export default function errorHandler(env: string) {
  return function(err: any, req: any, res: any, next: any) {
    if (env !== EnvVars.TEST) {
      console.error(err);
    }

    let response: IResponse;
    switch (err.type) {
      case DuplicateKeyError.name:
        response = new UnprocessableResponse(err.data, err.message);
        break;
      case UnprocessableError.name:
        response = new UnprocessableResponse(err.data, err.message);
        break;
      case BadRequestError.name:
        response = new BadRequestResponse(err.data, err.message);
        break;
      case ForbiddenError.name:
        response = new ForbiddenResponse(err.message);
        break;
      case NotFoundError.name:
        response = new NotFoundResponse(err.message);
        break;
      case ConfigurationError.name:
        response = new ConfigurationErrorResponse(err.data);
        break;
      case StrapiError.name:
        response = new StrapiErrorResponse(err.message, err.status);
        break;
      case InternalServerErrorResponse.name:
      default:
        response = new InternalServerErrorResponse(err.data, err.isPublic ? err.message : StatusCodes[err.status]);
        break;
    }

    res.locals.response = response;
    res.locals.outcome = 'failed';

    res.status(response.metadata.code).json(response);
  };
}
