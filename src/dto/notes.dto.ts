import {
  IsString,
  IsBoolean,
  MinLength,
  Max,
  Min,
  IsDefined,
  IsMongoId
} from 'class-validator';

import 'reflect-metadata';
import HttpAction from '../actions/http.actions';

class NotesDTO {

  @IsDefined({
    groups: [HttpAction.UPDATE, HttpAction.GET, HttpAction.DELETE]
  })
  @IsMongoId({
    groups: [HttpAction.UPDATE, HttpAction.GET, HttpAction.DELETE]
  })
  public _id!: string;

  
  @IsString({
    groups: [HttpAction.UPDATE]
  })
  public userID!: string;

  @MinLength(2)
  @IsString({
    groups: [HttpAction.CREATE, HttpAction.UPDATE]
  })
  public title!: string;

  @IsBoolean({
    groups: [HttpAction.CREATE, HttpAction.UPDATE]
  })
  public status!: boolean;

  @IsString({
    groups: [HttpAction.CREATE, HttpAction.UPDATE]
  })
  public detail!: boolean;

  @Min(0)
  @Max(3, {
    groups: [HttpAction.CREATE, HttpAction.UPDATE]
  })
  public prioridad!: number;

  // @Type(() => Date)
  // @IsDate({
  //   message: '$value no es una fecha valida',
  //   groups: [HttpAction.CREATE, HttpAction.UPDATE]
  // })
  // @MaxDate(new Date(2025, 0, 0), {
  //   message: 'La fecha maxima es hasta el 2024'
  // })
  // public expireDate!: Date;

  @IsString({
    groups: [HttpAction.CREATE, HttpAction.UPDATE]
  })
  public categoria!: string;
}

export default NotesDTO;
