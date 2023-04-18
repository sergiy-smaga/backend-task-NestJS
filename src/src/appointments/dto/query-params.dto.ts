/* eslint-disable prettier/prettier */
import { Type, Transform } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsDate,
  Min,
  Max,
  //   MinDate,
} from 'class-validator';

export class QueryParamsDto {
  @IsNotEmpty({ message: 'Specialty is required' })
  @IsString()
  readonly specialty: string;

  @IsNotEmpty({ message: 'Date is required' })
  @Transform(({ value }) => new Date(Number(value)))
  @IsDate()
  //   @MinDate(new Date())
  readonly date: Date;

  @IsNotEmpty({ message: 'MinScore is required' })
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @Max(10)
  readonly minScore: number;
}
