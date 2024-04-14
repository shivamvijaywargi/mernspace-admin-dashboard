import { ICreateUser, ICredentials } from "../types";
import { api } from "./client";

export const AUTH_SERVICE = "/api/auth";
// const CATALOG_SERVICE = "/api/catalog";

// Auth Service
export const login = (credentials: ICredentials) =>
  api.post(`${AUTH_SERVICE}/auth/login`, credentials);
export const self = () => api.get(`${AUTH_SERVICE}/auth/self`);
export const logout = () => api.post(`${AUTH_SERVICE}/auth/logout`);

// Users API endpoints
export const getUsers = (queryString: string) =>
  api.get(`${AUTH_SERVICE}/users?${queryString}`);
export const createUser = (user: ICreateUser) =>
  api.post(`${AUTH_SERVICE}/users`, user);
export const updateUser = (id: number, user: ICreateUser) =>
  api.patch(`${AUTH_SERVICE}/users/${id}`, user);

// Tenants/Restaurants API endpoints
export const getRestaurants = () => api.get(`${AUTH_SERVICE}/tenants`);
