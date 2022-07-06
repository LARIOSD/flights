import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PassengerService } from './passenger.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { IPansserger } from '../common/interfaces/passenger.interface';

@ApiTags('Passengers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
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
  findOne(@Param('id') id: ObjectId): Promise<IPansserger> {
    return this.passengerService.findOne(id);
  }

  @Put(':id') update(
    @Param('id') id: ObjectId,
    @Body() updatePassengerDto: UpdatePassengerDto,
  ): Promise<IPansserger> {
    return this.passengerService.update(id, updatePassengerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId): Promise<IPansserger> {
    return this.passengerService.remove(id);
  }
}
