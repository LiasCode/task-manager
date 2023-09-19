"use client";

import { isUserLoginFormatValid } from "@/validation/userLoginData";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useSessionContext } from "../SessionContext";

export const useLogin = () => {
  const router = useRouter();
  const sessionContext = useSessionContext();

  const [userData, setUserData] = useState<{
    userName: string;
    password: string;
  }>({ userName: "", password: "" });

  const [inputError, setInputError] = useState({
    password: false,
    userName: false,
  });

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setInputError({ password: false, userName: false });
      const isValidUserInput = isUserLoginFormatValid(userData);
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
      sessionContext?.actions.login({ user: data.user , tasks : data.tasks});
      router.push("/tasks");
    } catch (error) {
      setInputError({
        password: true,
        userName: true,
      });
      console.error({ error });
    }
  };

  return { submitHandler, inputError, userData, setUserData };
};
