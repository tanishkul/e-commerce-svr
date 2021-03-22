import { IQueryBaseList } from '../../../entities';

export default interface IQueryList extends IQueryBaseList {
  sort?: string;
  id?: string;
  name?: string;
  email?: string;
  role?: string;
}
