import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.production'],
    }),
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
