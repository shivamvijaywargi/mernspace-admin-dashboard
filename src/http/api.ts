import { ICreateUser, ICredentials } from "../types";
import { api } from "./client";

// Auth Service
export const login = (credentials: ICredentials) =>
  api.post("/auth/login", credentials);
export const self = () => api.get("/auth/self");
export const logout = () => api.post("/auth/logout");

// Users API endpoints
export const getUsers = (queryString: string) =>
  api.get(`/users?${queryString}`);
export const createUser = (user: ICreateUser) => api.post("/users", user);
export const updateUser = (id: number, user: ICreateUser) =>
  api.patch(`/users/${id}`, user);

// Tenants/Restaurants API endpoints
export const getRestaurants = () => api.get("/tenants");
