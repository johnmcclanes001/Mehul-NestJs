import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


export enum status{
    Active = "Active",
    Inactive = "Inactive",
}

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name : string;

    @Column({default:true})
    public:boolean;

    @Column({type:'enum', enum: status, default: status.Active})
    status : status;

    constructor(item : Partial<Item>){
        Object.assign(this,item);
    }
}
