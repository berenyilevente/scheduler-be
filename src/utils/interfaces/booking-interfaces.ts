import { InputArgs } from './input-interfaces';

export interface Booking {
  inputs: InputArgs[];
  bookingId: string;
  bookedTimes: { date: string; time: string };
}
