/* eslint-disable prettier/prettier */
import { readFileSync } from 'fs';
import { join } from 'path';
import { Provider } from '../appointments/types';

const providersPath = join(
  __dirname,
  '../../../',
  'providers/providers.json',
);

export const getListProviders: () => Provider[] = () => {
  const result = readFileSync(providersPath);
  return JSON.parse(result.toString());
};
