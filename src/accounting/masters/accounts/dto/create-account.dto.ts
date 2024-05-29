import { IsEnum, IsNumber, IsString } from "class-validator";
import { Type } from "../entities/account.entity";

export class CreateAccountDto {
    @IsString()
    name : string

    @IsEnum(Type)
    type : Type

    @IsNumber()
    coa_id : number
}