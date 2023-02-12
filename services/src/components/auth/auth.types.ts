import { User } from "../user/user.types";

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export interface IAuthService {
  generateTokens: (user: User) => AuthTokens;
  refreshTokens: (token: string) => Promise<AuthTokens>;
}
