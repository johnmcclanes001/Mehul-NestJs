import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ItemsModule } from './items/items.module';
import { CategoriesModule } from './categories/categories.module';
import { ChartOfAccountsModule } from './accounting/masters/chart_of_accounts/chart_of_accounts.module';
import { KafkaModule } from './kafka/kafka.module';
import { TestConsumer } from './kafka/consumers/test.consumer';
import { AccountsModule } from './accounting/masters/accounts/accounts.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}), DatabaseModule,UsersModule, ItemsModule, CategoriesModule, ChartOfAccountsModule, KafkaModule, AccountsModule],
  controllers: [AppController],
  providers: [AppService,/* TestConsumer */],
})
export class AppModule {}
