import { Button, Card, Grid, TextField, Typography } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { interfaceStateSelector } from "../../../../../../redux/reducers/interface/interface";
import { DeleteDevices, fetchDevices, fetchDevicesDetails, fetchPdcDetails, pfdbPost, updateDeviceName, updatePdcChildDeviceName, updatePortName, updateSubPortName } from "../../../../../../redux/actions/interface/interface";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { Messages } from "../../../../../../constants/messages";
import { authuserStateSelector } from "../../../../../../redux/reducers/authUser/authUser";

export const Pfdb = (props: any) => {
    const { platformNumbers } = props;
    const [interfaceInput, setInterfaceInput] = useState({
        id: 0,
        portNumber: 0,
        ipAddress1: "192",
        ipAddress2: "168",
        ipAddress3: "",
        ipAddress4: "",
        deviceName: "",
        boardType: "",
        platformNo1: "",
        platformNo2: "",
    })
    const { appUser } = useSelector(authuserStateSelector)
    const [submit, setSubmit] = useState(false)
    const { currentSelectedCdsEthernetDevice, currentSelectedCdsPortNumber, pfdbMessage, pfdbState, cdsData, pdcData, currentSelectedPdcPortNumber, deleteState, formState, currentSelectedPdcEthernetDevice } = useSelector(interfaceStateSelector);
    const dispatch = useDispatch();
    const handleChange = (e: any) => {
        var { name, value } = e.target;  
    if (name == "ipAddress4" && value.match(/^[\d]{0,3}$/i)){
        setInterfaceInput({ ...interfaceInput, [name]: value })
    }
    else if(name!="ipAddress4"){
        setInterfaceInput({ ...interfaceInput, [name]: value })
    }
    }


    const handleSubmit = () => {
        let inte: any = {
            id: interfaceInput.id,
            portNumber: currentSelectedPdcPortNumber,
            deviceType: currentSelectedPdcEthernetDevice,
            ipAddress: `${interfaceInput.ipAddress1}.${interfaceInput.ipAddress2}.${interfaceInput.ipAddress3}.${interfaceInput.ipAddress4}`,
            boardType: interfaceInput.boardType,
            deviceName: interfaceInput.deviceName,
            platformNo: [interfaceInput.platformNo1, interfaceInput.platformNo2],
        };
        dispatch(pfdbPost(inte));
        setSubmit(true)
    };


    useEffect(() => {
        if (pdcData.platformNo) {
            setInterfaceInput({ ...interfaceInput, ["ipAddress3"]: pdcData?.platformNo[0], ["platformNo1"]: pdcData?.platformNo[0] })
        }
    }, [pdcData.platformNo])

    console.log(pdcData, 53);
    useEffect(() => {
        if (pdcData && pdcData.children) {
            let detail: any = pdcData.children.find((port: any) => port.portNumber === currentSelectedPdcPortNumber);
            if (detail && detail.id) {
                dispatch(fetchPdcDetails(detail.id))
            }
        }
    }, [currentSelectedPdcPortNumber])


    useEffect(() => {
        if (formState.isSuccess == true) {
            if (pdcData && pdcData.children) {
                let detail: any = pdcData.children.find((port: any) => port.portNumber === currentSelectedPdcPortNumber);
                if (detail && detail.deviceType === "pfdb" && detail.detail && currentSelectedPdcPortNumber === detail.detail.portNumber) {
                    console.log(detail, "detail")
                    let ipAddress = detail.detail.ipAddress.split(".");
                    setInterfaceInput({
                        id: detail.id,
                        portNumber: detail.portNumber,
                        deviceName: detail.detail.deviceName,
                        boardType: detail.detail.boardType,
                        platformNo1: detail.detail.platformNo[0],
                        platformNo2: detail.detail.platformNo[1],
                        ipAddress1: ipAddress[0],
                        ipAddress2: ipAddress[1],
                        ipAddress3: ipAddress[2],
                        ipAddress4: ipAddress[3],
                    })
                }
            }
        }
    }, [formState, currentSelectedPdcPortNumber])


    useEffect(() => {
        if (pfdbState.isSuccess === true && submit === true) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: `${Messages.FORM_SUBMITTED_SUCESSFULLY}`,
                showConfirmButton: false,
                allowOutsideClick: false,
                timer: 3000,
            }).then(() => {
                dispatch(fetchDevicesDetails(pdcData?.id));
            });
        }
    }, [pfdbState, submit])

    useEffect(() => {
        if (formState.isSuccess == true && submit == true) {
            if (pdcData && pdcData.children) {
                let detail: any = pdcData.children.find((port: any) => port.portNumber === currentSelectedPdcPortNumber);
                if (detail && detail.deviceType === "pfdb" && currentSelectedPdcPortNumber == detail.portNumber) {
                    console.log(detail, "detail")
                    setInterfaceInput({ ...interfaceInput, ["id"]: detail.id })
                    setSubmit(false)
                }
            }
        }
    }, [formState])

    const [deleted, setDeleted] = useState(false);

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
    }

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
            })
                .then(() => {
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

    return (
        <>

            <Card style={{ paddingBottom: "8px",height:'100%' }} className={appUser.userRole == "ROLE_STATION MASTER" ? "overlapBackground pdbCard" : "pdbCard"}>
                {
                    appUser.userRole == "ROLE_STATION MASTER" ? <Grid className="stationForm formFields">

                    </Grid> : <></>
                }
                <Typography className="pdbHed">
                    <b>Configuration Settings</b>
                </Typography>
                <Grid container className="mb-10">
                    <Grid item xs={5}  md={7} lg={5} className="pdbSubHed">
                        Platform Display Board IP Address
                    </Grid>
                    <Grid item xs={5} className="pdbIpGrid">
                        <Grid container spacing={1}>
                            <Grid item xs={3}>
                                <TextField disabled className="ipboxstyle mr-10" variant="outlined" name="ipAddress1" required={true} value={interfaceInput.ipAddress1} onChange={handleChange} /></Grid>
                            <Grid item xs={3}> <TextField disabled className="ipboxstyle mr-10" variant="outlined" name="ipAddress2" required={true} value={interfaceInput.ipAddress2} onChange={handleChange} /></Grid>
                            <Grid item xs={3}> <TextField disabled aria-disabled className="ipboxstyle mr-10" variant="outlined" name="ipAddress3" required={true} value={interfaceInput.ipAddress3} onChange={handleChange} /></Grid>
                            {/* <TextField className="ipboxstyle mr-10" variant="outlined" name="ipAddress3" required={true} value={pdcData.platformNo} onChange={handleChange} /> */}

                            <Grid item xs={3}>  <TextField className="ipboxstyle" variant="outlined" name="ipAddress4" required={true} value={interfaceInput.ipAddress4} onChange={handleChange} /></Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {console.log(interfaceInput.ipAddress3, 196)}
                <Grid container  className="mb-10">
                    <Grid item xs={5} md={7} lg={5} className="pdbSubHed">
                        Platform Display Board Name
                    </Grid>
                    <Grid item xs={5}>
                        <TextField size="small" className="ivdBoxstyle" variant="outlined" name="deviceName" required={true} value={interfaceInput.deviceName} onChange={handleChange} />
                    </Grid>
                </Grid>
                <Grid container className="mb-10">
                    <Grid item xs={5} md={7} lg={5} className="pdbSubHed">
                        Board Type
                    </Grid>
                    <Grid item xs={5}>
                        <select className="selectfield" name="boardType" required={true} value={interfaceInput.boardType} onChange={handleChange} >
                            <option value="">Select</option>
                            <option value="1">1</option>
                            <option value="2">2 </option>
                            <option value="both">both</option>
                        </select>
                    </Grid>
                </Grid>
                <Grid container className="mb-10">
                    <Grid item xs={5} md={7} lg={5} className="pdbSubHed">
                        Selected Platform
                    </Grid>
                    <Grid item xs={5}>
                        <Grid container spacing={4}>
                            <Grid item xs={6}>
                                <select disabled className="selectfieldPlt" name="platformNo1" required={true} value={interfaceInput.platformNo1} onChange={handleChange}>
                                    <option value="0">Select</option>
                                    {platformNumbers?.map((platformNo: any, i: any) => {
                                        return (
                                            <option value={platformNo[0]}>
                                                {platformNo}
                                            </option>
                                        );
                                    })}
                                </select>
                            </Grid>
                            <Grid item xs={6}>
                                <select className="selectfieldPlt" name="platformNo2" required={true} value={interfaceInput.platformNo2} onChange={handleChange}>
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

                {pfdbMessage != "" ? (
                    <Grid container style={{ textAlign: "center", color: "red" }}>
                        {pfdbMessage}
                    </Grid>
                ) : (
                    <></>
                )}
                {appUser.userRole == "ROLE_STATION MASTER" ? <></> :
                    <Grid container spacing={2} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Grid item xs={3}>
                            <Button onClick={handleSubmit} type="submit" className="coachSaveBtn" variant="outlined" >
                                <DoneIcon className="SaveIcon" style={{ display: "inherit" }} />
                                Save
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button type="reset" value="Reset" onClick={() => window.location.reload()} variant="outlined" className="coachCancelBtn">
                                <CloseIcon className="clearIcon" />
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button type="submit" variant="outlined" className="coachDeleteBtn" onClick={handleDelete}>
                                <DeleteIcon className="deleteIcon" />
                                Delete
                            </Button>
                        </Grid>
                    </Grid>}

            </Card>

        </>
    );
};
