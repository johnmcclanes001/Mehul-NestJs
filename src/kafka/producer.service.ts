import { Injectable, OnApplicationShutdown, OnModuleInit } from "@nestjs/common";
import { Kafka, Partitioners, ProducerRecord } from "kafkajs";

@Injectable()
export class KafkaProducerService  {
    private readonly kafka = new Kafka({
        brokers : ['localhost:9092']
    })

    private readonly producer = this.kafka.producer({createPartitioner: Partitioners.DefaultPartitioner});

    async produce (record : ProducerRecord){
        await this.producer.connect();
        await this.producer.send(record);
        await this.producer.disconnect()
    }

}