import { MigrationInterface, QueryRunner } from "typeorm";

export class network1676587934631 implements MigrationInterface {
    name = 'network1676587934631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`interactions_users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`id_post\` int NOT NULL, \`id_action_user\` int NOT NULL, \`id_user\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`interactions_users\` ADD CONSTRAINT \`FK_9f3c9807518049a502650462803\` FOREIGN KEY (\`id_action_user\`) REFERENCES \`actions_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`interactions_users\` ADD CONSTRAINT \`FK_e065b4232097a1913a6302173b8\` FOREIGN KEY (\`id_post\`) REFERENCES \`posts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`interactions_users\` ADD CONSTRAINT \`FK_e79a498485208f3cd01d0ac790b\` FOREIGN KEY (\`id_user\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`interactions_users\` DROP FOREIGN KEY \`FK_e79a498485208f3cd01d0ac790b\``);
        await queryRunner.query(`ALTER TABLE \`interactions_users\` DROP FOREIGN KEY \`FK_e065b4232097a1913a6302173b8\``);
        await queryRunner.query(`ALTER TABLE \`interactions_users\` DROP FOREIGN KEY \`FK_9f3c9807518049a502650462803\``);
        await queryRunner.query(`DROP TABLE \`interactions_users\``);
    }

}
