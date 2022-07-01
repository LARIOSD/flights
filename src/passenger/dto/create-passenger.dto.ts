import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class CreatePassengerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;
}
