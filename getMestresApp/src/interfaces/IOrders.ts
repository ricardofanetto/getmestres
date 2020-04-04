import { ICustomer } from './ICustomer';
import { ISubCategory } from './ISubCategory';

export interface IOrders {
  uid: string;
  createAt: Date;
  longlat: string;
  title: string;
  description: string;
  statusOrder: number;
  customer: ICustomer;
  subCategory: ISubCategory;
  serviceProvider?: any;
}

