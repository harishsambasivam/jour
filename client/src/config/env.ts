const env = {
  logLevel: import.meta.env.VITE_LOG_LEVEL,
  serverUri: import.meta.env.VITE_SERVER_URI,
};

export function getEnv(key: keyof typeof env): string {
  // @ts-ignore
  return env[key];
}
