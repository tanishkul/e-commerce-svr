import { NextFunction, Request, Response } from 'express';

import successHandler from '../../middlewares/successHandler';
import { UserService } from '../../services';
import { SUCCESS_MSG } from './../../libs/constants';

class UserController {
  public static getInstance() {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }

    return UserController.instance;
  }
  private static instance: UserController;
  private userService: UserService;

  /* tslint:disable: no-null-keyword */
  private constructor() {
    this.userService = new UserService();
  }

  /**
   * Get User list.
   * @param {number} skip - Number of User to be skipped.
   * @param {number} limit - Limit number of User to be returned.
   * @returns {IUser[]}
   */
  public async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { limit, skip } = req.query as any;
      const result = await UserController.getInstance().userService.list(
        limit,
        skip,
      );
      if (!result.length) {
        return res.send(successHandler(SUCCESS_MSG.NO_RECORDS, result));
      }
      return res.send(successHandler(SUCCESS_MSG.FETCH, result));
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get User
   * @param {string} id - Id of User
   * @returns {IUser}
   */
  public async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await UserController.getInstance().userService.get({
        originalId: id,
      });
      return res.send(successHandler(SUCCESS_MSG.FETCH, result));
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create new User
   * @param {string} fieldsResponse - FieldsResponse of User
   * @param {string} id - Id of User Type
   * @param {string} stackId - Id of Stack
   * @returns {IUser}
   */
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('UserController - create', req.body);
      const { name, email, password, role = 'CUSTOMER' } = req.body;
      const result = await UserController.getInstance().userService.create({
        email,
        name,
        password,
        role,
      });
      return res.send(successHandler(SUCCESS_MSG.CREATE, result));
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update the User
   * @param {string} id - Id of User
   * @param {string} fieldsResponse - FieldsResponse of User
   * @returns {IUser}
   */
  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = JSON.parse(JSON.stringify(req.body));
      const result = await UserController.getInstance().userService.update({
        ...data,
        id,
      });
      return res.send(successHandler(SUCCESS_MSG.UPDATE, result));
    } catch (error) {
      console.log('eeeeeeeeeeee', error);
      next(error);
    }
  }

  /**
   * Delete the User
   * @param {string} id - Id of User
   * @returns {IUser}
   */
  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await UserController.getInstance().userService.delete({
        id,
      });
      return res.send(successHandler(SUCCESS_MSG.DELETE, result));
    } catch (error) {
      next(error);
    }
  }
}

export default UserController.getInstance();
