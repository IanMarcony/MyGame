import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

export default interface IUserTokensRepository {
  generate(user_id: number): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | null>;
  delete(id: number): Promise<void>;
}
