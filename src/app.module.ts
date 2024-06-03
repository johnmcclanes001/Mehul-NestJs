import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ItemsModule } from './items/items.module';
import { CategoriesModule } from './categories/categories.module';
import { KafkaModule } from './kafka/kafka.module';
import { TestConsumer } from './kafka/consumers/test.consumer';
import { AccountingMastersModule } from './accounting/masters/accounting_masters.module';
import { MastersModule } from './masters/masters.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}), DatabaseModule, MastersModule, AccountingMastersModule,UsersModule, ItemsModule, CategoriesModule, KafkaModule],
  controllers: [AppController],
  providers: [AppService,/* TestConsumer */],
})
export class AppModule {}
