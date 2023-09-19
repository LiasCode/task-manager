import { verify } from "jsonwebtoken";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

export const throwIfUserCookiesNotAuth = async (cookies: RequestCookies) => {
  const token = cookies.get("jwt");

  if (!token) {
    throw new Error("Invalid Credentials");
  }

  const jwt = verify(token.value, process.env.JWT_SECRET as string);

  if (!jwt) {
    throw new Error("Invalid Credentials");
  }
};
