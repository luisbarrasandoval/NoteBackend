import { IsDate, IsMongoId, IsString, MinLength } from 'class-validator';
import UserAction from '../actions/user.actions';
import LoginDTO from './login.dto';

class UserDTO extends LoginDTO {
  @IsMongoId({
    groups: [UserAction.GET]
  })
  public _id!: string;

  @IsDate({
    groups: [UserAction.GET]
  })
  public create_at!: Date;

  @IsString({
    groups: [UserAction.REGISTER, UserAction.UPDATE]
  })
  @MinLength(1)
  public username!: string;

  @IsString({
    groups: [UserAction.REGISTER, UserAction.UPDATE]
  })
  @MinLength(3)
  public firstName!: string;

  @IsString({
    groups: [UserAction.REGISTER, UserAction.UPDATE]
  })
  public lastName!: string;

}

export default UserDTO;
