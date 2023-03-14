import DeleteFriendService from '@modules/users/services/DeleteFriendService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class FriendController {
  public async delete(req: Request, res: Response): Promise<Response> {
    const { id_friend } = req.query;
    const { id: id_user } = req.user;

    const deleteFriend = container.resolve(DeleteFriendService);

    await deleteFriend.execute({
      id_user,
      id_friend: parseInt(id_friend as string),
    });

    return res.status(204).json({});
  }
}
