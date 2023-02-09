import UpdatePreferencesService from '@modules/categoriesgames/services/UpdatePreferencesService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class PreferenceController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { id: id_user } = req.user;
    const { preferences_add, preferences_delete } = req.body;

    const updatePreferencesService = container.resolve(
      UpdatePreferencesService,
    );

    await updatePreferencesService.execute({
      id_user,
      preferences_add,
      preferences_delete,
    });

    return res.status(204).json({});
  }
}
