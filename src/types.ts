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
  createdAt: string;
}

export interface IRestaurant {
  id: number;
  name: string;
  address: string;
}
