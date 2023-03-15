import AddFriendRequestService from '@modules/users/services/AddFriendRequestService';
import ApproveFriendRequestService from '@modules/users/services/ApproveFriendRequestService';
import DeleteFriendRequestService from '@modules/users/services/DeleteFriendRequestService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import FriendRequestsRepository from '../../typeorm/repositories/FriendRequestsRepository';

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

    const id_request = await createFriendRequest.execute({
      email_friend,
      id_user,
    });

    return res.status(201).json({ id_request });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id_request } = req.body;

    const approveFriendRequest = container.resolve(ApproveFriendRequestService);

    await approveFriendRequest.execute({
      id_request,
    });

    return res.status(204).json({});
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { id: id_user } = req.user;

    const friendRequestRespository = new FriendRequestsRepository();

    const friendRequests = await friendRequestRespository.findAll(id_user);

    for (const request of friendRequests) {
      delete request.userRequester.password;
      delete request.userRequester.id;
      delete request.userRequester.url_banner_photo;
      delete request.userRequester.birth_date;
      delete request.userRequester.description;
      delete request.userRequester.created_at;
      delete request.userRequester.updated_at;
      delete request.userRequired;
    }

    return res.status(200).json(friendRequests);
  }
}
