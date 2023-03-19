import "./index.scss";
import "./App.scss";
import { Login } from "./components/auth";
import { Report } from "./components/report";
import { Helps } from "./components/help";
import { ResetPassword } from "../src/components/passwordChange/index";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { authuserStateSelector } from "./redux/reducers/authUser/authUser";
import { CheckVerified } from "./checkVerification";
import { User } from "./components/user-setting";
import { Interface } from "./components/interface";
import { Setup } from "./components/setup";
import { Message } from "./components/message";
import { Display } from "./components/display";
import { LinkStatus } from "./components/link-status";
import { PublicAnnouncement } from "./components/publicAnnouncement";
import { OnlineTrain } from "./components/onlineTrain/onlineTrainIndex";
import { UserAdmin } from "./components/UserAdmin";
import { AppHeader } from "./components/common/app-header";
import { Grid } from "@material-ui/core";
import { useState } from "react";

function App() {
  const { isLoggedIn } = useSelector(authuserStateSelector);
  const [regionalLanguage,setRegionalLanguage] = useState<any>("Regional");

  return (
    <div className="App">
      <BrowserRouter>
        {isLoggedIn ?
          <>
            {<Grid>
              {" "}
              <AppHeader />
            </Grid>}
          </>
          : <></>}
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/resetPassword">
            <ResetPassword />
          </Route>
        </Switch>
        {
          isLoggedIn ?
          <div className="MainContainer">
            <Switch>
              <Route path="/user" component={User}>
                <User />
              </Route>
              <Route path="/interface">
                <Interface />
              </Route>
              <Route path="/report">
                <Report />
              </Route>
              <Route path="/interface">
                <Interface />
              </Route>
              <Route path="/setup">
                <Setup regionalLanguage={regionalLanguage} setRegionalLanguage={setRegionalLanguage}/>
              </Route>
              <Route path="/help">
                <Helps />
              </Route>
              <Route path="/display">
                <Display />
              </Route>
              <Route path="/linkStatus">
                <LinkStatus />
              </Route>
              <Route path="/publicAnnoucement">
                <PublicAnnouncement />
              </Route>
              <Route path="/onlineTrain">
           
                <OnlineTrain />
              
             
              </Route>
              <Route path="/message">
                <Message regionalLanguage={regionalLanguage}/>
              </Route>
              <Route path="/userAdmin">
                <UserAdmin />
              </Route>
            </Switch>
            </div>
            :
            <Redirect to="/login" />
        }
      </BrowserRouter>
    </div>
  );
}

export default App;
