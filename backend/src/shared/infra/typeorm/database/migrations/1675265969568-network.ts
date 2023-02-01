import AccountGame from '@modules/accountgames/infra/typeorm/entities/AccountGame';
import { AppDataSource } from 'data-source';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class network1675265969568 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await AppDataSource.createQueryBuilder()
      .delete()
      .from(AccountGame)
      .execute();
  }
}
