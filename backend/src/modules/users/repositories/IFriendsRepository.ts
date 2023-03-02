export default interface IFriendsRepository {
  addFriend(id_requester: number, id_requested: number): Promise<void>;
  removeFriend(id_requester: number, id_requested: number): Promise<void>;
  findFriend(id_user: number, id_friend: number): Promise<boolean>;
}
