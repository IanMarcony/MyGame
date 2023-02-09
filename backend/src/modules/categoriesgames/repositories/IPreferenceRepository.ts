import ICreatePreferenceDTO from '../dtos/ICreatePreferenceDTO';
import Preference from '../infra/typeorm/entities/Preference';

export default interface IPreferenceRepository {
  create(datas: ICreatePreferenceDTO[]): Promise<Preference[]>;
  delete(id_preference: number): Promise<void>;
}
