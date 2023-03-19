import Help from "../../../assets/images/help.svg";
import Interface from "../../../assets/images/interface.svg";
import LinkStatus from "../../../assets/images/linkstatus.svg";
import Message from "../../../assets/images/message.svg";
import OnlineTrain from "../../../assets/images/onlineTrain.svg";
import PublicAnnouncement from "../../../assets/images/publicAnnouncement.svg";
import Report from "../../../assets/images/report.svg";
import SetUp from "../../../assets/images/setup.svg";
import UserControl from "../../../assets/images/userControl.svg";
import TvDisplay from "../../../assets/images/tvdisplay.svg";
import "./style.scss";
import { NavLink } from "react-router-dom";
import { Grid } from "@material-ui/core";

export const MenuBar = () => {
    return (
        <>
            <Grid container style={{ height: "100%" }}>
                <Grid item xs={2} md={2} lg={2} xl={2} className="tabs">
                    <NavLink exact activeClassName="selected"
                        className="menu_text" to="/onlineTrain"><img src={OnlineTrain} className="menu_image" />Online Trains</NavLink>
                </Grid>
                <Grid item xs={1} md={1} lg={1} xl={1} className="tabs">
                    <NavLink exact activeClassName="selected"
                        className="menu_text" to="/linkStatus"><img src={LinkStatus} className="menu_image" />Link Status</NavLink>
                </Grid>
                <Grid item xs={2} md={2} lg={2} xl={2} className="tabs">
                    <NavLink exact activeClassName="selected"
                        className="menu_text" to="/publicAnnoucement"> <img src={PublicAnnouncement} className="menu_image" />Public Announcement</NavLink>
                </Grid>
                <Grid item xs={1} md={1} lg={1} xl={1} className="tabs">
                    <NavLink exact activeClassName="selected"
                        className="menu_text" to="/display"><img src={TvDisplay} className="menu_image" />TV Display</NavLink>
                </Grid>
                <Grid item xs={1} md={1} lg={1} xl={1} className="tabs">
                    <NavLink exact activeClassName="selected"
                        className="menu_text" to="/message"><img src={Message} className="menu_image" />Message</NavLink>
                </Grid>
                <Grid item xs={1} md={1} lg={1} xl={1} className="tabs">
                    <NavLink exact activeClassName="selected"
                        className="menu_text" to="/setup"><img src={SetUp} className="menu_image" />Setup</NavLink>
                </Grid>
                <Grid item xs={1} md={1} lg={1} xl={1} className="tabs">
                    <NavLink exact activeClassName="selected"
                        className="menu_text" to="/interface"><img src={Interface} className="menu_image" />Interface </NavLink>
                </Grid>
                <Grid item xs={1} md={1} lg={1} xl={1} className="tabs">
                    <NavLink exact activeClassName="selected"
                        className="menu_text" to="/user"> <img src={UserControl} className="menu_image" />User Control</NavLink >
                </Grid>
                <Grid item xs={1} md={1} lg={1} xl={1} className="tabs">
                    <NavLink exact activeClassName="selected"
                        className="menu_text" to="/report"> <img src={Report} className="menu_image" />Reports</NavLink>
                </Grid>
                <Grid item xs={1} md={1} lg={1} xl={1} className="tabs">
                    <NavLink exact activeClassName="selected"
                        className="menu_text" to="/help"> <img src={Help} className="menu_image" />Help</NavLink>
                </Grid>
            </Grid>



            
            {/* <div style={{ width: "11%" }} className="tabs">  <NavLink exact activeClassName="selected"
                className="menu_text" to="/onlineTrain"><img src={OnlineTrain} className="menu_image" />Online Trains</NavLink>
            </div>
            <div style={{ width: "10%" }} className="tabs"> <NavLink exact activeClassName="selected"
                className="menu_text" to="/linkStatus"><img src={LinkStatus} className="menu_image" />Link Status</NavLink>
            </div>
            <div style={{ width: "15%" }} className="tabs"><NavLink exact activeClassName="selected"
                className="menu_text" to="/publicAnnoucement"> <img src={PublicAnnouncement} className="menu_image" />Public Announcement</NavLink>
            </div>
            <div style={{ width: "10%" }} className="tabs"> <NavLink exact activeClassName="selected"
                className="menu_text" to="/display"><img src={TvDisplay} className="menu_image" />TV Display</NavLink>
            </div>
            <div style={{ width: "9%" }} className="tabs"> <NavLink exact activeClassName="selected"
                className="menu_text" to="/message"><img src={Message} className="menu_image" />Message</NavLink>
            </div>
            <div style={{ width: "7%" }} className="tabs"> <NavLink exact activeClassName="selected"
                className="menu_text" to="/setup"><img src={SetUp} className="menu_image" />Setup</NavLink>
            </div>
            <div style={{ width: "9%" }} className="tabs"> <NavLink exact activeClassName="selected"
                className="menu_text" to="/interface"><img src={Interface} className="menu_image" />Interface </NavLink>
            </div>
            <div style={{ width: "11%" }} className="tabs"> <NavLink exact activeClassName="selected"
                className="menu_text" to="/user"> <img src={UserControl} className="menu_image" />User Control</NavLink >
            </div>
            <div style={{ width: "7%" }} className="tabs"> <NavLink exact activeClassName="selected"
                className="menu_text" to="/report"> <img src={Report} className="menu_image" />Reports</NavLink>
            </div>
            <div style={{ width: "7%" }} className="tabs"> <NavLink exact activeClassName="selected"
                className="menu_text" to="/help"> <img src={Help} className="menu_image" />Help</NavLink>
            </div> */}
        </>
    )
}