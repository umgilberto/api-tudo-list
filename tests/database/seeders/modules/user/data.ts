export interface UserSeed {
  id: string;
  username: string;
  name: string;
  email: string;
  password: string;
  isMaster: boolean;
}

export const userSeeds: UserSeed[] = [
  {
    id: '63883374-13ce-4ade-b427-9f7eef05effc',
    username: 'morganBig',
    name: 'Morgan, big news',
    email: 'morgan.bignews@gmail.com',
    password: 'Master@1234',
    isMaster: true,
  },
];
