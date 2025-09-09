import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ArticlesEntity } from "../../articles/entities/article.entity";
import { InvoiceEntity } from "./invoice.entity";

@Entity("invoice_details")
export class InvoiceDetailEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id?: number;

  @Column({ type: "bigint" })
  invoiceId: number;

  @Column({ type: "bigint" })
  articleId: number;

  @Column({ type: "int" })
  quantity: number;

  @Column({ type: "decimal", precision: 10, scale: 3 })
  unitPrice: number;

  @Column({ type: "decimal", precision: 10, scale: 3 })
  totalPrice: number;

  @Column({ type: "decimal", precision: 10, scale: 3, nullable: true })
  priceWithWholesale?: number;

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

  @ManyToOne(() => InvoiceEntity, (invoice) => invoice.details)
  @JoinColumn({ name: "invoiceId" })
  invoice?: InvoiceEntity;

  @ManyToOne(() => ArticlesEntity, (articles) => articles.invoiceDetails)
  @JoinColumn({ name: "articleId" })
  article?: ArticlesEntity;
}
