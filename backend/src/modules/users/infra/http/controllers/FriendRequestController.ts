import AddFriendRequestService from '@modules/users/services/AddFriendRequestService';
import ApproveFriendRequestService from '@modules/users/services/ApproveFriendRequestService';
import DeleteFriendRequestService from '@modules/users/services/DeleteFriendRequestService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class FriendRequestController {
  public async delete(req: Request, res: Response): Promise<Response> {
    const { id_request } = req.query;

    const deleteFriendRequest = container.resolve(DeleteFriendRequestService);

    await deleteFriendRequest.execute({
      id_request: parseInt(id_request as string),
    });

    return res.status(204).json({});
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { email_friend } = req.body;
    const { id: id_user } = req.user;

    const createFriendRequest = container.resolve(AddFriendRequestService);

    await createFriendRequest.execute({ email_friend, id_user });

    return res.status(204).json({});
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id_request } = req.params;

    const approveFriendRequest = container.resolve(ApproveFriendRequestService);

    await approveFriendRequest.execute({
      id_request: parseInt(id_request as string),
    });

    return res.status(204).json({});
  }
}
