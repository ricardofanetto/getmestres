import { ICategory } from './ICategory';
export interface ISubCategory {
  uid: string;
  name: string;
  cost: number;
  category: ICategory;
}
