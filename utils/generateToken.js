import { secret } from '../config/secret';

export const generateToken = user => {
  const payload = {
    userID: user.id
  };

  const options = { expiresIn: '1h' };
  const token = jwt.sign(payload, secret.jwtSecrets, options);
  return token;
};
