import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1757450702843 implements MigrationInterface {
    name = 'Init1757450702843'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`invoice_details\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`invoiceId\` bigint NOT NULL, \`articleId\` bigint NOT NULL, \`quantity\` int NOT NULL, \`unitPrice\` decimal(10,3) NOT NULL, \`totalAmount\` decimal(10,3) NOT NULL, \`priceWithWholesale\` decimal(10,3) NULL, \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`invoices\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`invoiceNumber\` varchar(150) NOT NULL, \`customerId\` bigint NOT NULL, \`totalAmount\` decimal(10,3) NOT NULL, \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`invoice_details\` ADD CONSTRAINT \`FK_80012c2aa664b6ea3d182f3e18f\` FOREIGN KEY (\`invoiceId\`) REFERENCES \`invoices\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`invoice_details\` ADD CONSTRAINT \`FK_2119fee7c44bdba0299cd6df55e\` FOREIGN KEY (\`articleId\`) REFERENCES \`articles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`invoices\` ADD CONSTRAINT \`FK_1df049f8943c6be0c1115541efb\` FOREIGN KEY (\`customerId\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`invoices\` DROP FOREIGN KEY \`FK_1df049f8943c6be0c1115541efb\``);
        await queryRunner.query(`ALTER TABLE \`invoice_details\` DROP FOREIGN KEY \`FK_2119fee7c44bdba0299cd6df55e\``);
        await queryRunner.query(`ALTER TABLE \`invoice_details\` DROP FOREIGN KEY \`FK_80012c2aa664b6ea3d182f3e18f\``);
        await queryRunner.query(`DROP TABLE \`invoices\``);
        await queryRunner.query(`DROP TABLE \`invoice_details\``);
    }

}
