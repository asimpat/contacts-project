import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ContactModule } from './contact/contact.module';
import { typeOrmConfig } from './contact/config/typeOrm.config';
import { AuthModule } from './auth.modules';



@Module({
  imports: [   ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => typeOrmConfig,
    }),  
   ContactModule,
   AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
