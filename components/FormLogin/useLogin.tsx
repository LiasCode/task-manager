"use client";

import { isUserLoginFormatValid } from "@/validation/userLoginData";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useSessionContext } from "../SessionContext";
import { loginService } from "@/services/login-services";

export function useLogin() {
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

      const data = await loginService(userData);

      if (!data.success) {
        throw new Error("Invalid credentials");
      }
      if (!sessionContext) {
        throw new Error("Session Context Missing");
      }
      await sessionContext.actions.login({
        user: data.user,
        tasks: data.tasks,
      });
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
}
