/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsDate } from 'class-validator';
import { Transform } from 'class-transformer';

export class SetAppointmentDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  readonly name: string;

  @IsNotEmpty({ message: 'Date is required' })
  @Transform(({ value }) => new Date(Number(value)))
  @IsDate()
  readonly date: Date;
}
