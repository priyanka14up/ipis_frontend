// import {Col, Modal, Row} from 'antd';
// import { redCross,  greenTick } from "../../../../images";
// import Button from "../button";
import { Typography, Grid, Button, Modal, Card } from "@material-ui/core";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

// import "./warnModal.less"
// import { ModalType } from "../../../../constants/enums";
// import { Button, Grid } from "@material-ui/core";
// import Modal from '@material-ui/core/Modal';
import { ModalType } from "../../../constants/enum";
import './warnModal.css';
interface WarnModalProps {
    type: ModalType.WARN,
    primaryText: string,
    secondaryText: string,
    isModalVisible: boolean,
    confirmButton: string | null,
    cancelButton: string | null,
    confirmCallback?: Function,
    cancelCallback: Function,
    tertiaryText? : string 

} 
const WarnModal = (props: WarnModalProps) => {
  const {
    type,
    primaryText,
    secondaryText,
    isModalVisible,
    confirmButton,
    cancelButton,
    confirmCallback,
    cancelCallback,
    tertiaryText
  } = props;

  const onConfirmCallback = () => {
    if (confirmCallback) {
      confirmCallback();
    }
  };

  const onCancelCallback = () => {
    if (cancelCallback) {
      cancelCallback();
    }
  };
// const getIconType = () => {
//   if(type == ModalType.WARN){
//     return redCross
//   }else return greenTick
// }
  return (
    <Modal
    onClose={onCancelCallback}
    open={isModalVisible} 
  className="warnModalcss" >
      <Card className="warnModalCard">
        <Grid container className="warnImage">
          <Grid xs={12}><ErrorOutlineIcon className="warningIconModal"/> </Grid>
        </Grid>
      

      
                            <Grid  container justify="center" className="primaryModal">
                              
                <Grid xl={12} className={`primary-text ${type} warnPrimryTxt`}>
                    <span><b>{primaryText}</b> &nbsp; </span>
                </Grid>
            </Grid>
            <Grid container justify="center">
                <Grid xl={12} className="secondary-text">
                    <span>{secondaryText}</span>
                </Grid>
            </Grid>
          
                            <Grid container justify="center" className="warnButton">
              {cancelButton ? 
                <Grid xs={5} className="button-modal">
                    <Button variant="outlined" onClick={onCancelCallback} className="cancelModal">{cancelButton}</Button>
                </Grid>
                : null
              }
              <Grid xs={1} >
                </Grid>
              {confirmButton ? 
                <Grid xs={6}  className="button-modal confirmBtn">
                    <Button variant="outlined" onClick={onConfirmCallback} className="confirmModal">{confirmButton}</Button>
                </Grid>
                : null}
            </Grid>    
              </Card>
                       
                    </Modal>
    
  );
};

export default WarnModal;