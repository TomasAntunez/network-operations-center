import 'dotenv/config';
import * as env from 'env-var';


export const envs = {
  PORT: env.get('PORT').required().asPortNumber(),
  PROD: env.get('PROD').required().asBool(),
  mailer: {
    SERVICE: env.get('MAILER_SERVICE').required().asString(),
    EMAIL: env.get('MAILER_EMAIL').required().asEmailString(),
    SECRET_KEY: env.get('MAILER_SECRET_KEY').required().asString(),
  },
  mongo: {
    URL: env.get('MONGO_URL').required().asString(),
    DB_NAME: env.get('MONGO_DB_NAME').required().asString(),
  }
};
