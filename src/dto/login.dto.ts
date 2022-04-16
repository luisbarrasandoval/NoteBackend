import { IsEmail, IsString, MinLength } from "class-validator";
import UserAction from "../actions/user.actions";

// email execption

class LoginDTO {
  @IsString({
    groups: [UserAction.LOGIN, UserAction.REGISTER, UserAction.UPDATE],
  })
  @IsEmail({
    // IsEmail no work
    groups: [UserAction.REGISTER, UserAction.UPDATE],
  })
  public email!: string;

  @IsString({
    message: "El password no es valido",
    groups: [
      UserAction.LOGIN,
      UserAction.REGISTER,
      UserAction.UPDATE,
      UserAction.VERIFY_PASSWORD,
    ],
  })
  @MinLength(8, {
    message: "El password debe tener al menos 8 caracteres",
    groups: [
      UserAction.LOGIN,
      UserAction.REGISTER,
      UserAction.UPDATE,
      UserAction.VERIFY_PASSWORD,
    ],
  })
  public password!: string;
}

export default LoginDTO;
