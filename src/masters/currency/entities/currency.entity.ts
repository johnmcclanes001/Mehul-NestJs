import { Account } from "src/accounting/masters/accounts/entities/account.entity";
import { Country } from "src/masters/geo/country/entities/country.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Currency {
    @PrimaryGeneratedColumn()
    id :number

    @Column()
    name : string

    @Column({type:"varchar", length:10})
    code : string

    @Column({type:"varchar", length:3, charset: "utf8"})
    symbole : string

    @Column()
    country_id : number

    @ManyToOne(type => Country, country => country.id)
    @JoinColumn({name:"country_id"})
    country:Country

    @OneToMany(() => Account, account => account.currency_id)
    account: Account[];

    constructor(currency : Partial<Currency>){
        Object.assign(this, currency);
    }
}
