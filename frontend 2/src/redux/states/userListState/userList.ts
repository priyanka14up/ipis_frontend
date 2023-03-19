import BaseState from '../baseState';
import UserModel from '../../../model/user-model/userModel';

export interface UserListState extends BaseState {
  users : UserModel[],
  selectedUser: UserModel,
}