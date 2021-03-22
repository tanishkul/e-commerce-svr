import { StatusCodes } from "../../libs/constants";
import APIError from "./APIError";
import IError from "./IError";

export default class ConfigurationError extends APIError {
  constructor(error: IError[]) {
    super('Configuration Error', StatusCodes.CONFLICT, error);
  }
}
