import BaseState from '../baseState';
import OnlineTrainModel from '../../../model/onlineTrain/onlineTrain';
import OnlineTrainBoardTypeModel from "../../../model/onlineTrain/OnlineTrainBoardType"

export interface OnlineTrainState extends BaseState {
  onlineTrain:OnlineTrainModel[],
  slctdBoardType:OnlineTrainBoardTypeModel,
}