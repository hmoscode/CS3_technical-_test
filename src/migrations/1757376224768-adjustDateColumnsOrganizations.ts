import { MigrationInterface, QueryRunner } from "typeorm";

export class AdjustDateColumnsOrganizations1757376224768 implements MigrationInterface {
    name = 'AdjustDateColumnsOrganizations1757376224768'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`organization\` CHANGE \`createdAt\` \`createdAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`organization\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`organization\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`organization\` CHANGE \`deletedAt\` \`deletedAt\` datetime(0) NULL`);
        await queryRunner.query(`ALTER TABLE \`organization\` CHANGE \`updatedAt\` \`updatedAt\` datetime(0) NULL`);
        await queryRunner.query(`ALTER TABLE \`organization\` CHANGE \`createdAt\` \`createdAt\` datetime(0) NULL`);
    }

}
