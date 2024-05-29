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
    private readonly repository : Repository<Account>,
    private readonly coaSevice : ChartOfAccountsService
  ){}

  async create(createAccountDto: CreateAccountDto) {
    const newCode = await this.generateAccountCode(createAccountDto.coa_id);
    if(newCode.code === 0){
      return newCode.msg;  
    }
    createAccountDto['code'] = newCode.code;
    return await this.repository.insert(new Account(createAccountDto));
    return 'This action adds a new account';
  }

  findAll() {
    return `This action returns all accounts`;
  }

  async findOne(id: number) {
    return await this.coaSevice.findOne(id)
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }

  async generateAccountCode(coaId: number){
    const coaDetails = await this.coaSevice.findOne(coaId);
    if(coaDetails){
      let code: string = "";
      const lastCode = await this.repository.findOne({where : {coa_id:coaId},order:{code:'DESC'}})
      if(lastCode){
        code = coaDetails.code + "" + (lastCode.code + 1)
      }else{
        code = coaDetails.code + "" + 1;
      }
      console.log(code);
      return {code: parseInt(code), msg:""}
    }else{
      return {code: 0, msg:"Coa details not found."}
    }
  }
}
