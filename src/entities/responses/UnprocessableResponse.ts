import { StatusCodes } from "../../libs/constants";
import IResponse, { IData, IMetadata } from "./IResponse";

export default class UnprocessableResponse implements IResponse {
  public data: IData;
  public metadata: IMetadata;

  constructor(data: IData = null, message: string = "") {
    this.data = data;
    this.metadata = {
      code: StatusCodes.UNPROCESSABLE,
      message,
      timestamp: new Date()
    };
  }
}
