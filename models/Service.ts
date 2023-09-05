type ServicesResponse<T> = {
  error: { message: ""; code: number } | null;
  success: boolean;
  data: T;
};
