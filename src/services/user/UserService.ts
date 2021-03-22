import UserRepository from '../../repositories/business/user/repository';
import {
  ERR_MSG,
  ErrorParameter,
  RequestParameter,
} from './../../libs/constants';
import { createErrorResponse } from './../../libs/utilities';

class UserService {
  // tslint:disable-next-line:variable-name
  private _userRepository: UserRepository;

  public constructor() {
    this._userRepository = new UserRepository();
  }
  public async list(limit?: number, skip?: number) {
    return this._userRepository.list({ limit, skip });
  }

  public async get(query: any) {
    const { originalId } = query;
    let error = [];
    const result = await this._userRepository.get(query);
    if (!result) {
      error = createErrorResponse(
        RequestParameter.QUERY,
        ErrorParameter.NO_USER,
        ErrorParameter.ID,
        originalId,
      );
      throw {
        data: error,
        message: ERR_MSG.USER_DOES_NOT_EXIST,
        type: 'BadRequestError',
      };
    }
    return result;
  }

  public async create(query: any) {
    return await this._userRepository.create(query);
  }

  public async update(query: any) {
    let error = [];
    await this.get({ originalId: query.id });
    const result = await this._userRepository.update(query);

    if (!result) {
      error = createErrorResponse(
        RequestParameter.BODY,
        ErrorParameter.SOMETHING_WENT_BAD,
        '',
        '',
      );
      throw {
        data: error,
        message: ERR_MSG.UNABLE_TO_UPDATE,
        type: 'BadRequestError',
      };
    }

    return result;
  }

  public async delete(query: any) {
    const { id } = query;
    let error = [];
    await this.get({ originalId: id });
    const result = await this._userRepository.delete({ id });
    if (!result) {
      error = createErrorResponse(
        RequestParameter.BODY,
        ErrorParameter.SOMETHING_WENT_BAD,
        '',
        '',
      );
      throw {
        data: error,
        message: ERR_MSG.UNABLE_TO_DELETE,
        type: 'BadRequestError',
      };
    }
    return result;
  }
}

export default UserService;
