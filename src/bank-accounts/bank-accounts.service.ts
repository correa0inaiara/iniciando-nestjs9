import { Inject, Injectable } from '@nestjs/common';
import { getDataSourceToken, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { BankAccountSchema } from '../@core/infra/db/bank-account.schema';

@Injectable()
export class BankAccountsService {

  constructor(
    @InjectRepository(BankAccountSchema)
    private repo: Repository<BankAccountSchema>,
    @Inject(getDataSourceToken())
    private dataSource: DataSource
  ) {}

  async create(createBankAccountDto: CreateBankAccountDto) {
    const bankAccount = this.repo.create({
      account_number: createBankAccountDto.account_number,
      balance: 0,
    });

    await this.repo.insert(bankAccount);
    return bankAccount;
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOneBy({id});
  }

  update(id: string, updateBankAccountDto: UpdateBankAccountDto) {
    return `This action updates a #${id} bankAccount`;
  }

  remove(id: string) {
    return `This action removes a #${id} bankAccount`;
  }

  async transfer(from: string, to: string, amount: number) {
    // modo transação
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.startTransaction();
      const fromAccount = await this.repo.findOneBy({id: from})
      const toAccount = await this.repo.findOneBy({id: to})

      fromAccount.balance -= amount;
      toAccount.balance += amount;

      this.repo.save(fromAccount);
      this.repo.save(toAccount);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    }
    
  }
}
