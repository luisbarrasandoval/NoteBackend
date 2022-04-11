import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';

class FilterNotesDto {
  @Type(() => Number)
  @IsNumber()
  public limit!: number;

  @Type(() => Number)
  @IsNumber()
  public skip!: number;

  @IsBoolean()
  @Transform(({ value }) =>
    value == 'true' ? true : value === 'false' ? false : undefined
  )
  public complete?: boolean;

  @IsString()
  public order_by?: string;

  @IsString()
  public order_type?: string;

  @IsString()
  public search?: string;

  @IsString()
  public categoria?: string;

  @IsString()
  public prioridad?: number;

  @IsDate()
  public expireDate?: string;
}

export default FilterNotesDto;
