import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import axios from 'axios';
import { ExchangeRate } from '../../entities';
import { RedisService } from '../../redis/redis.service';
import { sleep } from '../../utils/sleep';
import { CnbExchangeRateResponse } from './interfaces/cnb-exchange-rate-response';

const { CNB_API_URL } = process.env;

@Injectable()
export class ExchangeRateService {
    private STALE_TIME_MS = 5 * 60 * 1000;
    private LOCKING_KEY = 'PARSING_CNB_EXCHANGE_RATES';

    constructor(
        @InjectRepository(ExchangeRate) private exchangeRateRepository: Repository<ExchangeRate>,
        private redis: RedisService
    ) {}

    public getExchangeRates = async (): Promise<ExchangeRate[]> => {
        const isMakingRequest = await this.redis.keyExists(this.LOCKING_KEY);

        if (isMakingRequest) {
            await sleep(300);
            return this.getExchangeRates();
        }

        const data = await this.getNonStaleRecords();

        if (!data.length) {
            const lockSuccess = await this.redis.acquireLock(this.LOCKING_KEY);
            if (!lockSuccess) {
                // should probably add a subscription here
                await sleep(300);
                return this.getExchangeRates();
            }

            try {
                const rates = await this.fetchExchangeRates(new Date());
                await sleep(1000);

                const ratesEntities = this.exchangeRateRepository.create(rates);
                await this.exchangeRateRepository.insert(ratesEntities);

                return this.getNonStaleRecords();
            } finally {
                await this.redis.releaseLock(this.LOCKING_KEY);
            }
        }

        return data;
    };

    private fetchExchangeRates = async (date: Date): Promise<CnbExchangeRateResponse[]> => {
        if (!CNB_API_URL) {
            throw new Error('No .env variable for CNB API was provided!');
        }

        try {
            const result = await axios.get(
                `${CNB_API_URL}/exrates/daily?date=${date.toISOString().split('T')[0]}&lang=EN`
            );

            return result.data.rates;
        } catch (err) {
            console.error(err);
            return [];
        }
    };

    private getNonStaleRecords = () => {
        return this.exchangeRateRepository.find({
            where: { createdAtUtc: MoreThan(new Date(Date.now() - this.STALE_TIME_MS)) },
        });
    };
}
