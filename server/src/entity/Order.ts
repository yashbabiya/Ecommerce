import { CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { Item } from "./base/Item";

@Entity({ name: 'orders' })
export class Order extends Item {
  @CreateDateColumn()
  orderd_at: Date;
}
