import { Grid } from "@material-ui/core"
import { useState } from "react";
import { AppHeader } from "../common/app-header"
import { AdminSideBar } from "./adminSideBar"
import { AnnouncementMasterData } from "./AnnounceMasterData";
import { Setting } from "./settings";
import "./style.css";
import { UserProfile } from "./userProfile";
import {CreateMessage} from "./createMsg";
export enum UserAdminPages {
    USER_PROFILE = "userProfile",
    SETTINGS = "settings",
    ANNOUNCE_MASTER_DATA = "announceMasterData",
}

export const UserAdmin = () => {

    const [adminSideBarMenu, setAdminSideBarMenu] = useState(UserAdminPages.USER_PROFILE);

    const updateAdminSideBarMenu = (menu: UserAdminPages) => {
        setAdminSideBarMenu(menu);
    }

    return (
        <>
            {/* <Grid>
                {" "}
                <AppHeader />
            </Grid> */}
            <Grid container style={{ padding: "15px", background: "#E5E5E5" }}>
                <Grid item xs={2}>
                    <AdminSideBar  updateAdminSideBarMenu={updateAdminSideBarMenu}/>
                </Grid>
                <Grid item xs={10}>
                    {/* {(adminSideBarMenu === UserAdminPages.USER_PROFILE) ? (
                        <UserProfile />
                    ) : <></>
                    }
                    {(adminSideBarMenu === UserAdminPages.SETTINGS) ? (
                        <Setting />
                    ) : <></>
                    }
                     {(adminSideBarMenu === UserAdminPages.ANNOUNCE_MASTER_DATA) ? (
                        <AnnouncementMasterData />
                    ) : <></>
                    } */}

                    <CreateMessage />

                </Grid>
            </Grid>
        </>
    )
}