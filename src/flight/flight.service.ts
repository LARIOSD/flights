import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { FLIGHT } from 'src/common/models/models';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { IFlight } from 'src/common/interfaces/flight.inteface';
import { PassengerService } from 'src/passenger/passenger.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class FlightService {
  constructor(
    @InjectModel(FLIGHT.name) private readonly model: Model<IFlight>,
    private readonly passengerSercice: PassengerService,
  ) {}
  async create(createFlightDto: CreateFlightDto): Promise<IFlight> {
    const newUser = new this.model({ ...createFlightDto });
    return await newUser.save();
  }

  async addPassenger(
    flightId: ObjectId,
    passengerId: ObjectId,
  ): Promise<IFlight> {
    const passenger = this.passengerSercice.findOne(passengerId);
    if (!passenger) {
      throw new HttpException('PASSENGER_NOT_FOUNT', HttpStatus.NOT_FOUND);
    }

    const updateFlight: IFlight = await this.model
      .findByIdAndUpdate(
        flightId,
        {
          $addToSet: { passenger: passengerId },
        },
        { new: true },
      )
      .populate('passengers');

    return updateFlight;
  }

  async findAll(): Promise<IFlight[]> {
    return await this.model.find().populate('passengers');
  }

  async findOne(id: ObjectId): Promise<IFlight> {
    return await this.model.findById(id).populate('passengers');
  }

  async update(
    id: ObjectId,
    updateFlightDto: UpdateFlightDto,
  ): Promise<IFlight> {
    const updateFlight: IFlight = await this.model
      .findByIdAndUpdate(id, updateFlightDto, { new: true })
      .populate('passengers');
    if (!updateFlight) {
      throw new HttpException('ELEMENT_NOT_FOUNT', HttpStatus.NOT_FOUND);
    }
    return updateFlight;
  }

  async remove(id: ObjectId): Promise<IFlight> {
    const deleteFlight: IFlight = await this.model.findByIdAndDelete(id);
    if (!deleteFlight) {
      throw new HttpException('ELEMENT_NOT_FOUNT', HttpStatus.NOT_FOUND);
    }
    return deleteFlight;
  }
}
