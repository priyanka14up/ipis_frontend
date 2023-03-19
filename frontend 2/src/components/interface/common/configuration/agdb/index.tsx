import { Grid, Card, CardContent, Typography, TextField, Button, Checkbox, FormControlLabel, CircularProgress } from "@material-ui/core"
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { interfaceStateSelector } from "../../../../../redux/reducers/interface/interface";
import { useEffect, useState } from "react";
import { agdbPost, mldbPost, DeleteDevices, fetchDevicesDetails, updateDeviceName, updatePortName, fetchDevices } from "../../../../../redux/actions/interface/interface";
import Swal from "sweetalert2";
import { Messages } from "../../../../../constants/messages";
import { authuserStateSelector } from "../../../../../redux/reducers/authUser/authUser";

export const Agdb = (props: any) => {
    const { platformNumbers } = props;
    const dispatch = useDispatch();
    const { currentSelectedCdsEthernetDevice, currentSelectedCdsPortNumber, cdsData, agdbState, agdbMessage, formState, deleteState } = useSelector(interfaceStateSelector)
    const [detail, setDetail] = useState<any>({})
    const { appUser } = useSelector(authuserStateSelector)
    const [data, setData] = useState({})

    const [showLoader, setShowLoader] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const [interfaceInput, setInterfaceInput] = useState({
        id: 0,
        portNumber: "",
        deviceName: "",
        deviceType: "",
        ipAddress1: "192",
        ipAddress2: "168",
        ipAddress3: "0",
        ipAddress4: "",
        boardType: "",
        fobIndicatorPosition: 0,
    })

    const [enableSubmit, setenableSubmit] = useState(false);

    const handleChange = (e: any) => {
        var { name, value } = e.target;
        if (name == "ipAddress4" && value.match(/^[\d]{0,3}$/i)) {
            setInterfaceInput({ ...interfaceInput, [name]: value })
        }
        else if (name != "ipAddress4") {
            setInterfaceInput({ ...interfaceInput, [name]: value })
        }
    }

    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                let data: any = {
                    id: interfaceInput.id,
                };
                dispatch(DeleteDevices(data))
                setDeleted(true)
            }
        })
    };


    useEffect(() => {
        if (deleteState.isSuccess == true && deleted == true) {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Port Data Deleted Successfully',
                showConfirmButton: false,
                allowOutsideClick: false,
                showCloseButton: false,
                timer: 2000
            }).then(() => {
                const data: any = {
                    portNumber: interfaceInput.portNumber,
                    portName: "CDS"
                };
                dispatch(updatePortName(data))
                const data1: any = {
                    deviceName: "CDS"
                };
                dispatch(updateDeviceName(data1))
            }).then(() => {
                dispatch(fetchDevices())
            })
        }
    }, [deleteState, deleted])


    const handleSubmit = () => {
        if (interfaceInput.id == 0) {
            let inter: any = {
                id: interfaceInput.id,
                portNumber: currentSelectedCdsPortNumber,
                deviceType: currentSelectedCdsEthernetDevice,
                deviceName: interfaceInput.deviceName,
                ipAddress: `${interfaceInput.ipAddress1}.${interfaceInput.ipAddress2}.${interfaceInput.ipAddress3}.${interfaceInput.ipAddress4}`,
                boardType: interfaceInput.boardType,
                fobIndicatorPosition: interfaceInput.fobIndicatorPosition,
            };
            dispatch(agdbPost(inter))
        }
        else {
            let inter: any = {
                id: interfaceInput.id,
                portNumber: currentSelectedCdsPortNumber,
                deviceType: currentSelectedCdsEthernetDevice,
                deviceName: interfaceInput.deviceName,
                ipAddress: `${interfaceInput.ipAddress1}.${interfaceInput.ipAddress2}.${interfaceInput.ipAddress3}.${interfaceInput.ipAddress4}`,
                boardType: interfaceInput.boardType,
                fobIndicatorPosition: interfaceInput.fobIndicatorPosition,
            };
            dispatch(agdbPost(inter))
        }
        setenableSubmit(true)
    };

    useEffect(() => {
        if (agdbState.isSuccess == true && enableSubmit == true) {
            dispatch(fetchDevices());
            setenableSubmit(false);
        }
    }, [agdbState, enableSubmit])

    const handleCancel = () => {
        setInterfaceInput({
            id: 0,
            portNumber: "",
            deviceName: "",
            deviceType: "",
            ipAddress1: "192",
            ipAddress2: "168",
            ipAddress3: "0",
            ipAddress4: "",
            boardType: "",
            fobIndicatorPosition: 0,
        })
    }
    const loader = () => {
        return (<>
            {console.log("hi")}
            {/* <div style={{display:'flex',justifyContent:"center",alignItems:"center", height: '100vh', position: 'relative', top: '300px'}}><Grid style={{ textAlign:"center", height: '100vh'}}>Redirecting...<CircularProgress /></Grid></div> */}
        </>)
    }

    useEffect(() => {
        if (cdsData && cdsData.children) {
            let detail: any = cdsData.children.find((port: any) => port.portNumber === currentSelectedCdsPortNumber);
            if (detail && detail.id) {
                dispatch(fetchDevicesDetails(detail.id))
            }
        }
    }, [currentSelectedCdsPortNumber])


    useEffect(() => {
        if (formState.isSuccess == true) {
            if (cdsData && cdsData.children) {
                let detail: any = cdsData.children.find((port: any) => port.portNumber === currentSelectedCdsPortNumber);
                if (detail && detail.deviceType === "agdb" && detail.detail && currentSelectedCdsPortNumber === detail.detail.portNumber) {
                    console.log(detail, "detail")
                    let ipAddress = detail.detail.ipAddress.split(".");
                    setInterfaceInput({
                        id: detail.id,
                        portNumber: detail.portNumber,
                        deviceType: detail.deviceType,
                        deviceName: detail.detail.deviceName,
                        ipAddress1: ipAddress[0],
                        ipAddress2: ipAddress[1],
                        ipAddress3: ipAddress[2],
                        ipAddress4: ipAddress[3],
                        boardType: detail.detail.boardType,
                        fobIndicatorPosition: detail.detail.fobIndicatorPosition,
                    })
                    setShowLoader(false)
                }
            }
        }
    }, [formState, currentSelectedCdsPortNumber]);

    useEffect(() => {
        if (agdbState.isSuccess === true && enableSubmit === true) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: `${Messages.FORM_SUBMITTED_SUCESSFULLY}`,
                showConfirmButton: false,
                allowOutsideClick: false,
                timer: 3000,
            })
        }
    }, [agdbState])

    useEffect(() => {
        setenableSubmit(true);
    }, [interfaceInput]);

    // return (
    //     <>
    //         {showLoader === true ?
    //             loader() : (<Grid item xs={12}>
    //                 <Card style={{ height: "591px" }} className={appUser.userRole == "ROLE_STATION MASTER" ? "overlapBackground agdbCard" : "agdbCard"}>
    //                     <CardContent className="p-0" >
    //                         {/* {appUser.userRole == "ROLE_STATION MASTER" ?
    //           <Grid style={{ color: "red", display: "flex", justifyContent: "center", fontSize: "22px" }}>*view only</Grid>
    //           : <></>
    //         } */}
    //                         {
    //                             appUser.userRole == "ROLE_STATION MASTER" ? <Grid className="stationForm formFields">

    //                             </Grid> : <></>
    //                         }
    //                         <Typography component="p" className="confHed">
    //                             <b>Configuration Settings</b>
    //                         </Typography>
    //                         <Typography className="confSubHed">
    //                             Select the AGDB type and add IP address to configure
    //                         </Typography>
    //                     </CardContent>
    //                     <Grid container style={{ padding: "2.79% 0px 0px 0px" }}>
    //                         <Grid item xs={5} className="agdbSubHed">
    //                             At a Glance Display Board IP Address<sup className="asterisk">*</sup>
    //                         </Grid>
    //                         <Grid item xs={7}>
    //                             <Grid className="agdbGrid">
    //                                 <TextField disabled className="disabled mldbBoxStyle mr-10" variant="outlined" type="text" name="ipAddress1" required={true} value={interfaceInput.ipAddress1} onChange={handleChange} />
    //                                 <TextField disabled className="disabled mldbBoxStyle mr-10" variant="outlined" type="text" name="ipAddress2" required={true} value={interfaceInput.ipAddress2} onChange={handleChange} />
    //                                 <TextField disabled className="disabled mldbBoxStyle mr-10" variant="outlined" type="text" name="ipAddress3" required={true} value={interfaceInput.ipAddress3} onChange={handleChange} />
    //                                 <TextField className="mldbBoxStyle" variant="outlined" type="text" name="ipAddress4" required={true} value={interfaceInput.ipAddress4} onChange={handleChange} />
    //                             </Grid>
    //                         </Grid>

    //                         <Grid item xs={5} className="agdbSubHed">
    //                             At a Glance Display Board Name
    //                         </Grid>
    //                         <Grid item xs={7} className="agdbTextBox">
    //                             <TextField className="agdbNameValue" variant="outlined" type="text" name="deviceName" required={true} value={interfaceInput.deviceName} onChange={handleChange} />
    //                         </Grid>

    //                         <Grid item xs={5} className="agdbSubHed">
    //                             Board Type
    //                         </Grid>
    //                         <Grid item xs={7} className="agdbTextBox">
    //                             <select className="agdbNameValue h-40" name="boardType" required={true} value={interfaceInput.boardType} onChange={handleChange}>
    //                                 <option>Select</option>
    //                                 <option value="single">Single</option>
    //                                 <option value="double">Double</option>
    //                             </select>
    //                         </Grid>

    //                         <Grid item xs={5} className="agdbSubHed">
    //                             FOB Indicator Position
    //                         </Grid>
    //                         <Grid item xs={7} className="agdbTextBox">
    //                             <select className="agdbNameValue h-40" name="fobIndicatorPosition" required={true} value={interfaceInput.fobIndicatorPosition} onChange={handleChange}>
    //                                 <option>Select</option>
    //                                 <option value="10">10</option>
    //                             </select>
    //                         </Grid>
    //                     </Grid>
    //                     <Grid>
    //                         <div>
    //                             {(agdbState.isError === true && agdbMessage != "" && enableSubmit == true) ? <div style={{ color: "red", textAlign: "center" }}> {agdbMessage}</div> : <></>}
    //                         </div>
    //                     </Grid>
    //                     {appUser.userRole == "ROLE_STATION MASTER" ? <></> :
    //                         <div style={{ paddingTop: "2.05%", display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
    //                             <Button onClick={handleSubmit} type="submit" className="mldbSaveBtn" variant="outlined">
    //                                 <DoneIcon className="SaveIcon" style={{ display: "inherit" }} />
    //                                 Save
    //                             </Button>
    //                             <Button type="reset" value="Reset" variant="outlined" className="mldbCancelBtn" onClick={handleCancel}>
    //                                 <ClearIcon className="clearIcon" />
    //                                 Cancel
    //                             </Button>
    //                             {interfaceInput.id !== 0 ?
    //                                 <>
    //                                     <Button type="submit" variant="outlined" className="mldbDeleteBtn" onClick={handleDelete}>
    //                                         <DeleteIcon className="deleteIcon" />
    //                                         Delete
    //                                     </Button>
    //                                 </>
    //                                 :
    //                                 <Button disabled type="submit" variant="outlined" className="mldbDeleteBtn" onClick={handleDelete}>
    //                                     <DeleteIcon className="deleteIcon" />
    //                                     Delete
    //                                 </Button>
    //                             }
    //                         </div>
    //                     }

    //                 </Card>
    //             </Grid>)}
    //     </>
    // )

    return (
        <>
            {showLoader === true ?
                loader() : (<Grid item xs={12} style={{ height: "100%" }}>
                    <Card style={{ height: "100%" }} className={appUser.userRole == "ROLE_STATION MASTER" ? "overlapBackground agdbCard" : "agdbCard"}>
                        {
                            appUser.userRole == "ROLE_STATION MASTER" ? <Grid className="stationForm formFields">

                            </Grid> : <></>
                        }
                        <Grid container>
                            <Typography className="confHed">
                                <strong>
                                    Configuration Settings
                                </strong>
                            </Typography>
                        </Grid>
                        <Grid container className="mb-21">
                            <Typography className="confSubHed">
                                Select the AGDB type and add IP address to configure
                            </Typography>
                        </Grid>
                        <Grid container style={{ padding: "2.79% 0px 0px 0px" }} className="mb-17">
                            <Grid item xs={4} md={6} lg={5} xl={5}>
                                <Typography className="agdbSubHed">
                                    At a Glance Display Board IP Address<span className="asterisk">*</span>
                                </Typography>
                            </Grid>
                            <Grid item xs={3} md={4} lg={3} xl={3}>
                                <Grid container>
                                    <Grid item xs={3}>
                                        <TextField disabled className="disabled mldbBoxStyle mr-10" variant="outlined" type="text" name="ipAddress1" required={true} value={interfaceInput.ipAddress1} onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField disabled className="disabled mldbBoxStyle mr-10" variant="outlined" type="text" name="ipAddress2" required={true} value={interfaceInput.ipAddress2} onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField disabled className="disabled mldbBoxStyle mr-10" variant="outlined" type="text" name="ipAddress3" required={true} value={interfaceInput.ipAddress3} onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField className="mldbBoxStyle" variant="outlined" type="text" name="ipAddress4" required={true} value={interfaceInput.ipAddress4} onChange={handleChange} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container className="mb-17">
                            <Grid item xs={4} md={6} lg={5} xl={5}>
                                <Typography className="agdbSubHed">
                                    At a Glance Display Board Name
                                </Typography>
                            </Grid>
                            <Grid item xs={3} md={4} lg={3} xl={3} className="agdbTextBox">
                                <TextField className="agdbNameValue" variant="outlined" type="text" name="deviceName" required={true} value={interfaceInput.deviceName} onChange={handleChange} />
                            </Grid>
                        </Grid>
                        <Grid container className="mb-17">
                            <Grid item xs={4} md={6} lg={5} xl={5}>
                                <Typography className="agdbSubHed">
                                    Board Type
                                </Typography>
                            </Grid>
                            <Grid item xs={3} md={4} lg={3} xl={3} className="agdbTextBox">
                                <select className="agdbNameValue h-40" name="boardType" required={true} value={interfaceInput.boardType} onChange={handleChange}>
                                    <option>Select</option>
                                    <option value="single">Single</option>
                                    <option value="double">Double</option>
                                </select>
                            </Grid>
                        </Grid>
                        <Grid container className="mb-21">
                            <Grid item xs={4} md={6} lg={5} xl={5} className="agdbSubHed">
                                <Typography>
                                    FOB Indicator Position
                                </Typography>
                            </Grid>
                            <Grid item xs={3} md={4} lg={3} xl={3} className="agdbTextBox">
                                <select className="agdbNameValue h-40" name="fobIndicatorPosition" required={true} value={interfaceInput.fobIndicatorPosition} onChange={handleChange}>
                                    <option>Select</option>
                                    <option value="10">10</option>
                                </select>
                            </Grid>
                        </Grid>
                        <Grid container style={{ justifyContent: "center" }}>
                            <Grid item xs={2} md={3} lg={2} xl={2} ></Grid>
                            <Grid item xs={4} md={6} lg={4} xl={4}>
                                {(agdbState.isError === true && agdbMessage != "" && enableSubmit == true) ? <div style={{ color: "red", textAlign: "center", marginRight: "56px" }}> {agdbMessage}</div> : <></>}
                            </Grid>
                        </Grid>
                        {appUser.userRole == "ROLE_STATION MASTER" ? <></> :
                            <Grid container spacing={2} style={{ paddingTop: "2.05%", display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                                <Grid item xs={2} md={3} lg={2} xl={2}>
                                    <Button onClick={handleSubmit} type="submit" className="mldbSaveBtn w-agdb" variant="outlined">
                                        <DoneIcon className="SaveIcon" style={{ display: "inherit" }} />
                                        Save
                                    </Button>
                                </Grid>
                                <Grid item xs={2} md={3} lg={2} xl={2}>
                                    <Button type="reset" value="Reset" variant="outlined" className="mldbCancelBtn w-agdb" onClick={handleCancel}>
                                        <ClearIcon className="clearIcon" />
                                        Cancel
                                    </Button>
                                </Grid>
                                <Grid item xs={2} md={3} lg={2} xl={2}>
                                    {interfaceInput.id !== 0 ?
                                        <>
                                            <Button type="submit" variant="outlined" className="mldbDeleteBtn w-agdb" onClick={handleDelete}>
                                                <DeleteIcon className="deleteIcon" />
                                                Delete
                                            </Button>
                                        </>
                                        :
                                        <Button disabled type="submit" variant="outlined" className="mldbDeleteBtn w-agdb" onClick={handleDelete}>
                                            <DeleteIcon className="deleteIcon" />
                                            Delete
                                        </Button>
                                    }
                                </Grid>
                            </Grid>
                        }
                    </Card>
                </Grid>

                )}

        </>

    )

}
