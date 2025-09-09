import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1757375718554 implements MigrationInterface {
    name = 'Init1757375718554'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`email\` varchar(100) NOT NULL, \`password\` varchar(150) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`organization\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(200) NOT NULL, \`email\` varchar(50) NOT NULL, \`phone\` varchar(50) NOT NULL, \`documentNumber\` varchar(40) NOT NULL, \`address\` varchar(400) NOT NULL, \`logoUrl\` varchar(255) NOT NULL, \`createdAt\` datetime NULL, \`updatedAt\` datetime NULL, \`deletedAt\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`organization\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
