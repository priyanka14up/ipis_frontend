import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import HelpIcon from "@material-ui/icons/Help";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import OptiPlayLogo from "../../assets/images/opti-play-logo.svg";
import RailwayLogo from "../../assets/images/indian-railway-logo.svg";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../redux/actions/authUser/authUser";
import { authuserStateSelector } from "../../redux/reducers/authUser/authUser";
import { useEffect } from "react";
import InnobitSystemsLogo from "../../assets/images/innobit_systems.svg";
import { Tooltip, Typography, withStyles, CircularProgress, InputAdornment, IconButton } from "@material-ui/core";
import { Messages } from "../../constants/messages";
import { Redirect, useHistory } from "react-router-dom";
import { Visibility, VisibilityOff } from "@material-ui/icons";


const InfoTooltip = withStyles({
  tooltip: {
    backgroundColor: "#009688",
  }
})(Tooltip)
interface State {
  showPassword: boolean;
}

export const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoggedIn, authToken, formState, errorMessage } = useSelector(
    authuserStateSelector
  );

  //   const [username, setUsername] = useState("");
  //   const [password, setPassword] = useState("");

  const [userInput, setUserInput] = useState({
    username: "",
    password: "",
    showPassword: false,
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
    if (userInput.username == "") {
      setUserNameError({ username: "Enter your email or mobile phone number" });
    }
    var emailTrue: boolean = userInput?.username.includes("@")
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})|([0-9]{10})+$/;
    if (!value.match(emailRegex)) {
      setUserNameError({ username: 'Not a valid Email/Mobile' })
    }

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

  const handleChange = (e: any) => {
    var { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };


  const handleSubmit = (name: any, password: any) => {
    var userInput = {
      username: name,
      password: password,
    };
    dispatch(authenticate(userInput));
  };

  useEffect(() => {
    if (formState.isSuccess && isLoggedIn) {
      history.push("/onlineTrain");
    }
  });
  const handleClickShowPassword = () => {
    setUserInput({
      ...userInput,
      showPassword: !userInput.showPassword,
    });
  };
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <>
      {/* <Grid container>
        <Grid
          container
          className="mainHeader"
        ></Grid>
        <Grid
          container
          style={{ alignItems: "center", height: "78vh", padding: "10px" }}
        >
          <Grid item xs={6}>
            <Grid item style={{ textAlign: "center" }}>
              <img src={OptiPlayLogo} />
            </Grid>
            <Grid item style={{ textAlign: "center" }}>
              <span className="login-project-title">
                INTEGRATED PASSENGER INFORMATION SYSTEM
              </span>
            </Grid>
            <Grid item style={{ textAlign: "center", marginTop: "20px" }}>
              {" "}
              <img src={RailwayLogo} />
            </Grid>
            <Grid item style={{ textAlign: "center", paddingTop: "20px" }}>
              <span
                className="login-project-title"
                style={{ fontSize: "16px" }}
              >
                INDIAN RAILWAYS
              </span>
            </Grid>
          </Grid>
          <Divider
            style={{ height: "50%", color: "#033733" }}
            orientation="vertical"
            variant="middle"
          />
          <Grid item xs={5}>
            <form>
              <Grid style={{ marginLeft: "100px", marginBottom: "5px" }}>
                <span className="login_text">Email or Mobile Number </span>
                <Grid item xs={9} className="margLoginText">
                  <TextField
                    className="login_txtfield"
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    name="username"
                    required={true}
                    value={userInput.username}
                    error={Boolean(userNameError?.username)}
                    helperText={userNameError?.username}
                    onChange={handleChange}
                    onBlur={handleUserName}
                  />
                </Grid>
                <Grid item xs={3}></Grid>
              </Grid>
              <br></br>
              <Grid style={{ marginLeft: "100px" }}>
                <span className="login_text">Password</span>
                <Grid container alignItems="center">
                  <Grid item xs={9} className="margLoginText">
                    <TextField
                      className="login_txtfield"
                      size="small"
                      id="outlined-basic"
                      variant="outlined"
                      type={userInput.showPassword ? 'text' : 'password'}
                      name="password"
                      value={userInput.password}
                      required={true}
                      error={Boolean(passwordError?.password)}
                      helperText={passwordError?.password}
                      onChange={handleChange}
                      onBlur={handlePassword}
                      InputProps={{
                        endAdornment: <InputAdornment position='start'>
                          <IconButton
                            className="eyecolor"
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {userInput.showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }}
                    />
                  </Grid>
                  <Grid item xs={3} style={{ fontSize: "35px", display: 'contents' }}>
                    <InfoTooltip title={passwordMessage} placement="top" >
                      <HelpIcon
                        style={{ color: "#009688", marginLeft: "19px" }}
                      />
                    </InfoTooltip>
                  </Grid>
                </Grid>
              </Grid>
              <br></br> */}
      {/* <br></br> */}
      {/* {formState.loading === false ?(<div><Grid style={{ textAlign:"center"}}>Redirecting...<CircularProgress /></Grid></div>) : */}
      {/* <Grid style={{ alignItems: "center", textAlign: "center", marginRight: "73px" }}>
                <Button
                  disabled={
                    !userInput.username || !userInput.password
                  }
                  size="medium"
                  variant="outlined"
                  style={{ background: "#009688", color: "white" }}
                  onClick={() => handleSubmit(userInput.username, userInput.password)}
                  className="bttnlogin"
                >
                  Login
                </Button>
              </Grid>
              <Grid style={{ padding: "25px" }}>
                {errorMessage != "" ? (
                  <div style={{ textAlign: "center", color: "red", marginRight: "9" }}>
                    {errorMessage}
                  </div>
                ) : (
                  <></>
                )}
              </Grid>
            </form>
          </Grid>
        </Grid>
        <Grid
          container
          className="mainFooter"
        >
          <Grid style={{ alignItems: "center", display: "flex" }}>
            <img src={InnobitSystemsLogo} />
            <Typography
              style={{ color: "white", fontSize: "12px", paddingLeft: "10px" }}
            >
              POWERED BY INNOBIT SYSTEMS
            </Typography>
          </Grid>
        </Grid>
      </Grid> */}
      <Grid container className="maincont">
        <Grid item xs={12} className="mainHeader"></Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <Grid container className="justifycontaint">
                <img src={OptiPlayLogo} />
              </Grid>
              <Grid container className="justifycontaint mrgn40">
                <span className="login-project-title">
                  INTEGRATED PASSENGER INFORMATION SYSTEM
                </span>
              </Grid>
              <Grid container className="justifycontaint mrgn40">
                {" "}
                <img src={RailwayLogo} />
              </Grid>
              <Grid container className="justifycontaint margLoginText20">
                <span
                  className="login-project-title"
                  style={{ fontSize: "16px" }}
                >
                  INDIAN RAILWAYS
                </span>
              </Grid>

            </Grid>
            <Grid item xs={1}>
              <Divider
                style={{ height: "100%", color: "#033733" }}
                orientation="vertical"
                variant="middle"
              />
            </Grid>
            <Grid item xs={5}>
              <Grid container>
                <form className="width100">
                  <Grid item xs={8} className="login_text margLoginText">Email or Mobile Number </Grid>
                  <Grid item xs={8} className="margLoginText">
                    <TextField
                      className="login_txtfield"
                      size="small"
                      id="outlined-basic"
                      variant="outlined"
                      name="username"
                      required={true}
                      value={userInput.username}
                      error={Boolean(userNameError?.username)}
                      helperText={userNameError?.username}
                      onChange={handleChange}
                      onBlur={handleUserName}
                    />
                  </Grid>
                  <Grid item xs={8} className="login_text2">Password</Grid>
                  <Grid item xs={12} className="margLoginText">
                    <Grid container className="margLoginText">
                      <Grid item xs={8}>
                        <TextField
                          className="login_txtfield"
                          size="small"
                          id="outlined-basic"
                          variant="outlined"
                          type={userInput.showPassword ? 'text' : 'password'}
                          name="password"
                          value={userInput.password}
                          required={true}
                          error={Boolean(passwordError?.password)}
                          helperText={passwordError?.password}
                          onChange={handleChange}
                          onBlur={handlePassword}
                          InputProps={{
                            endAdornment: <InputAdornment position='start'>
                              <IconButton
                                className="eyecolor"
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {userInput.showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }}
                        />
                      </Grid>
                      <Grid item xs={1}> <InfoTooltip title={passwordMessage} placement="top" >
                        <HelpIcon
                          className="help"
                        />
                      </InfoTooltip></Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={8} className="inoLoginBtn margLoginText">
                    {/* formState.loading === false ? (<div><Grid style={{ textAlign: "center" }}>Redirecting...<CircularProgress /></Grid></div>) : */}
                    <Button
                      disabled={
                        !userInput.username || !userInput.password
                      }
                      size="medium"
                      variant="outlined"
                      style={{ background: "#009688", color: "white", marginTop:"52px" }}
                      onClick={() => handleSubmit(userInput.username, userInput.password)}
                      className="bttnlogin"
                    >
                      Login
                    </Button>
                  </Grid>
                  <Grid item xs={8} className="margLoginText">
                    {errorMessage != "" ? (
                      <div className="errorLogin">
                        {errorMessage}
                      </div>
                    ) : (
                      <></>
                    )}
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Grid >
        </Grid >
        {/* <Grid item xs={12} className="mainHeader2">
          <Grid container>
            <Grid item xs={6} className="innoBitFooter1">
              <img src={InnobitSystemsLogo} />
            </Grid>
            <Grid item xs={6} className="alignSelfCenter padngl">
              <Typography
                className="innoBitFooter2"
              >
                POWERED BY INNOBIT SYSTEMS
              </Typography>
            </Grid>
          </Grid>
        </Grid> */}

        <Grid item xs={12} className="mainHeader2">
          <Grid container className="innoBitFooter1">
          <img src={InnobitSystemsLogo} />
          <Typography
            className="innoBitFooter2"
          >
            POWERED BY INNOBIT SYSTEMS
          </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
