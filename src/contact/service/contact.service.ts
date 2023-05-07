import {
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from '../entities/contact';
import { Repository } from 'typeorm';

import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}


  // get user by Id
  async getUser(id: number) {
    const user = await this.contactRepository.findOne({ where: { id: id } });
    return user;
  }

  // get all contact  (pagination)
  async getAllContact(
    options: IPaginationOptions,
  ): Promise<Pagination<Contact>> {
    return await paginate<Contact>(this.contactRepository, options);
  }

  // add contact
  async addContact(contact) {
    return await this.contactRepository.save(contact);
  }
}
