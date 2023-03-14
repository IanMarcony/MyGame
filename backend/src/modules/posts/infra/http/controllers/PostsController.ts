import CreatePostService from '@modules/posts/services/CreatePostService';
import DeletePostService from '@modules/posts/services/DeletePostService';
import ListPostsServices from '@modules/posts/services/ListPostsService';
import UpdatePostService from '@modules/posts/services/UpdatePostService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import PostsRepository from '../../typeorm/repositories/PostsRepository';

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
    const { id_post, description, is_private } = req.body;
    const updatePost = container.resolve(UpdatePostService);

    const post = await updatePost.execute({
      id_post,
      description,
      is_private,
    });

    return res.status(200).json(post);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id_post } = req.query;

    const deletePost = container.resolve(DeletePostService);

    await deletePost.execute({
      id_post: parseInt(id_post as string),
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

  public async show(req: Request, res: Response): Promise<Response> {
    const { id_post } = req.query;
    const { id: id_user_logged } = req.user;
    const postsRepository = new PostsRepository();
    const post = await postsRepository.findByIdAll(parseInt(id_post as string));

    if (post) {
      delete post.user.password;
      delete post.user.id;
      delete post.user.url_banner_photo;
      delete post.user.birth_date;
      delete post.user.description;
      delete post.user.created_at;
      delete post.user.updated_at;

      for (const comment of post.coments) {
        delete comment.user.password;
        delete comment.user.id;
        delete comment.user.url_banner_photo;
        delete comment.user.birth_date;
        delete comment.user.description;
        delete comment.user.created_at;
        delete comment.user.updated_at;
      }

      const is_liked = !!post?.interactions.find(
        (item) =>
          item.id_user === id_user_logged && item.action_user.type === 'LIKE',
      );
      Object.assign(post, { count_comments: post.coments.length, is_liked });
    }

    return res.status(200).json(post);
  }
}
