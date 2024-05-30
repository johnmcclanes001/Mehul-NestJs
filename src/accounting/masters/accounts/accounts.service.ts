import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';
import { ChartOfAccountsService } from '../chart_of_accounts/chart_of_accounts.service';

/**
 *  Validation : Account can only be created at the last level of chart of accounts
 *  Generate Code based on chart of account code and max account code + 1
 */

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly repository: Repository<Account>,
    private readonly coaSevice: ChartOfAccountsService,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    const newCode = await this.generateAccountCode(createAccountDto.coa_id);
    if (newCode.code === 0) {
      return newCode.msg;
    }
    createAccountDto['code'] = newCode.code;
    return await this.repository.insert(new Account(createAccountDto));
  }

  async findAll() {
    return await this.repository
      .createQueryBuilder('a')
      .select('a.*,c.name as coa_name, c.category as category, c.type as type')
      .innerJoin('chart_of_account', 'c', 'a.coa_id = c.id')
      .getRawMany();
  }

  async findOne(id: number) {
    return await this.repository
      .createQueryBuilder('a')
      .select('a.*,c.name as coa_name, c.category as category, c.type as type')
      .innerJoin('chart_of_account', 'c', 'a.coa_id = c.id')
      .where({ id: id })
      .getRawOne();
    return `This action returns a #${id} account`;
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    const existingDetails = await this.findOne(id);
    if (existingDetails) {
      if (existingDetails.coa_id !== updateAccountDto.coa_id) {
        const newCode = await this.generateAccountCode(updateAccountDto.coa_id);
        if (newCode.code === 0) {
          return newCode.msg;
        }
        updateAccountDto['code'] = newCode.code;
      }
      await this.repository.update({id:id},new Account(updateAccountDto));
      return this.findOne(id);
    }
    else{
      return `Record not found.`;
    }
    
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }

  async generateAccountCode(coaId: number) {
    const coaDetails = await this.coaSevice.findOne(coaId);
    if (coaDetails) {
      let code: string = '';
      const lastCode = await this.repository.findOne({
        where: { coa_id: coaId },
        order: { code: 'DESC' },
      });
      if (lastCode) {
        code = '' + ++lastCode.code;
      } else {
        code = coaDetails.code + '' + 1;
      }
      console.log(code);
      return { code: parseInt(code), msg: '' };
    } else {
      return { code: 0, msg: 'Coa details not found.' };
    }
  }
}
