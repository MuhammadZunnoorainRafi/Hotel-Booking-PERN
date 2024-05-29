import jwt from 'jsonwebtoken';

export const genToken = (id: string) => {
  return jwt.sign({ userId: id }, process.env.JWT_SECRET as string, {
    expiresIn: '1d',
  });
};
