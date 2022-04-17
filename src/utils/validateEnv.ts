import {cleanEnv, str} from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    MONGO_USER: str(),
    MONGO_PASSWORD: str(),
    MONGO_PATH: str(),
    PORT: str(),
  });

  return true;
};

export default validateEnv;
