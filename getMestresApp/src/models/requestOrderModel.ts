import { RequestStatus } from './enums/RequestStatus';
import { ServiceProviderModel } from './serviceProviderModel';
import { SubCategoryModel } from './subCategoryModel';
import { UserModel } from './customerModel';

export class RequestOrderModel {
  longlat: string;
  title: string;
  description: string;
  statusOrder: RequestStatus;
  customer: UserModel;
  subCategory: SubCategoryModel;
  serviceProvider: ServiceProviderModel;
}