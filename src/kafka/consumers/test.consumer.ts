import { Injectable, OnModuleInit } from "@nestjs/common";
import { KafkaConsumerService } from "../consumer.service";

@Injectable()
export class TestConsumer implements OnModuleInit{
    constructor(
        private readonly consumerService: KafkaConsumerService
    ){}

    async onModuleInit() {
        console.log("test-topic has ran.")
        const partitions = [
            { partition: 0, offset: '30' },
            { partition: 1, offset: '8' },
          ]
        await this.consumerService.consume(
            {topics:['10-partitions'],fromBeginning : true},
            {
                eachMessage : async ({topic, partition, message}) => {
                    console.log({
                        topic : topic.toString(),
                        message : message.value.toString(),
                        partition : partition.toString(),
                    })
                }
            }
        )    
    }
}