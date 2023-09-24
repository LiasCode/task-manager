import { test, expect } from "@jest/globals";

import { isUserLoginFormatValid } from "./userLoginData";

test("userLoginData", () => {
  expect(isUserLoginFormatValid({ userName: "", password: "" })).toBe(false);

  expect(isUserLoginFormatValid({ userName: "test", password: "test" })).toBe(
    true
  );

  expect(isUserLoginFormatValid({ userName: "", password: "test" })).toBe(
    false
  );

  expect(isUserLoginFormatValid({ userName: "test", password: "" })).toBe(
    false
  );
});
