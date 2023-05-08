import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ContactService } from '../service/contact.service';
import { Contact } from '../entities/contact';
import { Pagination } from 'nestjs-typeorm-paginate';
import { AddContactDto } from '../dto/addContact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  // get user by Id
  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    return await this.contactService.getUser(id);
  }

  // get all contact
  @Get('all')
  async getAllContact(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<Contact>> {
    limit = limit > 100 ? 100 : limit;
    return await this.contactService.getAllContact({ page, limit });
  }

  // add contact
  @Post('add')
  async addContact(@Body() contact:AddContactDto) {
    return await this.contactService.addContact(contact);
  }
}
