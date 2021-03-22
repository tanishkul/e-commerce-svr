import { StatusCodes } from '../../libs/constants';
import IResponse, { IData, IMetadata } from './IResponse';


export default class StrapiErrorResponse implements IResponse {
  public data: IData;
  public metadata: IMetadata;

  constructor(
    message: string = '',
    code
  ) {
    this.data =  null;
    this.metadata = {
      code: code || StatusCodes.FORBIDDEN,
      message,
      timestamp: new Date()
    };
  }
}
