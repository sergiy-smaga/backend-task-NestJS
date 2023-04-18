/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { QueryParamsDto } from './dto/query-params.dto';
import { SetAppointmentDto } from './dto/set-appointment.dto';
import { checkDate } from 'src/helpers/checkDate';
import { getListProviders } from 'src/helpers/dataBaseHelpers';
import { Provider } from './types';

@Injectable()
export class AppointmentsService {
  private readonly providers: Provider[] = [];
  constructor() {
    this.providers = getListProviders();
  }

  async getProviders(query: QueryParamsDto) {
    const { specialty, date, minScore } = query;

    const filteredProviders = this.providers
      .filter((provider) => {
        const { specialties, score, availableDates } = provider;

        const isSpecialty = specialties.some(
          (item) => item.toLowerCase() === specialty.toLowerCase(),
        );
        const isDate = checkDate(availableDates, date);
        const isMinScore = score >= minScore;

        return isSpecialty && isDate && isMinScore;
      })
      .sort((a, b) => b.score - a.score)
      .map((provider) => provider.name);

    return filteredProviders;
  }

  async setAppointment(body: SetAppointmentDto) {
    const { name, date } = body;
    const provider = this.providers.find(
      (provider) => provider.name.toLowerCase() === name.toLocaleLowerCase(),
    );

    let isDate: boolean;

    if (provider) {
      const { availableDates } = provider;
      isDate = checkDate(availableDates, date);
    }

    return { isDate, provider };
  }
}
