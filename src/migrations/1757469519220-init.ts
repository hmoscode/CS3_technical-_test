import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1757469519220 implements MigrationInterface {
    name = 'Init1757469519220'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`email\` varchar(100) NOT NULL, \`password\` varchar(150) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`organization\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(200) NOT NULL, \`email\` varchar(50) NOT NULL, \`phone\` varchar(50) NOT NULL, \`documentNumber\` varchar(40) NOT NULL, \`address\` varchar(400) NOT NULL, \`logoUrl\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`customers\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(200) NOT NULL, \`documentType\` enum ('CC', 'NIT', 'CE') NOT NULL, \`documentNumber\` varchar(40) NOT NULL, \`address\` varchar(400) NOT NULL, \`createdAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, UNIQUE INDEX \`IDX_839d23de3e691521cd13fcf5d5\` (\`documentType\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`invoices\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`invoiceNumber\` varchar(150) NOT NULL, \`customerId\` bigint NOT NULL, \`totalAmount\` decimal(10,3) NOT NULL, \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`invoice_details\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`invoiceId\` bigint NOT NULL, \`articleId\` bigint NOT NULL, \`quantity\` int NOT NULL, \`unitPrice\` decimal(10,3) NOT NULL, \`totalAmount\` decimal(10,3) NOT NULL, \`priceWithWholesale\` decimal(10,3) NULL, \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`articles\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`price\` decimal(10,3) NOT NULL, \`code\` varchar(255) NOT NULL, \`wholesaleNumber\` int NOT NULL, \`wholesalePercentage\` int NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, UNIQUE INDEX \`IDX_fad4aa1ac23fa62b93c2320b80\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`invoices\` ADD CONSTRAINT \`FK_1df049f8943c6be0c1115541efb\` FOREIGN KEY (\`customerId\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`invoice_details\` ADD CONSTRAINT \`FK_80012c2aa664b6ea3d182f3e18f\` FOREIGN KEY (\`invoiceId\`) REFERENCES \`invoices\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`invoice_details\` ADD CONSTRAINT \`FK_2119fee7c44bdba0299cd6df55e\` FOREIGN KEY (\`articleId\`) REFERENCES \`articles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`invoice_details\` DROP FOREIGN KEY \`FK_2119fee7c44bdba0299cd6df55e\``);
        await queryRunner.query(`ALTER TABLE \`invoice_details\` DROP FOREIGN KEY \`FK_80012c2aa664b6ea3d182f3e18f\``);
        await queryRunner.query(`ALTER TABLE \`invoices\` DROP FOREIGN KEY \`FK_1df049f8943c6be0c1115541efb\``);
        await queryRunner.query(`DROP INDEX \`IDX_fad4aa1ac23fa62b93c2320b80\` ON \`articles\``);
        await queryRunner.query(`DROP TABLE \`articles\``);
        await queryRunner.query(`DROP TABLE \`invoice_details\``);
        await queryRunner.query(`DROP TABLE \`invoices\``);
        await queryRunner.query(`DROP INDEX \`IDX_839d23de3e691521cd13fcf5d5\` ON \`customers\``);
        await queryRunner.query(`DROP TABLE \`customers\``);
        await queryRunner.query(`DROP TABLE \`organization\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
