import { StatusCodes } from "../../libs/constants";
import BaseError from "./BaseError";
import IError from "./IError";

export default class StrapiError extends BaseError {

  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor(
    message: string,
    data: IError[] = [],
    status: number = StatusCodes.FORBIDDEN,
    type: string = "StrapiError",
    isPublic: boolean = true
  ) {
    super(message, status, data, type, isPublic);
  }
}
