import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { IPansserger } from '../common/interfaces/passenger.interface';

@Controller('api/v1/passenger')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @Post()
  create(@Body() createPassengerDto: CreatePassengerDto): Promise<IPansserger> {
    return this.passengerService.create(createPassengerDto);
  }

  @Get()
  findAll(): Promise<IPansserger[]> {
    return this.passengerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IPansserger> {
    return this.passengerService.findOne(id);
  }

  @Put(':id') update(
    @Param('id') id: string,
    @Body() updatePassengerDto: UpdatePassengerDto,
  ): Promise<IPansserger> {
    return this.passengerService.update(id, updatePassengerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<IPansserger> {
    return this.passengerService.remove(id);
  }
}
