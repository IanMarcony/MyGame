import { MigrationInterface, QueryRunner } from "typeorm";

export class network1679283535065 implements MigrationInterface {
    name = 'network1679283535065'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`account_games\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url_icon\` text NOT NULL, \`company\` text NOT NULL, \`value_number\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`categories_games\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type_category\` text NOT NULL, \`value\` text NOT NULL, \`value_number\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`preferences\` (\`id\` int NOT NULL AUTO_INCREMENT, \`id_category_game\` int NOT NULL, \`id_user\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`messages\` (\`id\` int NOT NULL AUTO_INCREMENT, \`text\` text NOT NULL, \`id_user\` int NOT NULL, \`id_chat\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`chats\` (\`id\` int NOT NULL AUTO_INCREMENT, \`token\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`chat_users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`id_chat\` int NOT NULL, \`id_user_request\` int NOT NULL, \`id_user_receiver\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`REL_57d9904d753898cdfab6f36d94\` (\`id_chat\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`files_post\` (\`id\` int NOT NULL AUTO_INCREMENT, \`filename\` text NOT NULL, \`type\` varchar(255) NOT NULL, \`id_post\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`coments_users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`text\` text NOT NULL, \`id_post\` int NOT NULL, \`id_user\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`actions_user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` text NOT NULL, \`value\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`interactions_users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`id_post\` int NOT NULL, \`id_action_user\` int NOT NULL, \`id_user\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`posts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`description\` text NOT NULL, \`is_private\` tinyint NOT NULL, \`count_likes\` int NOT NULL DEFAULT '0', \`id_user\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`friend_requests\` (\`id\` int NOT NULL AUTO_INCREMENT, \`id_user_requester\` int NOT NULL, \`id_user_required\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` text NOT NULL, \`email\` text NOT NULL, \`password\` text NOT NULL, \`birth_date\` text NOT NULL, \`url_profile_photo\` text NULL, \`url_banner_photo\` text NULL, \`description\` text NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`account_games_users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` text NOT NULL, \`id_account_game\` int NOT NULL, \`id_user\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`friends\` (\`usersId_1\` int NOT NULL, \`usersId_2\` int NOT NULL, PRIMARY KEY (\`usersId_1\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_tokens\` (\`id\` int NOT NULL AUTO_INCREMENT, \`token\` varchar(36) NOT NULL, \`user_id\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`REL_9e144a67be49e5bba91195ef5d\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`friends\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`friends\` ADD PRIMARY KEY (\`usersId_1\`, \`usersId_2\`)`);
        await queryRunner.query(`ALTER TABLE \`friends\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`friends\` ADD PRIMARY KEY (\`usersId_1\`)`);
        await queryRunner.query(`ALTER TABLE \`friends\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`friends\` ADD PRIMARY KEY (\`usersId_1\`, \`usersId_2\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_d7b254474ac757ab77484b7eec\` ON \`friends\` (\`usersId_1\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_aef56c6cd3dd7e50c24d07829d\` ON \`friends\` (\`usersId_2\`)`);
        await queryRunner.query(`ALTER TABLE \`preferences\` ADD CONSTRAINT \`FK_88da2a4d7b055d8cf30e48b396f\` FOREIGN KEY (\`id_user\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`preferences\` ADD CONSTRAINT \`FK_46bea78964803c157fecfa968ba\` FOREIGN KEY (\`id_category_game\`) REFERENCES \`categories_games\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_2ed7cfa679e37184dcb1abac076\` FOREIGN KEY (\`id_user\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_0e1fed153da5ca43a7e8a2be5af\` FOREIGN KEY (\`id_chat\`) REFERENCES \`chats\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`chat_users\` ADD CONSTRAINT \`FK_57d9904d753898cdfab6f36d94e\` FOREIGN KEY (\`id_chat\`) REFERENCES \`chats\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`chat_users\` ADD CONSTRAINT \`FK_20f1c80e77dd30b2d3722c48749\` FOREIGN KEY (\`id_user_request\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`chat_users\` ADD CONSTRAINT \`FK_d98d2e37f14d95749080250e3c8\` FOREIGN KEY (\`id_user_receiver\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`files_post\` ADD CONSTRAINT \`FK_36e0f248cbccadba8803e28f971\` FOREIGN KEY (\`id_post\`) REFERENCES \`posts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`coments_users\` ADD CONSTRAINT \`FK_ab4cb018531fa812e631d535ea1\` FOREIGN KEY (\`id_post\`) REFERENCES \`posts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`coments_users\` ADD CONSTRAINT \`FK_e79ff90659b916ee9f9784e3f8e\` FOREIGN KEY (\`id_user\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`interactions_users\` ADD CONSTRAINT \`FK_9f3c9807518049a502650462803\` FOREIGN KEY (\`id_action_user\`) REFERENCES \`actions_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`interactions_users\` ADD CONSTRAINT \`FK_e065b4232097a1913a6302173b8\` FOREIGN KEY (\`id_post\`) REFERENCES \`posts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`interactions_users\` ADD CONSTRAINT \`FK_e79a498485208f3cd01d0ac790b\` FOREIGN KEY (\`id_user\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_9bfeb0a92bb13a780774a852255\` FOREIGN KEY (\`id_user\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`friend_requests\` ADD CONSTRAINT \`FK_49f2e8bc286244461c0b40d65e0\` FOREIGN KEY (\`id_user_requester\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`friend_requests\` ADD CONSTRAINT \`FK_2ebccb925b415db4fa1e9aea84c\` FOREIGN KEY (\`id_user_required\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`account_games_users\` ADD CONSTRAINT \`FK_3575d3b7c3908de2f99f2fc7c46\` FOREIGN KEY (\`id_user\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`account_games_users\` ADD CONSTRAINT \`FK_8e0d15884a1acbd66d799ac12c4\` FOREIGN KEY (\`id_account_game\`) REFERENCES \`account_games\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` ADD CONSTRAINT \`FK_9e144a67be49e5bba91195ef5de\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`friends\` ADD CONSTRAINT \`FK_d7b254474ac757ab77484b7eec5\` FOREIGN KEY (\`usersId_1\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`friends\` ADD CONSTRAINT \`FK_aef56c6cd3dd7e50c24d07829d3\` FOREIGN KEY (\`usersId_2\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`friends\` DROP FOREIGN KEY \`FK_aef56c6cd3dd7e50c24d07829d3\``);
        await queryRunner.query(`ALTER TABLE \`friends\` DROP FOREIGN KEY \`FK_d7b254474ac757ab77484b7eec5\``);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` DROP FOREIGN KEY \`FK_9e144a67be49e5bba91195ef5de\``);
        await queryRunner.query(`ALTER TABLE \`account_games_users\` DROP FOREIGN KEY \`FK_8e0d15884a1acbd66d799ac12c4\``);
        await queryRunner.query(`ALTER TABLE \`account_games_users\` DROP FOREIGN KEY \`FK_3575d3b7c3908de2f99f2fc7c46\``);
        await queryRunner.query(`ALTER TABLE \`friend_requests\` DROP FOREIGN KEY \`FK_2ebccb925b415db4fa1e9aea84c\``);
        await queryRunner.query(`ALTER TABLE \`friend_requests\` DROP FOREIGN KEY \`FK_49f2e8bc286244461c0b40d65e0\``);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_9bfeb0a92bb13a780774a852255\``);
        await queryRunner.query(`ALTER TABLE \`interactions_users\` DROP FOREIGN KEY \`FK_e79a498485208f3cd01d0ac790b\``);
        await queryRunner.query(`ALTER TABLE \`interactions_users\` DROP FOREIGN KEY \`FK_e065b4232097a1913a6302173b8\``);
        await queryRunner.query(`ALTER TABLE \`interactions_users\` DROP FOREIGN KEY \`FK_9f3c9807518049a502650462803\``);
        await queryRunner.query(`ALTER TABLE \`coments_users\` DROP FOREIGN KEY \`FK_e79ff90659b916ee9f9784e3f8e\``);
        await queryRunner.query(`ALTER TABLE \`coments_users\` DROP FOREIGN KEY \`FK_ab4cb018531fa812e631d535ea1\``);
        await queryRunner.query(`ALTER TABLE \`files_post\` DROP FOREIGN KEY \`FK_36e0f248cbccadba8803e28f971\``);
        await queryRunner.query(`ALTER TABLE \`chat_users\` DROP FOREIGN KEY \`FK_d98d2e37f14d95749080250e3c8\``);
        await queryRunner.query(`ALTER TABLE \`chat_users\` DROP FOREIGN KEY \`FK_20f1c80e77dd30b2d3722c48749\``);
        await queryRunner.query(`ALTER TABLE \`chat_users\` DROP FOREIGN KEY \`FK_57d9904d753898cdfab6f36d94e\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_0e1fed153da5ca43a7e8a2be5af\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_2ed7cfa679e37184dcb1abac076\``);
        await queryRunner.query(`ALTER TABLE \`preferences\` DROP FOREIGN KEY \`FK_46bea78964803c157fecfa968ba\``);
        await queryRunner.query(`ALTER TABLE \`preferences\` DROP FOREIGN KEY \`FK_88da2a4d7b055d8cf30e48b396f\``);
        await queryRunner.query(`DROP INDEX \`IDX_aef56c6cd3dd7e50c24d07829d\` ON \`friends\``);
        await queryRunner.query(`DROP INDEX \`IDX_d7b254474ac757ab77484b7eec\` ON \`friends\``);
        await queryRunner.query(`ALTER TABLE \`friends\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`friends\` ADD PRIMARY KEY (\`usersId_1\`)`);
        await queryRunner.query(`ALTER TABLE \`friends\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`friends\` ADD PRIMARY KEY (\`usersId_1\`, \`usersId_2\`)`);
        await queryRunner.query(`ALTER TABLE \`friends\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`friends\` ADD PRIMARY KEY (\`usersId_1\`)`);
        await queryRunner.query(`DROP INDEX \`REL_9e144a67be49e5bba91195ef5d\` ON \`user_tokens\``);
        await queryRunner.query(`DROP TABLE \`user_tokens\``);
        await queryRunner.query(`DROP TABLE \`friends\``);
        await queryRunner.query(`DROP TABLE \`account_games_users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`friend_requests\``);
        await queryRunner.query(`DROP TABLE \`posts\``);
        await queryRunner.query(`DROP TABLE \`interactions_users\``);
        await queryRunner.query(`DROP TABLE \`actions_user\``);
        await queryRunner.query(`DROP TABLE \`coments_users\``);
        await queryRunner.query(`DROP TABLE \`files_post\``);
        await queryRunner.query(`DROP INDEX \`REL_57d9904d753898cdfab6f36d94\` ON \`chat_users\``);
        await queryRunner.query(`DROP TABLE \`chat_users\``);
        await queryRunner.query(`DROP TABLE \`chats\``);
        await queryRunner.query(`DROP TABLE \`messages\``);
        await queryRunner.query(`DROP TABLE \`preferences\``);
        await queryRunner.query(`DROP TABLE \`categories_games\``);
        await queryRunner.query(`DROP TABLE \`account_games\``);
    }

}
