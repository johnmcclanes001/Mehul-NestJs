import { Injectable, OnApplicationShutdown } from "@nestjs/common";
import { Kafka, Consumer, ConsumerSubscribeTopics, ConsumerRunConfig } from "kafkajs";

@Injectable()
export class KafkaConsumerService implements OnApplicationShutdown{
    
    private readonly kafka =  new Kafka({
        brokers:['localhost:9092']
    })
    
    private consumers : Consumer[] = [];
    
    async consume(topic:ConsumerSubscribeTopics, config : ConsumerRunConfig){
        const consumer = this.kafka.consumer({groupId:"nest_project"});
        consumer.connect();
        consumer.subscribe(topic);
        consumer.run(config);
        this.consumers.push(consumer);
    }

    async onApplicationShutdown() {
        for(const consumer of this.consumers){
            await consumer.disconnect()
        }
    }
}