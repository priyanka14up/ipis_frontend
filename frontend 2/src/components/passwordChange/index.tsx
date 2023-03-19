import { Button, Card, Icon, Modal } from "@material-ui/core";
import React, { useEffect } from "react";
import {
  Grid,
  Typography,
} from "@material-ui/core";
import Optiplay from "../../assets/images/optiPlay.svg";
import user from "../../assets/images/user.svg";
import CloseIcon from "@material-ui/icons/Close";
import { ConfirmPassword } from "../passwordChange/confirmpassword";
import "./style.css";
import { AppHeader } from "../common/app-header";
import { useDispatch, useSelector } from "react-redux";
import { authuserStateSelector } from "../../redux/reducers/authUser/authUser";
import { setTempVerified } from "../../redux/actions/authUser/authUser";

export const ResetPassword = () => {

  const dispatch = useDispatch();
  let { verified, tempVerified, appUser } = useSelector(authuserStateSelector);
  const [toBeVerify, setToBeVerify] = React.useState(false);

  const handleClose = () => {
    setToBeVerify(false)
    dispatch(setTempVerified(false));
  };

  useEffect(() => {
    if (verified === false && tempVerified === true) {
      setToBeVerify(true);
    }
  }, [toBeVerify])

  // return (
  //   <div>
  //     <Modal open={toBeVerify} className="indexModal">
  //       <Card  className="card-changePasword">
  //         <Grid>
  //           <Grid className="displayFlexCss">
  //             <Grid md={12}>
  //               <img src={Optiplay} className="height120"/>
  //             </Grid>
  //             <Grid>
  //               <div className="CloseBtn" onClick={handleClose}>
  //                 <div><CloseIcon /></div>
  //               </div>
  //             </Grid>
  //           </Grid>
  //           </Grid>
  //           <Grid container >
  //             <Grid item md={2}>
  //               <img src={user} className="userImg"/>
  //             </Grid>
  //             <Grid item md={3}>
  //             </Grid>
  //             <Grid item md={7} className="marginTop">
  //               <Typography className="passwdHlw">
  //                 Hello, <span className="textTransform">{appUser.firstName}</span>
  //               </Typography>
  //               <br />
  //               <br/>
  //               <Typography className="textclass">
  //                 Welcome to the Integrated Passenger Information System,
  //               </Typography>
  //               <Typography className="textclass">
  //                 Would you like to set a new password?
  //               </Typography>
  //               <br/>
  //               <br/>
  //               <Grid className="btn-Sec-changePass">
  //                 <ConfirmPassword />
  //                 <Button
  //                   onClick={handleClose}
  //                   variant="outlined"
  //                   className="maybeLaterButton"
  //                 >
  //                   <CloseIcon fontSize="inherit" className="icons"  />
  //                   <span className="fontSize12">MAYBE LATER</span>
  //                 </Button>
  //               </Grid>
  //             </Grid>
  //           </Grid>
  //       </Card>
  //     </Modal>
  //   </div>
  // )

  return (
    <>
      <Modal open={toBeVerify} className="indexModal">
        <Card className="card-changePasword change-password card-position">
          <Grid container className="displayFlexCss">
            <Grid item xs={2}>
              <img src={Optiplay} className="height120" />
            </Grid>
            <Grid item xs={2} className="CloseBtn close-icon" onClick={handleClose}>
              <CloseIcon/>
            </Grid>
          </Grid>
          <Grid container className="container-content displayFlexCss">
            <Grid item xs={4} md={4}>
              <img src={user} className="userImg" />
            </Grid>
            <Grid item xs={8} md={8} className="greeting-message content">
              <Grid container className="greet">
                <Typography className="passwdHlw">
                  Hello, <span className="textTransform">
                    {appUser.firstName}
                  </span>
                </Typography>
              </Grid>
              <Grid container>
                <Typography className="textclass">
                  Welcome to Integrated Passenger Information System,
                </Typography>
              </Grid>
              <Grid container>
                <Typography className="textclass">
                  Would you like to set a new password?
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container className="buttonGrid">
            <ConfirmPassword />
            <Button
              onClick={handleClose}
              variant="outlined"
              className="maybeLaterButton"
            >
              <CloseIcon fontSize="inherit" className="icons" />
              <span className="fontSize12">MAYBE LATER</span>
            </Button>
          </Grid>
        </Card>
      </Modal>
    </>
  )


};
