export default interface ICreateInteractionDTO {
  id_post: number;
  action_user: 'COMMENT' | 'LIKE';
  id_user: number;
}
