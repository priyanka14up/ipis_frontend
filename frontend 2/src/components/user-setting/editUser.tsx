import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Tooltip,
  withStyles,
  Checkbox,
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/actions/user-profile/userProfile";
import Swal from "sweetalert2";
import { userStateSelector } from "../../redux/reducers/user-profile/userProfile";
import { clearState } from "../../redux/reducers/userList/userListReducer";
import { authuserStateSelector } from "../../redux/reducers/authUser/authUser";
import { Messages } from "../../constants/messages";
import InfoIcon from "@material-ui/icons/Info";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Redirect } from "react-router-dom";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const InfoTooltip = withStyles({
  tooltip: {
    backgroundColor: "#009688",
  }
})(Tooltip)

export const EditUser = (props: any) => {
  const { user } = props;

  const dispatch = useDispatch();
  const { formState } = useSelector(userStateSelector);
  const { appUser } = useSelector(authuserStateSelector);
  const inputMax = { maxLength: 10 };
  const inputMin = { minLength: 8 };
  const regexMobile = new RegExp(/^[0-9]{10}$/);
  const regName = new RegExp(/^[A-Za-z]+$/);
  const regEmail = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  const [userInput, setUserInput] = useState({
    id: "",
    firstName: "",
    lastName: "",
    password: "",
    userRole: "",
    email: "",
    mobileNo: "",
    confirmPassword: "",
    userPermisssions: [],
    showPassword: false,
    showConfirmPassword: false,
  });
  interface state {
    showPassword: boolean;
    showConfirmPassword: boolean;
  }

  const [firstNameError, setFirstNameError] =
    React.useState<{ firstName: string }>();
  const [lastNameError, setLastNameError] =
    React.useState<{ lastName: string }>();
  const [passwordError, setPasswordError] =
    React.useState<{ password: String }>();
  const [confirmPasswordError, setConfirmPasswordError] =
    React.useState<{ confirmPassword: String }>();
  const [submit, setSubmit] = useState(false);

  const permits = () => {
    if (userInput && userInput.userPermisssions && userInput.userPermisssions.length > 0) {
      return userInput.userPermisssions.map((el: any, index: any) => {
        return (
          <>
            <Grid item xs={4}>
              <Checkbox
                // className="checkbox"
                disabled
                key={index}
                defaultChecked
                style={{ color: "#033733" }}
                {...el}
              />

              {el} </Grid></>
        )
      })
    }
  }

  const passwordMessage = "Password Should have Minimum 8 characters" + "\n" + "Atleast 1 Uppercase,Lowercase and Numeric character is mandatory"

  const onCancelClick = () => {
    setUserInput({
      // id: user?.id,
      // firstName: user?.firstname,
      // lastName: user?.lastname,
      // password: user?.password,
      // userRole: user?.userRole?.roleText,
      // email: user.email,
      // mobileNo: user.mobileNo,
      // confirmPassword: user?.password,
      // userPermisssions: user?.userPermissions,
      id: user?.id,
      firstName: user?.firstname,
      lastName: user?.lastname,
      password: "",
      userRole: user?.userRole?.id,
      email: user?.email,
      mobileNo: user?.mobileNo,
      confirmPassword: "",
      userPermisssions: user?.userRole?.userPermissions,
      showPassword: false,
      showConfirmPassword: false,
    });
  };

  const handleFirstName = (event: any) => {
    const {
      target: { value },
    } = event;
    setFirstNameError({ firstName: "" });
    let regA = new RegExp(/^[A-Za-z]+$/).test(value);
    if (userInput.firstName == "") {
      setFirstNameError({ firstName: `${Messages.REQUIRED_FIELD}` })
    }
    else if (!regA) {
      setFirstNameError({ firstName: `${Messages.ALPHABETS_ERROR}` });
    }
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
  const handleLastName = (event: any) => {
    const {
      target: { value },
    } = event;
    setLastNameError({ lastName: "" });
    let regA = new RegExp(/^[A-Za-z]+$/).test(value);
    if (userInput.lastName == "") {
      setLastNameError({ lastName: `${Messages.REQUIRED_FIELD}` })
    }
    else
      if (!regA) {
        setLastNameError({ lastName: `${Messages.ALPHABETS_ERROR}` });
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
    if (userInput.password == "") {
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
  useEffect(() => {
    setUserInput({
      id: user?.id,
      firstName: user?.firstname,
      lastName: user?.lastname,
      password: "",
      userRole: user?.userRole?.id,
      email: user?.email,
      mobileNo: user?.mobileNo,
      confirmPassword: "",
      userPermisssions: user?.userRole?.userPermissions,
      showPassword: false,
      showConfirmPassword: false,
    });
  }, [user]);
  const handleChange = (e: any) => {
    var { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };
  const handleSubmit = () => {
    if (userInput.password !== userInput.confirmPassword) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${Messages.PWD_AND_CNPWD_DOESNOT_MATCH}`,
        showConfirmButton: false,
        showCloseButton: true
      })
    }
    else if (
      (userInput.userRole == "2" ||
        userInput.userRole == "3") && appUser.userRole == "ROLE_OPERATOR") {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${Messages.OPERATOR_MESSAGE}`,
        showConfirmButton: false,
        showCloseButton: true
      }).then((willSubmitted) => {
        if (willSubmitted) {
          // window.location.replace("/user");
        }
      });
    }
    else if (
      userInput.userRole == "2" && appUser.userRole == "ROLE_STATION MASTER") {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${Messages.OPERATOR_MESSAGE}`,
        showConfirmButton: false,
        showCloseButton: true
      })
    }
    else if (appUser.userRole == "ROLE_STATION MASTER" && user.userRole.id == "2" && (userInput.userRole == "3" || userInput.userRole == "4")) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${Messages.OPERATOR_MESSAGE}`,
        showConfirmButton: false,
        showCloseButton: true
      })
    }
    else {
      let updatedUser: any = {
        id: user?.id,
        firstName: userInput.firstName,
        lastName: userInput.lastName,
        password: userInput.password,
        userRole: userInput.userRole,
        email: userInput.email,
        mobileNo: userInput.mobileNo,
        userPermissions: userInput.userPermisssions,
      };
      setSubmit(true);
      dispatch(updateUser(updatedUser));
    }
  };
  const handleClean = () => {
    setUserInput({
      id: "",
      firstName: "",
      lastName: "",
      password: "",
      userRole: "",
      email: "",
      mobileNo: "",
      confirmPassword: "",
      userPermisssions: [],
      showPassword: false,
      showConfirmPassword: false,
    });
  };

  useEffect(() => {
    if (formState.isSuccess === true && submit === true) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${Messages.UPDATED_SUCESSFULLY}`,
        showConfirmButton: false,
        allowOutsideClick: false,
        timer: 3000,
      }).then((willSubmitted) => {
        if (willSubmitted) {
          window.location.replace("/user");
          // return <Redirect to='/user' />
        }
      });
    }
  }, [formState.isSuccess]);

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);
  window.onbeforeunload = () => {
    dispatch(clearState());
  };
  // return (
  //   <>
  //     {/* {
  //       (formState.loading === true) ? (<CircularProgress />) : (
  //         <> */}
  //           <Grid>
  //             <Card className="cardFirstCss">
  //               <CardContent>
  //                 <Grid item>
  //                   <Typography variant="body1" className="selectuser">
  //                     Edit the Current User
  //                   </Typography>
  //                   <Typography variant="body2" className="su1">
  //                     Set user settings .
  //                   </Typography>
  //                 </Grid>
  //                 <Grid container className="contain editGridCss1">
  //                 <Grid item className="editUserWidhth1">
  //                     </Grid>
  //                   <Grid item className="su2 editUserWidhth2">
  //                     First Name<span className="asterisk">*</span>
  //                   </Grid>
  //                   <Grid item className="editUserWidhth3">
  //                   <TextField
  //                         size="small"
  //                         name="firstName"
  //                         className="box"
  //                         variant="outlined"
  //                         required={true}
  //                         error={Boolean(firstNameError?.firstName)}
  //                         value={userInput.firstName}
  //                         onBlur={handleFirstName}
  //                         helperText={firstNameError?.firstName}
  //                         onChange={handleChange}
  //                       />
  //                   </Grid>
  //                   <Grid item className="editUserWidhth4">
  //                   </Grid>
  //                   <Grid item className="su2 editUserWidhth5">
  //                     Last Name<span className="asterisk">*</span>
  //                   </Grid>
  //                   <Grid item className="editUserWidhth6" >
  //                     <TextField
  //                         className="box"
  //                         name="lastName"
  //                         size="small"
  //                         variant="outlined"
  //                         required={true}
  //                         error={Boolean(lastNameError?.lastName)}
  //                         value={userInput.lastName}
  //                         helperText={lastNameError?.lastName}
  //                         onBlur={handleLastName}
  //                         onChange={handleChange}
  //                       />
  //                   </Grid>
  //                   <Grid item className="editUserWidhth7">
  //                   </Grid>
  //                   </Grid>
  //                   <Grid container className="contain">
  //                   <Grid item className="editUserWidhth8">
  //                     </Grid>
  //                   <Grid item className="su2 editUserWidhth9">
  //                     Password<span className="asterisk">*</span>
  //                   </Grid>
  //                   <Grid item className="editUserWidhth10">
  //                   <TextField
  //                         className="box"
  //                         name="password"
  //                         inputProps={inputMin}
  //                         size="small"
  //                         variant="outlined"
  //                         required={true}
  //                         type={userInput.showPassword ? 'text' : 'password'}
  //                         onChange={handleChange}
  //                         value={userInput.password}
  //                         error={Boolean(passwordError?.password)}
  //                         helperText={passwordError?.password}
  //                         onBlur={handlePassword}
  //                         InputProps={{
  //                           endAdornment: (
  //                           <InputAdornment position="end">
  //                             <IconButton
  //                              className="eyecolor eyesize"
  //                              onClick={handleClickShowPassword}
  //                              onMouseDown={handleMouseDownPassword}>
  //                              {userInput.showPassword ?<VisibilityOff />:<Visibility />}
  //                             </IconButton>
  //                           </InputAdornment>
  //                           )
  //                         }}
  //                       />
  //                   </Grid>
  //                   <Grid item className="editUserWidhth11" >
  //                         <InfoTooltip title={passwordMessage} placement="top">
  //                         <InfoIcon className="editUserInfoToolTipCss"/>
  //                       </InfoTooltip>
  //                   </Grid>
  //                   <Grid item className="su2 editUserWidhth12">
  //                     Confirm Password<span className="asterisk">*</span>
  //                   </Grid>
  //                   <Grid item className="editUserWidhth13">
  //                   <TextField
  //                         className="box"
  //                         name="confirmPassword"
  //                         size="small"
  //                         variant="outlined"
  //                         type={userInput.showConfirmPassword ? 'text' : 'password'}
  //                         inputProps={inputMin}
  //                         required={true}
  //                         error={Boolean(confirmPasswordError?.confirmPassword)}
  //                         helperText={confirmPasswordError?.confirmPassword}
  //                         onBlur={handleConfirmPassword}
  //                         onChange={handleChange}
  //                         value={userInput.confirmPassword}
  //                         InputProps={{
  //                           endAdornment: (
  //                           <InputAdornment position="end">
  //                             <IconButton        
  //                              className="eyecolor eyesize"                       
  //                              onClick={handleClickShowConfirmPassword}
  //                              onMouseDown={handleMouseDownPassword}>
  //                              {userInput.showConfirmPassword ?<VisibilityOff />:<Visibility />}
  //                             </IconButton>
  //                           </InputAdornment>
  //                           )
  //                         }}
  //                       />
  //                   </Grid>
  //                   <Grid item className="editUserWidhth14" >
  //                   </Grid>
  //                   </Grid>
  //                   <Grid container className="contain">
  //                     <Grid item className="editUserWidhth15">
  //                     </Grid>
  //                   <Grid item  className="su2 editUserWidhth16">
  //                     Email ID<span className="asterisk">*</span>
  //                   </Grid>
  //                   <Grid item className="editUserWidhth17">
  //                   <TextField
  //                         disabled
  //                         className="box"
  //                         name="email"
  //                         size="small"
  //                         variant="outlined"
  //                         required={true}
  //                         value={userInput.email}
  //                         onChange={handleChange}
  //                       />
  //                   </Grid>
  //                   <Grid item className="su2 editUserWidhth18">
  //                     Mobile Number<span className="asterisk">*</span>
  //                   </Grid>
  //                   <Grid item className="editUserWidhth19">
  //                   <TextField
  //                         disabled
  //                         className="box"
  //                         name="mobileNo"
  //                         size="small"
  //                         variant="outlined"
  //                         type="text"
  //                         inputProps={inputMax}
  //                         required={true}
  //                         onChange={handleChange}
  //                         value={userInput.mobileNo}
  //                       />
  //                   </Grid>
  //                   <Grid item className="editUserWidhth20" >
  //                   </Grid>
  //                   </Grid>
  //                   <Grid container className="contain">
  //                   <Grid item className="su2 editUserWidhth21">
  //                   Select User Type
  //                   </Grid>
  //                   <Grid item className="editUserWidhth22" >
  //                     <select
  //                         name="userRole"
  //                         className="select__field"
  //                         required={true}
  //                         value={userInput.userRole}
  //                         onChange={handleChange}
  //                       >
  //                         <option value="userRole" selected>
  //                           Select
  //                         </option>
  //                         <option value={2}>Admin</option>
  //                         <option value={3}>Station Master</option>
  //                         <option value={4}>Operator</option>
  //                       </select>
  //                   </Grid>
  //                   </Grid>
  //                 <Grid>
  //                 <Grid item className="su2 editUserWidhth23">
  //                   User Permissions
  //                   </Grid>
  //                   <br />
  //                 </Grid >
  //                 <Grid className="editUserCssTextAlign" >
  // {permits()}
  //                 </Grid>
  //                 <br/>
  //                 <br></br>
  //                 <Grid container className="addUserButton">
  //                   <div>
  //                     <Button
  //                       disabled={
  //                         (regexMobile.test(userInput.mobileNo)==false) || 
  //                         (regName.test(userInput.firstName)==false) ||
  //                         !userInput.password ||
  //                         (regEmail.test(userInput.email)==false) ||
  //                         (regName.test(userInput.lastName)==false) ||
  //                         !userInput.confirmPassword ||
  //                         !userInput.userRole
  //                       }
  //                       onClick={handleSubmit}
  //                       type="submit"
  //                       className="bttnSave"
  //                       variant="contained"
  //                     >
  //                       <DoneIcon className="icon" />
  //                       <span className="btnfont">Save</span>
  //                     </Button>
  //                   </div>
  //                   <Button
  //                     variant="outlined"
  //                     className="bttnCancle"
  //                     onClick={() => onCancelClick()}
  //                   >
  //                     <CloseIcon className="icon" />
  //                     <span className="btnfont">Cancel</span>
  //                   </Button>
  //                 </Grid>
  //               </CardContent>
  //             </Card>
  //           </Grid>
  //        {/* </>
  //       )}  */}
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
            Edit the Current User
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
          <Grid item xs={5} className="item1">
            <Grid container spacing={2}>
              <Grid item xs={3} md={6} xl={4} className="alignmenttt">
                <Typography className="alignmentt">
                  First Name<span className="asterisk">*</span>
                </Typography>

              </Grid>
              <Grid item xs={9} md={6} xl={8}>
                <TextField
                  className="textfieldArea user-textField"
                  size="small"
                  name="firstName"
                  variant="outlined"
                  required={true}
                  error={Boolean(firstNameError?.firstName)}
                  value={userInput.firstName}
                  onBlur={handleFirstName}
                  helperText={firstNameError?.firstName}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={5} className="ml-50">
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
          <Grid item xs={5} >
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
                  className="textfieldArea user-textField"
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
          <Grid item xs={5} className="ml-35">
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
          <Grid item xs={5} >
            <Grid container spacing={2}>
              <Grid item xs={3} md={6} xl={4} className="alignmenttt">
                <Typography className="alignmentt">
                  Email ID<span className="asterisk">*</span>
                </Typography>

              </Grid>
              <Grid item xs={9} md={6} xl={8}>
                <TextField
                  disabled
                  className="textfieldArea user-textField"
                  name="email"
                  size="small"
                  variant="outlined"
                  required={true}
                  // error={Boolean(emailError?.email)}
                  value={userInput.email}
                  // helperText={emailEr<select
                  //                         name="userRole"
                  //                         className="select__field"
                  //                         required={true}
                  //                         value={userInput.userRole}
                  //                         onChange={handleChange}
                  //                       >
                  //                         <option value="userRole" selected>
                  //                           Select
                  //                         </option>
                  //                         <option value={2}>Admin</option>
                  //                         <option value={3}>Station Master</option>
                  //                         <option value={4}>Operator</option>
                  //                       </select>ror?.email}
                  // onBlur={handleEmail}
                  onChange={handleChange}>
                </TextField>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={5} className="ml-50">
            <Grid container spacing={2}>
              <Grid item xs={3} md={6} xl={4} className="alignmenttt">
                <Typography className="alignmentt">
                  Mobile Number<span className="asterisk">*</span>
                </Typography>
              </Grid>
              <Grid item xs={9} md={6} xl={8}>
                <TextField
                  disabled
                  className="textfieldArea user-textField"
                  name="mobileNo"
                  size="small"
                  variant="outlined"
                  type="text"
                  inputProps={inputMax}
                  required={true}
                  // error={Boolean(error?.mobileNo)}
                  // helperText={error?.mobileNo}
                  // onBlur={handleMobileNo}
                  onChange={handleChange}
                  value={userInput.mobileNo}>

                </TextField>
              </Grid>

            </Grid>

          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={5} >
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
                  value={userInput.userRole}
                  onChange={handleChange}
                >
                  <option value="userRole" selected>
                    Select
                  </option>
                  <option value={2}>Admin</option>
                  <option value={3}>Station Master</option>
                  <option value={4}>Operator</option>
                </select>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className="user-permissions">
          <Typography
            variant="body1"
            className="user-control-font"
          >
            User Permissions
          </Typography>
        </Grid>
        <Grid container>
          {permits()}
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
            // onClick={handleCancel}
            onClick={() => onCancelClick()}
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

