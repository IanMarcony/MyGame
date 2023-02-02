import { MigrationInterface, QueryRunner } from "typeorm";

export class network1675307165265 implements MigrationInterface {
    name = 'network1675307165265'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` text NOT NULL, \`email\` text NOT NULL, \`password\` text NOT NULL, \`birth_date\` datetime NOT NULL, \`url_profile_photo\` text NULL, \`url_banner_photo\` text NULL, \`description\` text NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`account_games\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url_icon\` text NOT NULL, \`company\` text NOT NULL, \`value_number\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`account_games_users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` text NOT NULL, \`id_account_game\` int NOT NULL, \`id_user\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`REL_8e0d15884a1acbd66d799ac12c\` (\`id_account_game\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`actions_user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` text NOT NULL, \`value\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_tokens\` (\`id\` int NOT NULL AUTO_INCREMENT, \`token\` varchar(36) NOT NULL, \`user_id\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`REL_9e144a67be49e5bba91195ef5d\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`recommended_posts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`id_user\` int NOT NULL, \`id_post\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`REL_b69dd03a3da22f70034cdf8cff\` (\`id_user\`), UNIQUE INDEX \`REL_6f486d07c66ea11bc875666d45\` (\`id_post\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`friends\` (\`usersId_1\` int NOT NULL, \`usersId_2\` int NOT NULL, INDEX \`IDX_d7b254474ac757ab77484b7eec\` (\`usersId_1\`), INDEX \`IDX_aef56c6cd3dd7e50c24d07829d\` (\`usersId_2\`), PRIMARY KEY (\`usersId_1\`, \`usersId_2\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`preferences\` ADD CONSTRAINT \`FK_88da2a4d7b055d8cf30e48b396f\` FOREIGN KEY (\`id_user\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`preferences\` ADD CONSTRAINT \`FK_46bea78964803c157fecfa968ba\` FOREIGN KEY (\`id_category_game\`) REFERENCES \`categories_games\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_2ed7cfa679e37184dcb1abac076\` FOREIGN KEY (\`id_user\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_0e1fed153da5ca43a7e8a2be5af\` FOREIGN KEY (\`id_chat\`) REFERENCES \`chats\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`chat_users\` ADD CONSTRAINT \`FK_57d9904d753898cdfab6f36d94e\` FOREIGN KEY (\`id_chat\`) REFERENCES \`chats\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`chat_users\` ADD CONSTRAINT \`FK_20f1c80e77dd30b2d3722c48749\` FOREIGN KEY (\`id_user_request\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`images\` ADD CONSTRAINT \`FK_57b7ae4dc0db10a658c58c29cc2\` FOREIGN KEY (\`id_post\`) REFERENCES \`posts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`videos\` ADD CONSTRAINT \`FK_6ad5da670755f0da63356b44cf3\` FOREIGN KEY (\`id_post\`) REFERENCES \`posts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`coments_users\` ADD CONSTRAINT \`FK_ab4cb018531fa812e631d535ea1\` FOREIGN KEY (\`id_post\`) REFERENCES \`posts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`coments_users\` ADD CONSTRAINT \`FK_e79ff90659b916ee9f9784e3f8e\` FOREIGN KEY (\`id_user\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_9bfeb0a92bb13a780774a852255\` FOREIGN KEY (\`id_user\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`account_games_users\` ADD CONSTRAINT \`FK_3575d3b7c3908de2f99f2fc7c46\` FOREIGN KEY (\`id_user\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`account_games_users\` ADD CONSTRAINT \`FK_8e0d15884a1acbd66d799ac12c4\` FOREIGN KEY (\`id_account_game\`) REFERENCES \`account_games\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` ADD CONSTRAINT \`FK_9e144a67be49e5bba91195ef5de\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recommended_posts\` ADD CONSTRAINT \`FK_b69dd03a3da22f70034cdf8cff4\` FOREIGN KEY (\`id_user\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recommended_posts\` ADD CONSTRAINT \`FK_6f486d07c66ea11bc875666d452\` FOREIGN KEY (\`id_post\`) REFERENCES \`posts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`friends\` ADD CONSTRAINT \`FK_d7b254474ac757ab77484b7eec5\` FOREIGN KEY (\`usersId_1\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`friends\` ADD CONSTRAINT \`FK_aef56c6cd3dd7e50c24d07829d3\` FOREIGN KEY (\`usersId_2\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`friends\` DROP FOREIGN KEY \`FK_aef56c6cd3dd7e50c24d07829d3\``);
        await queryRunner.query(`ALTER TABLE \`friends\` DROP FOREIGN KEY \`FK_d7b254474ac757ab77484b7eec5\``);
        await queryRunner.query(`ALTER TABLE \`recommended_posts\` DROP FOREIGN KEY \`FK_6f486d07c66ea11bc875666d452\``);
        await queryRunner.query(`ALTER TABLE \`recommended_posts\` DROP FOREIGN KEY \`FK_b69dd03a3da22f70034cdf8cff4\``);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` DROP FOREIGN KEY \`FK_9e144a67be49e5bba91195ef5de\``);
        await queryRunner.query(`ALTER TABLE \`account_games_users\` DROP FOREIGN KEY \`FK_8e0d15884a1acbd66d799ac12c4\``);
        await queryRunner.query(`ALTER TABLE \`account_games_users\` DROP FOREIGN KEY \`FK_3575d3b7c3908de2f99f2fc7c46\``);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_9bfeb0a92bb13a780774a852255\``);
        await queryRunner.query(`ALTER TABLE \`coments_users\` DROP FOREIGN KEY \`FK_e79ff90659b916ee9f9784e3f8e\``);
        await queryRunner.query(`ALTER TABLE \`coments_users\` DROP FOREIGN KEY \`FK_ab4cb018531fa812e631d535ea1\``);
        await queryRunner.query(`ALTER TABLE \`videos\` DROP FOREIGN KEY \`FK_6ad5da670755f0da63356b44cf3\``);
        await queryRunner.query(`ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_57b7ae4dc0db10a658c58c29cc2\``);
        await queryRunner.query(`ALTER TABLE \`chat_users\` DROP FOREIGN KEY \`FK_20f1c80e77dd30b2d3722c48749\``);
        await queryRunner.query(`ALTER TABLE \`chat_users\` DROP FOREIGN KEY \`FK_57d9904d753898cdfab6f36d94e\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_0e1fed153da5ca43a7e8a2be5af\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_2ed7cfa679e37184dcb1abac076\``);
        await queryRunner.query(`ALTER TABLE \`preferences\` DROP FOREIGN KEY \`FK_46bea78964803c157fecfa968ba\``);
        await queryRunner.query(`ALTER TABLE \`preferences\` DROP FOREIGN KEY \`FK_88da2a4d7b055d8cf30e48b396f\``);
        await queryRunner.query(`DROP INDEX \`IDX_aef56c6cd3dd7e50c24d07829d\` ON \`friends\``);
        await queryRunner.query(`DROP INDEX \`IDX_d7b254474ac757ab77484b7eec\` ON \`friends\``);
        await queryRunner.query(`DROP TABLE \`friends\``);
        await queryRunner.query(`DROP INDEX \`REL_6f486d07c66ea11bc875666d45\` ON \`recommended_posts\``);
        await queryRunner.query(`DROP INDEX \`REL_b69dd03a3da22f70034cdf8cff\` ON \`recommended_posts\``);
        await queryRunner.query(`DROP TABLE \`recommended_posts\``);
        await queryRunner.query(`DROP INDEX \`REL_9e144a67be49e5bba91195ef5d\` ON \`user_tokens\``);
        await queryRunner.query(`DROP TABLE \`user_tokens\``);
        await queryRunner.query(`DROP TABLE \`actions_user\``);
        await queryRunner.query(`DROP INDEX \`REL_8e0d15884a1acbd66d799ac12c\` ON \`account_games_users\``);
        await queryRunner.query(`DROP TABLE \`account_games_users\``);
        await queryRunner.query(`DROP TABLE \`account_games\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}