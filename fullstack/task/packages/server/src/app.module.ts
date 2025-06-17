import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { graphqlConfig, typeormConfig } from './config';
import { ExchangeRateModule } from './services/exchange-rate/exchange-rate.module';
import { RedisService } from './redis/redis.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot(typeormConfig),
        GraphQLModule.forRoot(graphqlConfig),
        ExchangeRateModule,
    ],
    controllers: [],
    providers: [RedisService],
})
export class AppModule {}
