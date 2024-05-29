import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ChartOfAccount } from "../../chart_of_accounts/entities/chart_of_account.entity";

export enum Type {
    GL = "GL",
    Bank = "Bank",
    Cash = "Cash",
    Vendor = "Vendor",
    Customer = "Customer",
}

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({unique:true})
    name : string;

    @Column({type: "enum", enum:Type})
    type : Type

    @Column({nullable : true})
    code : number;

    @Column()
    coa_id : number;

    @ManyToOne(type => ChartOfAccount)
    @JoinColumn({name:"coa_id"})
    parent : ChartOfAccount;

    constructor(account : Partial<Account>){
        Object.assign(this,account);
    }

}
