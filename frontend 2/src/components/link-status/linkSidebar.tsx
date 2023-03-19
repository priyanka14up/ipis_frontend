import { Button, Card, Grid, Table, TableRow, Typography } from "@material-ui/core"
import { useState } from "react";
import { LinkStatusPages } from ".";

export const LinkSideBar = (props: any) => {

    const [selectedMenu, setSelectedMenu] = useState(LinkStatusPages.CDS_DEVICES);

    function handleClick(menuName: LinkStatusPages) {
        props.updateLinkSideBarMenu(menuName);
        setSelectedMenu(menuName)
    }

    return (
        <>
            {/* <Card className="Linksidecardstyle">
           <Typography className="linkchecktext1">
                Check Link Status
           </Typography>
           <Table>
           <TableRow className={`cdsDeviceButtonstyle1 ${(selectedMenu == LinkStatusPages.CDS_DEVICES) ? "linkMenuRowActive" : ""}`}>
                    <Button className="deviceButtonTextStyle" onClick={() => handleClick(LinkStatusPages.CDS_DEVICES)} >
                        Check link status of Central Data Switch
                        <br/>
                        <br/>
                        CDS DEVICES
                    </Button>
                </TableRow>
                <TableRow className={`cdsDeviceButtonstyle2 ${(selectedMenu == LinkStatusPages.PDC_DEVICES) ? "linkMenuRowActive" : ""}`}>
                    <Button className="deviceButtonTextStyle" onClick={() => handleClick(LinkStatusPages.PDC_DEVICES)}>
                        Check link status of Platform Data Controller
                        <br />
                        <br />
                        PDC DEVICES
                    </Button>
                </TableRow>
           </Table>
        </Card> */}

            <Card className="Linksidecardstyle">
                <Grid container>
                    <Grid item xs={12}>
                        <Typography className="linkchecktext1">
                            Check Link Status
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container>
                    <Table>
                        <Grid item xs={12}>
                            <TableRow className={`cdsDeviceButtonstyle1 ${(selectedMenu == LinkStatusPages.CDS_DEVICES) ? "linkMenuRowActive" : ""}`}>
                                <Button className="deviceButtonTextStyle" onClick={() => handleClick(LinkStatusPages.CDS_DEVICES)} >
                                    Check link status of Central Data Switch
                                    <br />
                                    <br />
                                    CDS DEVICES
                                </Button>
                            </TableRow>
                        </Grid>
                        <Grid item xs={12}>
                            <TableRow className={`cdsDeviceButtonstyle2 ${(selectedMenu == LinkStatusPages.PDC_DEVICES) ? "linkMenuRowActive" : ""}`}>
                                <Button className="deviceButtonTextStyle" onClick={() => handleClick(LinkStatusPages.PDC_DEVICES)}>
                                    Check link status of Platform Data Controller
                                    <br />
                                    <br />
                                    PDC DEVICES
                                </Button>
                            </TableRow>
                        </Grid>
                    </Table>
                </Grid>
            </Card>
        </>
    )
}