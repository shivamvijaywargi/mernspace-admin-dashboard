import { IUser } from "../store";

export const usePermission = () => {
  const allowedRoles = ["admin", "manager"];

  const _hasPermission = (user: IUser) => {
    if (user) {
      return allowedRoles.includes(user.role);
    }

    return false;
  };

  return {
    isAllowed: _hasPermission,
  };
};
