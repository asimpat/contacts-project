import { Module } from '@nestjs/common';
import { ContactService } from './service/contact.service';
import { ContactController } from './controller/contact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact';

@Module({
  imports:[TypeOrmModule.forFeature([Contact])],
  providers: [ContactService],
  controllers: [ContactController]
})
export class ContactModule {}
