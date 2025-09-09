import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("organization")
export class OrganizationEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column({ type: "varchar", length: 200, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  email: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  phone: string;

  @Column({ type: "varchar", length: 40, nullable: false })
  documentNumber: string;

  @Column({ type: "varchar", length: 400, nullable: false })
  address: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  logoUrl: string;

  @CreateDateColumn({ type: "datetime", nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ type: "datetime", nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ type: "datetime", nullable: true })
  deletedAt?: Date;
}
