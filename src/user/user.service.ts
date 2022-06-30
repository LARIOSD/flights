import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from 'src/common/models/models';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from 'src/common/interfaces/user.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(@InjectModel(USER.name) private readonly model: Model<IUser>) {}
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const hash = await this.hashPassword(createUserDto.password);
    const newUser = new this.model({ ...createUserDto, password: hash });
    return await newUser.save();
  }

  async findAll(): Promise<IUser[]> {
    return await this.model.find();
  }

  async findOne(id: string): Promise<IUser> {
    return await this.model.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    const hash = await this.hashPassword(updateUserDto.password);
    const user = { ...updateUserDto, password: hash };
    const updateUser = await this.model.findByIdAndUpdate(id, user, {
      new: true,
    });

    if (!updateUser) {
      throw new HttpException('ELEMENT_NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    return updateUser;
  }

  async remove(id: string): Promise<IUser> {
    const deleteUser = await this.model.findByIdAndDelete(id);
    if (!deleteUser) {
      throw new HttpException('ELEMENT_NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    return deleteUser;
  }
}
