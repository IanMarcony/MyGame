import ICreatePreferenceDTO from '../dtos/ICreatePreferenceDTO';
import Perference from '../infra/typeorm/entities/Preference';

export default interface IPreferenceRepository {
  create(datas: ICreatePreferenceDTO[]): Promise<Perference[]>;
  delete(id_preference: number): Promise<void>;
}
