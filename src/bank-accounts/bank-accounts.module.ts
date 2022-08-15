import { Module } from '@nestjs/common';
import { BankAccountsService } from './bank-accounts.service';
import { BankAccountsController } from './bank-accounts.controller';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { BankAccountSchema } from '../@core/infra/db/bank-account.schema';
import { BankAccountService } from 'src/@core/domain/bank-account.service';
import { DataSource } from 'typeorm';
import { BankAccountTypeOrmRepository } from 'src/@core/infra/db/bank-account-typeorm.repository';
import { BankAccountRepository } from 'src/@core/domain/bank-account.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([BankAccountSchema])
  ],
  controllers: [BankAccountsController],
  providers: [
    BankAccountsService,
    {
      provide: BankAccountTypeOrmRepository,
      useFactory: (datasource: DataSource) => {
        return new BankAccountTypeOrmRepository(datasource.getRepository(BankAccountSchema))
      },
      inject: [getDataSourceToken()]
    },
    {
      provide: BankAccountService,
      useFactory: (repo: BankAccountRepository) => {
        return new BankAccountService(repo)
      },
      inject: [BankAccountTypeOrmRepository]
    }
  ]
})
export class BankAccountsModule {}
