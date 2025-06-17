import { Field, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString, MinLength } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { EntityWithMeta } from '../common';
import { VAR_CHAR } from './constants';

@ObjectType()
@Entity()
export class ExchangeRate extends EntityWithMeta {
    @IsString()
    @MinLength(1)
    @Field(() => String)
    @Column({ ...VAR_CHAR })
    public country!: string;

    @IsString()
    @MinLength(1)
    @Field(() => String)
    @Column({ ...VAR_CHAR })
    public currency!: string;

    @IsString()
    @MinLength(1)
    @Field(() => String)
    @Column({ ...VAR_CHAR })
    public currencyCode!: string;

    @IsNumber()
    @Field(() => Number)
    @Column({ type: 'real' })
    public rate!: number;
}
