import * as User from './user';
import * as Auth from './auth';
import * as Sprint from './sprint';

export const internalModules = [
  Auth.AuthModule,
  User.UserModule,
  Sprint.SprintModule,
];
