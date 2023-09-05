"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { isUserLoginFormatValid } from "@/validation/userLoginData";
import "./formLogin.css";
import { useSessionContext } from "../SessionContext";

export const FormLogin = () => {
  const [userData, setUserData] = useState<{
    userName: string;
    password: string;
  }>({ userName: "", password: "" });
  const [inputError, setInputError] = useState({
    password: false,
    userName: false,
  });
  const router = useRouter();
  const sessionContext = useSessionContext();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setInputError({ password: false, userName: false });
      const isValidUserInput = isUserLoginFormatValid(userData);
      console.log({ isValidUserInput });
      if (!isValidUserInput) throw new Error("Invalid credentials");

      const result = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await result.json();

      if (!data.success) {
        throw new Error("Invalid credentials");
      }
      const jwt = data.jwt;
      sessionContext?.actions.loginUser({ user: data.user, token: jwt });
      console.log({ data });
      router.push("/notes");
    } catch (error) {
      setInputError({
        password: true,
        userName: true,
      });
      console.error({ error });
    }
  };

  return (
    <form onSubmit={submitHandler}>
      {inputError.userName && <span>Invalid User Name</span>}
      <label>
        <span>User Name: </span>
        <input
          type="text"
          name="userName"
          placeholder="...pedro"
          required
          minLength={3}
          maxLength={20}
          onChange={(e) =>
            setUserData((p) => ({ ...p, userName: e.target.value }))
          }
        />
      </label>

      {inputError.password && <span>Invalid Password</span>}
      <label>
        <span>Password: </span>
        <input
          type="password"
          name="password"
          placeholder="...1234qwer"
          required
          minLength={3}
          maxLength={20}
          onChange={(e) =>
            setUserData((p) => ({ ...p, password: e.target.value }))
          }
        />
      </label>

      <div className="buttons-box">
        <button type="submit">Send</button>
        <button type="reset">Cancel</button>
      </div>

      <div></div>
    </form>
  );
};
