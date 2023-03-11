import CreatePostService from '@modules/posts/services/CreatePostService';
import DeletePostService from '@modules/posts/services/DeletePostService';
import ListPostsServices from '@modules/posts/services/ListPostsService';
import UpdatePostService from '@modules/posts/services/UpdatePostService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class PostsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { description, is_private } = req.body;
    const { id: id_user } = req.user;

    const filesUpload = req.files as Express.Multer.File[];
    const files = filesUpload
      ? filesUpload.map((item) => {
          return {
            filename: item.filename,
            type: item.mimetype.includes('video') ? 'video' : 'image',
          };
        })
      : [];

    const createPost = container.resolve(CreatePostService);

    const post = await createPost.execute({
      id_user,
      description,
      is_private: is_private === 'true',
      files,
    });

    return res.status(201).json(post);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id_post, description, is_private, files_id_delete } = req.body;

    const filesUpload = req.files as Express.Multer.File[];
    const files_to_delete = filesUpload
      .filter((item) => item.fieldname.split('_')[0] === 'delete')
      .map((item, index) => {
        return {
          id: files_id_delete[index],
          filename: item.filename,
          type: item.mimetype.includes('video') ? 'video' : 'image',
        };
      });
    const files_to_save = filesUpload
      .filter((item) => item.fieldname.split('_')[0] === 'save')
      .map((item) => {
        return {
          filename: item.filename,
          type: item.mimetype.includes('video') ? 'video' : 'image',
        };
      });

    const updatePost = container.resolve(UpdatePostService);

    const post = await updatePost.execute({
      id_post,
      description,
      is_private,
      files_to_delete,
      files_to_save,
    });

    return res.status(200).json(post);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id_post } = req.body;

    const deletePost = container.resolve(DeletePostService);

    await deletePost.execute({
      id_post,
    });

    return res.status(204).json({});
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { id_user } = req.query;
    const { page } = req.params;
    const { id: id_user_logged } = req.user;

    const listPosts = container.resolve(ListPostsServices);

    const posts = await listPosts.execute({
      id_user: parseInt(id_user as string),
      page: parseInt(page),
      id_user_logged,
    });

    return res.status(200).json(posts);
  }
}
