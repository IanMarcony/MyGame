import { DataSource } from 'typeorm';
import 'dotenv/config';

const port = process.env.MYSQL_PORT as number | undefined;

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_LOCALHOST,
  port,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [`${__dirname}/modules/**/infra/typeorm/entities/*.{ts,js}`],
  migrations: [
    `${__dirname}/shared/infra/typeorm/database/migrations/*.{ts,js}`,
  ],
});
