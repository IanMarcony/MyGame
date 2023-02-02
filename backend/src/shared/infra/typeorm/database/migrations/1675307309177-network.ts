import CategoryGame from '@modules/categoriesgames/infra/typeorm/entities/CategoryGame';
import { AppDataSource } from 'data-source';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class network1675307309177 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(CategoryGame)
      .values([
        //Plataformas
        {
          type_category: 'PLATFORM',
          value: 'Xbox',
          value_number: 1,
        },
        {
          type_category: 'PLATFORM',
          value: 'Nintendo',
          value_number: 2,
        },
        {
          type_category: 'PLATFORM',
          value: 'Mobile',
          value_number: 3,
        },
        {
          type_category: 'PLATFORM',
          value: 'PC',
          value_number: 4,
        },
        {
          type_category: 'PLATFORM',
          value: 'Playstation',
          value_number: 5,
        },

        //Genêros de jogos
        {
          type_category: 'GENDER_GAME',
          value: 'Terror',
          value_number: 6,
        },
        {
          type_category: 'GENDER_GAME',
          value: 'Suspense',
          value_number: 7,
        },
        {
          type_category: 'GENDER_GAME',
          value: 'Aventura',
          value_number: 8,
        },
        {
          type_category: 'GENDER_GAME',
          value: 'Puzzle',
          value_number: 9,
        },
        {
          type_category: 'GENDER_GAME',
          value: 'FPS',
          value_number: 10,
        },
        {
          type_category: 'GENDER_GAME',
          value: 'Battle Royale',
          value_number: 11,
        },
        {
          type_category: 'GENDER_GAME',
          value: 'PVP',
          value_number: 12,
        },
        {
          type_category: 'GENDER_GAME',
          value: 'Estratégia',
          value_number: 13,
        },
        {
          type_category: 'GENDER_GAME',
          value: 'MOBA',
          value_number: 14,
        },
        {
          type_category: 'GENDER_GAME',
          value: 'RPG',
          value_number: 15,
        },

        //Jogos
        {
          type_category: 'GAME',
          value: 'God of War',
          value_number: 16,
        },
        {
          type_category: 'GAME',
          value: 'Fortnite',
          value_number: 17,
        },
        {
          type_category: 'GAME',
          value: 'DOOM',
          value_number: 18,
        },
        {
          type_category: 'GAME',
          value: 'Super Mario',
          value_number: 19,
        },
        {
          type_category: 'GAME',
          value: 'Counter-Strike',
          value_number: 20,
        },
        {
          type_category: 'GAME',
          value: 'Minecraft',
          value_number: 21,
        },
        {
          type_category: 'GAME',
          value: 'Assassins Creed',
          value_number: 22,
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await AppDataSource.createQueryBuilder()
      .delete()
      .from(CategoryGame)
      .execute();
  }
}
