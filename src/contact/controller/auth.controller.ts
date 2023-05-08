import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserDto } from '../dto/register.dto';
import { Contact } from '../entities/contact';
import { LoginDto } from '../dto/login.Dto';
import { AuthService } from '../service/auth.service';
import { Response } from 'express';
import { UpdateUserDto } from '../dto/update.Dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // register user
  @Post('register')
  @UsePipes(ValidationPipe)
  async registerUser(@Body() user: UserDto): Promise<Contact | Object> {
    return await this.authService.registerUser(user);
  }

  // user login
  @Post('login')
  loginUser(
    @Body() user: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ): any {
    return this.authService.loginUser(user, response);
  }

  // user update Contact
  @Post(':id')
  async updateContact(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Contact | Object> {
    return this.authService.updateContact(id, updateUserDto);
  }
}
