import { Module } from '@nestjs/common';
import {ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports : [
        TypeOrmModule.forRootAsync({
            useFactory : (configService : ConfigService) => (
                {
                    type : 'mysql',
                    host : configService.getOrThrow('DB_HOST'),
                    port : configService.getOrThrow('DB_PORT'),
                    database : configService.getOrThrow('DB_NAME'),
                    username : configService.getOrThrow('DB_USER'),
                    password : configService.getOrThrow('DB_PASS'),
                    autoLoadEntities : true,
                    synchronize : configService.getOrThrow('DB_AUTO_MIGRATE'),
                    logging: JSON.parse(configService.get('DB_LOGGING')) || ["query", "error"],
                }
            ),
            inject:[ConfigService],
        }),
        
    ]
})
export class DatabaseModule {}
