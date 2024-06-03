import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ChartOfAccount } from "../../chart_of_accounts/entities/chart_of_account.entity";
import { Currency } from "src/masters/currency/entities/currency.entity";

export enum Type {
    GL = "GL",
    Bank = "Bank",
    Cash = "Cash",
    Vendor = "Vendor",
    Customer = "Customer",
}
export enum BalanceSide{
    CR = "CR",
    DR = "DR",
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

    @ManyToOne(type => ChartOfAccount, coa => coa.id, {nullable:false})
    @JoinColumn({name:"coa_id"})
    chartOfAccount : ChartOfAccount;

    @Column()
    currency_id : number

    @ManyToOne(type => Currency, currency => currency.id, {nullable:false})
    @JoinColumn({name:"currency_id"})
    currency : ChartOfAccount;
    

    @Column({type: "double", precision : 18, scale: 8, default:0})
    balance: number

    @Column({type:"enum", enum:BalanceSide})
    balance_side : BalanceSide

    constructor(account : Partial<Account>){
        Object.assign(this,account);
    }
}
