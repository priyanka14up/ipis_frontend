import { Button, Card, CardContent, Grid, TextField, Typography, Checkbox, FormControlLabel } from "@material-ui/core"
import "./style.css";
import { useEffect, useState } from "react";
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from "@material-ui/icons/Delete";
import { Coach } from "./coach";
import ArrowDown from "../../../../../../assets/images/ArrowDown.svg";
import ArrowUp from "../../../../../../assets/images/Vector.svg";
import { useDispatch, useSelector } from "react-redux";
import { interfaceStateSelector } from "../../../../../../redux/reducers/interface/interface";
import { cgdbPost, DeleteDevices, fetchDevices, fetchDevicesDetails, fetchPdcDetails, updateDeviceName, updatePdcChildDeviceName, updatePortName, updateSubPortName } from "../../../../../../redux/actions/interface/interface";
import Swal from "sweetalert2";
import { Messages } from "../../../../../../constants/messages";
import { authuserStateSelector } from "../../../../../../redux/reducers/authUser/authUser";
import { PdcAttatchedDevices } from "..";


export const Cgdb = (props: any) => {
    const { platformNumbers } = props;
    const { selectedPortId } = props;
    const { currentSelectedCdsEthernetDevice, pdcData, currentSelectedPdcEthernetDevice, currentSelectedPdcPortNumber, deleteState, formState, cgdbMessage, cgdbState, currentSelectedCdsPortNumber, cdsData } = useSelector(interfaceStateSelector)
    const dispatch = useDispatch();
    const { appUser } = useSelector(authuserStateSelector)
    const [coachNumber, setCoachNumber] = useState(0)
    const [startCoach, setStartCoach] = useState(0);
    const [submit, setSubmit] = useState(false);
    const [Data, setData] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32]);

    const [interfaceInput, setInterfaceInput] = useState({
        id: 0,
        portNumber: "",
        ipAddress4: "",
        startId: 0,
        noOfCoaches: 0,
        englishInfoDisplay: false,
        hindiInfoDisplay: false,
        platformNo: "",
        coaches: [{
            coachNo: 0,
            coachName: "",
            connected: "",
        }],
    })


    function getCoachNumber(event: any) {
        if (parseInt(event.target.value) == 0) {
            setStartCoach(0)
        } else if (parseInt(event.target.value) >= 0) {
            const coachId = (event.target.value) - 1
            setStartCoach(coachId);
        } else {
            setStartCoach(0)
        }
        handleChange(event)
    }

    const [coachList, setCoachList] = useState<any>([]);

    useEffect(() => {
        let dummyCoachList = new Array(interfaceInput.noOfCoaches)
        for (let i = 0; i < dummyCoachList.length; i++) {
            dummyCoachList[i] = i
        }
        setCoachList(dummyCoachList);
    }, [interfaceInput.noOfCoaches])

    function coachChange(event: any) {
        if (event.target.value != "") {
            setCoachNumber(parseInt(event.target.value) + 1)
            handleChange(event)
        } else {
            setInterfaceInput({ ...interfaceInput, [event.target.name]: 0 });
        }
    }

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
        if (pdcData.platformNo) {
            setInterfaceInput({ ...interfaceInput, ["platformNo"]: pdcData?.platformNo[0] })
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

    const handleCancel = () => {
        setInterfaceInput({
            id: 0,
            portNumber: "",
            ipAddress4: "",
            startId: 0,
            noOfCoaches: 0,
            englishInfoDisplay: false,
            hindiInfoDisplay: false,
            platformNo: "",
            coaches: [{
                coachNo: 0,
                coachName: "",
                connected: "",
            }],
        })
    }

    console.log(interfaceInput.noOfCoaches, "noOfCOaches")

    const handleChange = (e: any) => {
        var { name, value } = e.target;
        if (name == "startId" || name == "noOfCoaches" && value != "") {
            if (value != "") {
                setInterfaceInput({ ...interfaceInput, [name]: parseInt(value) });
            }
            else if (name != "noOfCoaches") {
                setInterfaceInput({ ...interfaceInput, [name]: null });
            }
        }
        else {
            setInterfaceInput({ ...interfaceInput, [name]: value });
        }
    };

    const handleChecked = (e: any) => {
        var { name, checked } = e.target;
        setInterfaceInput({ ...interfaceInput, [name]: checked });
    };

    const [coach] = useState<any>([]);

    const getCoachesData = () => {
        for (let i = 0; i < interfaceInput.noOfCoaches; i++) {
            coach.push({
                coachNo: `${i + 1}`,
                coachName: `C${i + interfaceInput.startId + 1}`,
                ipAddress: `192.168.${interfaceInput.platformNo}.${(interfaceInput.startId) + i}`,
                status: "Disconnected"
            })
        }
    };

    console.log(coach, "coach")

    const handleSubmit = () => {
        getCoachesData()
        if (interfaceInput.id == 0) {
            let inter: any = {
                id: interfaceInput.id,
                deviceType: currentSelectedPdcEthernetDevice,
                portNumber: currentSelectedPdcPortNumber,
                ipAdress: `192.168.${interfaceInput.platformNo}.${interfaceInput.ipAddress4}`,
                platformNo: [interfaceInput.platformNo],
                noOfCoaches: interfaceInput.noOfCoaches,
                startId: interfaceInput.startId,
                englishInfoDisplay: interfaceInput.englishInfoDisplay,
                hindiInfoDisplay: interfaceInput.hindiInfoDisplay,
                coaches: coach
            };
            dispatch(cgdbPost(inter))
        }
        else {
            let inter: any = {
                id: interfaceInput.id,
                deviceType: currentSelectedPdcEthernetDevice,
                portNumber: currentSelectedPdcPortNumber,
                ipAdress: `192.168.${interfaceInput.platformNo}.${interfaceInput.ipAddress4}`,
                platformNo: interfaceInput.platformNo,
                noOfCoaches: interfaceInput.noOfCoaches,
                startId: interfaceInput.startId,
                englishInfoDisplay: interfaceInput.englishInfoDisplay,
                hindiInfoDisplay: interfaceInput.hindiInfoDisplay,
                coaches: coach
            };
            dispatch(cgdbPost(inter))
        }
        setSubmit(true);
    };

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
                if (detail && detail.deviceType === "cgdb" && detail.detail && currentSelectedPdcPortNumber === detail.detail.portNumber) {
                    console.log(detail, "detail")
                    setInterfaceInput({
                        id: detail.id,
                        ipAddress4: "",
                        platformNo: detail.detail.platformNo,
                        noOfCoaches: detail.detail.noOfCoaches,
                        startId: detail.detail.startId,
                        englishInfoDisplay: detail.detail.englishInfoDisplay,
                        hindiInfoDisplay: detail.detail.hindiInfoDisplay,
                        coaches: detail.detail.coaches,
                        portNumber: detail.detail.portNumber,
                    })
                }
            }
        }
    }, [formState, currentSelectedPdcPortNumber])

    useEffect(() => {
        var lengthCoaches = interfaceInput?.coaches?.length
        setCoachNumber(lengthCoaches)
    }, [interfaceInput])

    useEffect(() => {
        if (cgdbState.isSuccess === true && submit === true) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: `${Messages.FORM_SUBMITTED_SUCESSFULLY}`,
                showConfirmButton: false,
                allowOutsideClick: false,
                timer: 3000,
            }).then(() => {
                dispatch(fetchDevicesDetails(pdcData?.id));
            })
        }
    }, [cgdbState, submit])

    useEffect(() => {
        if (formState.isSuccess == true && submit == true) {
            if (pdcData && pdcData.children) {
                let detail: any = pdcData.children.find((port: any) => port.portNumber === currentSelectedPdcPortNumber);
                if (detail && detail.deviceType === "cgdb" && currentSelectedPdcPortNumber == detail.portNumber) {
                    console.log(detail, "detail")
                    setInterfaceInput({ ...interfaceInput, ["id"]: detail.id })
                }
            }
        }
    }, [formState])

    return (
        <>
            <Grid item xs={12} style={{height:'100%'}}>
                <Card className={appUser.userRole == "ROLE_STATION MASTER" ? "overlapBackground cgdbCardPdc" : "cgdbCardPdc"} >
                    {appUser.userRole == "ROLE_STATION MASTER" ? <Grid className="stationForm formFields">

                    </Grid> : <></>
                    }
                    <CardContent style={{ padding: "0px" }}>
                        <Typography variant="h6" component="p" className="confSett">
                            <b>Configuration Settings</b>
                        </Typography>


                        <Grid container style={{ display: "flex", alignItems: "center", marginBottom: '15px' }} >
                            <Grid item xs={6} className='cgdbSelect'>
                                <Grid container>
                                    <Grid item xs={4} md={12} lg={4} className="platForSett">
                                        Platform no.
                                    </Grid>
                                    <Grid item xs={8} md={12} lg={8}>
                                        <select disabled className="platformstyle" name="platformNo" value={interfaceInput.platformNo} onChange={handleChange}>
                                            <option >Select</option>
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
                            <Grid item xs={6}>
                                <Grid container>

                                    <Grid item xs={4} md={12} lg={5} xl={4} className="platForSett">
                                        No. of Coaches
                                    </Grid>
                                    <Grid item xs={8} md={12} lg={7} xl={8}>
                                        <select className="platformstyle" name="noOfCoaches" onChange={coachChange} value={interfaceInput.noOfCoaches}>
                                            <option value="">Select</option>
                                            {Data.map((item) => <option value={item}>{item}</option>)}

                                        </select>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container xs={6} style={{ display: "flex", alignItems: "baseline", marginBottom: '15px' }}>

                            {/* <Grid item xs={4} className="platForSett">
                                    PAN ID
                                </Grid>
                                <Grid item xs={8}>
                                    <select className="platformstyle">
                                        <option>Select</option>
                                        <option value="pf1">1</option>
                                    </select>
                                </Grid> */}
                            <Grid item xs={4} md={12} lg={4} className="platForSett">
                                Start ID
                            </Grid>
                            <Grid item xs={8} md={12} lg={8}>
                                <TextField type="number" className="startId" variant="outlined" onChange={getCoachNumber} name="startId" value={interfaceInput.startId} />
                            </Grid>

                        </Grid>

                        <Grid container style={{ display: "flex", alignItems: "center", marginBottom: '15px' }}>
                            <Grid item xs={7} lg={9} xl={8}>
                                <Grid container>

                                    <Grid item xs={3} md={12} lg={4} xl={3} className="infSett ">
                                        Information to Display
                                    </Grid>
                                    <Grid item md={12} lg={8} xl={9}>
                                        <Grid container>
                                            <Grid item xs={6} md={6} lg={6} xl={6} >
                                                <FormControlLabel value={interfaceInput?.englishInfoDisplay} onChange={handleChecked}
                                                    control={
                                                        <Checkbox
                                                            checked={interfaceInput?.englishInfoDisplay}
                                                            size="small"
                                                            name="englishInfoDisplay"
                                                            // value={true}
                                                            style={{ color: "#033733" }}
                                                            className="onlineChckBoxs"
                                                        />
                                                    }
                                                    label={
                                                        <span className="infSett" >English Coach</span>
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={6} md={6} lg={6} xl={6}>
                                                <FormControlLabel value={interfaceInput?.hindiInfoDisplay} onChange={handleChecked}
                                                    control={
                                                        <Checkbox
                                                            checked={interfaceInput?.hindiInfoDisplay}
                                                            size="small"
                                                            name="hindiInfoDisplay"
                                                            // value={true}
                                                            style={{ color: "#033733" }}
                                                            className="onlineChckBoxs"
                                                        />
                                                    }
                                                    label={
                                                        <span className="infSett">Hindi Coach</span>
                                                    }
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {appUser.userRole == "ROLE_STATION MASTER" ? <></> :
                                <Grid item xs={5} lg={3} xl={4}>
                                    <Button type="submit" className="autoGenerate" variant="outlined">
                                        Auto Generate Id
                                    </Button>
                                </Grid>
                            }
                        </Grid>

                        {interfaceInput.noOfCoaches !== 0 ? <Card style={{ overflow: 'scroll', maxHeight: '16vh', paddingTop: '2px' }}>  {coachNumber == 0 ? null : <Grid container style={{ padding: "10px 9px 9px 7px", display: "flex", justifyContent: "space-between" }}>
                            <Grid item>
                                <Typography className="northend"><img style={{ paddingRight: "9px" }} src={ArrowUp} /> NORTH END</Typography>
                            </Grid>
                            <Grid item>
                                <Typography className="northend">SOUTH END <img style={{ paddingLeft: "9px" }} src={ArrowDown} /></Typography>
                            </Grid>
                        </Grid>}

                            <Grid>
                                <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", paddingTop: "9px", }}>

                                    {coachList.map((el: any, i: any) =>

                                        <Coach number={i} key={i} itemData={i} userCoach={interfaceInput.startId} />
                                    )}
                                </div>
                            </Grid> </Card> : <></>}
                        {cgdbMessage != "" ? (
                            <div style={{ textAlign: "center", color: "red", marginTop: '7px' }}>
                                {cgdbMessage}
                            </div>
                        ) : (
                            <></>
                        )}
                        {appUser.userRole == "ROLE_STATION MASTER" ? <></> :
                            <Grid container spacing={2} style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: '10px' }}>
                                <Grid item xs={2} md={3} lg={2}>
                                    <Button type="submit" className="coachSaveBtn" variant="outlined" onClick={handleSubmit}>
                                        <DoneIcon className="SaveIcon" style={{ display: "inherit" }} />
                                        Save
                                    </Button>
                                </Grid>
                                <Grid item xs={2} md={3} lg={2}>
                                    <Button variant="outlined" className="coachCancelBtn" onClick={handleCancel}>
                                        <ClearIcon className="clearIcon" />
                                        Cancel
                                    </Button>
                                </Grid>
                                <Grid item xs={2} md={3} lg={2}>
                                    <Button variant="outlined" className="coachDeleteBtn" onClick={handleDelete}>
                                        <DeleteIcon className="deleteIcon" />
                                        Delete
                                    </Button>
                                </Grid>
                            </Grid>}
                    </CardContent>
                </ Card>
            </Grid>
        </>
    )
}