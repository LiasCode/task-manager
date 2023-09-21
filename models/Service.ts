export type ServicesResponse<T> = {
  error: { message: string; code: number } | null;
  success: boolean;
  data: T | null;
};
