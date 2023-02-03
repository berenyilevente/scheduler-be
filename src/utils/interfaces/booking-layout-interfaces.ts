import { InputArgs } from './input-interfaces';

export interface BookingLayoutArgs {
  inputs: InputArgs[];
  name: string;
}

export interface BookingLayoutUser {
  name: string;
  apiKey: string;
}
