import { Grid } from "@material-ui/core"
import { useState } from "react";
import { AppHeader } from "../common/app-header"
import { CdsDevice } from "./cdsDevices";
import { LinkSideBar } from "./linkSidebar";
import { PdcDevice } from "./pdcDevices";
import "./style.css";

export enum LinkStatusPages {
    CDS_DEVICES = "cdsDevices",
    PDC_DEVICES = "pdcDevices",
}

export const LinkStatus = () => {
    const [linkSideBarMenu, setLinkSideBarMenu] = useState(LinkStatusPages.CDS_DEVICES);
    const [loading, setLoading] = useState<boolean>(false);
    const updateLinkSideBarMenu = (menu: LinkStatusPages) => {
        setLinkSideBarMenu(menu);
    }

    return (
        <>
            {/* <Grid>
                <AppHeader />
            </Grid> */}
            {/* <Grid container style={{ padding: "15px", background: "#E5E5E5" }}>
                <Grid xs={2}>
                    <LinkSideBar updateLinkSideBarMenu={updateLinkSideBarMenu} />
                </Grid>
                <Grid xs={10}>
                    {(linkSideBarMenu === LinkStatusPages.CDS_DEVICES) ? (
                        <CdsDevice loading={loading} setLoading={setLoading}/>
                    ) : <></>
                    }
                    {(linkSideBarMenu === LinkStatusPages.PDC_DEVICES) ? (
                        <PdcDevice />
                    ) : <></>
                    }
                </Grid>
            </Grid> */}

            <Grid container  className="mainIndex">
                <Grid item xs={2}>
                    <LinkSideBar updateLinkSideBarMenu={updateLinkSideBarMenu} />
                </Grid>
                <Grid item xs={10}>
                    {(linkSideBarMenu === LinkStatusPages.CDS_DEVICES) ? (
                        <CdsDevice loading={loading} setLoading={setLoading} />
                    ) : <></>
                    }
                    {(linkSideBarMenu === LinkStatusPages.PDC_DEVICES) ? (
                        <PdcDevice />
                    ) : <></>
                    }
                </Grid>
            </Grid>
        </>
    )
}