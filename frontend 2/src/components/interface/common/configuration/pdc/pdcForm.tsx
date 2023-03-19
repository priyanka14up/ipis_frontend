import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Card, CardContent, Typography, TextField, Button, CircularProgress } from "@material-ui/core"
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from "@material-ui/icons/Delete";
import { DeleteDevices, fetchDevicesDetails, pdcPost, updatePdcChildDeviceName, updateDeviceName, updatePortName, fetchDevices, updateSubPortName } from "../../../../../redux/actions/interface/interface";
import { interfaceStateSelector } from "../../../../../redux/reducers/interface/interface";
import { PdcAttatchedDevices } from "./index";
import Swal from "sweetalert2";
import { Messages } from "../../../../../constants/messages";
import { authuserStateSelector } from "../../../../../redux/reducers/authUser/authUser";

export const PdcForm = (props: any) => {
    const { platformNumbers } = props;
    const dispatch = useDispatch();
    const { appUser } = useSelector(authuserStateSelector)
    const { currentSelectedCdsEthernetDevice, message, formState, cdsData, currentSelectedCdsPortNumber, pdcData, deleteState } = useSelector(interfaceStateSelector);
    const [interfaceInput, setInterfaceInput] = useState({
        id: 0,
        portNumber: "",
        deviceType: "",
        ipAddress1: "192",
        ipAddress2: "168",
        ipAddress3: "",
        ipAddress4: "1",
        deviceName: "",
        platformNo: "",
    })
    const [enableSubmit, setEnableSubmit] = useState(false)
    const [submit, setSubmit] = useState(false)
    const [getData, setGetData] = useState<boolean>(false)

    const [deleted, setDeleted] = useState(false);

    const handleChange = (e: any) => {
        var { name, value } = e.target;
        if (name == "platformNo") {
            setInterfaceInput({ ...interfaceInput, [name]: value, ["ipAddress3"]: value })
        }
        else {
            setInterfaceInput({ ...interfaceInput, [name]: value })
        }
    }
    const handleSubmit = () => {
        if (interfaceInput.id == 0) {
            let inter: any = {
                id: interfaceInput.id,
                portNumber: currentSelectedCdsPortNumber,
                deviceType: currentSelectedCdsEthernetDevice,
                ipAddress: `${interfaceInput.ipAddress1}.${interfaceInput.ipAddress2}.${interfaceInput.ipAddress3}.${interfaceInput.ipAddress4}`,
                deviceName: interfaceInput.deviceName,
                platformNo: [interfaceInput.platformNo],
            }
            dispatch(pdcPost(inter))
            setSubmit(true)
        }
        else {
            let inter: any = {
                id: interfaceInput.id,
                portNumber: currentSelectedCdsPortNumber,
                deviceType: currentSelectedCdsEthernetDevice,
                ipAddress: `${interfaceInput.ipAddress1}.${interfaceInput.ipAddress2}.${interfaceInput.ipAddress3}.${interfaceInput.ipAddress4}`,
                deviceName: interfaceInput.deviceName,
                platformNo: [interfaceInput.platformNo],
            };
            dispatch(pdcPost(inter))
            setSubmit(true)
        }
    };
    useEffect(() => {
        if (formState.isSuccess == true && submit == true) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: `${Messages.DEVICE_ADDED_SUCESSFULLY}`,
                showConfirmButton: false,
                allowOutsideClick: false,
                timer: 3000,
            }).then(() => {
                dispatch(fetchDevices());
                setGetData(true);
                setSubmit(false);

            })
        }
    }, [formState, submit])

    useEffect(() => {
        if (formState.isSuccess === true && submit === true) {
            let name: any = {
                deviceName: ""
            }
            dispatch(updatePdcChildDeviceName(name));
        }
    }, [formState]);

    useEffect(() => {
        if (formState.isSuccess && getData == true) {

            if (cdsData && cdsData.children) {
                let detail: any = cdsData.children.find((port: any) => port.portNumber == currentSelectedCdsPortNumber);
                if (detail && detail.deviceType === "pdc" && currentSelectedCdsPortNumber == detail.portNumber) {
                    console.log(detail, "detail")
                    dispatch(fetchDevicesDetails(detail.id))

                    setInterfaceInput({ ...interfaceInput, ["id"]: detail.id })

                    setGetData(false)

                }
            }
        }
    }, [formState, getData])


    const handleCancel = () => {
        setInterfaceInput({
            id: 0,
            portNumber: "",
            deviceType: "",
            ipAddress1: "192",
            ipAddress2: "168",
            ipAddress3: "",
            ipAddress4: "1",
            deviceName: "",
            platformNo: "",
        })
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
        }).then(() => {
            if (deleteState.isError === true) {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Not deleted',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    showCloseButton: true
                })
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
            })
                .then(() => {
                    dispatch(fetchDevices());
                })
        }
    }, [deleteState, deleted])

    const handleNext = (deviceName: PdcAttatchedDevices) => {
        dispatch(updatePdcChildDeviceName(deviceName));
    };



    useEffect(() => {
        if (cdsData && cdsData.children) {
            let detail: any = cdsData.children.find((port: any) => port.portNumber === currentSelectedCdsPortNumber);
            // let details: any = pdcData;
            if (detail && detail.deviceType === "pdc" && detail.id) {
                dispatch(fetchDevicesDetails(detail.id))
            }
        }
    }, [currentSelectedCdsPortNumber])

    useEffect(() => {
        if (formState.isSuccess == true) {
            if (cdsData && cdsData.children) {
                // let detail: any = cdsData.children.find((port: any) => port.portNumber === currentSelectedCdsPortNumber);
                let detail: any = pdcData;
                if (detail && detail.deviceType === "pdc" && detail.id && currentSelectedCdsPortNumber == detail?.portNumber) {
                    let ipAddress = detail?.ipAddress.split(".");
                    setInterfaceInput({
                        id: detail.id,
                        portNumber: detail.portNumber,
                        deviceName: detail.deviceName,
                        deviceType: detail.deviceType,
                        ipAddress1: ipAddress[0],
                        ipAddress2: ipAddress[1],
                        ipAddress3: ipAddress[2],
                        ipAddress4: ipAddress[3],
                        platformNo: detail.platformNo,
                    })
                }
            }
        }
    }, [formState, currentSelectedCdsPortNumber])



    // return (
    //     <>
    //        {formState.loading ? <Grid style={{ textAlign: "center" }}>Redirecting...<CircularProgress /></Grid>:<Grid item>
    //             <Card style={{ height: "590px" }} className="configSetting">
    //                 <CardContent style={{ padding: "0px" }}>
    //                     <Typography component="p" className="confHed">
    //                         <b>Select Ethernet Device</b>
    //                     </Typography>
    //                     <Typography className="confSubHed">
    //                         Select the CDC type and add IP address to configure
    //                     </Typography>
    //                 </CardContent>
    //                 {/* {appUser.userRole == "ROLE_STATION MASTER" ?
    //                     <Grid style={{ color: "red", display: "flex", justifyContent: "center", fontSize: "22px", paddingBottom: "5px" }}>*view only</Grid>
    //                     : <></>
    //                 } */}
    //                 <CardContent style={{ padding: "4.98% 0px 0px 0px", display: "flex", justifyContent: "center" }} >

    //                     <Grid  container justify='center' alignItems='center' item xs={9} className={appUser.userRole == "ROLE_STATION MASTER" ? "overlapBackground":""}>
    //                     {   appUser.userRole == "ROLE_STATION MASTER" ? <Grid className="stationForm formFields">

    //                             </Grid>: <></>
    //                             }
    //                          <Grid item className="config" >
    //                         <Grid container spacing={4} style={{ display: "flex", alignItems: "center", paddingTop: "20px", justifyContent: "center" }}>
    //                             <Grid item xs={4} className="selCdcType">
    //                                 PDC Name
    //                             </Grid >
    //                             <Grid item xs={8}>
    //                                 <TextField className="pdcName txtpdc" variant="outlined" name="deviceName" required={true} value={interfaceInput.deviceName} onChange={handleChange} />
    //                             </Grid>
    //                         </Grid>
    //                         <Grid container spacing={4} style={{ display: "flex", alignItems: "center", paddingTop: "20px", justifyContent: "center" }}>
    //                             <Grid item xs={4} className="selCdcType">
    //                                 PDC Platform
    //                             </Grid>
    //                             <Grid item xs={8}>
    //                                     <select className="pdcType ddlpdcType" name="platformNo" required={true} value={interfaceInput.platformNo} onChange={handleChange}>
    //                                         <option value="">Select</option>
    //                                         {platformNumbers?.map((platformNo: any, i: any) => {
    //                                             return (
    //                                                 <option value={platformNo}>
    //                                                     {platformNo}
    //                                                 </option>
    //                                             );
    //                                         })}
    //                                     </select>
    //                             </Grid>
    //                         </Grid>
    //                         <Grid container spacing={4} style={{ display: "flex",paddingTop: "20px", alignItems: "center", justifyContent: "center" }}>
    //                             <Grid item xs={4} className="selCdcType">
    //                                 PDC IP Address
    //                             </Grid >
    //                             <Grid item xs={8} style={{ display: "flex", position: "relative", justifyContent: "start" }}>
    //                                 <TextField disabled className="disabled ipAddressoctates mr-10" variant="outlined" name="ipAddress1" required={true} value={interfaceInput.ipAddress1} onChange={handleChange} />
    //                                 <TextField disabled className="disabled ipAddressoctates mr-10" variant="outlined" name="ipAddress2" required={true} value={interfaceInput.ipAddress2} onChange={handleChange} />
    //                                 <TextField disabled className="disabled ipAddressoctates mr-10" variant="outlined" name="ipAddress3" required={true} value={interfaceInput.ipAddress3} onChange={handleChange} />
    //                                 <TextField disabled className="disabled ipAddressoctates" variant="outlined" name="ipAddress4" required={true} value={interfaceInput.ipAddress4} onChange={handleChange} />
    //                             </Grid>
    //                         </Grid>
    //                         <div style={{ paddingTop: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
    //                         {appUser.userRole == "ROLE_STATION MASTER" ? <></> :
    //                         <div className="btnGroup">
    //                             <Button disabled={!interfaceInput.deviceName || !interfaceInput.ipAddress3} onClick={handleSubmit} type="submit" className="pdcSave" variant="outlined">

    //                             <DoneIcon className="SaveIcon" style={{ display: "inherit" }}/>
    //                             Save
    //                         </Button>
    //                             <Button variant="outlined" className="printBtn btncancel" onClick={handleCancel} >
    //                                 <ClearIcon className="clearIcon" />
    //                                 Cancel
    //                             </Button>

    //                             {interfaceInput.id !== 0 ? <><Button variant="outlined" className="deleteBtn btndelete" onClick = {handleDelete}>
    //                                 <DeleteIcon className="deleteIcon" />
    //                                 Delete
    //                             </Button></>:<><Button disabled variant="outlined" className="deleteBtn btndelete" onClick = {handleDelete}>
    //                                 <DeleteIcon className="deleteIcon" />
    //                                 Delete
    //                             </Button></>}
    //                             {(formState.isSuccess==true && interfaceInput.id != 0) ?<Button variant="outlined" className="nextBtn" onClick={()=>handleNext(PdcAttatchedDevices.PDC_SWITCH)}>
    //                                 Next
    //                             </Button>:<Button disabled variant="outlined" className="nextBtn" >
    //                                 Next
    //                             </Button>}
    //                             </div>
    //                             }


    //                         </div>
    //                         <br />
    //                         {message !== "" ? (
    //                             <div style={{ textAlign: "center", color: "red" }}>
    //                                 {message}
    //                             </div>
    //                         ) : (
    //                             <></>
    //                         )}
    //                     </Grid>
    //                     </Grid>
    //                 </CardContent>
    //             {appUser.userRole == "ROLE_STATION MASTER" ? (formState.isSuccess == true && interfaceInput.id != 0) ?<div style={{ textAlign: 'center',marginTop: '15px'}}> <Button variant="outlined" className="nextBtnMstr" onClick={() => handleNext(PdcAttatchedDevices.PDC_SWITCH)}>
    //                 Next
    //             </Button></div> : <div style={{ textAlign: 'center',marginTop: '15px', cursor:'not-allowed'}}><Button disabled variant="outlined"  className="nextBtnMstr" >
    //                 Next
    //             </Button></div> : <></>}
    //             </Card>
    //         </Grid>}
    //     </>
    // )


    return (
        <>
            {formState.loading ? <Grid style={{ textAlign: "center" }}>Redirecting...<CircularProgress /></Grid> : <Grid item style={{height : "100%"}}>
                <Card style={{ height: "100%" }} className="configSetting">
                    <Grid container>
                        <Typography className="confHed">
                            <strong>
                                Select Ethernet Device
                            </strong>
                        </Typography>
                    </Grid>
                    <Grid container className="margin-N">
                        <Typography className="">
                            Select the CDC type and add IP address to configure
                        </Typography>
                    </Grid>
                    <Card className="config inner-card innerCard">
                        <Grid container className="mb-17 alignn">
                            <Grid item xs={4} md={5} lg={3} xl={3} className="selCdcType pr-N">
                                <Typography>
                                    PDC Name
                                </Typography>
                            </Grid>
                            <Grid item xs={4} md={6} lg={4} xl={3}>
                                <TextField className="pdcName txtpdc" variant="outlined" name="deviceName" required={true} value={interfaceInput.deviceName} onChange={handleChange} />
                            </Grid>
                        </Grid>
                        <Grid container className="mb-17 alignn">
                            <Grid item xs={4} md={5} lg={3} xl={3} className="selCdcType pr-N">
                                <Typography>
                                    PDC Platform
                                </Typography>
                            </Grid>
                            <Grid item xs={4} md={6} lg={4} xl={3}>
                                <select className="pdcType ddlpdcType" name="platformNo" required={true} value={interfaceInput.platformNo} onChange={handleChange}>
                                    <option value="">Select</option>
                                    {platformNumbers?.map((platformNo: any, i: any) => {
                                        return (
                                            <option value={platformNo}>
                                                {platformNo}
                                            </option>
                                        );
                                    })}
                                </select>
                            </Grid>
                        </Grid>
                        <Grid container className="mb-21 alignn">
                            <Grid item xs={4} md={5} lg={3} xl={3} className="selCdcType pr-N">
                                <Typography>
                                    PDC IP Address
                                </Typography>
                            </Grid>
                            <Grid item xs={4} md={6} lg={4} xl={3}>
                                <Grid container spacing={1}>
                                    <Grid item xs={3}>
                                        <TextField disabled className="disabled ipAddressoctates mr-10" variant="outlined" name="ipAddress1" required={true} value={interfaceInput.ipAddress1} onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField disabled className="disabled ipAddressoctates mr-10" variant="outlined" name="ipAddress2" required={true} value={interfaceInput.ipAddress2} onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField disabled className="disabled ipAddressoctates mr-10" variant="outlined" name="ipAddress3" required={true} value={interfaceInput.ipAddress3} onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField disabled className="disabled ipAddressoctates" variant="outlined" name="ipAddress4" required={true} value={interfaceInput.ipAddress4} onChange={handleChange} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* <Grid container style={{ paddingTop: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            {appUser.userRole == "ROLE_STATION MASTER" ? <></> :
                                <>
                                    <Grid item xs={2}>
                                        <Button disabled={!interfaceInput.deviceName || !interfaceInput.ipAddress3} onClick={handleSubmit} type="submit" className="pdcSave" variant="outlined">
                                            <DoneIcon className="SaveIcon" style={{ display: "inherit" }} />
                                            Save
                                        </Button>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Button variant="outlined" className="printBtn btncancel" onClick={handleCancel} >
                                            <ClearIcon className="clearIcon" />
                                            Cancel
                                        </Button>
                                    </Grid>
                                    <Grid item xs={2}>
                                        {interfaceInput.id !== 0 ? <><Button variant="outlined" className="deleteBtn btndelete" onClick={handleDelete}>
                                            <DeleteIcon className="deleteIcon" />
                                            Delete
                                        </Button></> : <><Button disabled variant="outlined" className="deleteBtn btndelete" onClick={handleDelete}>
                                            <DeleteIcon className="deleteIcon" />
                                            Delete
                                        </Button></>}
                                    </Grid>
                                    <Grid item xs={2}>
                                        {(formState.isSuccess == true && interfaceInput.id != 0) ? <Button variant="outlined" className="nextBtn" onClick={() => handleNext(PdcAttatchedDevices.PDC_SWITCH)}>
                                            Next
                                        </Button> : <Button disabled variant="outlined" className="nextBtn" >
                                            Next
                                        </Button>}
                                    </Grid>
                                </>}
                        </Grid> */}


                        <Grid container style={{ paddingTop: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            {appUser.userRole == "ROLE_STATION MASTER" ? <></> :
                                <>
                                    <Grid item xs={12}>
                                        <Grid container spacing={1} className="btnGrp">
                                            <Grid item xs={2} md={4} lg={2} > 
                                                <Button disabled={!interfaceInput.deviceName || !interfaceInput.ipAddress3} onClick={handleSubmit} type="submit" className="pdcSave pdc-btns" variant="outlined">
                                                    <DoneIcon className="SaveIcon" style={{ display: "inherit" }} />
                                                    Save
                                                </Button>
                                            </Grid>
                                            <Grid item xs={2} md={4} lg={2}>
                                                <Button variant="outlined" className="printBtn btncancel pdc-btns" onClick={handleCancel} >
                                                    <ClearIcon className="clearIcon" />
                                                    Cancel
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container  spacing={1} className="btnGrp">
                                            <Grid item xs={2} md={4} lg={2}>
                                                {interfaceInput.id !== 0 ? <><Button variant="outlined" className="deleteBtn btndelete pdc-btns" onClick={handleDelete}>
                                                    <DeleteIcon className="deleteIcon" />
                                                    Delete
                                                </Button></> : <><Button disabled variant="outlined" className="deleteBtn btndelete pdc-btns" onClick={handleDelete}>
                                                    <DeleteIcon className="deleteIcon" />
                                                    Delete
                                                </Button></>}
                                            </Grid>
                                            <Grid item xs={2} md={4} lg={2}>
                                                {(formState.isSuccess == true && interfaceInput.id != 0) ? <Button variant="outlined" className="nextBtn pdc-btns" onClick={() => handleNext(PdcAttatchedDevices.PDC_SWITCH)}>
                                                    Next
                                                </Button> : <Button disabled variant="outlined" className="nextBtn pdc-btns" >
                                                    Next
                                                </Button>}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </>}
                        </Grid>
                        {message !== "" ? (
                            <div style={{ textAlign: "center", color: "red", marginLeft:"70px", marginTop:"20px" }}>
                                {message}
                            </div>
                        ) : (
                            <></>
                        )}
                    </Card>
                    {appUser.userRole == "ROLE_STATION MASTER" ? (formState.isSuccess == true && interfaceInput.id != 0) ? <div style={{ textAlign: 'center', marginTop: '15px' }}> <Button variant="outlined" className="nextBtnMstr" onClick={() => handleNext(PdcAttatchedDevices.PDC_SWITCH)}>
                        Next
                    </Button></div> : <div style={{ textAlign: 'center', marginTop: '15px', cursor: 'not-allowed' }}><Button disabled variant="outlined" className="nextBtnMstr" >
                        Next
                    </Button></div> : <></>}
                </Card>
            </Grid>}</>
    )


}
