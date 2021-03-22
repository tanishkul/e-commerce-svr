import IVersionableDocument from '../../versionable/IVersionableDocument';

export default interface IProductModel extends IVersionableDocument {
  id: string;
  title: string;
  description: string;
  price: number;
}
