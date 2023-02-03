import { inject, injectable } from 'tsyringe';
import Preference from '../infra/typeorm/entities/Preference';
import IPreferenceRepository from '../repositories/IPreferenceRepository';

interface IPreference {
  id_category_game: number;
}

interface IRequest {
  id_user: number;
  preferences_delete: number[];
  preferences_add: IPreference[];
}

@injectable()
export default class UpdatePreferencesService {
  constructor(
    @inject('PreferencesRepository')
    private preferencesRepository: IPreferenceRepository,
  ) {}

  async execute({
    preferences_add,
    preferences_delete,
    id_user,
  }: IRequest): Promise<void> {
    let preferences_saved: Preference[] = [];

    if (preferences_add.length > 0) {
      const dataPreferences = preferences_add.map((item) => {
        return {
          ...item,
          id_user,
        };
      });
      preferences_saved = await this.preferencesRepository.create(
        dataPreferences,
      );
    }

    if (preferences_delete.length > 0) {
      for (let index = 0; index < preferences_delete.length; index++) {
        const idPreference = preferences_delete[index];
        await this.preferencesRepository.delete(idPreference);
      }
    }
  }
}
