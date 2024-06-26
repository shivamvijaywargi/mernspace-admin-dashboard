export interface ICredentials {
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  tenant: IRestaurant | null;
  createdAt: string;
}

export interface ICreateUser extends IUser {
  tenantId: number;
}

export interface IRestaurant {
  id: number;
  name: string;
  address: string;
}

export interface IFieldData {
  name: string[];
  value?: string;
}
