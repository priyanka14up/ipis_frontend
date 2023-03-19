import { Grid, Card, CardContent, Typography, TextField, Button, Checkbox, FormControlLabel, CircularProgress } from "@material-ui/core"
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { interfaceStateSelector } from "../../../../../../redux/reducers/interface/interface";
import { useEffect, useState } from "react";
import { agdbPost, mldbPost, DeleteDevices, fetchDevicesDetails, updateDeviceName, updatePortName, fetchDevices, updatePdcChildDeviceName, updateSubPortName, fetchPdcDetails } from "../../../../../../redux/actions/interface/interface";
import Swal from "sweetalert2";
import { Messages } from "../../../../../../constants/messages";
import { authuserStateSelector } from "../../../../../../redux/reducers/authUser/authUser";

export const Agdbpdc = (props: any) => {
    const { platformNumbers } = props;
    const dispatch = useDispatch();
    const { currentSelectedPdcEthernetDevice, currentSelectedPdcPortNumber, pdcData, agdbState, agdbMessage, formState, deleteState } = useSelector(interfaceStateSelector)
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
        ipAddress3: "",
        ipAddress4: "",
        boardType: "",
        fobIndicatorPosition: 0,
        platformNo1: "",
        platformNo2: "",
    })

    const [enableSubmit, setenableSubmit] = useState(false);

    const handleChange = (e: any) => {
        var { name, value } = e.target;
        if (name == "ipAddress4" && value.match(/^[\d]{0,3}$/i)) {
            setInterfaceInput({ ...interfaceInput, [name]: value })
        }
        else if (name != "ipAddress4") (
            setInterfaceInput({ ...interfaceInput, [name]: value })
        )
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
        // .then(() => {
        //     if (deleteState.isSuccess === true && deleted === true) {
        //         Swal.fire({
        //             position: 'center',
        //             icon: 'success',
        //             title: 'Deleted Successfully',
        //             showConfirmButton: false,
        //             allowOutsideClick: false,
        //             timer: 1500,
        //         })
        //         setInterfaceInput({
        //             id: 0,
        //             portNumber: "",
        //             deviceName: "",
        //             deviceType: "",
        //             ipAddress1: "",
        //             ipAddress2: "",
        //             ipAddress3: "",
        //             ipAddress4: "",
        //             boardType: "",
        //             fobIndicatorPosition: 0,
        //             platformNo1: "",
        //             platformNo2: "",
        //         })
        //         const data: any = {
        //             portNumber: 0,
        //             portName: ""
        //         };
        //         dispatch(updatePortName(data))
        //         const data1: any = {
        //             deviceName: ""
        //         };
        //         dispatch(updateDeviceName(data1))
        //     }
        // })

    };

    useEffect(() => {
        if (pdcData.platformNo) {
            setInterfaceInput({ ...interfaceInput, ["ipAddress3"]: pdcData?.platformNo[0], ["platformNo1"]: pdcData?.platformNo[0] })
        }
    }, [pdcData.platformNo])


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
                    portNumber: currentSelectedPdcPortNumber,
                    portName: "CDS"
                };
                dispatch(updateSubPortName(data))
                const data1: any = {
                    deviceName: "CDS"
                };
                dispatch(updatePdcChildDeviceName(data1))
            }).then(() => {
                dispatch(fetchDevicesDetails(pdcData?.id));
                setDeleted(false);
            })
        }
    }, [deleteState, deleted])


    const handleSubmit = () => {
        // if (interfaceInput.id == 0) {
        let inter: any = {
            id: interfaceInput.id,
            portNumber: currentSelectedPdcPortNumber,
            deviceType: currentSelectedPdcEthernetDevice,
            deviceName: interfaceInput.deviceName,
            ipAddress: `${interfaceInput.ipAddress1}.${interfaceInput.ipAddress2}.${interfaceInput.ipAddress3}.${interfaceInput.ipAddress4}`,
            boardType: interfaceInput.boardType,
            fobIndicatorPosition: interfaceInput.fobIndicatorPosition,
            platformNo: [interfaceInput.platformNo1, interfaceInput.platformNo2],
        };
        dispatch(agdbPost(inter))
        // }
        // else {
        //     let inter: any = {
        //         id: interfaceInput.id,
        //         portNumber: currentSelectedPdcPortNumber,
        //         deviceType: currentSelectedPdcEthernetDevice,
        //         deviceName: interfaceInput.deviceName,
        //         ipAddress: `${interfaceInput.ipAddress1}.${interfaceInput.ipAddress2}.${interfaceInput.ipAddress3}.${interfaceInput.ipAddress4}`,
        //         boardType: interfaceInput.boardType,
        //         fobIndicatorPosition: interfaceInput.fobIndicatorPosition,
        //         platformNo: [interfaceInput.platformNo1, interfaceInput.platformNo2],
        //     };
        //     dispatch(agdbPost(inter))
        // }
        setenableSubmit(true)
    };

    // useEffect(() => {
    //     if(agdbState.isSuccess == true && enableSubmit == true) {
    //       dispatch(fetchDevices());
    //       setenableSubmit(false);
    //     }
    //   },[agdbState,enableSubmit])

    const handleCancel = () => {
        setInterfaceInput({
            id: 0,
            portNumber: "",
            deviceName: "",
            deviceType: "",
            ipAddress1: "192",
            ipAddress2: "168",
            ipAddress3: "",
            ipAddress4: "",
            boardType: "",
            fobIndicatorPosition: 0,
            platformNo1: "",
            platformNo2: "",
        })
    }
    const loader = () => {
        return (<>
            {console.log("hi")}
            {/* <div style={{display:'flex',justifyContent:"center",alignItems:"center", height: '100vh', position: 'relative', top: '300px'}}><Grid style={{ textAlign:"center", height: '100vh'}}>Redirecting...<CircularProgress /></Grid></div> */}
        </>)
    }

    useEffect(() => {
        if (pdcData && pdcData.children) {
            let detail: any = pdcData.children.find((port: any) => port.portNumber === currentSelectedPdcPortNumber);
            if (detail && detail.id) {
                dispatch(fetchPdcDetails(detail.id))
            }
            console.log(detail, "detail")
        }
    }, [currentSelectedPdcPortNumber])

    useEffect(() => {
        if (formState.isSuccess == true) {
            if (pdcData && pdcData.children) {
                let detail: any = pdcData.children.find((port: any) => port.portNumber === currentSelectedPdcPortNumber);
                if (detail && detail.deviceType === "agdb" && detail.detail && currentSelectedPdcPortNumber === detail.detail.portNumber) {
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
                        platformNo1: detail.detail.platformNo[0],
                        platformNo2: detail.detail.platformNo[1],
                    })
                    setShowLoader(false)
                }
            }
        }
    }, [formState, currentSelectedPdcPortNumber]);

    useEffect(() => {
        if (agdbState.isSuccess === true && enableSubmit === true) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: `${Messages.FORM_SUBMITTED_SUCESSFULLY}`,
                showConfirmButton: false,
                allowOutsideClick: false,
                timer: 3000,
            }).then(() => {
                dispatch(fetchDevicesDetails(pdcData?.id))
            })
        }
    }, [agdbState])

    // useEffect(() => {
    //     setenableSubmit(true);
    // }, [interfaceInput]);

    return (
        <>
            {showLoader === true ?
                loader() : (<Grid item xs={12} style={{ height: '100%' }}>
                    <Card style={{ border: '1px solid rgb(221, 221, 221)', height: '100%' }} className={appUser.userRole == "ROLE_STATION MASTER" ? "overlapBackground agdbCardPdc" : "agdbCardPdc"}>
                        <CardContent className="p-0" >
                            {/* {appUser.userRole == "ROLE_STATION MASTER" ?
              <Grid style={{ color: "red", display: "flex", justifyContent: "center", fontSize: "22px" }}>*view only</Grid>
              : <></>
            } */}
                            {
                                appUser.userRole == "ROLE_STATION MASTER" ? <Grid className="stationForm formFields">

                                </Grid> : <></>
                            }
                            <Typography component="p" className="confHedPdc">
                                <b>Configuration Settings</b>
                            </Typography>
                        </CardContent>
                        <Grid container className="mb-10">
                            <Grid item xs={5} md={8} lg={6} xl={5} className="agdbSubHed">
                                At a Glance Display Board IP Address<sup className="asterisk">*</sup>
                            </Grid>
                            <Grid item xs={5} md={4} lg={5}>
                                <Grid container className="agdbGridpdc" spacing={1}>
                                    <Grid item xs={3} >  <TextField disabled className="mldbBoxStyle" variant="outlined" type="text" name="ipAddress1" required={true} value={interfaceInput.ipAddress1} onChange={handleChange} /></Grid>
                                    <Grid item xs={3}>  <TextField disabled className="mldbBoxStyle " variant="outlined" type="text" name="ipAddress2" required={true} value={interfaceInput.ipAddress2} onChange={handleChange} /></Grid>
                                    <Grid item xs={3}><TextField disabled className="mldbBoxStyle" variant="outlined" type="text" name="ipAddress3" required={true} value={interfaceInput.ipAddress3} onChange={handleChange} /></Grid>
                                    <Grid item xs={3}><TextField className="mldbBoxStyle" variant="outlined" type="text" name="ipAddress4" required={true} value={interfaceInput.ipAddress4} onChange={handleChange} /></Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container className="mb-10">

                            <Grid item xs={5} md={8} lg={6} xl={5} className="agdbSubHed">
                                At a Glance Display Board Name
                            </Grid>
                            <Grid item xs={5} md={4} lg={5} className="ivdTextBoxpdc">
                                <TextField className="agdbNameValuePdc" variant="outlined" type="text" name="deviceName" required={true} value={interfaceInput.deviceName} onChange={handleChange} />
                            </Grid>
                        </Grid>
                        <Grid container className="mb-10">

                            <Grid item xs={5} md={8} lg={6} xl={5} className="agdbSubHed">
                                Board Type
                            </Grid>
                            <Grid item xs={5} md={4} lg={5} className="ivdTextBoxpdc">
                                <select className="agdbNameValuePdc h-40" name="boardType" required={true} value={interfaceInput.boardType} onChange={handleChange}>
                                    <option>Select</option>
                                    <option value="both">Both</option>
                                </select>
                            </Grid>
                        </Grid>
                        <Grid container className="mb-10">

                            <Grid item xs={5} md={8} lg={6} xl={5} className="agdbSubHed">
                                FOB Indicator Position
                            </Grid>
                            <Grid item xs={5} md={4} lg={5} className="ivdTextBoxpdc">
                                <select className="agdbNameValuePdc h-40" name="fobIndicatorPosition" required={true} value={interfaceInput.fobIndicatorPosition} onChange={handleChange}>
                                    <option>Select</option>
                                    <option value="10">10</option>
                                </select>
                            </Grid>
                        </Grid>
                        <Grid container className="mb-10">

                            <Grid item xs={5} md={8} lg={6} xl={5} className="agdbSubHed">
                                Selected Platform
                            </Grid>
                            <Grid item xs={5} md={4} lg={5}>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <select disabled name="platformNo1" value={interfaceInput.platformNo1} onChange={handleChange} className="selectAgdbPltpdc">
                                            <option value="0">Select</option>
                                            {platformNumbers?.map((platformNo: any, i: any) => {
                                                return (
                                                    <option value={platformNo}>
                                                        {platformNo}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <select name="platformNo2" value={interfaceInput.platformNo2} onChange={handleChange} className="selectAgdbPltPdc2">
                                            <option value="0">Select</option>
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
                            </Grid>
                        </Grid>
                        <Grid container style={{justifyContent:"center"}}>
                            <Grid item xs={2} md={3} lg={2} xl={2} ></Grid>
                            <Grid item xs={4} md={6} lg={4} xl={4}>
                                {(agdbState.isError === true && agdbMessage != "" && enableSubmit == true) ? <div style={{ color: "red", textAlign: "center" }}> {agdbMessage}</div> : <></>}
                            </Grid>
                        </Grid>
                        {appUser.userRole == "ROLE_STATION MASTER" ? <></> :
                            <Grid container spacing={2} style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                                <Grid item xs={3}>
                                    <Button onClick={handleSubmit} type="submit" className="mldbSaveBtn" variant="outlined">
                                        <DoneIcon className="SaveIcon" style={{ display: "inherit" }} />
                                        Save
                                    </Button>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button type="reset" value="Reset" variant="outlined" className="mldbCancelBtn" onClick={handleCancel}>
                                        <ClearIcon className="clearIcon" />
                                        Cancel
                                    </Button>
                                </Grid>
                                {interfaceInput.id !== 0 ?
                                    <>
                                        <Grid item xs={3}>
                                            <Button type="submit" variant="outlined" className="mldbDeleteBtn" onClick={handleDelete}>
                                                <DeleteIcon className="deleteIcon" />
                                                Delete
                                            </Button>
                                        </Grid>
                                    </>
                                    :
                                    <Grid item xs={3}>
                                        <Button disabled type="submit" variant="outlined" className="mldbDeleteBtn" onClick={handleDelete}>
                                            <DeleteIcon className="deleteIcon" />
                                            Delete
                                        </Button>
                                    </Grid>
                                }
                            </Grid>
                        }

                    </Card>
                </Grid>)}
        </>
    )
}