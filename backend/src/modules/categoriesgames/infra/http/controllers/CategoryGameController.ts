import { Request, Response } from 'express';
import CategoryGameRepository from '../../typeorm/repositories/CategoryGameRepository';

export default class CategoryGameController {
  public async index(req: Request, res: Response): Promise<Response> {
    const categoryGameRepository = new CategoryGameRepository();

    const categoriesGame = await categoryGameRepository.findAll();

    return res.status(200).json(categoriesGame);
  }
}
