import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export enum Type {
    Assets      = "Assets",
    Liabilities = "Liabilities",
    Equity      = "Equity",
    Revenue     = "Revenue",
    Expenses    = "Expenses",
}

export enum Category {
    BalanceSheet    = "BalanceSheet",
    PNL             = "PNL",
}


export class CreateChartOfAccountDto {
    @IsString()
    name:string

    @IsEnum(["Assets","Liabilities","Equity","Revenue","Expenses"])
    type:Type

    @IsEnum(["BalanceSheet","PNL"])
    category:Category


    @IsOptional()
    @IsNumber()
    prefix:string;

    @IsOptional()
    @IsNumber()
    code:number;

    @IsOptional()
    @IsNumber()
    parent_id:number;

    @IsOptional()
    @IsNumber()
    parent_code:number;
}
