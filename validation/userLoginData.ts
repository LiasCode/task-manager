type loginData = { userName: string; password: string };

export const isValidUserLoginData = ({ userName, password }: loginData) => {
  if (!userName || userName.length < 3 || userName.length > 20) {
    return false;
  }
  if (!password || password.length < 3 || password.length > 20) {
    return false;
  }
  return true;
};
