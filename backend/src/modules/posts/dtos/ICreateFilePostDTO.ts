export default interface ICreateFilePostDTO {
  id_post: number;
  filename: string;
  type: 'video' | 'image';
}
