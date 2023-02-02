import { MigrationInterface, QueryRunner } from 'typeorm';

export class network1675298441949 implements MigrationInterface {
  name = 'network1675298441949';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`preferences\` (\`id\` int NOT NULL AUTO_INCREMENT, \`id_category_game\` int NOT NULL, \`id_user\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`REL_46bea78964803c157fecfa968b\` (\`id_category_game\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`preferences\` ADD CONSTRAINT \`FK_88da2a4d7b055d8cf30e48b396f\` FOREIGN KEY (\`id_user\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`preferences\` ADD CONSTRAINT \`FK_46bea78964803c157fecfa968ba\` FOREIGN KEY (\`id_category_game\`) REFERENCES \`categories_games\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`categories_game_users\` DROP FOREIGN KEY \`FK_a3b740802fd3fb6270330a2b608\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`categories_game_users\` DROP FOREIGN KEY \`FK_2c976e5dbb4976f8bfe43140d6d\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_a3b740802fd3fb6270330a2b60\` ON \`categories_game_users\``,
    );
    await queryRunner.query(`DROP TABLE \`categories_game_users\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`preferences\` DROP FOREIGN KEY \`FK_46bea78964803c157fecfa968ba\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`preferences\` DROP FOREIGN KEY \`FK_88da2a4d7b055d8cf30e48b396f\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_46bea78964803c157fecfa968b\` ON \`preferences\``,
    );
    await queryRunner.query(`DROP TABLE \`preferences\``);
  }
}

