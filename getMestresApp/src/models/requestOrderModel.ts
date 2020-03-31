import { RequestStatus } from './enums/RequestStatus';
import { ServiceProviderModel } from './serviceProviderModel';
import { UserModel } from './userModel';
import { SubCategoryModel } from './subCategoryModel';
export class RequestOrderModel {
  longlat: string;
  title: string;
  description: string;
  statusOrder: RequestStatus;
  customer: UserModel;
  subCategory: SubCategoryModel | string;
  serviceProvider: ServiceProviderModel;
}