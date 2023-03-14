import { inject, injectable } from 'tsyringe';
import Preference from '../infra/typeorm/entities/Preference';
import IPreferenceRepository from '../repositories/IPreferenceRepository';

interface IPreference {
  id_category_game: number;
}

interface IRequest {
  id_user: number;
  preferences: IPreference[];
}

@injectable()
export default class UpdatePreferencesService {
  constructor(
    @inject('PreferencesRepository')
    private preferencesRepository: IPreferenceRepository,
  ) {}

  async execute({ preferences, id_user }: IRequest): Promise<void> {
    await this.preferencesRepository.deleteByIdUser(id_user);

    const dataPreferences = preferences.map((item) => {
      return {
        ...item,
        id_user,
      };
    });

    await this.preferencesRepository.create(dataPreferences);
  }
}
