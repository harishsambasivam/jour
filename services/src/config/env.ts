const dotenv = require("dotenv");
// config() will read your .env file, parse the contents, assign it to process.env.
dotenv.config();

const env = {
  port: process.env.PORT,
  mongouri: process.env.MONGO_URI,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  accessTokenTtl: process.env.ACCESS_TOKEN_TTL,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  refreshTokenTtl: process.env.REFRESH_TOKEN_TTL,
  logLevel: process.env.LOG_LEVEL,
  env: process.env.NODE_ENV,
  saltRounds: process.env.SALT_ROUNDS,
};

export function getEnv(key: keyof typeof env): string {
  // @ts-ignore
  return env[key];
}
