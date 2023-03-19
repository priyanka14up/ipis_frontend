import BaseState from '../baseState';


export interface UserProfileState extends BaseState {
  viewUser:boolean;
  addUser: boolean;
  editUser: boolean;
  deleteUser:boolean;
  errorMessage:string;
  userProfile: any;
}
