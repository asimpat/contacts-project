import { IsEmail, IsString, Matches } from 'class-validator';
import { MESSAGE, REGEX } from '../utils/user.utils';

export class UpdateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  fullName: string;

  @IsString()
  @Matches(REGEX.PASSWORD_RULE, {
    message:MESSAGE.PASSWORD_MESSAGE
})
  password: string;
}
