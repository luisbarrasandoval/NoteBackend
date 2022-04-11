import { IsString, MinLength } from 'class-validator';
import UserAction from '../actions/user.actions';

class LoginDTO {
  @IsString({
    groups: [UserAction.LOGIN, UserAction.REGISTER, UserAction.UPDATE],
  })
  public email!: string;

  @IsString({
    message: 'El password no es valido',
    groups: [UserAction.LOGIN, UserAction.REGISTER, UserAction.UPDATE],
  })
  @MinLength(8)
  public password!: string;

 
}

export default LoginDTO;
