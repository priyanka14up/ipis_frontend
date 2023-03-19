import { Button, Card, CircularProgress, createStyles, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Theme, Typography, withStyles } from "@material-ui/core"
import RefreshIcon from '@material-ui/icons/Refresh';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { useEffect, useState } from "react";
import { ElementFlags } from "typescript";
import { el } from "date-fns/locale";
import LinkStatusService from "../service/linkStatus/linkStatus";
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

export const PdcDevice = () => {

    const linkStatus = new LinkStatusService();

    const [array, setArray] = useState<[]>([]);
    const [loading, setLoading] = useState<any>(false);
    const [platformNo, setPlateformNo] = useState("");
    const [platformNoArray, setPlatformNoArray] = useState<any>([]);
    const [error, setError] = useState("");
    const [check, setCheck] = useState(false);

    const handleChange = (e: any) => {
        var { value } = e.target;
        setPlateformNo(value)
    }

    useEffect(()=>{
        linkStatus.getAllPlatforms().then((resp:any)=>{
            console.log(resp.data,"909")
            setPlatformNoArray(resp?.data);
        })
    },[])

    console.log(platformNoArray,"908")

    const handleSubmit = () => {
        if(platformNo!=""){
            setLoading(true)
            setCheck(true);
            linkStatus.getPdcDevices(platformNo).then((data) => {
                if (data && data?.status === 200) {
                    if (data && data?.data) {
                        setArray(data?.data);
                        setError("")
                        setLoading(false)
                    }
                }
                else {
                    setArray([])
                    setError(data?.errorMsg)
                    setLoading(false)
                }
            })
        }
    }

    const refershButton = () => {
        setArray([])
        setCheck(false);
        linkStatus.getPdcDevices(platformNo).then((data) => {
            if (data && data?.status === 200) {
                if (data && data?.data) {
                    setArray(data?.data);
                    setError("")
                }
            }
            else {
                setArray([])
                setError(data?.errorMsg)
            }
        })
    }

    // useEffect(() => {
    //     if(platformNo!=""){
    //         // setLoading(false);
    //         setLoading(true)
    //         linkStatus.getPdcDevices(platformNo).then((data) => {
    //             if (data && data?.status === 200) {
    //                 if (data && data?.data) {
    //                     setArray(data?.data);
    //                     setError("")
    //                     setLoading(false)
    //                 }
    //             }
    //             else {
    //                 setArray([])
    //                 setError(data?.errorMsg)
    //                 setLoading(false);
    //             }
    //         })
    //     }
    // }, [platformNo])

    useEffect(() => {
        pdcDevices()
    }, [array])

    const pdcDevices = () => {
        if(check){
            if (array?.length !== 0) {
                return (
                    <TableContainer style={{ maxHeight: "65vh" }}>
                        <Table stickyHeader aria-label="sticky table" className="uniqueName">
                            <TableHead style = {{ height : "40px" }}>
                                <TableRow>
                                    <TableCell className="cdsTblRow">
                                        PDC device
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
                            <TableBody className="cdsTblbdy">
                                {array.map((deviceLinkStatus: any, i: any) => {
                                    return (
                                        <StyledTableRow>
                                            <TableCell className="tblcolm">{deviceLinkStatus?.deviceType}</TableCell>
                                            <TableCell className="tblcolm">{deviceLinkStatus?.portNumber}</TableCell>
                                            <TableCell className="tblcolm">{deviceLinkStatus?.ipAddress}</TableCell>
                                            <TableCell className="tblcolm">
                                                {deviceLinkStatus?.status !== "Disconnected" ? <CheckBoxOutlineBlankIcon className="CheckboxConnectedStyle"></CheckBoxOutlineBlankIcon> : <CheckBoxOutlineBlankIcon className="CheckboxDisconnectedStyle"></CheckBoxOutlineBlankIcon>}
                                            </TableCell>
                                            <TableCell className="tblcolm">{formatDate(deviceLinkStatus?.linkTime)},{formatTime(deviceLinkStatus?.linkTime)}</TableCell>
                                            <TableCell className="tblcolm">{deviceLinkStatus?.response}</TableCell>
                                            <TableCell className="tblcolm">{formatDate(deviceLinkStatus?.responseTime)},{formatTime(deviceLinkStatus?.responseTime)}</TableCell>
                                        </StyledTableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )
            }
            else{
                return (
                            <div style={{ color: "red", textAlign: "center", justifyContent: "center", fontSize: "24px", position: 'relative', top: '250px' }}>PDC for this platform doesn't exist.</div>
                        )
            }
        }
        else{
            return (
                <div style={{ color: "red", textAlign: "center", justifyContent: "center", fontSize: "24px", position: 'relative', top: '250px' }}>Please Select Platform Number.</div>
            )
        }
        // else{
        //     return (
        //         <div style={{ color: "red", textAlign: "center", justifyContent: "center", fontSize: "24px", position: 'relative', top: '250px' }}>PDC for this platform doesn't exist.</div>
        //     )
        // }
    }
    return (
        <>
            {/* <Card className="cdsDeviceCardStyle1">

                <Grid className="pdcDeviceCardStyle2">
                   <Grid className="platformselect" container>
                    <Grid  >
                    <Typography className="pdcDeviceText">
                        Select Platform
                    </Typography>
                    </Grid>
                <Grid>
                <select
                        name="platformNo"
                        value={platformNo}
                        className="pdcDeviceSelectStyle"
                        onChange={handleChange}
                    >
                        <option value="" selected>

                        </option>
                        <option value="1">01</option>
                        <option value="2">02</option>
                        <option value="3">03</option>
                        <option value="4">04</option>
                        <option value="5">05</option>
                        <option value="6">06</option>
                        <option value="7">07</option>
                        <option value="8">08</option>
                    </select>
                </Grid>
                <Grid style={{marginLeft:"2%"}}>
                <Button
                        className="CdsCheckButton"
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        <span className="CdsRefreshlabelStyle">check</span>
                    </Button>
                </Grid>
            
                   </Grid>
                 
                  
                    <Button
                        className="CdsRefreshButton"
                        variant="contained"
                        onClick={refershButton}
                    >
                        <RefreshIcon className="CdsRefreshIconStyle" />
                        <span className="CdsRefreshlabelStyle">Refresh</span>
                    </Button>
                </Grid>
                {array?.length === 0 && error === "" ?(<div style={{display:'flex',justifyContent:"center",alignItems:"center", height: '100vh', position: 'relative', top: '300px'}}><Grid style={{ textAlign:"center", height: '100vh'}}>Redirecting...<CircularProgress /></Grid></div>) :
                <Grid>
                    <div>
                        {error != "" ? <div style={{ color: "red", textAlign: "center", justifyContent: "center", fontSize: "24px", position: 'relative', top: '250px' }}> {error}</div> :

                            pdcDevices()}

                    </div>
                </Grid>}
            </Card> */}


            <Card className="cdsDeviceCardStyle1">
                <Grid container className="pdcDeviceCardStyle2">
                    <Grid item xs={2} lg={2} xl={1} className="platformselect" container>
                        <Typography className="pdcDeviceText">
                            Select Platform
                        </Typography>
                    </Grid>
                    <Grid item xs={2} lg={1} xl={1}>
                        <select
                            name="platformNo"
                            value={platformNo}
                            className="pdcDeviceSelectStyle"
                            onChange={handleChange}
                        >   
                            <option value="" selected>
                                Select
                            </option>
                        {
                            platformNoArray?.map((el:any)=>{
                                return <option value={el}>{el}</option>
                            })
                        }
                        </select>
                    </Grid>
                    <Grid item xs={2} style = {{ alignSelf : "center"}} className = "link-status-pdc">
                        <Button
                            className="CdsCheckButton"
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            <span className="CdsRefreshlabelStyle">check</span>
                        </Button>
                    </Grid>
                    <Grid item xs={8} lg={7} xl={8} className="alingEnd" style = {{ alignSelf : "center" }}>
                        <Button
                            className="CdsRefreshButton"
                            variant="contained"
                            onClick={refershButton}
                        >
                            <RefreshIcon className="CdsRefreshIconStyle" />
                            <span className="CdsRefreshlabelStyle">Refresh</span>
                        </Button>
                    </Grid>
                </Grid>
                {loading ? (<div style={{ display: 'flex', justifyContent: "center", alignItems: "center", height: '100vh', position: 'relative', top: '300px' }}><Grid style={{ textAlign: "center", height: '100vh' }}>Redirecting...<CircularProgress /></Grid></div>) :
                    <Grid container>
                        <Grid item xs={12}>
                            <div>
                                {error != "" ? <div style={{ color: "red", textAlign: "center", justifyContent: "center", fontSize: "24px", position: 'relative', top: '250px' }}> {error}</div> :
                                    pdcDevices()}
                            </div>
                        </Grid>
                    </Grid>}
            </Card>
        </>
    )
}