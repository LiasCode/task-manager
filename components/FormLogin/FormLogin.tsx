"use client";
import "./formLogin.css";
import { useLogin } from "./useLogin";

export const FormLogin = () => {
  const { setUserData, userData, inputError, submitHandler } = useLogin();

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
          value={userData.userName}
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
          value={userData.password}
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
    </form>
  );
};
