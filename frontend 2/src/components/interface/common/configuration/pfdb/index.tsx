import { Grid, Card, CardContent, Typography, TextField, Button, Checkbox, FormControlLabel, CircularProgress } from "@material-ui/core"
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { interfaceStateSelector } from "../../../../../redux/reducers/interface/interface";
import { useEffect, useState } from "react";
import { agdbPost, mldbPost, DeleteDevices, fetchDevicesDetails, updateDeviceName, updatePortName, pfdbPost, fetchDevices } from "../../../../../redux/actions/interface/interface";
import Swal from "sweetalert2";
import { Messages } from "../../../../../constants/messages";
import { authuserStateSelector } from "../../../../../redux/reducers/authUser/authUser";
import SetupService from "../../../../service/setup/setup";
import TrainDataModel from "../../../../../model/setup/trainDataModel";



export const Pfdb = () => {
    const setup = new SetupService();
    const { appUser } = useSelector(authuserStateSelector)
    const [platformNumbers, setPlatformNumbers] = useState<[]>([]);
    const [submit, setSubmit] = useState(false)
    const { pfdbMessage, pfdbState, message, cdsData, currentSelectedCdsPortNumber, deleteState, formState, currentSelectedCdsEthernetDevice } = useSelector(interfaceStateSelector);
    const dispatch = useDispatch();
    const [interfaceInput, setInterfaceInput] = useState<TrainDataModel | any>({
        id: 0,
        portNumber: 0,
        ipAddress1: "192",
        ipAddress2: "168",
        ipAddress3: "0",
        ipAddress4: "",
        deviceName: "",
        boardType: "",
    })

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
            portNumber: currentSelectedCdsPortNumber,
            deviceType: currentSelectedCdsEthernetDevice,
            ipAddress: `${interfaceInput.ipAddress1}.${interfaceInput.ipAddress2}.${interfaceInput.ipAddress3}.${interfaceInput.ipAddress4}`,
            boardType: interfaceInput.boardType,
            deviceName: interfaceInput.deviceName,
        };
        dispatch(pfdbPost(inte));
        setSubmit(true)
    };

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
                if (detail && detail.deviceType === "pfdb" && detail.detail && currentSelectedCdsPortNumber === detail.detail.portNumber) {
                    console.log(detail, "detail")
                    let ipAddress = detail.detail.ipAddress.split(".");
                    setInterfaceInput({
                        id: detail.id,
                        portNumber: detail.portNumber,
                        deviceName: detail.detail.deviceName,
                        boardType: detail.detail.boardType,
                        ipAddress1: ipAddress[0],
                        ipAddress2: ipAddress[1],
                        ipAddress3: ipAddress[2],
                        ipAddress4: ipAddress[3],
                    })
                }
            }
        }
    }, [formState, currentSelectedCdsPortNumber])


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
                dispatch(fetchDevices());
            });
        }
    }, [pfdbState, submit])

    useEffect(() => {
        if (formState.isSuccess == true && submit == true) {
            if (cdsData && cdsData.children) {
                let detail: any = cdsData.children.find((port: any) => port.portNumber === currentSelectedCdsPortNumber);
                if (detail && detail.deviceType === "pfdb" && currentSelectedCdsPortNumber == detail.portNumber) {
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
                    let data: any = {
                        portNumber: currentSelectedCdsPortNumber,
                        portName: "CDS"
                    };
                    dispatch(updatePortName(data))
                    const data1: any = {
                        deviceName: "CDS"
                    };
                    dispatch(updateDeviceName(data1))
                })
                .then(() => {
                    dispatch(fetchDevices())
                    // setInterfaceInput({
                    //     id: 0,
                    //     portNumber: 0,
                    //     ipAddress1: "192",
                    //     ipAddress2: "168",
                    //     ipAddress3: "0",
                    //     ipAddress4: "",
                    //     deviceName: "",
                    //     boardType: "",
                    // })
                })
        }
    }, [deleteState, deleted])


    const handleCancel = () => {
        setInterfaceInput({
            id: 0,
            portNumber: 0,
            ipAddress1: "192",
            ipAddress2: "168",
            ipAddress3: "0",
            ipAddress4: "",
            deviceName: "",
            boardType: "",
        })
    }
    // return (
    //     <>
    //         <>
    //             <Grid item xs={12}>
    //                 <Card style={{ paddingBottom: "8px", minHeight: '630px' }} className={appUser.userRole == "ROLE_STATION MASTER" ? "overlapBackground pdbCard" : "pdbCard"}>
    //                     {
    //                         appUser.userRole == "ROLE_STATION MASTER" ? <Grid className="stationForm formFields">

    //                         </Grid> : <></>
    //                     }

    //                     <Typography className="pdbHed">
    //                         <b>Configuration Settings test</b>
    //                     </Typography>
    //                     <Grid container>
    //                         <Grid item xs={5} className="pdbSubHed">
    //                             Platform Display Board IP Address
    //                         </Grid>
    //                         <Grid item xs={7}>
    //                             <Grid className="pdbIpGrid">
    //                                 <TextField disabled className="disabled ipboxstyle mr-10" variant="outlined" name="ipAddress1" required={true} value={interfaceInput.ipAddress1} onChange={handleChange} />
    //                                 <TextField disabled className="disabled ipboxstyle mr-10" variant="outlined" name="ipAddress2" required={true} value={interfaceInput.ipAddress2} onChange={handleChange} />
    //                                 <TextField disabled className="disabled ipboxstyle mr-10" variant="outlined" name="ipAddress3" required={true} value={interfaceInput.ipAddress3} onChange={handleChange} />
    //                                 <TextField className="ipboxstyle" variant="outlined" name="ipAddress4" required={true} value={interfaceInput.ipAddress4} onChange={handleChange} />
    //                             </Grid>
    //                         </Grid>
    //                         <Grid item xs={5} className="pdbSubHed">
    //                             Platform Display Board Name
    //                         </Grid>
    //                         <Grid item xs={7}>
    //                             <TextField size="small" className="ivdBoxstyle" variant="outlined" name="deviceName" required={true} value={interfaceInput.deviceName} onChange={handleChange} />
    //                         </Grid>
    //                         <Grid item xs={5} className="pdbSubHed">
    //                             Board Type
    //                         </Grid>
    //                         <Grid item xs={7}>
    //                             <select className="selectfield" name="boardType" required={true} value={interfaceInput.boardType} onChange={handleChange} >
    //                                 <option value="">Select</option>
    //                                 <option value="single">Single</option>
    //                                 <option value="double">Double</option>
    //                             </select>
    //                         </Grid>

    //                     </Grid>
    //                     {pfdbMessage != "" ? (
    //                         <div style={{ textAlign: "center", color: "red" }}>
    //                             {pfdbMessage}
    //                         </div>
    //                     ) : (
    //                         <></>
    //                     )}
    //                     {appUser.userRole == "ROLE_STATION MASTER" ? <></> :
    //                         <div style={{ paddingTop: "1.59%", display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "3%" }}>
    //                             <Button onClick={handleSubmit} type="submit" className="coachSaveBtn" variant="outlined" >
    //                                 <DoneIcon className="SaveIcon" style={{ display: "inherit" }} />
    //                                 Save
    //                             </Button>
    //                             <Button type="reset" value="Reset" onClick={handleCancel} variant="outlined" className="coachCancelBtn">
    //                                 <CloseIcon className="clearIcon" />
    //                                 Cancel
    //                             </Button>
    //                             <Button type="submit" variant="outlined" onClick={handleDelete} className="coachDeleteBtn">
    //                                 <DeleteIcon className="deleteIcon" />
    //                                 Delete
    //                             </Button>
    //                         </div>}
    //                 </Card>
    //             </Grid>
    //         </>
    //     </>
    // )


    return (
        <>
            <Grid item xs={12} style={{ height: "100%"}}>
                <Card style={{ padding : "30px" , height : "100%" }} className={appUser.userRole == "ROLE_STATION MASTER" ? "overlapBackground pdbCard" : "pdbCard"}>
                    {
                        appUser.userRole == "ROLE_STATION MASTER" ? <Grid className="stationForm formFields">

                        </Grid> : <></>
                    }
                    <Grid container className="margin-N">
                        <Typography className="confHed">
                            <strong>
                                Configuration Settings Test
                            </strong>
                        </Typography>
                    </Grid>   
                    <Grid container spacing={2} className="mb-17">
                        <Grid item xs={4} md={6} lg={6} className="pr-pdb"> 
                            <Typography className="pdbSubHed">
                                Platform Display Board IP Addrweweess
                            </Typography>
                        </Grid>
                        <Grid item xs={4} md={4} lg={3}>
                            <Grid container spacing={1} className="pdbIpGrid">
                                <Grid item xs={3}>
                                    <TextField disabled className="disabled ipboxstyle mr-10" variant="outlined" name="ipAddress1" required={true} value={interfaceInput.ipAddress1} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField disabled className="disabled ipboxstyle mr-10" variant="outlined" name="ipAddress2" required={true} value={interfaceInput.ipAddress2} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField disabled className="disabled ipboxstyle mr-10" variant="outlined" name="ipAddress3" required={true} value={interfaceInput.ipAddress3} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField className="ipboxstyle" variant="outlined" name="ipAddress4" required={true} value={interfaceInput.ipAddress4} onChange={handleChange} />
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid container spacing={2} className="mb-17">
                        <Grid item xs={4} md={6} lg={6} className="pr-pdb">
                            <Typography className="pdbSubHed">
                                Platform Display Board Name
                            </Typography>
                        </Grid>
                        <Grid item xs={4} md={4} lg={3}>
                            <TextField size="small" className="ivdBoxstyle" variant="outlined" name="deviceName" required={true} value={interfaceInput.deviceName} onChange={handleChange} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} className="mb-21">
                        <Grid item xs={4} md={6} lg={6} className="pr-pdb">
                            <Typography className="pdbSubHed">
                                Board Type
                            </Typography>
                        </Grid>
                        <Grid item xs={4} md={4} lg={3}>
                            <select className="selectfield" name="boardType" required={true} value={interfaceInput.boardType} onChange={handleChange} >
                                <option value="">Select</option>
                                <option value="single">Single</option>
                                <option value="double">Double</option>
                            </select>
                        </Grid>

                    </Grid>
                        {pfdbMessage != "" ? (
                            <div style={{ textAlign: "center", color: "red",marginLeft:"205px" }}>
                                {pfdbMessage}
                            </div>
                        ) : (
                            <></>
                        )}
                    {appUser.userRole == "ROLE_STATION MASTER" ? <></> :
                        <Grid container spacing={2} style={{ paddingTop: "1.59%", display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "5%" }}>
                            <Grid item xs={2} md={3} lg={2} xl={2}>
                                <Button onClick={handleSubmit} type="submit" className="coachSaveBtn w-pfdb" variant="outlined" >
                                    <DoneIcon className="SaveIcon" style={{ display: "inherit" }} />
                                    Save
                                </Button>
                            </Grid>
                            <Grid item xs={2} md={3} lg={2} xl={2}>
                                <Button type="reset" value="Reset" onClick={handleCancel} variant="outlined" className="coachCancelBtn w-pfdb">
                                    <CloseIcon className="clearIcon" />
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item xs={2} md={3} lg={2} xl={2}>
                                <Button type="submit" variant="outlined" onClick={handleDelete} className="coachDeleteBtn w-pfdb">
                                    <DeleteIcon className="deleteIcon" />
                                    Delete
                                </Button>
                            </Grid>
                        </Grid>}
                </Card>
            </Grid>
        </>
    )
}




