import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { CartItem } from "./CartItem";
import { Seller } from "./Seller";
import { User } from "./User";

@Entity ({name:'products'})
export class Product extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    _id:string;

    @Column()
    name:string

    @Column()
    image:string

    @Column()
    price:number

    @Column()
    description:string

    @OneToMany(()=>CartItem,cartItem=>cartItem.product,{
        cascade: true,
    })
    cartItems:CartItem[]

    

    @ManyToOne(()=>Seller,seller=>seller.products,{
        cascade: true,
    })
    @JoinColumn({name:"seller_id"})
    seller:Seller

    

    // @Column("text",{ array: true })
    // image:string[]


}