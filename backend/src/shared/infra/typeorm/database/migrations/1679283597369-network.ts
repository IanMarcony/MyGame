import AccountGame from '@modules/accountgames/infra/typeorm/entities/AccountGame';
import CategoryGame from '@modules/categoriesgames/infra/typeorm/entities/CategoryGame';
import ActionUser from '@modules/posts/infra/typeorm/entities/ActionUser';
import { AppDataSource } from 'data-source';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class network1679283597369 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(ActionUser)
      .values([
        {
          type: 'COMMENT',
          value: 5,
        },
        {
          type: 'LIKE',
          value: 4,
        },
      ])
      .execute();

    await AppDataSource.createQueryBuilder()
      .insert()
      .into(AccountGame)
      .values([
        {
          url_icon:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/800px-Steam_icon_logo.svg.png',
          company: 'Steam',
          value_number: 1,
        },
        {
          url_icon:
            'https://assets.xboxservices.com/assets/5c/55/5c554715-fac4-4c09-8006-d8e62d355157.jpg?n=Xbox_Sharing_Xbox-2019-White-on-Green_200x200.jpg',
          company: 'Xbox',
          value_number: 2,
        },
        {
          url_icon:
            'https://w7.pngwing.com/pngs/24/817/png-transparent-playstation-4-raiders-of-the-broken-planet-playstation-network-playstation-plus-playstation-electronics-text-trademark.png',
          company: 'Playstation',
          value_number: 3,
        },
        {
          url_icon:
            'https://upload.wikimedia.org/wikipedia/commons/3/38/Nintendo_switch_logo.png',
          company: 'Nintendo',
          value_number: 4,
        },
      ])
      .execute();

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
    await AppDataSource.createQueryBuilder()
      .delete()
      .from(AccountGame)
      .execute();

    await AppDataSource.createQueryBuilder()
      .delete()
      .from(ActionUser)
      .execute();
  }
}

