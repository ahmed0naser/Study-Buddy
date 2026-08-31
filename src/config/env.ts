const requiredEnv = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
};

const env = {
  PORT: Number(process.env.PORT) || 3000,

  DB_CONNECTION_STRING: requiredEnv("DB_CONNECTION_STRING"),

  JWT_SECRET: requiredEnv("JWT_SECRET"),

  JWT_EXPIRATION: requiredEnv("JWT_EXPIRATION"),
};

export default env;
