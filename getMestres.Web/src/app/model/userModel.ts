import { BaseModel } from './baseModel';

export class UserModel extends BaseModel {
  name: string;
  photo: string;
  email: string;
  isRoot: boolean;
  password: string;
  confirmPassword: string;
}