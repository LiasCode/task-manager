"use client";
import { useLogin } from "./useLogin";

export const FormLogin = () => {
  const { setUserData, userData, inputError, submitHandler } = useLogin();

  return (
    <form
      onSubmit={submitHandler}
      className="min-w-[320px] flex flex-col items-center justify-center w-4/12"
    >
      {inputError.userName && (
        <span className="text-red-400">Invalid User Name</span>
      )}

      <label className="mt-4 mb-4 ml-0 mr-0 text-lg w-full h-max flex flex-col items-start justify-center">
        <span className="border-b-gray-200 border-b border-solid">
          User Name:
        </span>

        <input
          type="text"
          name="userName"
          placeholder="...pedro"
          required
          minLength={3}
          maxLength={20}
          value={userData.userName}
          className="border-b-gray-200 border-b border-l border-solid bg-transparent outline-none text-lg pl-2 focus:border-primaryDetail h-10"
          onChange={(e) =>
            setUserData((p) => ({ ...p, userName: e.target.value }))
          }
        />
      </label>

      {inputError.password && (
        <span className="text-red-400">Invalid Password</span>
      )}

      <label className="mt-4 mb-4 ml-0 mr-0 text-lg w-full h-max flex flex-col items-start justify-center">
        <span className="border-b-gray-200 border-b border-solid">
          Password:
        </span>
        <input
          type="password"
          name="password"
          placeholder="...password"
          required
          value={userData.password}
          minLength={3}
          maxLength={20}
          className="border-b-gray-200 border-b border-l border-solid bg-transparent outline-none text-lg pl-2 focus:border-primaryDetail h-10"
          onChange={(e) =>
            setUserData((p) => ({ ...p, password: e.target.value }))
          }
        />
      </label>

      <div className="w-full h-12 flex flex-row justify-center items-center mt-4">
        <button
          className="cursor-pointer w-24 border border-solid border-primaryDetail mr-2 rounded p-1"
          type="submit"
        >
          Send
        </button>
        <button
          className="cursor-pointer w-24 border border-solid border-gray-200 ml-2 rounded p-1"
          type="reset"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
