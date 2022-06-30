import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IFlight } from 'src/common/interfaces/flight.inteface';
import { FLIGHT } from 'src/common/models/models';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';

@Injectable()
export class FlightService {
  constructor(
    @InjectModel(FLIGHT.name) private readonly model: Model<IFlight>,
  ) {}
  async create(createFlightDto: CreateFlightDto): Promise<IFlight> {
    const newUser = new this.model({ ...createFlightDto });
    return await newUser.save();
  }

  async findAll(): Promise<IFlight[]> {
    return await this.model.find();
  }

  async findOne(id: string): Promise<IFlight> {
    return await this.model.findById(id);
  }

  async update(id: string, updateFlightDto: UpdateFlightDto): Promise<IFlight> {
    const updateFlight: IFlight = await this.model.findByIdAndUpdate(
      id,
      updateFlightDto,
      { new: true },
    );
    if (!updateFlight) {
      throw new HttpException('ELEMENT_NOT_FOUNT', HttpStatus.NOT_FOUND);
    }
    return updateFlight;
  }

  async remove(id: string): Promise<IFlight> {
    const deleteFlight: IFlight = await this.model.findByIdAndDelete(id);
    if (!deleteFlight) {
      throw new HttpException('ELEMENT_NOT_FOUNT', HttpStatus.NOT_FOUND);
    }
    return deleteFlight;
  }
}
