import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

enum status {
    Active = "Active",
    Inactive = "Inactive"
}

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id:number
    
    @Column()
    name:string;
    
    @Column({type:'enum', enum:status, default:status.Active})
    status:status

    @Column({nullable:true})
    parent_id:number;

    @ManyToOne(type => Category, {nullable:true})
    @JoinColumn({name:"parent_id"})
    parent:Category
    
    
    constructor(category : Partial<Category>){
        Object.assign(this,category);
    }
}
