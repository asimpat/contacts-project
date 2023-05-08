import {
  Injectable,
  NotFoundException,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Contact } from '../entities/contact';
import { LoginDto } from '../dto/login.Dto';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from '../dto/register.dto';
import { UpdateUserDto } from '../dto/update.Dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email, password): Promise<User> {
    const getUser = await this.getUserByEmail(email);
    if (!getUser) throw new UnauthorizedException('Credential Incorrect');
    if (!(await bcrypt.compare(password, getUser.password))) {
      throw new UnauthorizedException('Credential Incorrect');
    }
    return getUser;
  }
  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async hashPassword(password: string) {
    const hashPassword = await bcrypt.hash(password, 12);
    return hashPassword;
  }

  async registerUser(user: UserDto): Promise<User | Object> {
    const userEmail = await this.getUserByEmail(user.email);
    if (user.password != user.confirmPassword) {
      return { message: `password does not match, confirm Password` };
    }

    if (!userEmail) {
      const createUser = await this.userRepository.create(user);
      createUser.password = await this.hashPassword(user.password);
      const newUser = await this.userRepository.save(createUser);
      delete newUser.password;
      return { message: `${newUser.fullName} sucessfully registered` };
    } else {
      throw new UnauthorizedException(`User already Exist`);
    }
  }

  async loginUser(
    user: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const userEmail = await this.validateUser(user.email, user.password);
    const payload = {
      sub: userEmail.id,
      email: userEmail.email,
      fullName: userEmail.fullName,
    };
    const result = this.jwtService.sign(payload, {
      secret: process.env.DB_SECRET,
    });
    response.cookie('jwt', result, { httpOnly: true });
    return {
      msg: `${user.email} Sucessfully Logged in`,
    };
  }

  async updateContact(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<Contact | Object> {
    const user = await this.userRepository.findOne({ where: { id: id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = Object.assign(user, updateUserDto);
    updatedUser.password = await this.hashPassword(user.password);
    await this.userRepository.save(updatedUser);

    return { message: 'Contact updated' };
  }
}
