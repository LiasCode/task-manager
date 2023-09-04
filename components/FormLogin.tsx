"use client";

import { FormEvent, useState } from "react";

export const FormLogin = () => {
  const [userData, setUserData] = useState<{
    userName: string;
    password: string;
  }>({ userName: "", password: "" });

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await result.json();
      console.log({ data });
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <label>
        <span>User Name: </span>
        <input
          type="text"
          name="userName"
          placeholder="...pedro"
          required
          minLength={3}
          maxLength={13}
          onChange={(e) =>
            setUserData((p) => ({ ...p, userName: e.target.value }))
          }
        />
      </label>
      <label>
        <span>Password: </span>
        <input
          type="password"
          name="password"
          placeholder="...1234qwer"
          required
          minLength={3}
          maxLength={13}
          onChange={(e) =>
            setUserData((p) => ({ ...p, password: e.target.value }))
          }
        />
      </label>
      <div className="buttons-box">
        <button type="submit">Send</button>
        <button type="reset">Cancel</button>
      </div>
    </form>
  );
};
