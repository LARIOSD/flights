import { IPansserger } from './passenger.interface';
export interface IFlight extends Document {
  pilot: string;
  airplane: string;
  destinationCity: string;
  flightDate: Date;
  passenger: IPansserger[];
}
