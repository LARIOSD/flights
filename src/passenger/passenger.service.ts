import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PASSENGER } from '../common/models/models';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { IPansserger } from '../common/interfaces/passenger.interface';

@Injectable()
export class PassengerService {
  constructor(
    @InjectModel(PASSENGER.name) private readonly model: Model<IPansserger>,
  ) {}
  async create(createPassengerDto: CreatePassengerDto): Promise<IPansserger> {
    const newPasseger = new this.model({ ...createPassengerDto });
    return await newPasseger.save();
  }

  async findAll(): Promise<IPansserger[]> {
    return await this.model.find();
  }

  async findOne(id: string): Promise<IPansserger> {
    return await this.model.findById(id);
  }

  async update(
    id: string,
    updatePassengerDto: UpdatePassengerDto,
  ): Promise<IPansserger> {
    const updatePassenger = await this.model.findByIdAndUpdate(
      id,
      updatePassengerDto,
      { new: true },
    );

    if (!updatePassenger) {
      throw new HttpException('ELEMENT_NOT_FOUNT', HttpStatus.NOT_FOUND);
    }
    return updatePassenger;
  }

  async remove(id: string): Promise<IPansserger> {
    const deletePassenger = await this.model.findByIdAndDelete(id);
    if (!deletePassenger) {
      throw new HttpException('ELEMENT_NOT_FOUNT', HttpStatus.NOT_FOUND);
    }
    return deletePassenger;
  }
}
