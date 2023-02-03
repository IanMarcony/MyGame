import { MigrationInterface, QueryRunner } from "typeorm";

export class network1675401273407 implements MigrationInterface {
    name = 'network1675401273407'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`friend_requests\` (\`id\` int NOT NULL AUTO_INCREMENT, \`id_user_requester\` int NOT NULL, \`id_user_required\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`friend_requests\` ADD CONSTRAINT \`FK_49f2e8bc286244461c0b40d65e0\` FOREIGN KEY (\`id_user_requester\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`friend_requests\` ADD CONSTRAINT \`FK_2ebccb925b415db4fa1e9aea84c\` FOREIGN KEY (\`id_user_required\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`friend_requests\` DROP FOREIGN KEY \`FK_2ebccb925b415db4fa1e9aea84c\``);
        await queryRunner.query(`ALTER TABLE \`friend_requests\` DROP FOREIGN KEY \`FK_49f2e8bc286244461c0b40d65e0\``);
        await queryRunner.query(`DROP TABLE \`friend_requests\``);
    }

}
