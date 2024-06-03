import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { BalanceSide, Type } from "../entities/account.entity";

export class CreateAccountDto {
    @IsString()
    name : string

    @IsEnum(Type)
    type : Type

    @IsNumber()
    coa_id : number

    @IsOptional()
    @IsNumber()
    balance :number

    @IsOptional()
    @IsEnum(BalanceSide)
    balance_side :BalanceSide
}