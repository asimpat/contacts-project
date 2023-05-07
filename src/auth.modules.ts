import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/contact/service/auth.service';
import { Contact } from './contact/entities/contact';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './contact/controller/auth.controller';
import { ContactService } from './contact/service/contact.service';
import { User } from './contact/entities/user.entity';


@Module({
  imports:[TypeOrmModule.forFeature([Contact, User]),
   JwtModule.register({
    secret:process.env.DB_SECRET,
    signOptions:{expiresIn:'1d'}
  }),
  
],
  providers: [AuthService, ContactService],
  controllers:[AuthController]
  
})
export class AuthModule {}
 