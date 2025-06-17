import { MigrationInterface, QueryRunner } from "typeorm";

export class removeUnnecessaryExchangeRateFields1750109454728 implements MigrationInterface {
    name = 'removeUnnecessaryExchangeRateFields1750109454728'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exchange_rate" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "exchange_rate" DROP COLUMN "value"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exchange_rate" ADD "value" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "exchange_rate" ADD "name" character varying(255) NOT NULL`);
    }

}
