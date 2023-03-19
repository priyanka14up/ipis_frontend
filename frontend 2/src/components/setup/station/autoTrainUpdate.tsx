import { Button, Card, Grid, Typography, IconButton, Checkbox, FormControlLabel, TextField, Modal, Divider, } from "@material-ui/core";
import React, { useEffect, useState, useRef } from "react";
import ClearIcon from '@material-ui/icons/Clear';



export const AutoTrainUpdate = (props: any) => {
    var stationDetails: any;
    var { platformError, setPlatformError } = props
    const platformNameList = useRef<any[]>(new Array(platformRange ? platformRange : 0))
    const [platformDisable, setPlatformDisable] = useState(true)
    const [array, setArray] = useState<any>([]);
    const [open, setOpen] = useState(false);
    const [isError, setIsError] = useState(false);
    const [newList, setNewList] = useState("")

    var platformRange: any;

    if (props && props?.getAutoTrainUpdate && props?.getAutoTrainUpdate?.stationDetails) {
        stationDetails = props?.getAutoTrainUpdate?.stationDetails
        platformRange = parseInt(props?.getAutoTrainUpdate?.stationDetails?.availablePlatforms)
    }

    useEffect(() => {
        setArray(stationDetails.listOfPlatforms);
    });

    var platformNo = new Array(platformRange ? platformRange : 0)

    for (var i = 0; i < platformRange; i++) {
        platformNo[i] = i
    }
    const [changeNumbers, setChangeNumbers] = useState<any>(false)
    useEffect(() => {
        platformNameList.current = new Array(platformRange ? platformRange : 0)
        if (!changeNumbers) {
            platformNameList.current = stationDetails.listOfPlatforms;
        }
    }, [platformRange])


    useEffect(() => {
        for (var i = 0; i < platformNameList?.current.length; i++) {
            if (platformNameList?.current[i]) {
                setPlatformDisable(false)

            } else {
                setPlatformDisable(true)
                break
            }
        }
    }, [platformNameList?.current, changeNumbers])

    const handleChange = (e: any) => {
        var { name, value, checked } = e.target;
        let platformList;
        if (name == "availablePlatforms" && value.match(/^[\d]{0,2}$/i)) {
            if (value != "") {
                platformList = stationDetails?.listOfPlatforms?.splice(0);
                props.getAutoTrainUpdate.getStationData({ ["listOfPlatforms"]: platformList })
                setChangeNumbers(true);
            }
            props.getAutoTrainUpdate.getStationData({ ["availablePlatforms"]: value })
        }
        else if ((name == "autoLoadTrain" || name == "autoDelete" || name == "autoSend") && (checked || !checked)) {
            props.getAutoTrainUpdate.getStationData({ [name]: checked })
        }
        else if ((name == "autoLoadTrainEveryMin" || name == "autoDeleteTrainEveryMin" || name == "autoSendDataTimeInterval") && value.match(/^[\d]{0,3}$/i)) {
            props.getAutoTrainUpdate.getStationData({ [name]: value })
        }
    }

    const handlePlatformNoChange = (e: any, i: any) => {
        var x: any[] = [...platformNameList?.current];
        var { name, value } = e.target;
        x[i] = value;
        platformNameList.current = [...x];
        setNewList(value);
        if (value == "") {
            setPlatformDisable(true)
        }
    }
    const handleSubmit = () => {
        props.getAutoTrainUpdate.getStationData({ ["listOfPlatforms"]: platformNameList?.current })
        if (isError) {
            setOpen(true)

        } else {
            setPlatformError("")
            setOpen(false)
        }
    }

    const handleOpen = () => setOpen(true);

    const handleCancel = () => {
        if (!changeNumbers) {
            platformNameList.current = array;
        }
        else {
            platformNameList.current = new Array(platformRange ? platformRange : 0)
        }

        props.getAutoTrainUpdate.getStationData({ ["listOfPlatforms"]: platformNameList?.current })
        setOpen(false)
        if (array == "") {
            setPlatformDisable(true)
        }
    }
        ;
    function hasDuplicates(array: any) {
        return (new Set(array)).size !== array.length;
    }
    useEffect(() => {
        setIsError(hasDuplicates(platformNameList?.current))

    }, [platformNameList?.current])

    return (
        <>
            <Grid item xs={12}>
                {/* <Card className="SDCardStyle atuH">
                    <Grid container className="mb-20">
                        <Typography className="t1">
                            <b> Auto Train Load/Delete</b>
                        </Typography>
                    </Grid>
                    <Grid container>
                        <Grid container xs={12} style={{ paddingTop: "1.9%", marginBottom:"2%" }}>
                            <Grid xs={5} md={6} lg={6} style={{ display: "flex", alignItems: "center", justifyContent: "right" }}>
                                <Typography className="intigratintext3">
                                    Available Platforms
                                </Typography>
                            </Grid>
                            <Grid xs={3} style={{ display: 'flex', justifyContent: 'center' }}>
                                <TextField className="SelectAvailPlatform SDTextbox availablePlatforms" name="availablePlatforms" required={true} variant="outlined" onChange={handleChange} value={stationDetails?.availablePlatforms} />
                            </Grid>
                            <Grid xs={4} md={3} lg={3} style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                                <Button variant="contained" className="intigrateButton2" onClick={handleOpen}>
                                    <span className="intigrateButtonLabel2">configure</span>
                                </Button>
                                <Modal open={open} style={{ left: "32.2%", top: "28.6%", background: "blur" }} >
                                    <Card className="configModalStyle">
                                        <Grid style={{ textAlign: "right" }}>
                                            <IconButton onClick={handleCancel}>
                                                <ClearIcon style={{ color: "#009688" }} />
                                            </IconButton>
                                        </Grid>
                                        <Grid container className="configPlat">
                                            <Typography className="configModalText1">
                                                Configure Platforms
                                            </Typography>
                                            {isError ?
                                                <Typography className="configModalTextError" >
                                                    <span style={{ color: "red" }}> You cannot add duplicate platform</span>
                                                </Typography> : null
                                            }
                                            <Typography className="configModalText2">
                                                Configured Platform: {stationDetails?.availablePlatforms}
                                            </Typography>
                                        </Grid>
                                        <Card className="configModalStyle2">
                                            <Grid container spacing={3} className="configDiv1Modal">
                                                <Grid xs={8}>
                                                    <Typography className="configModalText3">
                                                        You can add, new platform or modify or delete existing ones
                                                    </Typography></Grid>

                                            </Grid>
                                        </Card>
                                        <Card className="configModalStyle3">
                                            {
                                                platformNo?.map((el: any, i: any) => {
                                                    return (
                                                        <Grid container style={{ paddingBottom: "3%" }}>
                                                            <Grid item xs={4} md={6} lg={4} className="platfomNO">
                                                                Platform Number {i + 1}
                                                            </Grid>
                                                            <Grid item xs={6} md={5} lg={6}>
                                                                <TextField
                                                                    onChange={(e: any) => handlePlatformNoChange(e, i)}
                                                                    size="small"
                                                                    name="listOfPlatforms"
                                                                    className="configTextbox"
                                                                    variant="outlined"
                                                                    defaultValue={platformNameList?.current[i]}
                                                                    // value={platformNameList?.current[i]}
                                                                    required={true}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    )
                                                })
                                            }
                                        </Card>
                                        <Grid container style={{ paddingTop: "3%", paddingLeft: "30%" }}>
                                            <Button disabled={platformDisable} className="configContinueBtn" onClick={handleSubmit}>
                                                Continue
                                            </Button>
                                            <Button onClick={handleCancel} className="configCancelBtn">
                                                Cancel
                                            </Button>
                                        </Grid>
                                    </Card>
                                </Modal>
                            </Grid>
                        </Grid>
                        <Divider style={{ width: '100%', marginTop: '10px' }}></Divider>
                        <Grid container xs={12} style={{ paddingTop: "1.99%" }}>
                            <Grid container xs={12} style={{ paddingLeft: "5px" }} >
                                <FormControlLabel onClick={handleChange}
                                    control={
                                        <Checkbox className="intigratinCheckbox" size="small" name="autoLoadTrain" value={stationDetails?.autoLoadTrain} checked={stationDetails?.autoLoadTrain} />
                                    }
                                    label={<span className="autoTraincheckbox">Auto Load Trains</span>}
                                />
                            </Grid>
                        </Grid>
                        <Grid container xs={12} style={{ paddingTop: "1.99%" }}>
                            <Grid container xs={12}>
                                <Grid xs={5} md={6} lg={6} style={{ display: "flex", alignItems: "center", justifyContent: "right" }} >
                                    <Typography className="intigratintext3">
                                        Auto Load Train Entry
                                    </Typography>
                                </Grid>
                                {

                                }
                                <Grid container xs={3} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    {stationDetails?.autoLoadTrain ?

                                        <TextField className="autoLoadText autoTrainUpdate" size="small" variant="outlined" name="autoLoadTrainEveryMin" required={true} onChange={handleChange} value={stationDetails?.autoLoadTrainEveryMin} /> :
                                        <TextField disabled className="autoLoadText autoTrainUpdate" size="small" variant="outlined" name="autoLoadTrainEveryMin" value={stationDetails?.autoLoadTrainEveryMin} />
                                    }
                                </Grid>
                                <Grid xs={3} style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                                    <Typography className="intigratintext3">
                                        Minutes
                                    </Typography>
                                </Grid>
                            </Grid>

                        </Grid>
                        <Divider style={{ width: '100%', marginTop: '10px' }}></Divider>
                        <Grid container xs={12} style={{ paddingTop: "1.99%",marginBottom:"4%"}}>
                            <Grid container xs={12}>
                                <FormControlLabel style={{ paddingLeft: "5px" }} onClick={handleChange}
                                    control={
                                        <Checkbox className="intigratinCheckbox" size="small" name="autoDelete" value={stationDetails?.autoDelete} checked={stationDetails?.autoDelete} />
                                    }
                                    label={<span className="autoTraincheckbox">Auto Delete</span>}
                                />
                            </Grid>
                        </Grid>
                        <Grid container xs={12} style={{ paddingTop: "1.99%",marginBottom:"2%"}}>
                            <Grid container xs={12} >
                                <Grid xs={5} md={6} lg={6} style={{ display: "flex", alignItems: "center", justifyContent: "right" }} >
                                    <Typography className="intigratintext3">
                                        Auto Delete train Every
                                    </Typography>
                                </Grid>
                                <Grid container xs={3} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    {stationDetails?.autoDelete ?
                                        <TextField className="autoLoadText autoTrainUpdate" size="small" variant="outlined" name="autoDeleteTrainEveryMin" required={true} onChange={handleChange} value={stationDetails?.autoDeleteTrainEveryMin} /> : <TextField className="autoLoadText autoTrainUpdate" size="small" variant="outlined" name="autoDeleteTrainEveryMin" disabled value={stationDetails?.autoDeleteTrainEveryMin} />}
                                </Grid>
                                <Grid xs={3} style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                                    <Typography className="intigratintext3">
                                        Minutes
                                    </Typography>
                                </Grid>
                            </Grid>

                        </Grid>
                        <Divider style={{ width: '100%', marginTop: '10px' }}></Divider>
                        <Grid container xs={12} style={{ paddingTop: "1.99%",marginBottom:"2%"}}>
                            <Grid container xs={12} style={{ display: "flex", justifyContent: "left" }} >
                                <FormControlLabel style={{ paddingLeft: "5px" }} onClick={handleChange}
                                    control={
                                        <Checkbox className="intigratinCheckbox" size="small" name="autoSend" value={stationDetails?.autoSend} checked={stationDetails?.autoSend} />
                                    }
                                    label={<span className="autoTraincheckbox">Auto Send</span>}
                                />
                            </Grid>
                        </Grid>
                        <Grid container xs={12} style={{ paddingTop: "1%",marginBottom:"2%"}}>
                            <Grid container xs={12}>
                                <Grid xs={5} md={6} lg={6} style={{ display: "flex", alignItems: "center", justifyContent: "right" }} >
                                    <Typography className="intigratintext3">
                                        Auto send Data time interval
                                    </Typography>
                                </Grid>
                                <Grid container xs={3} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    {stationDetails?.autoSend ?
                                        <TextField className="autoLoadText autoTrainUpdate" size="small" variant="outlined" name="autoSendDataTimeInterval" required={true} onChange={handleChange} value={stationDetails?.autoSendDataTimeInterval} /> : <TextField className="autoLoadText autoTrainUpdate" size="small" variant="outlined" name="autoSendDataTimeInterval" disabled value={stationDetails?.autoSendDataTimeInterval} />
                                    }
                                </Grid>
                                <Grid xs={3} style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                                    <Typography className="intigratintext3">
                                        Minutes
                                    </Typography>
                                </Grid>
                            </Grid>

                        </Grid>

                    </Grid>
                </Card> */}

                <Card className="SDCardStyle atuH">
                    <Grid container className="mb-20">
                        <Typography className="t1">
                            <b> Auto Train Load/Delete</b>
                        </Typography>
                    </Grid>
                    <Grid container style={{ alignItems: "center" }} className="mbats">
                        <Grid item xs={9}>
                            <Grid container>
                                {/* <Grid item xs={1}></Grid> */}
                                <Grid item xs={6}>
                                    <Typography>
                                        Available Platforms
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField name="availablePlatforms" required={true} variant="outlined" onChange={handleChange} value={stationDetails?.availablePlatforms} />
                                </Grid>
                                <Grid item xs={1}></Grid>
                                <Grid item xs={3}>
                                    <Button variant="contained" className="intigrateButton2" onClick={handleOpen}>
                                        <span className="intigrateButtonLabel2">configure</span>
                                    </Button>
                                    <Modal open={open} style={{ left: "32.2%", top: "28.6%", background: "blur" }} >
                                        <Card className="configModalStyle">
                                            <Grid style={{ textAlign: "right" }}>
                                                <IconButton onClick={handleCancel}>
                                                    <ClearIcon style={{ color: "#009688" }} />
                                                </IconButton>
                                            </Grid>
                                            <Grid container className="configPlat">
                                                <Typography className="configModalText1">
                                                    Configure Platforms
                                                </Typography>
                                                {isError ?
                                                    <Typography className="configModalTextError" >
                                                        <span style={{ color: "red" }}> You cannot add duplicate platform</span>
                                                    </Typography> : null
                                                }
                                                <Typography className="configModalText2">
                                                    Configured Platform: {stationDetails?.availablePlatforms}
                                                </Typography>
                                            </Grid>
                                            <Card className="configModalStyle2">
                                                <Grid container spacing={3} className="configDiv1Modal">
                                                    <Grid xs={8}>
                                                        <Typography className="configModalText3">
                                                            You can add, new platform or modify or delete existing ones
                                                        </Typography></Grid>

                                                </Grid>
                                            </Card>
                                            <Card className="configModalStyle3">
                                                {
                                                    platformNo?.map((el: any, i: any) => {
                                                        return (
                                                            <Grid container style={{ paddingBottom: "3%" }}>
                                                                <Grid item xs={4} md={6} lg={4} className="platfomNO">
                                                                    Platform Number {i + 1}
                                                                </Grid>
                                                                <Grid item xs={6} md={5} lg={6}>
                                                                    <TextField
                                                                        onChange={(e: any) => handlePlatformNoChange(e, i)}
                                                                        size="small"
                                                                        name="listOfPlatforms"
                                                                        className="configTextbox"
                                                                        variant="outlined"
                                                                        defaultValue={platformNameList?.current[i]}
                                                                        // value={platformNameList?.current[i]}
                                                                        required={true}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        )
                                                    })
                                                }
                                            </Card>
                                            <Grid container style={{ paddingTop: "3%", paddingLeft: "30%" }}>
                                                <Button disabled={platformDisable} className="configContinueBtn" onClick={handleSubmit}>
                                                    Continue
                                                </Button>
                                                <Button onClick={handleCancel} className="configCancelBtn">
                                                    Cancel
                                                </Button>
                                            </Grid>
                                        </Card>
                                    </Modal>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={3}></Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={9}>
                            <Grid container className="mbats">
                                {/* <Grid item xs={1}></Grid> */}
                                <Grid item xs={6}>
                                    <Typography>
                                        Auto Load Train Entry
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    {stationDetails?.autoLoadTrain ?
                                        <TextField size="small" variant="outlined" name="autoLoadTrainEveryMin" required={true} onChange={handleChange} value={stationDetails?.autoLoadTrainEveryMin} />
                                        :
                                        <TextField disabled size="small" variant="outlined" name="autoLoadTrainEveryMin" value={stationDetails?.autoLoadTrainEveryMin} />
                                    }
                                </Grid>
                                <Grid item xs={1}></Grid>
                                <Grid item xs={2}>
                                    <Typography>
                                        Minutes
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container className="mbats">
                                {/* <Grid item xs={1}></Grid> */}
                                <Grid item xs={6}>
                                    <Typography >
                                        Auto Delete train Every
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    {stationDetails?.autoDelete ?
                                        <TextField size="small" variant="outlined" name="autoDeleteTrainEveryMin" required={true} onChange={handleChange} value={stationDetails?.autoDeleteTrainEveryMin} />
                                        :
                                        <TextField size="small" variant="outlined" name="autoDeleteTrainEveryMin" disabled value={stationDetails?.autoDeleteTrainEveryMin} />
                                    }
                                </Grid>
                                <Grid item xs={1}></Grid>
                                <Grid item xs={2}>
                                    <Typography>
                                        Minutes
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container className="mbats" >
                                {/* <Grid item xs={1}></Grid> */}
                                <Grid item xs={6}>
                                    <Typography>
                                        Auto send Data time interval
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    {stationDetails?.autoSend ?
                                        <TextField size="small" variant="outlined" name="autoSendDataTimeInterval" required={true} onChange={handleChange} value={stationDetails?.autoSendDataTimeInterval} />
                                        :
                                        <TextField size="small" variant="outlined" name="autoSendDataTimeInterval" disabled value={stationDetails?.autoSendDataTimeInterval} />
                                    }
                                </Grid>
                                <Grid item xs={1}></Grid>
                                <Grid item xs={2}>
                                    <Typography>
                                        Minutes
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={3}>
                            <Grid container style={{textAlign: "start"}}>
                                <Grid item xs={12} className="mbats">
                                    <FormControlLabel onClick={handleChange}
                                        control={
                                            <Checkbox className="intigratinCheckbox" size="small" name="autoLoadTrain" value={stationDetails?.autoLoadTrain} checked={stationDetails?.autoLoadTrain} />
                                        }
                                        label={<span className="autoTraincheckbox">Auto Load Trains</span>}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel onClick={handleChange}
                                        control={
                                            <Checkbox className="intigratinCheckbox" size="small" name="autoDelete" value={stationDetails?.autoDelete} checked={stationDetails?.autoDelete} />
                                        }
                                        label={<span className="autoTraincheckbox">Auto Delete</span>}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </>
    )
}