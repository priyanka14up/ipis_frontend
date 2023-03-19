import Card from "@material-ui/core/Card";
import {
  Button,
  CardContent,
  Grid,
  Modal,
  Table,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import Optiplay from "../../assets/images/optiPlay.svg";
import user from "../../assets/images/user.svg";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import { useEffect, useState } from "react";
import UserModel from "../../model/user-model/userModel";
import React from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";

import { authuserStateSelector } from "../../redux/reducers/authUser/authUser";
import { resetPwd } from "../../redux/actions/user-profile/userProfile";
import { Messages } from "../../constants/messages";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { userStateSelector } from "../../redux/reducers/user-profile/userProfile";
// import { resetPwd } from "../../redux/actions/user-profile/userProfile";


export const ConfirmPassword = () => {

  const history = useHistory();
  const { appUser } = useSelector(authuserStateSelector);
  const { errorMessage, formState } = useSelector(userStateSelector)

  const [samePassword, setSamePassword] = useState("");
  const dispatch = useDispatch();
  const state = {
    password: "",
    confirmPassword: "",
  };

  const inputMin = { minLength: 8 };
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");

  }

  const [submit, setSubmit] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPasswordError, setOldPasswordError] = React.useState<{ oldPassword: String }>();
  const [passwordError, setPasswordError] =
    React.useState<{ password: String }>();
  const [confirmPasswordError, setConfirmPasswordError] =
    React.useState<{ confirmPassword: String }>();

  const handleOldPassword = (event: any) => {
    const {
      target: { value },
    } = event;
    setOldPasswordError({ oldPassword: "" });
    if (oldPassword == "") {
      setOldPasswordError({ oldPassword: `${Messages.REQUIRED_FIELD}` })
    }
  };

  const handlePassword = (event: any) => {
    const {
      target: { value },
    } = event;
    setPasswordError({ password: "" });
    let regNumber = new RegExp("^(?=.*[0-9])").test(value);
    let regLength = new RegExp("^(?=.{8,})").test(value);
    let regUpperAlphabet = new RegExp("^(?=.*[A-Z])").test(value);
    let regLowerAlphabet = new RegExp("^(?=.*[a-z])").test(value);
    if (newPassword == "") {
      setPasswordError({ password: `${Messages.REQUIRED_FIELD}` })
    }
    else if (!regNumber) {
      setPasswordError({ password: "Must be one digit" });
    }
    else if (!regLowerAlphabet) {
      setPasswordError({ password: "Must be one lower characters" });
    }
    else if (!regUpperAlphabet) {
      setPasswordError({ password: "Must be one upper characters" });
    }
    else if (!regLength) {
      setPasswordError({ password: `${Messages.PASSWORD_LENGTH}` });
    }
  };
  const handleConfirmPassword = (event: any) => {
    const {
      target: { value },
    } = event;
    setConfirmPasswordError({ confirmPassword: "" });
    let regNumber = new RegExp("^(?=.*[0-9])").test(value);
    let regLength = new RegExp("^(?=.{8,})").test(value);
    let regUpperAlphabet = new RegExp("^(?=.*[A-Z])").test(value);
    let regLowerAlphabet = new RegExp("^(?=.*[a-z])").test(value);
    if (confirmPassword == "") {
      setConfirmPasswordError({ confirmPassword: `${Messages.REQUIRED_FIELD}` })
    }
    else if (!regNumber) {
      setConfirmPasswordError({ confirmPassword: "Must be one digit" });
    }
    else if (!regLowerAlphabet) {
      setConfirmPasswordError({ confirmPassword: "Must be one lower characters" });
    }
    else if (!regUpperAlphabet) {
      setConfirmPasswordError({ confirmPassword: "Must be one upper characters" });
    }
    else if (!regLength) {
      setPasswordError({ password: `${Messages.PASSWORD_LENGTH}` });
    }
    else if (oldPassword === newPassword) {
      setSamePassword("Try again with a password you haven't used before");
    }
  };

  const handleOpen = () => {
    // let data: any = {
    //   username: username,
    // };
    // dispatch(fetchPassword(data));
    setOpen(true);
  };

  const myActionCreator = (user: any) => {
    return new Promise((resolve, reject) => {
      dispatch(resetPwd(user));

      resolve('Dispatch Done');
    });
  }

  const handleSubmit = () => {
    if (newPassword !== confirmPassword) {
      Swal.fire({
        customClass: {
          container: 'my-swal'
        },
        position: "center",
        icon: "error",
        title: "Password Does not match",
        showConfirmButton: false,
        showCloseButton: true
      })
    }
    else {
      let user: any = {
        id: appUser.id,
        oldpassword: oldPassword,
        newpassword: newPassword,
      };
      setSamePassword("");
      setSubmit(true)
      myActionCreator(user)
      // .then(() => {
      //   Swal.fire({
      //     position: "center",
      //     icon: "success",
      //     title: `${Messages.FORM_SUBMITTED_SUCESSFULLY}`,
      //     showConfirmButton: false,
      //     allowOutsideClick: false,
      //     timer: 3000,
      //   }).then((willSubmitted) => {
      //     if (willSubmitted) {
      //       history.push("/user");
      //       // return <Redirect to='/user'  />
      //     }
      //   });
      // })
      // dispatch(resetPwd(user));
    }
  };

  useEffect(() => {
    if (formState.isSuccess === true && submit === true) {
      Swal.fire({
        customClass: {
          container: 'my-swal'
        },
        position: "center",
        icon: "success",
        title: `${Messages.PWD_CHANGED_SUCCESS}`,
        showConfirmButton: false,
        allowOutsideClick: false,
        timer: 3000,
      }).then((willSubmitted) => {
        if (willSubmitted) {
          history.push("/user");
          // return <Redirect to='/user'  />
        }
      });
    }
  }, [formState]);

  // return (
  //   <>
  //     <Button
  //     className="submitBUttonCss"
  //       onClick={handleOpen}
  //       type="submit"
  //       variant="contained"
  //       color="primary"
  //     >
  //       <DoneIcon className="icons confmIcon" />
  //       <span className="spanForSubmit">YES,TAKE ME THERE</span>
  //     </Button>
  //     <Modal open={open} className="confirmPasswordModal">
  //       <Card className="card-ConfirmPassword"
  //       >
  //         <Grid >
  //           <Grid className="displayFlexCss">
  //             <Grid xs={12}> 
  //               <img src={Optiplay} className="optiplayHeight"/>
  //             </Grid>
  //             <Grid>
  //               <div className="CloseBtn" onClick={handleClose}>
  //                 <span><CloseIcon className="cursorPointCss"/></span>
  //               </div>
  //             </Grid>
  //           </Grid>
  //         </Grid>
  //         <Grid container >
  //           <Grid item xs={2} >
  //             <img src={user} className="imgUser"/>
  //           </Grid>
  //           <Grid item xs={3}></Grid>
  //           <Grid item xs={7}>
  //             <Typography
  //             className="lblenterNewPass"

  //             >
  //               <b>Enter the new password</b>
  //               <br></br>
  //               <br></br>
  //             </Typography>
  //             <Typography className="Passwordcss">
  //             <span  className="paddingLeft10">Old Password</span>
  //               <TextField
  //                 className="box"
  //                 // name="password"
  //                 inputProps={inputMin}
  //                 size="small"
  //                 variant="outlined"
  //                 required={true}
  //                 type="password"
  //                 onChange={(e) => setOldPassword(e.target.value)}
  //                 value={oldPassword}
  //                 error={Boolean(oldPasswordError?.oldPassword)}
  //                 helperText={oldPasswordError?.oldPassword}
  //                 onBlur={handleOldPassword}
  //               />
  //             </Typography>

  //             <Typography className="Passwordcss">
  //               <span className="paddingLeft10">New Password</span>

  //               <TextField
  //                 className="box"
  //                 size="small"
  //                 variant="outlined"
  //                 inputProps={inputMin}
  //                 type="password"
  //                 onChange={(e) => setNewPassword(e.target.value)}
  //                 value={newPassword}
  //                 error={Boolean(passwordError?.password)}
  //                 helperText={passwordError?.password}
  //                 onBlur={handlePassword}
  //               />
  //             </Typography>

  //             <Typography className="Passwordcss" >
  //             <span className="paddingLeft10">Confirm Password</span>

  //               <TextField
  //                 className="box"
  //                 size="small"
  //                 variant="outlined"

  //                 type="password"
  //                 inputProps={inputMin}
  //                 onChange={(e) => setConfirmPassword(e.target.value)}
  //                 value={confirmPassword}
  //                 error={Boolean(confirmPasswordError?.confirmPassword)}
  //                 helperText={confirmPasswordError?.confirmPassword}
  //                 onBlur={handleConfirmPassword}
  //               />
  //             </Typography>
  //             {samePassword!==""?<span className="redColor" >{samePassword}</span>:<></>}
  //             <br/>
  //             <div>
  //               {(formState.isError===true && errorMessage!="" && submit==true) ? <div className="redColor textAlign">{errorMessage}</div>:<></>}
  //             </div>
  //             <Grid className="padding50" style={{marginBottom: "16px"}}>
  //             <Button 
  //               onClick={handleSubmit}
  //               className="saveButton"
  //               type="submit"
  //               variant="contained"
  //               color="primary"
  //             >
  //               <DoneIcon fontSize="inherit"  className="icons confmIcon" />
  //               <span className="fontSize12">SAVE</span>
  //             </Button>
  //             <Button
  //               onClick={handleClose}

  //               variant="outlined"
  //               className="bttn"                
  //             >
  //               <CloseIcon fontSize="inherit"  className="icons confmIcon" />
  //               <span className="fontSize12" >CANCEL</span>
  //             </Button>
  //             </Grid>
  //           </Grid>
  //         </Grid>
  //       </Card>
  //     </Modal>
  //   </>
  // );


  return (
    <>
      <Button
        className="submitBUttonCss"
        onClick={handleOpen}
        type="submit"
        variant="contained"
        color="primary"
      >
        <DoneIcon className="icons" />
        <span className="spanForSubmit fontSize12">YES,TAKE ME THERE</span>
      </Button>
      <Modal open={open} className="confirmPasswordModal">
        <Card className="card-ConfirmPassword confirm-password card-position">
          <Grid container className="displayFlexCss">
            <Grid item xs={2}>
              <img src={Optiplay} className="height120" />
            </Grid>
            <Grid item xs={2} className="CloseBtn close-icon" onClick={handleClose}>
              <CloseIcon className="cursorPointCss" />
            </Grid>
          </Grid>
          <Grid container className="displayFlexCss">
            <Grid item xs={4} md={4}>
              <img src={user} className="userImg" />
            </Grid>
            <Grid item xs={8} md={8} className="content">
              <Grid container className="margins">
                <Typography>
                  <strong>Enter the new Password</strong>
                </Typography>
              </Grid>
              <Grid container className="margins">
                <Grid container>
                  <Typography>
                    Old Password
                  </Typography>
                </Grid>
                <Grid container>
                  <TextField
                    className="box text-field-border1"
                    // name="password"
                    inputProps={inputMin}
                    size="small"
                    variant="outlined"
                    required={true}
                    type="password"
                    onChange={(e) => setOldPassword(e.target.value)}
                    value={oldPassword}
                    error={Boolean(oldPasswordError?.oldPassword)}
                    helperText={oldPasswordError?.oldPassword}
                    onBlur={handleOldPassword}
                  />
                </Grid>
              </Grid>
              <Grid container className="margins">
                <Grid container>
                  <Typography>
                    New Password
                  </Typography>
                </Grid>
                <Grid container>
                  <TextField
                    className="box text-field-border1"
                    size="small"
                    variant="outlined"
                    inputProps={inputMin}
                    type="password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                    error={Boolean(passwordError?.password)}
                    helperText={passwordError?.password}
                    onBlur={handlePassword}
                  />
                </Grid>
              </Grid>
              <Grid container className="margins">
                <Grid container>
                  <Typography>
                    Confirm Password
                  </Typography>
                </Grid>
                <Grid container>
                  <TextField
                    className="box text-field-border1"
                    size="small"
                    variant="outlined"
                    type="password"
                    inputProps={inputMin}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    error={Boolean(confirmPasswordError?.confirmPassword)}
                    helperText={confirmPasswordError?.confirmPassword}
                    onBlur={handleConfirmPassword}
                  />
                  {samePassword !== "" ? <span className="redColor" >{samePassword}</span> : <></>}
                </Grid>
                {(formState.isError === true && errorMessage != "" && submit == true) ? <div style={{marginTop:"2%", marginLeft:"2%"}} className="redColor textAlign">{errorMessage}</div> : <></>}
              </Grid>
            </Grid>
            <Grid container className="buttonGrid button-grid">
              <Button
                onClick={handleSubmit}
                className="saveButtonn"
                type="submit"
                variant="contained"
                color="primary"
              >
                <DoneIcon fontSize="inherit" className="icons" />
                <span className="fontSize12">SAVE</span>
              </Button>
              <Button
                onClick={handleClose}
                variant="outlined"
                className="bttn"
              >
                <CloseIcon fontSize="inherit" className="icons" />
                <span className="fontSize12" >CANCEL</span>
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Modal>
    </>
  )


};
