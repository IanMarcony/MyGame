import ActionUser from '@modules/posts/infra/typeorm/entities/ActionUser';
import { AppDataSource } from 'data-source';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class network1675265806907 implements MigrationInterface {
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await AppDataSource.createQueryBuilder()
      .delete()
      .from(ActionUser)
      .execute();
  }
}

