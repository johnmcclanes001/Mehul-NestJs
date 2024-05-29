import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
//https://www.netsuite.com/portal/resource/articles/accounting/chart-of-accounts.shtml
enum Type {
    Assets      = "Assets",
    Liabilities = "Liabilities",
    Equity      = "Equity",
    Revenue     = "Revenue",
    Expenses    = "Expenses",
}

enum Category {
    BalanceSheet    = "BalanceSheet",
    PNL             = "PNL",
}

@Entity()
export class ChartOfAccount {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column({nullable:true})
    prefix:string;

    @Column({nullable:true})
    code:number;

    @Column({type:"enum", enum:Type})
    type:Type

    @Column({type:"enum", enum:Category})
    category:Category;

    @Column({nullable:true})
    parent_code:number;

    @Column({nullable:true})
    parent_id:number

    @Column({nullable:true})
    level:number

    @ManyToOne(type => ChartOfAccount,{nullable:true})
    @JoinColumn({name:"parent_id"})
    parent:ChartOfAccount;

    constructor(coa : Partial<ChartOfAccount>){
        Object.assign(this,coa);
    }
}
