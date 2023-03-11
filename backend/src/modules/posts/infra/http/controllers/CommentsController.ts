import CreateCommentOnPostService from '@modules/posts/services/CreateCommentOnPostService';
import DeleteCommentOnPostService from '@modules/posts/services/DeleteCommentOnPostService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CommentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { id_post, text } = req.body;

    const { id: id_user } = req.user;

    const createCommentOnPost = container.resolve(CreateCommentOnPostService);

    const comment = await createCommentOnPost.execute({
      id_post,
      id_user,
      text,
    });

    return res.status(201).json(comment);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id_post, id_comment } = req.query;
    const { id: id_user } = req.user;

    const deleteCommentOnPost = container.resolve(DeleteCommentOnPostService);

    await deleteCommentOnPost.execute({
      id_post: parseInt(id_post as string),
      id_user,
      id_comment: parseInt(id_comment as string),
    });

    return res.status(204).json({});
  }
}
