import { Test, TestingModule } from '@nestjs/testing';
import { SteamAccountController } from './steam-account.controller';

describe('SteamAccount Controller', () => {
  let controller: SteamAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SteamAccountController],
    }).compile();

    controller = module.get<SteamAccountController>(SteamAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
