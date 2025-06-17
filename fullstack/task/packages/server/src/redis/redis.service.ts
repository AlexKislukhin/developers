import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
    private client: Redis;

    constructor() {
        this.client = new Redis();
    }

    async keyExists(key: string) {
        const lockKey = `lock:${key}`;

        return (await this.client.exists(lockKey)) === 1;
    }

    async acquireLock(key: string, ttl = 10000): Promise<boolean> {
        const lockKey = `lock:${key}`;
        return (await this.client.set(lockKey, 'locked', 'PX', ttl, 'NX')) === 'OK';
    }

    async releaseLock(key: string): Promise<void> {
        const lockKey = `lock:${key}`;
        await this.client.del(lockKey);
    }
}
