export type User = {
  id?: string;
  username: string;
  password?: string;
  membership: "Pro" | "Basic";
};

export interface IUserService {
  getUser: (id: string) => Promise<User>;
  addUser: (user: User) => Promise<{ id: string }>;
}
