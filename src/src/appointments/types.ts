/* eslint-disable prettier/prettier */
export type Provider = {
  name: string;
  specialties: string[];
  score: number;
  availableDates: Interval[];
};

export type Interval = {
  from: Date;
  to: Date;
};
