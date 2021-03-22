import { IQueryBaseUpdate } from '../../../entities';

export default interface IQueryUpdate extends IQueryBaseUpdate {
  id: string;
  name?: string;
  email: string;
  role: string;
}
