import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class CreatePassengerDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;
}
