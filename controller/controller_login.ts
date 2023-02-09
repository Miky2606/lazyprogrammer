import { IUser } from "../interface/user_interface";

export const verifyPassword = (pwd: string) => {
  return pwd.match(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
  );
};
export const verifyEmail = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const verifyUser = (user: IUser): boolean => {
  if (
    !user.username ||
    !user.email ||
    !user.password ||
    !verifyEmail(user.email) ||
    !verifyPassword(user.password)
  )
    return false;

  return true;
};
