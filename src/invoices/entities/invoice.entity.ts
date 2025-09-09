import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CustomerEntity } from "../../customers/entities/customer.entity";
import { InvoiceDetailEntity } from "./invoice-detail.entity";

@Entity("invoices")
export class InvoiceEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column({ type: "varchar", length: 150 })
  invoiceNumber: string;

  @Column({ type: "bigint" })
  customerId: number;

  @Column({ type: "decimal", precision: 10, scale: 3 })
  totalAmount: number;

  @CreateDateColumn({
    type: "timestamp",
    nullable: true,
  })
  createdAt?: Date;

  @CreateDateColumn({
    type: "timestamp",
    nullable: true,
  })
  updatedAt?: Date;

  @CreateDateColumn({
    type: "timestamp",
    nullable: true,
  })
  deletedAt?: Date;

  @ManyToOne(() => CustomerEntity, (customer) => customer.invoices)
  @JoinColumn({ name: "customerId" })
  customer: CustomerEntity;

  @OneToMany(() => InvoiceDetailEntity, (detail) => detail.invoice)
  details?: InvoiceDetailEntity[];
}
