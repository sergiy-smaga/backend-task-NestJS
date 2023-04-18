/* eslint-disable prettier/prettier */
import { Interval } from '../appointments/types';

export const checkDate = (intervals: Interval[], date: Date): boolean =>
  intervals.some((interval) => date >= interval.from && date <= interval.to);
