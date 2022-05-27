import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import {  CartItem } from "./CartItem";

@Entity ({name:'users'})
export class User extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    _id:string;

    @Column({unique:true})
    name:string

    @Column()
    password:string

    @Column({unique:true})
    email:string

    @Column()
    address:string

    @OneToMany(()=>CartItem,cartItem=>cartItem.user)
    cartItem:CartItem
    
}