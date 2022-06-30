import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PassengerModule } from './passenger/passenger.module';
import { FlightModule } from './flight/flight.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.URI_MONGODB),
    UserModule,
    PassengerModule,
    FlightModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
