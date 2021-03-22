import { StatusCodes } from '../../libs/constants';
import IResponse, { IData, IMetadata } from './IResponse';


export default class SuccessResponse implements IResponse {
  constructor(
    public data: IData = null,
    public metadata: IMetadata = { code: StatusCodes.OK, message: '', timestamp: new Date() }
  ) {
  }
}
