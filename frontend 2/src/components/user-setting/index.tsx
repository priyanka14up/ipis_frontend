
import { AppHeader } from "../common/app-header";
import { userStateSelector } from '../../redux/reducers/user-profile/userProfile';
import { Button, Card, CardContent, Grid, Typography, CircularProgress } from "@material-ui/core";
import "./style.css";
import { CommonTable } from "../common/table/table";
import { useSelector } from 'react-redux';
import { EditUser } from './editUser';
import { AddUser } from "./addUser";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUserDetails, fetchUsers } from "../../redux/actions/userListAction";
import { userListSelector } from "../../redux/reducers/userList/userListReducer";
import { removeUser } from "../../redux/actions/user-profile/userProfile";
import Loader from "./loader";
import { authuserStateSelector } from "../../redux/reducers/authUser/authUser";
import Swal from "sweetalert2";
import { Helps } from "../help";
import { Redirect, useHistory } from "react-router-dom";

enum RoleType {
  'ROLE_SUPER ADMIN' = "3",
  'ROLE_ADMIN' = "2",
  'ROLE_STATION MASTER' = "1",
  'ROLE_OPERATOR' = "0",

}

export const User = () => {
  const { appUser } = useSelector(authuserStateSelector)

  const [selectedView, setSelectedView] = useState("add")
  const dispatch = useDispatch()
  const { users, selectedUser } = useSelector(userListSelector)
  const { formState } = useSelector(userListSelector)

  useEffect(() => {
    if (appUser.userRole === "ROLE_ADMIN" || appUser.userRole === "ROLE_SUPER ADMIN" || appUser.userRole === "ROLE_STATION MASTER") {
      dispatch(fetchUsers())
    }
    else {
      dispatch(fetchUserDetails(appUser.id))
    }
  }, [])

  const onSelect = (id: number) => {
    setSelectedView("edit")
    dispatch(fetchUserDetails(id))
  }

  const onChoose = (user: any) => {
    dispatch(removeUser(user))
  }

  let history = useHistory();
  useEffect(() => {
    if (appUser.userRole == "ROLE_OPERATOR") {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Operation not allowed please contact admin",
        showConfirmButton: false,
        allowOutsideClick: false,
        timer: 3000,
      })
        .then(() => {
          history.push("/help")
        })
    }
  }, [appUser.userRole])

  // return (

  //   <>
  //     {(formState.loading === true) ? (<div className="userIndexCss" ><Grid className="userSettingIndexCss1">Redirecting...<CircularProgress /></Grid></div>) :
  //       (
  //         <>
  //           {appUser.userRole == "ROLE_OPERATOR" ? <></> :
  //             <Grid container className="userSettingIndexCss2">
  //               <Grid item className="userSettingGridWidth">
  //                 <Card className="userSettingIndexCss3">
  //                   <CardContent>
  //                     <Grid item>
  //                       <Typography variant="body1" className="selectuser">
  //                         Select User
  //                       </Typography>
  //                       <Typography variant="body2" className="su1" >
  //                         Select User to Edit Profile, or Delete Account or Add a New User
  //                       </Typography>
  //                     </Grid>
  //                     <br></br>
  //                     <Grid>
  //                       <br></br>
  //                       <CommonTable userList={users} onSelect={onSelect} onChoose={onChoose} />
  //                       <br></br>
  //                     </Grid>
  //                     <br></br>
  //                     <Grid container className="addUserButton">
  //                       {(selectedView === "edit" && appUser.userRole != "ROLE_OPERATOR") ?
  //                         <Button variant="contained" className="addusebttn" onClick={() => setSelectedView("add")}>
  //                           <span> ADD A NEW USER </span>
  //                         </Button> :
  //                         null}
  //                     </Grid>
  //                   </CardContent>
  //                 </Card>
  //               </Grid>
  //               <Grid item className="userSettingIndexCss4">
  //                 {(selectedView === "edit") ?
  //                   <EditUser user={selectedUser} /> :
  //                   <AddUser state="hello" />}

  //               </Grid>

  //             </Grid>}
  //         </>
  //       )
  //     }
  //   </>
  // );


  return (
    <>
      {(formState.loading === true) ? (<div className="userIndexCss" ><Grid className="userSettingIndexCss1">Redirecting...<CircularProgress /></Grid></div>) :
        (
          <>
            {appUser.userRole == "ROLE_OPERATOR" ? <></> :
              <Grid container className="index1">
                <Grid item xs={3} className="index2">
                  <Card className="card1 card">

                    <Grid container
                      className="addNewUser"
                    >
                      <Typography
                        variant="body1"
                        className="add-new-user"
                      >
                        Select User
                      </Typography>
                    </Grid>
                    <Grid container className="setUserSettings">
                      <Typography
                        variant="body2"
                        className="select-user"
                      >
                        Select User to Edit Profile, or Delete Account or Add a New User
                      </Typography>
                    </Grid>
                    <Grid container>
                      <CommonTable userList={users} onSelect={onSelect} onChoose={onChoose} className="table"/>
                    </Grid>
                    <Grid container className="addUserButton">
                      {(selectedView === "edit" && appUser.userRole != "ROLE_OPERATOR") ?
                        <Button variant="contained" className="addusebttn" onClick={() => setSelectedView("add")}>
                          <span> ADD A NEW USER </span>
                        </Button> :
                        null}
                    </Grid>
                  </Card>
                </Grid>
                <Grid item xs={9} className="index">
                  {(selectedView === "edit") ?
                    <EditUser user={selectedUser} /> :
                    <AddUser state="hello" />}
                </Grid>
              </Grid>
            }
          </>
        )
      }

    </>
  )


};
