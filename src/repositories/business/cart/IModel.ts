import IVersionableDocument from '../../versionable/IVersionableDocument';

export default interface ICartModel extends IVersionableDocument {
  id: string;
  title: string;
  description: string;
  price: number;
}
