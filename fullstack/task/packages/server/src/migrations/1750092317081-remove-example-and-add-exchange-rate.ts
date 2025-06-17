import { MigrationInterface, QueryRunner } from "typeorm";

export class removeExampleAndAddExchangeRate1750092317081 implements MigrationInterface {
    name = 'removeExampleAndAddExchangeRate1750092317081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "exchange_rate" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAtUtc" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAtUtc" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleteDateUtc" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL, "name" character varying(255) NOT NULL, "value" character varying(255) NOT NULL, "country" character varying(255) NOT NULL, "currency" character varying(255) NOT NULL, "currencyCode" character varying(255) NOT NULL, "rate" real NOT NULL, CONSTRAINT "PK_5c5d27d2b900ef6cdeef0398472" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "exchange_rate"`);
    }

}
