import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Tooltip,
  withStyles,
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../redux/actions/user-profile/userProfile";
import { useEffect } from "react";
import {
  clearState,
  userStateSelector,
} from "../../redux/reducers/user-profile/userProfile";
import Swal from "sweetalert2";
import { Messages } from "../../constants/messages";
import InfoIcon from "@material-ui/icons/Info";
import { Redirect } from "react-router";
import { authuserStateSelector } from "../../redux/reducers/authUser/authUser";
import { useHistory } from "react-router-dom";
import { fetchUsers } from "../../redux/actions/userListAction";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const InfoTooltip = withStyles({
  tooltip: {
    backgroundColor: "#009688",
  }
})(Tooltip)

enum RoleType {
  'ROLE_SUPER ADMIN' = "3",
  'ROLE_ADMIN' = "2",
  'ROLE_STATION MASTER' = "1",
  'ROLE_OPERATOR' = "0",
}
export const AddUser = (props: any) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState();
  const { appUser } = useSelector(authuserStateSelector);
  const { formState, addUser, errorMessage } = useSelector(userStateSelector);
  const regexMobile = new RegExp(/^[0-9]{10}$/);
  const regName = new RegExp(/^[A-Za-z]+$/);
  const regEmail = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);


  const state = {
    firstName: "",
    lastName: "",
    password: "",
    userRole: "",
    email: "",
    mobileNo: "",
    confirmPassword: "",
    errormsg3: "Error msghjj"
  };
  const inputMax = { maxLength: 10 };
  const inputMin = { minLength: 8 };
  const [userInput, setUserInput] = useState({
    firstName: "",
    lastName: "",
    password: "",
    userRole: "",
    email: "",
    mobileNo: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  const [error, setError] = React.useState<{ mobileNo: string }>();
  const [firstNameError, setFirstNameError] =
    React.useState<{ firstName: string }>();
  const [lastNameError, setLastNameError] =
    React.useState<{ lastName: string }>();
  const [emailError, setEmailError] = React.useState<{ email: string }>();
  const [passwordError, setPasswordError] =
    React.useState<{ password: String }>();
  const [confirmPasswordError, setConfirmPasswordError] =
    React.useState<{ confirmPassword: String }>();
  const [clearErrorMsg, setClearErrorMsg] =
    React.useState<{ clearErrsg: String }>();
  const [submit, setSubmit] = useState(false);
  const [value, setValue] = React.useState("");
  var flag = 0;
  const passwordMessage = "Password Should have minimum eight characters atleast one uppercase and numeric character"
  const handleMobileNo = (event: any) => {

    const {
      target: { value },
    } = event;
    setError({ mobileNo: "" });
    let reg = new RegExp(/^[0-9]\d*$/).test(value);
    let regx = new RegExp(/^\d{10}$/).test(value);

    if (userInput.mobileNo == "") {
      setError({ mobileNo: `${Messages.REQUIRED_FIELD}` })
    }
    else if (!reg) {
      setError({ mobileNo: `${Messages.MOBILE_NUMBER}` });
    }
    else if (!regx) {
      setError({ mobileNo: `${Messages.MOBILE_LENGTH}` });
    }
  };
  const handleFirstName = (event: any) => {
    const {
      target: { value },
    } = event;
    setFirstNameError({ firstName: "" });
    let regA = new RegExp(/^[^-\s_\W][A-Za-z\s]*$/).test(value);
    if (userInput.firstName == "") {
      setFirstNameError({ firstName: `${Messages.REQUIRED_FIELD}` })
    }
    else if (!regA) {
      setFirstNameError({ firstName: `${Messages.ALPHABETS_ERROR}` });
    }
  };
  const handleLastName = (event: any) => {
    const {
      target: { value },
    } = event;
    setLastNameError({ lastName: "" });
    let regA = new RegExp(/^[^-\s_\W][A-Za-z\s]*$/).test(value);
    if (userInput.lastName == "") {
      setLastNameError({ lastName: `${Messages.REQUIRED_FIELD}` })
    }
    else
      if (!regA) {
        setLastNameError({ lastName: `${Messages.ALPHABETS_ERROR}` });
      }
  };
  const handleEmail = (event: any) => {
    const {
      target: { value },
    } = event;
    setEmailError({ email: "" });
    // let regA = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])").test(value);

    let regA = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value);
    if (userInput.email == "") {
      setEmailError({ email: `${Messages.REQUIRED_FIELD}` })
    }
    else
      if (!regA) {
        setEmailError({ email: "Not a valid Email" });
      }


  };
  const handlePassword = (event: any) => {
    const {
      target: { value },
    } = event;
    setPasswordError({ password: "" });
    let regNumber = new RegExp(/^(?=[a-zA-Z0-9]{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).*/).test(value);
    if (userInput.password == "") {
      setPasswordError({ password: `${Messages.REQUIRED_FIELD}` })
    }
    else if (!regNumber) {
      setPasswordError({ password: "Invalid Password " });
    }

  }; const handleConfirmPassword = (event: any) => {
    const {
      target: { value },
    } = event;
    setConfirmPasswordError({ confirmPassword: "" });
    let regNumber = new RegExp(/^(?=.*[0-9])/).test(value);
    let regLength = new RegExp(/^(?=.{8,})/).test(value);
    let regUpperAlphabet = new RegExp(/^(?=.*[A-Z])/).test(value);
    let regLowerAlphabet = new RegExp(/^(?=.*[a-z])/).test(value);
    if (userInput.confirmPassword == "") {
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
      setConfirmPasswordError({ confirmPassword: `${Messages.PASSWORD_LENGTH}` });
    }
  };
  const handleChange = (e: any) => {
    var { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };
  const handleClickShowPassword = () => {
    setUserInput({
      ...userInput,
      showPassword: !userInput.showPassword,
    });
  };
  const handleClickShowConfirmPassword = () => {
    setUserInput({
      ...userInput,
      showConfirmPassword: !userInput.showConfirmPassword,
    });
  };
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = () => {
    if (userInput.password !== userInput.confirmPassword) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Password Does not match",
        showConfirmButton: false,
        showCloseButton: true
      })
    } else {
      let user: any = {
        firstName: userInput.firstName,
        lastName: userInput.lastName,
        password: userInput.password,
        userRole: userInput.userRole,
        email: userInput.email,
        mobileNo: userInput.mobileNo,
      };
      setSubmit(true);
      dispatch(createUser(user));
    }
  };

  const handleCancel = () => {
    // errormsg1=""
    // erromsg2=""
    setUserInput({
      firstName: "",
      lastName: "",
      password: "",
      userRole: "",
      email: "",
      mobileNo: "",
      confirmPassword: "",
      showPassword: false,
      showConfirmPassword: false,
    });
    flag++
    // console.log(erromsg2);

    // console.log(errormsg1)
    console.log(flag);
    console.log(errorMessage);
    console.log(formState)
    console.log(addUser)
  }

  useEffect(() => {
    if (formState.isSuccess === true && submit === true) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${Messages.FORM_SUBMITTED_SUCESSFULLY}`,
        showConfirmButton: false,
        allowOutsideClick: false,
        timer: 3000,
      }).then((willSubmitted) => {
        if (willSubmitted) {
          setUserInput({
            firstName: "",
            lastName: "",
            password: "",
            userRole: "",
            email: "",
            mobileNo: "",
            confirmPassword: "",
            showPassword: false,
            showConfirmPassword: false,
          });
          dispatch(fetchUsers())
        }
      });
    }
  }, [formState.isError, formState.isSuccess]);

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);


  // return (
  //   <>
  //     <Grid>
  //       <Card className="cardHeightCss">
  //         <CardContent>
  //           <Grid item className="title">
  //             <Typography variant="body1" className="selectuser">
  //               Add a new User
  //             </Typography>
  //             <Typography variant="body2" className="su1">
  //               Set user settings .
  //             </Typography>
  //           </Grid>
  //           <Grid container className="contain padditTopGridCss">
  //             <Grid item className="widthChildGrid">
  //             </Grid>
  //             <Grid item className="su2 widthSuperChldGrid">
  //               First Name<span className="asterisk">*</span>
  //             </Grid>
  //             <Grid item className="widthSuperChldGrid-two">
  //               <TextField
  //                 size="small"
  //                 name="firstName"
  //                 className="box1 box"
  //                 variant="outlined"
  //                 required={true}
  //                 error={Boolean(firstNameError?.firstName)}
  //                 value={userInput.firstName}
  //                 onBlur={handleFirstName}
  //                 helperText={firstNameError?.firstName}
  //                 onChange={handleChange}
  //               />
  //             </Grid>

  //             <Grid item className="su2 GridWidthCss1">
  //               Last Name<span className="asterisk">*</span>
  //             </Grid>
  //             <Grid item className="GridWidthCss2">
  //               <TextField
  //                 className="box1 box"
  //                 name="lastName"
  //                 size="small"
  //                 variant="outlined"
  //                 required={true}
  //                 error={Boolean(lastNameError?.lastName)}
  //                 value={userInput.lastName}
  //                 helperText={lastNameError?.lastName}
  //                 onBlur={handleLastName}
  //                 onChange={handleChange}
  //               />
  //             </Grid>
  //             <Grid item className="GridWidthCss3">
  //             </Grid>
  //           </Grid>
  //           <Grid container className="contain">
  //             <Grid item className="GridWidthCss4">
  //             </Grid>
  //             <Grid item className="su2 GridWidthCss5">
  //               Password<span className="asterisk">*</span>
  //             </Grid>
  //             <Grid item className="GridWidthCss6">
  //               <TextField
  //                 className="box"
  //                 name="password"
  //                 inputProps={inputMin}
  //                 size="small"
  //                 variant="outlined"
  //                 required={true}
  //                 type={userInput.showPassword ? 'text' : 'password'}
  //                 onChange={handleChange}
  //                 value={userInput.password} size="small"
  //                 name="firstName"
  //                 className="box1 box"
  //                 variant="outlined"
  //                 required={true}
  //                 error={Boolean(firstNameError?.firstName)}
  //                 value={userInput.firstName}
  //                 onBlur={handleFirstName}
  //                 helperText={firstNameError?.firstName}
  //                 onChange={handleChange}
  //                 error={Boolean(passwordError?.password)}
  //                 helperText={passwordError?.password}
  //                 onBlur={handlePassword}
  //                 InputProps={{
  //                   endAdornment: (
  //                     <InputAdornment position="end">
  //                       <IconButton
  //                         className="eyecolor eyesize"
  //                         onClick={handleClickShowPassword}
  //                         onMouseDown={handleMouseDownPassword}>
  //                         {userInput.showPassword ? <VisibilityOff /> : <Visibility />}
  //                       </IconButton>
  //                     </InputAdornment>
  //                   )
  //                 }}
  //               />
  //               <Grid item className="GridWidthCss7" >
  //                 <InfoTooltip title={passwordMessage} placement="top">
  //                   <InfoIcon className="infoToolTipCss" />
  //                 </InfoTooltip>
  //               </Grid>
  //             </Grid>
  //             <Grid item className="GridWidthCss7" >
  //             </Grid>

  //             <Grid item className="su2 GridWidthCss9">
  //               Confirm Password<span className="asterisk">*</span>
  //             </Grid>
  //             <Grid item className="GridWidthCss8">
  //               <TextField
  //                 className="box"
  //                 name="confirmPassword"
  //                 size="small"
  //                 variant="outlined"
  //                 type={userInput.showConfirmPassword ? 'text' : 'password'}
  //                 inputProps={inputMin}
  //                 required={true}
  //                 error={Boolean(confirmPasswordError?.confirmPassword)}
  //                 helperText={confirmPasswordError?.confirmPassword}
  //                 onBlur={handleConfirmPassword}
  //                 onChange={handleChange}
  //                 value={userInput.confirmPassword}
  //                 InputProps={{
  //                   endAdornment: (
  //                     <InputAdornment position="end">
  //                       <IconButton
  //                         className="eyecolor eyesize"
  //                         onClick={handleClickShowConfirmPassword}
  //                         onMouseDown={handleMouseDownPassword}>
  //                         {userInput.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
  //                       </IconButton>
  //                     </InputAdornment>
  //                   )
  //                 }}
  //               />
  //             </Grid>
  //             <Grid item className="GridWidthCss10" >
  //             </Grid>
  //           </Grid>


  //           <Grid container className="contain">
  //             <Grid item className="GridWidthCss11">
  //             </Grid>
  //             <Grid item className="su2 GridWidthCss12">
  //               Email ID<span className="asterisk">*</span>
  //             </Grid>
  //             <Grid item className="GridWidthCss13">
  //               <TextField
  //                 className="box"
  //                 name="email"
  //                 size="small"
  //                 variant="outlined"
  //                 required={true}
  //                 error={Boolean(emailError?.email)}
  //                 value={userInput.email}
  //                 helperText={emailError?.email}
  //                 onBlur={handleEmail}
  //                 onChange={handleChange}
  //               />
  //             </Grid>
  //             <Grid item className="su2 GridWidthCss14">
  //               Mobile Number<span className="asterisk">*</span>
  //             </Grid>
  //             <Grid item className="GridWidthCss15" >
  //               <TextField
  //                 className="box"
  //                 name="mobileNo"
  //                 size="small"
  //                 variant="outlined"
  //                 type="text"
  //                 inputProps={inputMax}
  //                 required={true}
  //                 error={Boolean(error?.mobileNo)}
  //                 helperText={error?.mobileNo}
  //                 onBlur={handleMobileNo}
  //                 onChange={handleChange}
  //                 value={userInput.mobileNo}
  //               />
  //             </Grid>
  //             <Grid item className="GridWidthCss16">
  //             </Grid>
  //           </Grid>
  //           <Grid container className="contain">
  //             <Grid item className="su2 GridWidthCss17">
  //               Select User Type
  //             </Grid>
  //             <Grid item className="GridWidthCss18">
  //               <select
  //                 name="userRole"
  //                 className="select__field"
  //                 required={true}
  //                 onChange={handleChange}
  //               >
  //                 {appUser.userRole == "ROLE_STATION MASTER" ? (
  //                   <>
  //                     <option value="" selected>
  //                       Select
  //                     </option>
  //                     <option value="ROLE_STATION MASTER">Station Master</option>
  //                     <option value="ROLE_OPERATOR">Operator</option>
  //                   </>
  //                 ) : (
  //                   <>
  //                     <option value="" selected>
  //                       Select
  //                     </option>
  //                     <option value="ROLE_ADMIN">Admin</option>
  //                     <option value="ROLE_STATION MASTER">Station Master</option>
  //                     <option value="ROLE_OPERATOR">Operator</option>
  //                   </>)}
  //               </select>
  //             </Grid>
  //           </Grid>
  //           <br></br>
  //           <Grid>
  //             <div >
  //               {(formState.isError === true && errorMessage != "" && submit == true) ? <div className="addUserErrorCss" >  {errorMessage} </div> : <></>}
  //             </div>



  //           </Grid>
  //           <Grid container className="addUserButton">
  //             <Button
  //               disabled={
  //                 (regexMobile.test(userInput.mobileNo) == false) ||
  //                 (regName.test(userInput.firstName) == false) ||
  //                 !userInput.password ||
  //                 (regEmail.test(userInput.email) == false) ||
  //                 (regName.test(userInput.lastName) == false) ||
  //                 !userInput.confirmPassword ||
  //                 !userInput.userRole
  //               }
  //               onClick={handleSubmit}
  //               type="submit"
  //               className="bttnSave"
  //               variant="contained"
  //             >
  //               <DoneIcon className="icon" />
  //               <span className="btnfont">Save</span>
  //             </Button>
  //             <Button
  //               type="reset"
  //               value="Reset"
  //               onClick={handleCancel}
  //               variant="outlined"
  //               className="bttnCancle"
  //             >
  //               <CloseIcon className="icon" />
  //               <span className="btnfont">Cancel</span>
  //             </Button>
  //           </Grid>

  //         </CardContent>
  //       </Card>
  //     </Grid>
  //   </>
  // );



  return (
    <>
      <Card className="card">
        <Grid container
          className="addNewUser"
        >
          <Typography
            variant="body1"
            className="add-new-user"
          >
            Add New User
          </Typography>
        </Grid>
        <Grid container className="setUserSettings">
          <Typography
            variant="body2"
            className="set-user-settings"
          >
            Set user Settings
          </Typography>
        </Grid>

        <Grid container className="container">
          <Grid item xs={5} md={5} className="item1">
            <Grid container spacing={2}>
              <Grid item xs={6} md={6} xl={4} className="alignmenttt">
                <Typography className="alignmentt">
                  First Name<span className="asterisk">*</span>
                </Typography>
              </Grid>
              <Grid item xs={6} md={6} xl={8}>
                <TextField size="small"
                  name="firstName"
                  className="textfieldArea user-textField"
                  variant="outlined"
                  required={true}
                  error={Boolean(firstNameError?.firstName)}
                  value={userInput.firstName}
                  onBlur={handleFirstName}
                  helperText={firstNameError?.firstName}
                  onChange={handleChange}>
                
                </TextField>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5} md={5} className="ml-50">
            <Grid container spacing={2}>
              <Grid item xs={3} md={6} xl={4} className="alignmenttt">
                <Typography className="alignmentt">
                  Last Name<span className="asterisk">*</span>
                </Typography>
              </Grid>
              <Grid item xs={9} md={6} xl={8}>
                <TextField
                  className="textfieldArea user-textField"
                  name="lastName"
                  size="small"
                  variant="outlined"
                  required={true}
                  error={Boolean(lastNameError?.lastName)}
                  value={userInput.lastName}
                  helperText={lastNameError?.lastName}
                  onBlur={handleLastName}
                  onChange={handleChange}>
                </TextField>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className="container">
          <Grid item xs={5} md={5}>
            <Grid container spacing={2}>
              <Grid item xs={3} md={6} xl={4} className="alignmenttt">
                <Typography className="alignmentt">
                  Password<span className="asterisk">*</span>
                </Typography>
              </Grid>
              <Grid item xs={9} md={6} xl={8}>
                <TextField
                  name="password"
                  inputProps={inputMin}
                  size="small"
                  variant="outlined"
                  type={userInput.showPassword ? 'text' : 'password'}
                  onChange={handleChange}
                  value={userInput.password}
                  className="textfieldArea password-field user-textField"
                  required={true}
                  error={Boolean(passwordError?.password)}
                  helperText={passwordError?.password}
                  onBlur={handlePassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          className="eyecolor eyesize"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}>
                          {userInput.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>

                    )
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <InfoTooltip title={passwordMessage} placement="top">
            <InfoIcon className="infoToolTipCss" />
          </InfoTooltip>
          {/* <Grid item xs={1} className="tooltip item-width">
            <InfoTooltip title={passwordMessage} placement="top">
              <InfoIcon className="infoToolTipCss" />
            </InfoTooltip>
          </Grid> */}
          <Grid item xs={5} md={5} className="ml-35">
            <Grid container spacing={2}>
              <Grid item xs={3} md={6} xl={4} className="alignmenttt">
                <Typography className="alignmentt">
                  Confirm Password<span className="asterisk">*</span>
                </Typography>
              </Grid>
              <Grid item xs={9} md={6} xl={8}>
                <TextField
                  className="textfieldArea user-textField"
                  name="confirmPassword"
                  size="small"
                  variant="outlined"
                  type={userInput.showConfirmPassword ? 'text' : 'password'}
                  inputProps={inputMin}
                  required={true}
                  error={Boolean(confirmPasswordError?.confirmPassword)}
                  helperText={confirmPasswordError?.confirmPassword}
                  onBlur={handleConfirmPassword}
                  onChange={handleChange}
                  value={userInput.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          className="eyecolor eyesize"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownPassword}>
                          {userInput.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className="container">
          <Grid item xs={5} md={5}>
            <Grid container spacing={2}>
              <Grid item xs={3} md={6} xl={4} className="alignmenttt">
                <Typography className="alignmentt">
                  Email ID<span className="asterisk">*</span>
                </Typography>
              </Grid>
              <Grid item xs={9} md={6} xl={8}>
                <TextField
                  className="textfieldArea user-textField"
                  name="email"
                  size="small"
                  variant="outlined"
                  required={true}
                  error={Boolean(emailError?.email)}
                  value={userInput.email}
                  helperText={emailError?.email}
                  onBlur={handleEmail}
                  onChange={handleChange}>
                </TextField>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5} md={5} className="ml-50">
            <Grid container spacing={2}>
              <Grid item xs={3} md={6} xl={4} className="alignmenttt">
                <Typography className="alignmentt">
                  Mobile Number<span className="asterisk">*</span>
                </Typography>
              </Grid>
              <Grid item xs={9} md={6} xl={8}>
                <TextField
                  className="textfieldArea user-textField"
                  name="mobileNo"
                  size="small"
                  variant="outlined"
                  type="text"
                  inputProps={inputMax}
                  required={true}
                  error={Boolean(error?.mobileNo)}
                  helperText={error?.mobileNo}
                  onBlur={handleMobileNo}
                  onChange={handleChange}
                  value={userInput.mobileNo}>
                </TextField>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={5} md={5}>
            <Grid container spacing={2}>
              <Grid item xs={3} md={6} xl={4} className="alignmenttt">
                <Typography className="alignmentt">
                  Select User Type
                </Typography>
              </Grid>
              <Grid item xs={9} md={6} xl={8}>
                <select
                  name="userRole"
                  className="selectField user-textField"
                  required={true}
                  onChange={handleChange}
                  
                >
                  {appUser.userRole == "ROLE_STATION MASTER" ? (
                    <>
                      <option value="" selected>
                        Select
                      </option>
                      <option value="ROLE_STATION MASTER">Station Master</option>
                      <option value="ROLE_OPERATOR">Operator</option>
                    </>
                  ) : (
                    <>
                      <option value="" selected>
                        Select
                      </option>
                      <option value="ROLE_ADMIN">Admin</option>
                      <option value="ROLE_STATION MASTER">Station Master</option>
                      <option value="ROLE_OPERATOR">Operator</option>
                    </>)}
                </select>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className="buttons">
          <Button
            disabled={
              (regexMobile.test(userInput.mobileNo) == false) ||
              (regName.test(userInput.firstName) == false) ||
              !userInput.password ||
              (regEmail.test(userInput.email) == false) ||
              (regName.test(userInput.lastName) == false) ||
              !userInput.confirmPassword ||
              !userInput.userRole
            }
            onClick={handleSubmit}
            type="submit"
            className="bttnSave btn-w"
            variant="contained"
          >
            <DoneIcon className="icon" />
            <span className="btnfont btn-span">Save</span>
          </Button>
          <Button
            type="reset"
            value="Reset"
            onClick={handleCancel}
            variant="outlined"
            className="bttnCancle btn-w"
          >
            <CloseIcon className="icon" />
            <span className="btnfont btn-span">Cancel</span>
          </Button>

        </Grid>

      </Card>
    </>
  )


};
