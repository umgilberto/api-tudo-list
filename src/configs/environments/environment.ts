import * as dotenv from 'dotenv';

import ProcessEnv = NodeJS.ProcessEnv;

enum EnvMode {
  Development = 'development',
  Production = 'production',
}

const env: ProcessEnv = process.env;

dotenv.config({ path: '.env' });

export const environment = {
  isProduction: env.NODE_ENV === EnvMode.Production,
  isDevelopment: env.NODE_ENV === EnvMode.Development,
  api: {
    url: env.BASE_URL ?? 'http://localhost',
    port: env.API_PORT ?? 8080,
  },
  clientUrl: env.CLIENT_URL,
  database: {
    type: env.TYPEORM_CONNECTION as any,
    host: env.TYPEORM_HOST,
    port: Number(env.TYPEORM_PORT),
    username: env.TYPEORM_USERNAME,
    password: env.TYPEORM_PASSWORD,
    database: env.TYPEORM_DATABASE,
  },
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: env.JWT_EXPIRES_IN,
  },
};
