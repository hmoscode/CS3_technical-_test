import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { InvoiceDetailEntity } from "../../invoices/entities/invoice-detail.entity";

@Entity("articles")
export class ArticlesEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "decimal", precision: 10, scale: 3 })
  price: number;

  @Column({ type: "varchar", length: 255, nullable: false, unique: true })
  code: string;

  @Column({ type: "int", nullable: false })
  wholesaleNumber: number;

  @Column({ type: "int", nullable: false })
  wholesalePercentage: number;

  @CreateDateColumn({
    type: "timestamp",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: "timestamp",
  })
  deletedAt: Date;

  @OneToMany(() => InvoiceDetailEntity, (detail) => detail.article)
  invoiceDetails?: InvoiceDetailEntity[];
}
