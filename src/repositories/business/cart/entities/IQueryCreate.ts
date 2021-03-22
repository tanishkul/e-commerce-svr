import { IQueryBaseCreate } from '../../../entities';

export default interface ICreate extends IQueryBaseCreate {
  name: string;
  email: string;
  role: string;
}
