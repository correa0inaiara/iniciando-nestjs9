import { Test, TestingModule } from '@nestjs/testing';
import { BankAccountSchema } from 'src/@core/infra/db/bank-account.schema';
import { BankAccountsController } from './bank-accounts.controller';
import { BankAccountsService } from './bank-accounts.service';

describe('BankAccountsController', () => {
  let controller: BankAccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [BankAccountSchema],
      controllers: [BankAccountsController],
      providers: [BankAccountsService],
    }).compile();

    controller = module.get<BankAccountsController>(BankAccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
