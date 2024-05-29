import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { ChartOfAccountsService } from '../chart_of_accounts/chart_of_accounts.service';
import { ChartOfAccount } from '../chart_of_accounts/entities/chart_of_account.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Account,ChartOfAccount])],
  controllers: [AccountsController],
  providers: [AccountsService, ChartOfAccountsService],
})
export class AccountsModule {}
