import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PASSENGER } from '../common/models/models';
import { PassengerService } from './passenger.service';
import { PassengerSchema } from './schemas/passenger.schema';
import { PassengerController } from './passenger.controller';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: PASSENGER.name,
        useFactory: () => {
          return PassengerSchema;
        },
      },
    ]),
  ],
  controllers: [PassengerController],
  providers: [PassengerService],
})
export class PassengerModule {}
