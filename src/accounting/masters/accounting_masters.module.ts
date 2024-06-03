import { Module } from '@nestjs/common';
import { ChartOfAccountsModule } from './chart_of_accounts/chart_of_accounts.module';
import { AccountsModule } from './accounts/accounts.module';

@Module({
    imports : [ChartOfAccountsModule,AccountsModule]
})
export class AccountingMastersModule {}
