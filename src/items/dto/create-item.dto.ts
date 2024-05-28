import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";


export enum status{
    Active = "Active",
    Inactive = "Inactive",
}

export class CreateItemDto {

    @IsNotEmpty()
    @IsString()
    name : string;
    
    @IsBoolean()
    public:boolean;

    @IsEnum(["Active","Inactive"],{message : "Invalid Status"})
    status : status;
}
