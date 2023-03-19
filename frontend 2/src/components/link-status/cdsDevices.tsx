import { Button, Card, CircularProgress, createStyles, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Theme, Typography, withStyles } from "@material-ui/core"
import RefreshIcon from '@material-ui/icons/Refresh';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import LinkStatusService from "../service/linkStatus/linkStatus";
import { useEffect, useState } from "react";
import { formatDate, formatTime } from "../../common/helperMethods";

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }),
)(TableRow);

export const CdsDevice = (props: any) => {

    const linkStatus = new LinkStatusService();
    const { loading, setLoading } = props;
    const [array, setArray] = useState<[]>([]);

    const refershButton = () => {
        setArray([])
        setLoading(true);
        linkStatus.getCdsDevices().then(data => {
            if (data && data.data && data.status == 200) {
                setArray(data.data)
                setLoading(false);
            }
            else {
                setArray([]);
                setLoading(false);
            }
        })
    }

    useEffect(() => {
        setLoading(true);
        linkStatus.getCdsDevices().then(data => {
            if (data && data.data && data.status == 200) {
                setArray(data.data)
                setLoading(false);
            }
            else {
                setArray([]);
                setLoading(false);
            }
        })
    }, [])

    useEffect(() => {
        cdsDevices()
    }, [array])



    const cdsDevices = () => {
        if (array?.length != 0) {
            return (
                array.map((deviceLinkStatus: any, i: any) => {
                    return (
                        <StyledTableRow>
                            <TableCell className="tblcolm">{deviceLinkStatus.deviceType}</TableCell>
                            <TableCell className="tblcolm">{deviceLinkStatus.portNumber}</TableCell>
                            <TableCell className="tblcolm">{deviceLinkStatus.ipAddress}</TableCell>
                            <TableCell className="tblcolm">
                                {deviceLinkStatus.status !== "Disconnected" ? <CheckBoxOutlineBlankIcon className="CheckboxConnectedStyle"></CheckBoxOutlineBlankIcon> : <CheckBoxOutlineBlankIcon className="CheckboxDisconnectedStyle"></CheckBoxOutlineBlankIcon>}
                            </TableCell>
                            <TableCell className="tblcolm">{formatDate(deviceLinkStatus.linkTime)},{formatTime(deviceLinkStatus.linkTime)}</TableCell>
                            <TableCell className="tblcolm">{deviceLinkStatus.response}</TableCell>
                            <TableCell className="tblcolm">{formatDate(deviceLinkStatus.responseTime)},{formatTime(deviceLinkStatus.responseTime)}</TableCell>
                        </StyledTableRow>
                    )
                })
            )
        }
        else {
            return (
                <TableRow>
                    <TableCell colSpan={7} style={{ borderBottom: '0px' }}><span className="cdsNoTable">CDS for this platform doesn't exist.</span></TableCell>
                </TableRow>
            )
        }
    }

    return (
        <>
            {/* <Card className="cdsDeviceCardStyle1">
                <Grid className="cdsDeviceCardStyle2">
                    <Button
                        className="CdsRefreshButton"
                        onClick={refershButton}
                        variant="contained"
                    >
                        <RefreshIcon className="CdsRefreshIconStyle" />
                        <span className="CdsRefreshlabelStyle">Refresh</span>
                    </Button>
                </Grid>
                <Grid> */}
            {/* {array.length === 0 ?(<div style={{display:'flex',justifyContent:"center",alignItems:"center", height: '100vh', position: 'relative', top: '300px'}}><Grid style={{ textAlign:"center", height: '100vh'}}>Redirecting...<CircularProgress /></Grid></div>) : */}
            {/* <TableContainer style={{maxHeight:"65vh"}}>
                        <Table stickyHeader aria-label="sticky table" className="uniqueName">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="cdsTblRow">
                                        CDC device
                                    </TableCell >
                                    <TableCell className="cdsTblRow">
                                        Port
                                    </TableCell>
                                    <TableCell className="cdsTblRow">
                                        IP Address
                                    </TableCell>
                                    <TableCell className="cdsTblRow">
                                        Link
                                    </TableCell>
                                    <TableCell className="cdsTblRow">
                                        Link Time
                                    </TableCell>

                                    <TableCell className="cdsTblRow">
                                        Response
                                    </TableCell>

                                    <TableCell className="cdsTblRow">
                                        Response Time
                                    </TableCell>
                                </TableRow>
                            </TableHead> */}
            {/* {
                                    loading ?
                                        <TableRow>
                                            <TableCell colSpan={7} style={{borderBottom:'0px'}}>
                                            <div style={{display:'flex',justifyContent:"center",alignItems:"center"}}><Grid style={{ textAlign:"center"}}>Loading...<CircularProgress /></Grid></div>

                                            </TableCell>
                                        </TableRow>
                                        :
                                        <TableBody className="tblbdy">
                                            {cdsDevices()}
                                        </TableBody>
                                } */}
            {/* <TableBody className="cdsTblbdy">
                                {cdsDevices()}
                            </TableBody> */}
            {/* </Table>
                    </TableContainer> */}
            {/* } */}
            {/* </Grid>
            </Card> */}



            <Card className="cdsDeviceCardStyle1">
                <Grid container>
                    <Grid item xs={9}></Grid>
                    <Grid item xs={3} className="cdsDeviceCardStyle2">
                        <Button
                            className="CdsRefreshButton"
                            onClick={refershButton}
                            variant="contained"
                        >
                            <RefreshIcon className="CdsRefreshIconStyle" />
                            <span className="CdsRefreshlabelStyle">Refresh</span>
                        </Button>
                    </Grid>
                </Grid>
                <Grid>
                    <Grid container className="cdsTablePadding">
                        {/* {array.length === 0 ?(<div style={{display:'flex',justifyContent:"center",alignItems:"center", height: '100vh', position: 'relative', top: '300px'}}><Grid style={{ textAlign:"center", height: '100vh'}}>Redirecting...<CircularProgress /></Grid></div>) : */}
                        <TableContainer style={{ maxHeight: "65vh" }}>
                            <Table stickyHeader aria-label="sticky table" className="uniqueName">
                                <TableHead style = {{ height : "40px" }}>
                                    <TableRow>
                                        <TableCell className="cdsTblRow">
                                            CDC device
                                        </TableCell >
                                        <TableCell className="cdsTblRow">
                                            Port
                                        </TableCell>
                                        <TableCell className="cdsTblRow">
                                            IP Address
                                        </TableCell>
                                        <TableCell className="cdsTblRow">
                                            Link
                                        </TableCell>
                                        <TableCell className="cdsTblRow">
                                            Link Time
                                        </TableCell>

                                        <TableCell className="cdsTblRow">
                                            Response
                                        </TableCell>

                                        <TableCell className="cdsTblRow">
                                            Response Time
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                {
                                    loading ?
                                        <TableRow>
                                            <TableCell colSpan={7} style={{ borderBottom: '0px' }}>
                                                <div style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}><Grid style={{ textAlign: "center" }}>Loading...<CircularProgress /></Grid></div>

                                            </TableCell>
                                        </TableRow>
                                        :
                                        <TableBody className="tblbdy">
                                            {cdsDevices()}
                                        </TableBody>
                                }
                                {/* <TableBody className="cdsTblbdy">
                                {cdsDevices()}
                            </TableBody> */}
                            </Table>
                        </TableContainer>
                    </Grid>
                    {/* } */}
                </Grid>
            </Card>
        </>
    )
}