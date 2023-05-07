import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator"
import { MESSAGE, REGEX } from "../utils/user.utils"

export class UserDto{
    @IsString()
    fullName:string

    @IsString()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @Length(8, 24)
    @Matches(REGEX.PASSWORD_RULE, {
        message:MESSAGE.PASSWORD_MESSAGE
    })
    password:string

    @IsNotEmpty()
    @Length(8, 24)
    @Matches(REGEX.PASSWORD_RULE, {
        message:MESSAGE.PASSWORD_MESSAGE 
    })
    confirmPassword:string
}