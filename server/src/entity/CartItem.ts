import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Item } from "./base/Item";




@Entity ({name:'cartItem'})
export class CartItem extends Item{
    @CreateDateColumn()
    added_at:Date;

    @UpdateDateColumn()
    updated_at:Date;

    
}