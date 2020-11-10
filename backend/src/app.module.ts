import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SteamAccountModule } from './steam-account/steam-account.module';
import { ScheduleModule } from '@nestjs/schedule'
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${process.env.MONGO_HOST ?? "localhost" }:${process.env.MONGO_PORT ?? "27017"}/steamBansMonitor`, { useNewUrlParser: true }),
    SteamAccountModule,
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../frontend', 'dist'),
    }),
  ],

})
export class AppModule { }
