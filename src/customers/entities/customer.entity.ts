/** biome-ignore-all lint/style/useNamingConvention: <> */

import { InvoiceEntity } from "@invoices/entities/invoice.entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export enum DocumentTypeEnum {
  CC = "CC",
  NIT = "NIT",
  CE = "CE",
}

@Entity("customers")
export class CustomerEntity {
  @PrimaryGeneratedColumn({
    type: "bigint",
  })
  id: number;

  @Column({ type: "varchar", length: 200, nullable: false })
  name: string;

  @Column({
    type: "enum",
    enum: DocumentTypeEnum,
    nullable: false,
    unique: true,
  })
  documentType: DocumentTypeEnum;

  @Column({ type: "varchar", length: 40, nullable: false })
  documentNumber: string;

  @Column({ type: "varchar", length: 400, nullable: false })
  address: string;

  @CreateDateColumn({ type: "datetime", nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ type: "datetime", nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ type: "datetime", nullable: true })
  deletedAt?: Date;

  @OneToMany(() => InvoiceEntity, (invoice) => invoice.customer)
  invoices?: InvoiceEntity[];
}
