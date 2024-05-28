import {  IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

enum status {
    Active = "Active",
    Inactive = "Inactive"
}
export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsEnum(["Active","Inactive"],{message : "Invalid Status"})
    status:status

    @IsNumber()
    @IsOptional()
    parent_id:number;
}
