import { Button, Card, Grid, Modal, Table, TableRow, Typography, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { SetupPages } from ".";
import { DisplayIntensitySetting } from "./displayIntensitySetting";
import { AuthService } from "../service/user-setting/authService";
import { convertTypeAcquisitionFromJson } from "typescript";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { authuserStateSelector } from "../../redux/reducers/authUser/authUser";
import { WarnUnSave, WarnUnsaveStateSelector } from "../../redux/reducers/warnUnsaveReducer/warnUnsave";
import WarnModal from "../common/modal/warnModal";
import { ModalType, UserRole } from "../../constants/enum";
import WarnUnsavedChanges from "../common/modal/warnUnsaveModal";
import { warnDiscard } from "../../redux/actions/appAction/appAction";
import { useHistory } from "react-router-dom";


const auth = new AuthService();

export const SideBar = (props: any) => {
  const { trainCheck, setTrainCheck } = props;
  const [openModal, setOpenModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shouldUnload, setShouldUnload] = useState(false);
  const [openAuth, setAuth] = useState(false);
  const [saveInit, setSaveInit] = useState(false)
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(SetupPages.SETUP_MAIN);
  const { appUser } = useSelector(authuserStateSelector)
  const { isDirty } = useSelector(WarnUnsaveStateSelector)
  const dispatch = useDispatch()
  const history = useHistory()
  const [isWarnModalVisible, setIsWarnModalVisible] = useState(false)




  function handleClick(menuName: SetupPages) {
    if (trainCheck) {
      if (isDirty && menuName != "trainDataEntrySetup" && appUser.userRole == "ROLE_SUPER ADMIN" || appUser.userRole == "ROLE_ADMIN") {
        setIsWarnModalVisible(true)
        dispatch(WarnUnSave(true))
        setSelectedMenu(menuName)
        // setTrainCheck(false)
      } else if (isDirty == false) {
        props.updateSelectedSideBarMenu(menuName);
        setSelectedMenu(menuName)
      }
    }
    else {
      props.updateSelectedSideBarMenu(menuName);
      setSelectedMenu(menuName)
      console.log(menuName, 56)

    }

  }




  const handleCancelPass = () => {
    setIsWarnModalVisible(false)
    setTrainCheck(true)
    setSelectedMenu(SetupPages.TRAIN_DATA_ENTRY);
  }


  const [userInput, setUserInput] = useState({
    username: "",
    password: "",
  });

  const [userNameError, setUserNameError] =
    React.useState<{ username: string }>();
  const [passwordError, setPasswordError] =
    React.useState<{ password: string }>();
  const passwordMessage =
    "Password Should have Minimum 8 characters" +
    "\n" +
    "Atleast 1 Uppercase,Lowercase and Numeric character is mandatory";

  const handleUserName = (event: any) => {
    const {
      target: { value },
    } = event;
    setUserNameError({ username: "" });
    let emailRegex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ).test(value);
    let mobileNoRegex = new RegExp(/^\d*$/).test(value);
    if (userInput.username == "") {
      setUserNameError({ username: "Enter your email or mobile phone number" });
    }
    // if (!emailRegex || !mobileNoRegex) {
    // 	setUserNameError({ username: 'Not a valid Email/Mobile Number' })
    // }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setShouldUnload(false);
  };



  const handlePassword = (event: any) => {
    const {
      target: { value },
    } = event;
    setPasswordError({ password: "" });
    let regA = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})").test(
      value
    );
    if (userInput.password == "") {
      setPasswordError({ password: "Enter your password" });
    }
  };


  const handleConfirm = (menuName: SetupPages) => {
    props.updateSelectedSideBarMenu(menuName);
    setIsWarnModalVisible(false)
    setTrainCheck(false)
  }
  const handleChange = (e: any) => {
    var { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };


  // const handleSubmit = (name: any, password: any) => {
  //   var userInput = {
  //     username: name,
  //     password: password,
  //   };
  //   dispatch(authenticate(userInput));
  // };

  const handleSubmit = () => {
    auth.authenticate(userInput).then((response: any) => {
      if (response && response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Station Details added successfully`,
          showConfirmButton: false,
          allowOutsideClick: false,
          timer: 3000,
        })
        setOpenModal(false);
      }
    })
  }

  return (
    <>
      <Grid style={{ height:'100%'}}>
        <Card className="sideMenu" style={{ width: "16vw", display: 'grid' }}>
          {/* <Table>
            <TableRow className={`sideMenuRow ${(selectedMenu == SetupPages.STATION_DETAILS && props.selectedSideBarMenu !="setupMain") ? "sideMenuRowActive" : ""}`}>
              <Button className="sideMenuRowText" onClick={() => handleClick(SetupPages.STATION_DETAILS)}>Station Details</Button>
            </TableRow>
            {/* <TableRow className={`sideMenuRow ${(selectedMenu == SetupPages.TRAIN_DATA_ENTRY && props.selectedSideBarMenu !="setupMain") ? "sideMenuRowActive" : ""}`}>
              {appUser.userRole == "ROLE_STATION MASTER" ?
                <Button disabled className="sideMenuRowText" onClick={() => {handleClick(SetupPages.TRAIN_DATA_ENTRY)
                setTrainCheck(true)}}>Train Data Entry</Button>
                :
                <Button className="sideMenuRowText" onClick={() => {handleClick(SetupPages.TRAIN_DATA_ENTRY)
                  setTrainCheck(true)}}>Train Data Entry</Button>

              }
            </TableRow> */}
          {/* <TableRow className={`sideMenuRow ${(selectedMenu == SetupPages.TRAIN_DATA_ENTRY_SETUP && props.selectedSideBarMenu !="setupMain")? "sideMenuRowActive" : ""}`}>
              <Button className="sideMenuRowText"  onClick={()=>{handleClick(SetupPages.TRAIN_DATA_ENTRY_SETUP);setTrainCheck(true)}} >Train Data Entry</Button></TableRow>
            <TableRow className={`sideMenuRow ${(selectedMenu == SetupPages.COACH_DATA_ENTRY  && props.selectedSideBarMenu !="setupMain") ? "sideMenuRowActive" : ""}`}>
              <Button className="sideMenuRowText" onClick={() => handleClick(SetupPages.COACH_DATA_ENTRY)}>Coach Data Entry </Button>
            </TableRow>
            <TableRow className={`sideMenuRow ${(selectedMenu == SetupPages.STATION_CODE_ENTRY && props.selectedSideBarMenu !="setupMain") ? "sideMenuRowActive" : ""}`}>
              <Button className="sideMenuRowText" onClick={() => handleClick(SetupPages.STATION_CODE_ENTRY)}>Station Code Entry</Button>
            </TableRow>
            <TableRow className={`sideMenuRow ${(selectedMenu == SetupPages.TRAIN_STATUS_ENTRY && props.selectedSideBarMenu !="setupMain") ? "sideMenuRowActive" : ""}`}>
              <Button className="sideMenuRowText" onClick={() => handleClick(SetupPages.TRAIN_STATUS_ENTRY)}>Train Status Entry</Button>
            </TableRow>
            <TableRow className={`sideMenuRow ${(selectedMenu == SetupPages.DISPLAY_INTENSITY_SETTINGS) ? "sideMenuRowActive" : ""}`}>
              <Button className="sideMenuRowText" onClick={() => handleClick(SetupPages.DISPLAY_INTENSITY_SETTINGS)}>Display Intensity Settings</Button>
            </TableRow>
            <TableRow className={`sideMenuRow ${(selectedMenu == SetupPages.DISPLAY_BOARD_SETTINGS && props.selectedSideBarMenu !="setupMain") ? "sideMenuRowActive" : ""}`}>
              <Button className="sideMenuRowText" onClick={() => handleClick(SetupPages.DISPLAY_BOARD_SETTINGS)}> Display Board Settings</Button>
            </TableRow>
            <TableRow className={`sideMenuRow ${(selectedMenu == SetupPages.ENABLE_DISABLE_BOARDS && props.selectedSideBarMenu !="setupMain") ? "sideMenuRowActive" : ""}`}>
              <Button className="sideMenuRowText" onClick={() => handleClick(SetupPages.ENABLE_DISABLE_BOARDS)}>Enable/Disable Boards</Button>
            </TableRow>
            <TableRow className={`sideMenuRow ${(selectedMenu == SetupPages.DEFAULT_MESSAGES && props.selectedSideBarMenu !="setupMain") ? "sideMenuRowActive" : ""}`}>
              <Button className="sideMenuRowText" onClick={() => handleClick(SetupPages.DEFAULT_MESSAGES)}>Default Messages</Button>
            </TableRow>
            <TableRow className={`sideMenuRow ${(selectedMenu == SetupPages.WEB_CONFIGURATION && props.selectedSideBarMenu !="setupMain") ? "sideMenuRowActive" : ""}`}>
              <Button className="sideMenuRowText" onClick={() => handleClick(SetupPages.WEB_CONFIGURATION)}>Web Configuration</Button>
            </TableRow>
          </Table> */}
          <Grid container>
            <Grid item xs={12} className={`sideMenuRow ${(selectedMenu == SetupPages.STATION_DETAILS && props.selectedSideBarMenu != "setupMain") ? "sideMenuRowActive" : ""}`}>
              <Button className="sideMenuRowText" onClick={() => handleClick(SetupPages.STATION_DETAILS)}>Station Details</Button>
            </Grid>
            <Grid item xs={12} className={`sideMenuRow ${(selectedMenu == SetupPages.TRAIN_DATA_ENTRY_SETUP && props.selectedSideBarMenu != "setupMain") ? "sideMenuRowActive" : ""}`}>
              <Button className="sideMenuRowText" onClick={() => { handleClick(SetupPages.TRAIN_DATA_ENTRY_SETUP); setTrainCheck(true) }} >Train Data Entry</Button>
            </Grid>
            <Grid item xs={12} className={`sideMenuRow ${(selectedMenu == SetupPages.COACH_DATA_ENTRY && props.selectedSideBarMenu != "setupMain") ? "sideMenuRowActive" : ""}`}>
              <Button className="sideMenuRowText" onClick={() => handleClick(SetupPages.COACH_DATA_ENTRY)}>Coach Data Entry </Button>
            </Grid>
            <Grid item xs={12} className={`sideMenuRow ${(selectedMenu == SetupPages.STATION_CODE_ENTRY && props.selectedSideBarMenu != "setupMain") ? "sideMenuRowActive" : ""}`}>
              <Button className="sideMenuRowText" onClick={() => handleClick(SetupPages.STATION_CODE_ENTRY)}>Station Code Entry</Button>
            </Grid>
            <Grid item xs={12} className={`sideMenuRow ${(selectedMenu == SetupPages.TRAIN_STATUS_ENTRY && props.selectedSideBarMenu != "setupMain") ? "sideMenuRowActive" : ""}`}>
              <Button className="sideMenuRowText" onClick={() => handleClick(SetupPages.TRAIN_STATUS_ENTRY)}>Train Status Entry</Button>
            </Grid>
            <Grid item xs={12} className={`sideMenuRow ${(selectedMenu == SetupPages.DISPLAY_INTENSITY_SETTINGS) ? "sideMenuRowActive" : ""}`} >
              <Button className="sideMenuRowText" onClick={() => handleClick(SetupPages.DISPLAY_INTENSITY_SETTINGS)}>Display Intensity Settings</Button>
            </Grid>
            <Grid item xs={12} className={`sideMenuRow ${(selectedMenu == SetupPages.DISPLAY_BOARD_SETTINGS && props.selectedSideBarMenu != "setupMain") ? "sideMenuRowActive" : ""}`}>
              <Button className="sideMenuRowText" onClick={() => handleClick(SetupPages.DISPLAY_BOARD_SETTINGS)}> Display Board Settings</Button>
            </Grid>
            <Grid item xs={12} className={`sideMenuRow ${(selectedMenu == SetupPages.ENABLE_DISABLE_BOARDS && props.selectedSideBarMenu != "setupMain") ? "sideMenuRowActive" : ""}`}>
              <Button className="sideMenuRowText" onClick={() => handleClick(SetupPages.ENABLE_DISABLE_BOARDS)}>Enable/Disable Boards</Button>
            </Grid>
            <Grid item xs={12} className={`sideMenuRow ${(selectedMenu == SetupPages.DEFAULT_MESSAGES && props.selectedSideBarMenu != "setupMain") ? "sideMenuRowActive" : ""}`}>
              <Button className="sideMenuRowText" onClick={() => handleClick(SetupPages.DEFAULT_MESSAGES)}>Default Messages</Button>
            </Grid>
            <Grid item xs={12} className={`sideMenuRow ${(selectedMenu == SetupPages.WEB_CONFIGURATION && props.selectedSideBarMenu != "setupMain") ? "sideMenuRowActive" : ""}`}>
              <Button className="sideMenuRowText" onClick={() => handleClick(SetupPages.WEB_CONFIGURATION)}>Web Configuration</Button>
            </Grid>
            <Grid item xs={12} className={`sideMenuRow ${(selectedMenu == SetupPages.TRAIN_STATUS_CODE && props.selectedSideBarMenu != "setupMain") ? "sideMenuRowActive" : ""}`}>
              <Button className="sideMenuRowText" onClick={() => handleClick(SetupPages.TRAIN_STATUS_CODE)}>Train Status Color Code</Button>
            </Grid>
            <Grid item xs={12} className={`sideMenuRow ${(selectedMenu == SetupPages.IMPORT_EXPORT && props.selectedSideBarMenu != "setupMain") ? "sideMenuRowActive" : ""}`}>
              <Button className="sideMenuRowText" onClick={() => handleClick(SetupPages.IMPORT_EXPORT)}>Import Export</Button>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <WarnModal
        type={ModalType.WARN}
        isModalVisible={isWarnModalVisible}
        primaryText="Are you Sure ?"
        secondaryText="You want to exit this page !"
        cancelButton="cancel"
        confirmButton="confirm"
        confirmCallback={() => handleConfirm(selectedMenu)}
        cancelCallback={handleCancelPass}
      />
    </>
  );
};
