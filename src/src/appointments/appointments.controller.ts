import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpStatus,
  HttpCode,
  HttpException,
} from '@nestjs/common';
import { QueryParamsDto } from './dto/query-params.dto';
import { SetAppointmentDto } from './dto/set-appointment.dto';
import { AppointmentsService } from './appointments.service';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async getProviders(
    @Query()
    query: QueryParamsDto,
  ): Promise<string[]> {
    return await this.appointmentsService.getProviders(query);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  async setAppointment(@Body() body: SetAppointmentDto) {
    const { isDate, provider } = await this.appointmentsService.setAppointment(
      body,
    );
    if (!provider) {
      throw new HttpException('"Provider not found"', HttpStatus.BAD_REQUEST);
    }
    if (!isDate) {
      throw new HttpException(
        '"Date is not available"',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
