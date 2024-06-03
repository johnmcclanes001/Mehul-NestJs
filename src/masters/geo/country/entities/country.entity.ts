import { Currency } from "src/masters/currency/entities/currency.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Country {

    @PrimaryGeneratedColumn()
    id : number

    @Column()
    name : string

    @Column({type : "varchar", length : 3})
    code : string

    @Column({type: "int", width : 3, unsigned: true})
    mobile_code : number

    @OneToMany(() => Currency,currency => currency.country_id)
    currency: Currency[]
    
    constructor(country : Partial<Country>){
        Object.assign(this,country)
    }
}
