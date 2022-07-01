import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FlightService } from './flight.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';

@ApiTags('Flisghts')
@Controller('api/v1/flight')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Post()
  create(@Body() createFlightDto: CreateFlightDto) {
    return this.flightService.create(createFlightDto);
  }

  @Post(':flightId/passenger/:passengerId')
  @ApiOperation({ summary: 'Add passengers to the flight' })
  async addPassenger(
    @Param('flightId') lightId: ObjectId,
    @Param('passengerId') passengerId: ObjectId,
  ) {
    return this.flightService.addPassenger(lightId, passengerId);
  }

  @Get()
  findAll() {
    return this.flightService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.flightService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: ObjectId, @Body() updateFlightDto: UpdateFlightDto) {
    return this.flightService.update(id, updateFlightDto);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.flightService.remove(id);
  }
}
