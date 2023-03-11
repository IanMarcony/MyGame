import ToggleLikePostService from '@modules/posts/services/ToggleLikePostService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class LikesController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { id_post } = req.body;

    const { id: id_user } = req.user;

    const toggleLike = container.resolve(ToggleLikePostService);

    await toggleLike.execute({ id_post, id_user });

    return res.status(204).json({});
  }
}
