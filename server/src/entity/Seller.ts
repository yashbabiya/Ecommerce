import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { CartItem } from "./CartItem";
import { Order } from "./Order";
import { Product } from "./Product";

@Entity ({name:'sellers'})
export class Seller extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    _id:string;

    @Column({unique:true})
    name:string

    @Column()
    password:string

    @Column({unique:true})
    email:string

    @OneToMany(()=>Product,product=>product.seller)
    products:Product[];

    

}