
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { ResetPassword } from "./components/passwordChange";
import { Report } from "./components/report";
import { User } from "./components/user-setting";
import { authuserStateSelector } from "./redux/reducers/authUser/authUser";
import { getUserPermission, getVerified } from "./utility/appUtil";


export const CheckVerified = () => {

    const verified = getVerified()

    if ( verified=="false"){
        <Redirect to="/help"/>
    }
    else{
        // getUserPermission({"userRole": 'ROLE_ADMIN'})
        <Redirect to="/user"/>

    }
    
    
    // return (
    //     <Switch>
    //         {(verified === "false") ? (
    //             <Redirect to="/help"/>
    //             ) :
    //             (getUserPermission({"userRole": 'ROLE_ADMIN'}))
    //         }
    //     </Switch>
    // );
};
