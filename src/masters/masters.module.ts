import { Module } from '@nestjs/common';
import { CurrencyModule } from './currency/currency.module';
import { GeoModule } from './geo/geo.module';

@Module({
    imports:[CurrencyModule, GeoModule]
})
export class MastersModule {}
