import { StatusCodes } from "../../libs/constants";
import IResponse, { IData, IMetadata } from "./IResponse";

export default class ConfigurationError implements IResponse {
  public data: IData;
  public metadata: IMetadata;

  constructor(data: IData = null, message: string = 'API Configuration Error') {
    this.data = data;
    this.metadata = {
      code: StatusCodes.CONFLICT,
      message,
      timestamp: new Date()
    };
  }
}
