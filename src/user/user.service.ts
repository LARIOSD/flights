import * as bcrypt from 'bcrypt';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from 'src/common/models/models';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from 'src/common/interfaces/user.interface';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(@InjectModel(USER.name) private readonly model: Model<IUser>) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async checkPassword(password: string, passwordDB: string): Promise<boolean> {
    const isValid = await bcrypt.compare(password, passwordDB);
    return isValid;
  }

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const hash = await this.hashPassword(createUserDto.password);
    const newUser = new this.model({ ...createUserDto, password: hash });
    return await newUser.save();
  }

  async findAll(): Promise<IUser[]> {
    return await this.model.find();
  }

  async findOne(id: ObjectId): Promise<IUser> {
    return await this.model.findById(id);
  }

  async findByUsername(username: string): Promise<IUser> {
    return await this.model.findOne({ username });
  }

  async update(id: ObjectId, updateUserDto: UpdateUserDto): Promise<IUser> {
    const hash = await this.hashPassword(updateUserDto.password);
    const user = { ...updateUserDto, password: hash };
    const updateUser = await this.model.findByIdAndUpdate(id, user, {
      new: true,
    });

    if (!updateUser) {
      throw new NotFoundException('Element not found');
    }
    return updateUser;
  }

  async remove(id: ObjectId): Promise<IUser> {
    const deleteUser = await this.model.findByIdAndDelete(id);
    if (!deleteUser) {
      throw new NotFoundException('Element not found');
    }
    return deleteUser;
  }
}
