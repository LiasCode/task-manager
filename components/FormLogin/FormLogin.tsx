"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { isUserLoginFormatValid } from "../../validation/userLoginData";
import "./formLogin.css";

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

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setInputError({ password: false, userName: false });
      const isValidUserInput = isUserLoginFormatValid(userData);
      console.log({ isValidUserInput });
      if (!isValidUserInput) throw new Error("Invalid credentials");

      const result = await fetch("/api/login", {
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
      let cookies = `jwt=${jwt};path=/;`;
      cookies += `max-age=${60 * 60};SameSite=Strict;`
      document.cookie = cookies;

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
