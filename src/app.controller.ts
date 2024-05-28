import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { KafkaProducerService } from './kafka/producer.service';
import { CompressionTypes } from 'kafkajs';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly kafkaProducer : KafkaProducerService
  ) {}

  @Get()
  async getHello(@Query() query:any) {
    /* await this.kafkaProducer.produce({
      topic : '10-partitions',
      compression: CompressionTypes.GZIP,
      messages : [{key: '2', value : query.msg, partition : Math.round(query.partition/10)}] // own logic to select partition

    }) */

    await this.kafkaProducer.produce({
      topic : '10-partitions',
      compression: CompressionTypes.GZIP,
      messages : [{key: query.partition, value : query.msg}] // key based parition selection by system

    })
    return this.appService.getHello();
  }
}
