import { Button, Card, Table, TableRow, Typography } from "@material-ui/core"
import { Height } from "@material-ui/icons";
import { useState } from "react";
import { UserAdminPages } from ".";
import adminProfilePic from "../../assets/images/profilePic.png"


export const AdminSideBar = (props: any) => {
    const [selectedMenu, setSelectedMenu] = useState(UserAdminPages.USER_PROFILE);

    function handleClick(menuName: UserAdminPages) {
        props.updateAdminSideBarMenu(menuName);
        setSelectedMenu(menuName)
    }
    return (
        <>
            <Card className="adminSideCard">
                <div className="ProfilePic">
                    <img src={adminProfilePic} style={{ width: "160px", height: "160px" }} />
                </div>
                <Typography className="imgCard">
                    Admin Name
                </Typography>
                <Table>
                    <TableRow className={`adminSidebarBtnColor1 ${(selectedMenu == UserAdminPages.USER_PROFILE) ? "adminSidebarBtnColor2" : ""}`}>
                        <Button className="adminSidebarBtnStyle" onClick={() => handleClick(UserAdminPages.USER_PROFILE)} >
                            User Profile
                        </Button>
                    </TableRow>
                    <TableRow className={`adminSidebarBtnColor1 ${(selectedMenu == UserAdminPages.SETTINGS) ? "adminSidebarBtnColor2" : ""}`}>
                        <Button className="adminSidebarBtnStyle" onClick={() => handleClick(UserAdminPages.SETTINGS)}>
                            Settings
                        </Button>
                    </TableRow>
                    <TableRow className={`adminSidebarBtnColor1 ${(selectedMenu == UserAdminPages.ANNOUNCE_MASTER_DATA) ? "adminSidebarBtnColor2" : ""}`}>
                        <Button className="adminSidebarBtnStyle" onClick={() => handleClick(UserAdminPages.ANNOUNCE_MASTER_DATA)}>
                            Announcement Master Data
                        </Button>
                    </TableRow>
                </Table>
            </Card>
        </>
    )
}