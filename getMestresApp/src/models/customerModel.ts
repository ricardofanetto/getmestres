import { BaseModel } from './baseModel';

export class CustomerModel extends BaseModel {
  name: string;
  email: string;
  photo: string;
  phone: string;
  password: string;
  confirmPassword: string;
}