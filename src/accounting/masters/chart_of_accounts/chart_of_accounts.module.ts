import { Module } from '@nestjs/common';
import { ChartOfAccountsService } from './chart_of_accounts.service';
import { ChartOfAccountsController } from './chart_of_accounts.controller';
import { ChartOfAccount } from './entities/chart_of_account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports : [TypeOrmModule.forFeature([ChartOfAccount])],
  controllers: [ChartOfAccountsController],
  providers: [ChartOfAccountsService],
})
export class ChartOfAccountsModule {}

//https://www.netsuite.com/portal/resource/articles/accounting/chart-of-accounts.shtml