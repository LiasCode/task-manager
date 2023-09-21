import { ServicesResponse } from "./Service";
import { Task } from "./Task";

export type User = {
  id: string;
  name: string;
  password: string;
  tasks: Task["id"][];
};

export type UserWhithoutPassword = Omit<User, "password">;
export type UserLoginData = { name: string; password: string };

export interface IUserService {
  getAll(): Promise<ServicesResponse<UserWhithoutPassword[]>>;

  getOne(data: {
    id: User["id"];
  }): Promise<ServicesResponse<UserWhithoutPassword>>;

  create(
    data: Omit<User, "id" | "tasks">
  ): Promise<ServicesResponse<UserWhithoutPassword>>;

  update(data: User): Promise<ServicesResponse<UserWhithoutPassword>>;

  login(
    data: UserLoginData
  ): Promise<ServicesResponse<{ token: string; user: UserWhithoutPassword }>>;
}
