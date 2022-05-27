
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../Product";
import { Seller } from "../Seller";
import { User } from "../User";



export abstract class Item extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    _id:string;

    @ManyToOne(()=>User,user=>user.cartItem,{onDelete:"CASCADE"})
    @JoinColumn({name:"user_id"})
    user:User;

    @ManyToOne(()=>Product,product=>product.cartItems,{onDelete:"CASCADE"})
    @JoinColumn({name:"product_id"})
    product:Product;

    @ManyToOne(()=>Seller,{onDelete:"CASCADE"})
    @JoinColumn({name:"seller_id"})
    seller:Seller;

    @Column({default:0})
    quantity:number
}