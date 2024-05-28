import { Module } from '@nestjs/common';
import { KafkaProducerService } from './producer.service';
import { KafkaConsumerService } from './consumer.service';

@Module({
    providers:[KafkaProducerService,KafkaConsumerService],
    exports:[KafkaProducerService, KafkaConsumerService],
})
export class KafkaModule {}
