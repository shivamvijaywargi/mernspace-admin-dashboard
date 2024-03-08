import { ICredentials } from "../types";
import { api } from "./client";

// Auth Service
export const login = (credentials: ICredentials) =>
  api.post("/auth/login", credentials);
export const self = () => api.get("/auth/self");
export const logout = () => api.post("/auth/logout");
export const getUsers = () => api.get("/users");
