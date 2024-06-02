import z from 'zod';
import { userLogSchema, userRegSchema } from './schemas';

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
};

export type RegUser = z.infer<typeof userRegSchema>;
export type LogUser = z.infer<typeof userLogSchema>;

export type ErrorT = {
  response: {
    data: {
      message: string;
    };
  };
  message: string;
};
