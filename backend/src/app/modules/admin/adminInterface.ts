import { Document } from 'mongoose';

export interface IAdmin {
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAdminPayload {
  id: string;
  username: string;
  email: string;
}

export interface IAdminDocument extends IAdmin, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}
