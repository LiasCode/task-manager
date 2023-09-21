export const loginService = async (userData: {
  userName: string;
  password: string;
}) => {
  const result = await fetch("/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await result.json();
  return data;
};
