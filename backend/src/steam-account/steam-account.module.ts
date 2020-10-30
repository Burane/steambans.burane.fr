import { Module } from '@nestjs/common';
import { SteamAccountService } from './steam-account.service';
import { SteamAccountController } from './steam-account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SteamAccountSchema } from './schemas/steam-account.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'SteamAccount', schema: SteamAccountSchema }])
  ],
  providers: [SteamAccountService],
  controllers: [SteamAccountController]
})
export class SteamAccountModule {}
