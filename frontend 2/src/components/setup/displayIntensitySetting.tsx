import { Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, responsiveFontSizes, TextField, Typography } from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import { useEffect, useState } from "react";
import { KeyboardTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import SetupService from "../service/setup/setup";
import { useSelector } from "react-redux";
import { authuserStateSelector } from "../../redux/reducers/authUser/authUser";
import Swal from "sweetalert2";
import React from "react";
import IntensityModel from "../../model/setup/intensityModel";

export const DisplayIntensitySetting = (props: any) => {

    const setup = new SetupService();
    const [dayStartTime, setDayStartTime] = React.useState<any>("");
    const [nightStartTime, setNightStartTime] = React.useState<any>("");
    const { appUser } = useSelector(authuserStateSelector)
    const [platformArray, setPlatformArray] = useState<any>([]);
    const [deviceIdArray, setDeviceIdArray] = useState<any>([]);


    const [input, setInput] = useState<IntensityModel | any>({
        id: 0,
        intensityMode: "",
        mode: "",
        device: "",
        platform: "",
        deviceId: 0,
        intensityValue: 0,
        dayIntensity: 0,
        nightIntensity: 0,
        dayStartTime: new Date(),
        nightStartTime: new Date()
    })

    const [disabled, setDisabled] = useState<boolean>(true)

    useEffect(() => {
        if (props.stationData) {
            return;
        }
        else {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Please Enter Station Details",
                showConfirmButton: false,
                allowOutsideClick: false,
                timer: 3000
            })
                .then(() => {
                    props.updateSelectedSideBarMenu("setupMain");
                })
        }
    }, [])


    const handleChange = (e: any) => {
        var { name, value } = e.target;
        if (name == "mode") {
            if (name == "mode" && value == "single") {
                setDisabled(false);
            }
            else {
                setDisabled(true);
            }
            setInput({ ...input, ["mode"]: value });
        } else if (name == "nightIntensity" || name == "dayIntensity") {
            setInput({ ...input, [name]: parseInt(value) })
        }
        else if (name == "intensityValue") {
            setInput({ ...input, [name]: parseInt(value) });
        }
        else {
            setInput({ ...input, [name]: value });
        }
    };

    const handleDayStartTime = (e: any) => {
        setDayStartTime("")
        setInput({ ...input, ["dayStartTime"]: e });
    };

    const handleNightStartTime = (e: any) => {
        setNightStartTime("")
        setInput({ ...input, ["nightStartTime"]: e });
    };


    const handleCancel = () => {
        setInput({
            id: 0,
            intensityMode: "",
            mode: "",
            device: "",
            platform: "",
            deviceId: 0,
            intensityValue: 0,
            dayIntensity: 0,
            nightIntensity: 0,
            dayStartTime: new Date(),
            nightStartTime: new Date(),
        })
    }

    const handleConf =() =>{
        let data={
            device: input?.device,
            deviceId: input?.deviceId,
            platform: input?.platform,   
        }
        setup.getConfiguraiton(data).then((resp:any)=>{
            if(resp.status==200){
                setInput({...input,["intensityValue"]:resp?.intensityValue});
            }
            else{
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: `Some error occured.`,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    timer: 2000,
                })
            }
        })
    }

    const handleSubmit = () => {
        let daySTime;
        let nightSTime;

        if (dayStartTime == "") {
            daySTime = `${input?.dayStartTime?.getHours()}:${('0' + input?.dayStartTime?.getMinutes()).slice(-2)}`;
        } else {
            daySTime = dayStartTime;
        }
        if (nightStartTime == "") {
            nightSTime = `${input?.nightStartTime?.getHours()}:${('0' + input?.nightStartTime?.getMinutes()).slice(-2)}`;
        } else {
            nightSTime = nightStartTime;
        }

        if (input?.intensityMode === "Auto") {
            let data: any = {
                intensityMode: input?.intensityMode,
                dayIntensity: input?.dayIntensity,
                nightIntensity: input?.nightIntensity,
                dayStartTime: daySTime,
                nightStartTime: nightSTime,
            }
            setup.createIntensityAuto(data).then((response) => {
                if (response?.status === 200) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `Data Set Successfully`,
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        timer: 3000,
                    })
                }
                else {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: `${response?.errorMsg}`,
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        timer: 3000,
                    })
                }

            });
        }
        else if (input?.intensityMode === "Manual") {
            let data: any = {
                intensityMode: input?.intensityMode,
                mode: input?.mode,
                device: input?.device,
                deviceId: input?.deviceId,
                platform: input?.platform,
                intensityValue: input?.intensityValue,
            }
            setup.createIntensityManual(data).then((response) => {
                if (response && response?.status === 200 && input?.mode != "" && input?.intensityValue != 0 && input?.device != "" && input?.platform != "") {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `Intensity set successfully`,
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        timer: 3000,
                    })
                }
                else if (response && response?.status === 200 && input?.mode == "All" && input?.intensityValue != 0) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `Intensity set successfully`,
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        timer: 3000,
                    })
                }
                else {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: `all fields are mandatory`,
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        timer: 3000,
                    })
                }
            });
        }
    }


    useEffect(() => {
        setup.getModeDetails().then((response) => {
            if (response && response?.status == 200) {
                if (response && response?.data[0]) {
                    setDayStartTime(response?.data[0]?.dayStartTime)
                    setNightStartTime(response?.data[0]?.nightStartTime)
                    let dayStime;
                    let nightStime;
                    if (response?.data[0]?.dayStartTime?.length) {
                        dayStime = `Tue Jul 19 2022 ${response?.data[0]?.dayStartTime}:12 GMT+0530 (India Standard Time)`
                    } else {
                        dayStime = new Date();
                    }
                    if (response?.data[0]?.nightStartTime?.length) {
                        nightStime = `Tue Jul 19 2022 ${response?.data[0]?.nightStartTime}:12 GMT+0530 (India Standard Time)`
                    } else {
                        nightStime = new Date();
                    }
                    if (response?.data[0]?.mode == "single") {
                        setDisabled(false)
                    }
                    else {
                        setDisabled(true)

                    }
                    setInput({
                        id: response?.data[0]?.id,
                        mode: response?.data[0]?.mode,
                        device: response?.data[0]?.device,
                        deviceId: response?.data[0]?.deviceId,
                        platform: response?.data[0]?.platform,
                        intensityValue: response?.data[0]?.intensityValue,
                        dayIntensity: response?.data[0]?.dayIntensity,
                        intensityMode: response?.data[0]?.intensityMode,
                        nightIntensity: response?.data[0]?.nightIntensity,
                        dayStartTime: dayStime,
                        nightStartTime: nightStime,
                    })

                }
            }
        })
    }, [])


    useEffect(() => {
        if (input?.device != "") {
            setup.getPlatformNo(input.device).then((resp: any) => {
                if (resp && resp?.status === 200) {
                    setPlatformArray(resp?.data);
                }
            })
        }
    }, [input?.device])

    useEffect(() => {
        if (input?.device != "" && input?.platform != "") {
            setup.getDeviceId(input.device, input.platform).then((resp: any) => {
                if (resp && resp?.status === 200) {
                    setDeviceIdArray(resp?.data);
                }
            })
        }
    }, [input?.device, input?.platform])



    return (
        <>       <Grid className="displayIntensityGrid2">
            <Grid item xs={8} style={{ margin: "auto" }} >
                <Card className="displayIntensityGrid overlapBackground DICardStyle">
                    {
                        appUser.userRole == "ROLE_STATION MASTER" ? <Grid className="stationForm formFields">

                        </Grid> : <></>
                    }
                    <Grid container className="DIContainer">
                        <b> Display Intensity Mode</b>
                    </Grid>

                    <Grid container style={{ marginBottom: "10px" }}>
                        <Grid item xs={12}>
                            <FormControl component="fieldset" >
                                <RadioGroup
                                    name="intensityMode"
                                    value={input?.intensityMode}
                                    className="onlineChckBoxs"
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="Auto" control={<Radio />}
                                        style={{ color: "black", fontSize: "14px", fontFamily: "Roboto" }}
                                        className="radioButtonssD" label="Auto mode" />

                                </RadioGroup>
                            </FormControl>
                        </Grid>

                    </Grid>
                    <Grid container className="mb-30">
                        <Grid item xs={3} lg={3} xl={3} style={{ alignSelf: 'center', paddingRight: "28px" }}>
                            <Typography className="labelAlign"> Daytime Settings</Typography>
                        </Grid>
                        <Grid item xs={4} lg={5} xl={4} style={{ alignSelf: 'center' }}>
                            {input?.intensityMode == "Manual" ?
                                <>
                                    <Grid container>
                                        <Grid item xs={3} lg={3} xl={3}>
                                            <FormControl component="fieldset" >
                                                <RadioGroup
                                                    name="dayIntensity"
                                                    value={input?.dayIntensity}
                                                    onChange={handleChange}
                                                >
                                                    {console.log(input?.dayIntensity, 314)}
                                                    <FormControlLabel value={25} control={<Radio />}
                                                        disabled
                                                        style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                        className="radioButtonsD" label="25%" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={3} lg={3} xl={3}>
                                            <FormControl component="fieldset" >
                                                <RadioGroup
                                                    name="dayIntensity"
                                                    value={input?.dayIntensity}
                                                    onChange={handleChange}
                                                >
                                                    <FormControlLabel value={50} control={<Radio />}
                                                        disabled
                                                        style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                        className="radioButtonsD" label="50%" />
                                                </RadioGroup>
                                            </FormControl></Grid>
                                        <Grid item xs={3} lg={3} xl={3}>
                                            <FormControl component="fieldset" >
                                                <RadioGroup
                                                    name="dayIntensity"
                                                    value={input?.dayIntensity}
                                                    onChange={handleChange}
                                                >
                                                    <FormControlLabel value={75} control={<Radio />}
                                                        disabled
                                                        style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                        className="radioButtonsD" label="75%" />
                                                </RadioGroup>
                                            </FormControl></Grid>
                                        <Grid item xs={3} lg={3} xl={3}>
                                            <FormControl component="fieldset" >
                                                <RadioGroup
                                                    name="dayIntensity"
                                                    value={input?.dayIntensity}
                                                    onChange={handleChange}
                                                >
                                                    <FormControlLabel value={100} control={<Radio />}
                                                        disabled
                                                        style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                        className="radioButtonsD" label="100%" />
                                                </RadioGroup>
                                            </FormControl></Grid>
                                    </Grid>
                                </> : <>
                                    <Grid container>
                                        <Grid item xs={3} lg={3} xl={3}>
                                            <FormControl component="fieldset" >
                                                <RadioGroup
                                                    name="dayIntensity"
                                                    value={input?.dayIntensity}
                                                    onChange={handleChange}
                                                >
                                                    {console.log(input?.dayIntensity, 314)}
                                                    <FormControlLabel value={25} control={<Radio />}
                                                        style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                        className="radioButtonsD" label="25%" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={3} lg={3} xl={3}>
                                            <FormControl component="fieldset" >
                                                <RadioGroup
                                                    name="dayIntensity"
                                                    value={input?.dayIntensity}
                                                    onChange={handleChange}
                                                >
                                                    <FormControlLabel value={50} control={<Radio />}
                                                        style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                        className="radioButtonsD" label="50%" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={3} lg={3} xl={3}>
                                            <FormControl component="fieldset" >
                                                <RadioGroup
                                                    name="dayIntensity"
                                                    value={input?.dayIntensity}
                                                    onChange={handleChange}
                                                >
                                                    <FormControlLabel value={75} control={<Radio />}
                                                        style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                        className="radioButtonsD" label="75%" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={3} lg={3} xl={3}>
                                            <FormControl component="fieldset" >
                                                <RadioGroup
                                                    name="dayIntensity"
                                                    value={input?.dayIntensity}
                                                    onChange={handleChange}
                                                >
                                                    <FormControlLabel value={100} control={<Radio />}
                                                        style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                        className="radioButtonsD" label="100%" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </>
                            }
                        </Grid>
                        <Grid item xs={3} lg={4} xl={3}>
                            <Grid container>
                                <Grid item xs={4} md={12} lg={4} style={{ alignSelf: 'center' }}>
                                    <Typography>
                                        Start time
                                    </Typography>
                                </Grid>
                                {input?.intensityMode == "Manual" ?
                                    <> <Grid item xs={8} md={12} lg={8}>
                                        <FormControl variant="outlined" size="small" className="txtBox DITimePickers">
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardTimePicker
                                                    disabled
                                                    ampm={false}
                                                    inputVariant="outlined"
                                                    name="dayStartTime"
                                                    onChange={handleDayStartTime}
                                                    value={input?.dayStartTime}

                                                />
                                            </MuiPickersUtilsProvider>
                                        </FormControl>
                                    </Grid></> : <>
                                        <Grid item xs={8} md={12} lg={8}>
                                            <FormControl variant="outlined" size="small" className="trainDataSche">
                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <KeyboardTimePicker
                                                        ampm={false}
                                                        inputVariant="outlined"
                                                        name="dayStartTime"
                                                        onChange={handleDayStartTime}
                                                        value={input?.dayStartTime}
                                                    />
                                                </MuiPickersUtilsProvider>
                                            </FormControl>
                                        </Grid>
                                    </>
                                }
                            </Grid>

                        </Grid>
                    </Grid>
                    {/* <Grid container>
                        <Grid container style={{ width: "21.9%" }}>
                            <Grid item xs={12} style={{ paddingLeft: "40.89%", paddingTop: "17.52%" }}>
                                Daytime Settings
                            </Grid>
                        </Grid>
                        <Grid container style={{ width: "41.88%", paddingLeft: "6.93%", paddingTop: "3.51%" }}>
                            {input?.intensityMode == "Manual" ?

                                <> <Grid item xs={3}>
                                    <FormControl component="fieldset" >
                                        <RadioGroup
                                            name="dayIntensity"
                                            value={input?.dayIntensity}
                                            onChange={handleChange}
                                        >
                                            {console.log(input?.dayIntensity, 314)}
                                            <FormControlLabel value={25} control={<Radio />}
                                                disabled
                                                style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                className="radioButtonsD" label="25%" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                    <Grid item xs={3}>
                                        <FormControl component="fieldset" >
                                            <RadioGroup
                                                name="dayIntensity"
                                                value={input?.dayIntensity}
                                                onChange={handleChange}
                                            >
                                                <FormControlLabel value={50} control={<Radio />}
                                                    disabled
                                                    style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                    className="radioButtonsD" label="50%" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormControl component="fieldset" >
                                            <RadioGroup
                                                name="dayIntensity"
                                                value={input?.dayIntensity}
                                                onChange={handleChange}
                                            >
                                                <FormControlLabel value={75} control={<Radio />}
                                                    disabled
                                                    style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                    className="radioButtonsD" label="75%" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormControl component="fieldset" >
                                            <RadioGroup
                                                name="dayIntensity"
                                                value={input?.dayIntensity}
                                                onChange={handleChange}
                                            >
                                                <FormControlLabel value={100} control={<Radio />}
                                                    disabled
                                                    style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                    className="radioButtonsD" label="100%" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid></> :
                                <><Grid item xs={3}>
                                    <FormControl component="fieldset" >
                                        <RadioGroup
                                            name="dayIntensity"
                                            value={input?.dayIntensity}
                                            onChange={handleChange}
                                        >
                                            {console.log(input?.dayIntensity, 314)}
                                            <FormControlLabel value={25} control={<Radio />}
                                                style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                className="radioButtonsD" label="25%" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                    <Grid item xs={3}>
                                        <FormControl component="fieldset" >
                                            <RadioGroup
                                                name="dayIntensity"
                                                value={input?.dayIntensity}
                                                onChange={handleChange}
                                            >
                                                <FormControlLabel value={50} control={<Radio />}
                                                    style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                    className="radioButtonsD" label="50%" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormControl component="fieldset" >
                                            <RadioGroup
                                                name="dayIntensity"
                                                value={input?.dayIntensity}
                                                onChange={handleChange}
                                            >
                                                <FormControlLabel value={75} control={<Radio />}
                                                    style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                    className="radioButtonsD" label="75%" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormControl component="fieldset" >
                                            <RadioGroup
                                                name="dayIntensity"
                                                value={input?.dayIntensity}
                                                onChange={handleChange}
                                            >
                                                <FormControlLabel value={100} control={<Radio />}
                                                    style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                    className="radioButtonsD" label="100%" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid></>}


                        </Grid>
                        <Grid container style={{ width: "36.21%" }}>
                            <Grid item xs={4} style={{ paddingTop: "12.61%" }}>
                                Start time
                            </Grid>
                            {input?.intensityMode == "Manual" ?
                                <Grid item xs={6} className="startTime ">
                                    <FormControl variant="outlined" size="small" className="txtBox ">
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardTimePicker
                                                disabled
                                                ampm={false}
                                                inputVariant="outlined"
                                                name="dayStartTime"
                                                onChange={handleDayStartTime}
                                                value={input?.dayStartTime}

                                            />
                                        </MuiPickersUtilsProvider>
                                    </FormControl>
                                </Grid> :
                                <Grid item xs={6} className="startTime">
                                    <FormControl variant="outlined" size="small" className="trainDataSche">
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardTimePicker
                                                ampm={false}
                                                inputVariant="outlined"
                                                name="dayStartTime"
                                                onChange={handleDayStartTime}
                                                value={input?.dayStartTime}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </FormControl>
                                </Grid>}
                        </Grid>
                    </Grid> */}
                    <Grid container className="mb-30">
                        <Grid item xs={3} lg={3} xl={3} style={{ alignSelf: 'center', paddingRight: "28px" }} >
                            <Typography className="labelAlign">  Night time Settings</Typography>
                        </Grid>
                        <Grid item xs={6} lg={5} xl={4} style={{ alignSelf: 'center' }}>
                            {input?.intensityMode == "Manual" ?
                                <>
                                    <Grid container>
                                        <Grid item xs={3} lg={3} xl={3}>
                                            <FormControl component="fieldset" >
                                                <RadioGroup
                                                    name="nightIntensity"
                                                    value={input?.nightIntensity}
                                                    onChange={handleChange}
                                                >
                                                    <FormControlLabel value={25} control={<Radio />}
                                                        disabled
                                                        style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                        className="radioButtonsD" label="25%" />

                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={3} lg={3} xl={3}>
                                            <FormControl component="fieldset" >
                                                <RadioGroup
                                                    name="nightIntensity"
                                                    value={input?.nightIntensity}
                                                    onChange={handleChange}
                                                >
                                                    <FormControlLabel value={50} control={<Radio />}
                                                        disabled
                                                        style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                        className="radioButtonsD" label="50%" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={3} lg={3} xl={3}>
                                            <FormControl component="fieldset" >
                                                <RadioGroup
                                                    name="nightIntensity"
                                                    value={input?.nightIntensity}
                                                    onChange={handleChange}>
                                                    <FormControlLabel value={75} control={<Radio />}
                                                        disabled
                                                        style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                        className="radioButtonsD" label="75%" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={3} lg={3} xl={3}>
                                            <FormControl component="fieldset" >
                                                <RadioGroup
                                                    name="nightIntensity"
                                                    value={input?.nightIntensity}
                                                    onChange={handleChange}>
                                                    <FormControlLabel value={100} control={<Radio />}
                                                        disabled
                                                        style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                        className="radioButtonsD" label="100%" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </> : <>
                                    <Grid container>
                                        <Grid item xs={3} lg={3} xl={3}>
                                            <FormControl component="fieldset" >
                                                <RadioGroup
                                                    name="nightIntensity"
                                                    value={input?.nightIntensity}
                                                    onChange={handleChange}
                                                >
                                                    <FormControlLabel value={25} control={<Radio />}
                                                        style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                        className="radioButtonsD" label="25%" />

                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={3} lg={3} xl={3}>
                                            <FormControl component="fieldset" >
                                                <RadioGroup
                                                    name="nightIntensity"
                                                    value={input?.nightIntensity}
                                                    onChange={handleChange}
                                                >
                                                    <FormControlLabel value={50} control={<Radio />}
                                                        style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                        className="radioButtonsD" label="50%" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={3} lg={3} xl={3}>
                                            <FormControl component="fieldset" >
                                                <RadioGroup
                                                    name="nightIntensity"
                                                    value={input?.nightIntensity}
                                                    onChange={handleChange}>
                                                    <FormControlLabel value={75} control={<Radio />}
                                                        style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                        className="radioButtonsD" label="75%" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={3} lg={3} xl={3}>
                                            <FormControl component="fieldset" >
                                                <RadioGroup
                                                    name="nightIntensity"
                                                    value={input?.nightIntensity}
                                                    onChange={handleChange}>
                                                    <FormControlLabel value={100} control={<Radio />}
                                                        style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                        className="radioButtonsD" label="100%" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </>
                            }
                        </Grid>
                        <Grid item xs={3} lg={4} xl={3}>
                            <Grid container>
                                <Grid item xs={4} md={12} lg={4} style={{ alignSelf: 'center' }}>
                                    <Typography> Start time</Typography>
                                </Grid>
                                {input?.intensityMode == "Manual" ?
                                    <>
                                        <Grid item xs={8} md={12} lg={8}>
                                            <FormControl variant="outlined" size="small" className="txtBox DITimePickers">
                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <KeyboardTimePicker
                                                        disabled
                                                        ampm={false}
                                                        inputVariant="outlined"
                                                        name="nightStartTime"
                                                        onChange={handleNightStartTime}
                                                        value={input?.nightStartTime}

                                                    />
                                                </MuiPickersUtilsProvider>
                                            </FormControl>
                                        </Grid></> :
                                    <>
                                        <Grid item xs={8} md={12} lg={8}>
                                            <FormControl variant="outlined" size="small" className="trainDataSche">
                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <KeyboardTimePicker
                                                        ampm={false}
                                                        inputVariant="outlined"
                                                        name="nightStartTime"
                                                        onChange={handleNightStartTime}
                                                        value={input?.nightStartTime}

                                                    />
                                                </MuiPickersUtilsProvider>
                                            </FormControl>
                                        </Grid>
                                    </>}
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* <Grid container>
                        <Grid container style={{ width: "21.9%" }}>
                            <Grid item xs={12} style={{ paddingLeft: "33.11%", paddingTop: "17.52%" }}>
                                Night time Settings
                            </Grid>
                        </Grid>
                        <Grid container style={{ width: "41.88%", paddingLeft: "6.93%", paddingTop: "3.51%" }}>
                            {input?.intensityMode == "Manual" ?

                                <><Grid item xs={3}>
                                    <FormControl component="fieldset" >
                                        <RadioGroup
                                            name="nightIntensity"
                                            value={input?.nightIntensity}
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel value={25} control={<Radio />}
                                                disabled
                                                style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                className="radioButtonsD" label="25%" />

                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                    <Grid item xs={3}>
                                        <FormControl component="fieldset" >
                                            <RadioGroup
                                                name="nightIntensity"
                                                value={input?.nightIntensity}
                                                onChange={handleChange}
                                            >
                                                <FormControlLabel value={50} control={<Radio />}
                                                    disabled
                                                    style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                    className="radioButtonsD" label="50%" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormControl component="fieldset" >
                                            <RadioGroup
                                                name="nightIntensity"
                                                value={input?.nightIntensity}
                                                onChange={handleChange}>
                                                <FormControlLabel value={75} control={<Radio />}
                                                    disabled
                                                    style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                    className="radioButtonsD" label="75%" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormControl component="fieldset" >
                                            <RadioGroup
                                                name="nightIntensity"
                                                value={input?.nightIntensity}
                                                onChange={handleChange}>
                                                <FormControlLabel value={100} control={<Radio />}
                                                    disabled
                                                    style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                    className="radioButtonsD" label="100%" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid></> :
                                <><Grid item xs={3}>
                                    <FormControl component="fieldset" >
                                        <RadioGroup
                                            name="nightIntensity"
                                            value={input?.nightIntensity}
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel value={25} control={<Radio />}
                                                style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                className="radioButtonsD" label="25%" />

                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                    <Grid item xs={3}>
                                        <FormControl component="fieldset" >
                                            <RadioGroup
                                                name="nightIntensity"
                                                value={input?.nightIntensity}
                                                onChange={handleChange}
                                            >
                                                <FormControlLabel value={50} control={<Radio />}
                                                    style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                    className="radioButtonsD" label="50%" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormControl component="fieldset" >
                                            <RadioGroup
                                                name="nightIntensity"
                                                value={input?.nightIntensity}
                                                onChange={handleChange}>
                                                <FormControlLabel value={75} control={<Radio />}
                                                    style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                    className="radioButtonsD" label="75%" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormControl component="fieldset" >
                                            <RadioGroup
                                                name="nightIntensity"
                                                value={input?.nightIntensity}
                                                onChange={handleChange}>
                                                <FormControlLabel value={100} control={<Radio />}
                                                    style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                    className="radioButtonsD" label="100%" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid></>}


                        </Grid>
                        <Grid container style={{ width: "36.21%" }} className="txtTimer">
                            <Grid item xs={4} style={{ paddingTop: "12.61%" }}>
                                Start time
                            </Grid>
                            {input?.intensityMode == "Manual" ?

                                <Grid item xs={6} className="startTime2">
                                    <FormControl variant="outlined" size="small" className="txtBox">
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardTimePicker
                                                disabled
                                                ampm={false}
                                                inputVariant="outlined"
                                                name="nightStartTime"
                                                onChange={handleNightStartTime}
                                                value={input?.nightStartTime}

                                            />
                                        </MuiPickersUtilsProvider>
                                    </FormControl>
                                </Grid> :
                                <Grid item xs={6} className="startTime2">
                                    <FormControl variant="outlined" size="small" className="trainDataSche">
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardTimePicker
                                                ampm={false}
                                                inputVariant="outlined"
                                                name="nightStartTime"
                                                onChange={handleNightStartTime}
                                                value={input?.nightStartTime}

                                            />
                                        </MuiPickersUtilsProvider>
                                    </FormControl>
                                </Grid>}
                        </Grid>
                    </Grid> */}

                    <Divider variant="middle" style={{ margin: "30px 0px" }} />

                    <Grid container style={{ marginBottom: "10px" }}>
                        <Grid item xs={12}>
                            <FormControl component="fieldset" >
                                <RadioGroup
                                    name="intensityMode"
                                    value={input?.intensityMode}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="Manual" control={<Radio />}
                                        style={{ color: "black", fontSize: "14px", fontFamily: "Roboto" }}
                                        className="radioButtonssD" label="Manual Mode" />

                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container className="mb-20">
                        <Grid item xs={4} className="EDtext pr-32">
                            <Typography>  Set Mode</Typography><span className="asterisk">*</span>
                        </Grid>
                        {input?.intensityMode == "Auto" ? <Grid item xs={4}>
                            <select
                                disabled
                                className="modestyle"
                                name="mode"
                                value={input?.mode}
                                onChange={handleChange}
                                required={true}
                            >
                                <option value="">Select</option>
                                <option value="single">Single</option>
                                {/* <option value="All">All</option> */}
                            </select>
                        </Grid> :
                            <Grid item xs={4}>
                                <select
                                    className="modestyle"
                                    name="mode"
                                    value={input?.mode}
                                    onChange={handleChange}
                                    required={true}
                                >
                                    <option value="">Select</option>
                                    <option value="single">Single</option>
                                    {/* <option value="All">All</option> */}
                                </select>
                            </Grid>}
                    </Grid>
                    <Grid container className="mb-20">
                        <Grid item xs={4} className="EDtext pr-32">
                            <Typography> Device</Typography><span className="asterisk">*</span>
                        </Grid>
                        <Grid item xs={4}>
                            <select
                                disabled={disabled}
                                className="modestyle"
                                name="device"
                                value={input?.device}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                <option value="pfdb">PFDB</option>
                                <option value="agdb">AGDB</option>
                                <option value="mldb">MLDB</option>
                                <option value="ivd">IVD</option>
                                <option value="ovd">OVD</option>
                                {/* <option value="tvDisplay">TV</option> */}
                                <option value="cgdb">CGDB</option>

                            </select>
                        </Grid>
                    </Grid>
                    <Grid container className="mb-20">
                        <Grid item xs={4} className="EDtext pr-32">
                            <Typography> Platform</Typography><span className="asterisk">*</span>
                        </Grid>
                        <Grid item xs={4}>
                            <select
                                disabled={disabled || !input?.device}
                                className="modestyle"
                                name="platform"
                                value={input?.platform}
                                onChange={handleChange}
                            >
                                <option value="" >Select</option>
                                {platformArray?.map((platformNo: any, i: any) => {
                                    return (
                                        <option value={platformNo}>
                                            {platformNo}
                                        </option>
                                    );
                                })}
                                {/* <option value="all">ALL</option> */}
                            </select>
                        </Grid>
                    </Grid>
                    <Grid container style={{ marginBottom: "30px" }}>
                        <Grid item xs={4} className="EDtext pr-32">
                            <Typography> Device Id</Typography><span className="asterisk">*</span>
                        </Grid>
                        <Grid item xs={4}>
                            <select
                                disabled={disabled || !input?.platform}
                                className="modestyle"
                                name="deviceId"
                                value={input?.deviceId}
                                onChange={handleChange}
                            >
                                <option value="" selected>Select</option>
                                {deviceIdArray.map((deviceId: any, i: any) => {
                                    return (
                                        <option value={deviceId}>{deviceId}</option>
                                    )
                                })}
                            </select>
                        </Grid>
                        <Grid item xs={4} md={4} lg={4} xl={3} className="alself">
                            <Button
                                type="submit"
                                className="DISSave"
                                variant="contained"
                                onClick={handleConf}
                            >
                                <DoneIcon className="icon" />
                                <span className="bttnfont btn-font">GET CONFIGURATION</span>
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container className="mb-60">
                        <Grid item xs={4} className="pr-32">
                            <Typography className="labelAlign">Set Intensity<span className="asterisk">*</span></Typography>
                        </Grid>
                        <Grid item xs={8} lg={7} xl={7}>
                            {input?.intensityMode == "Auto" ?
                                <>
                                    <Grid container>
                                        <Grid item xs={3} lg={2} xl={2}>
                                            <FormControl component="fieldset" >
                                                <RadioGroup

                                                    name="intensityValue"
                                                    value={input?.intensityValue}
                                                    onChange={handleChange}>
                                                    <FormControlLabel value={25}
                                                        disabled
                                                        control={<Radio />}
                                                        style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                        className="radioButtonsD" label="25%" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={3} lg={2} xl={2}>
                                            <FormControl component="fieldset" >
                                                <RadioGroup
                                                    name="intensityValue"
                                                    value={input?.intensityValue}
                                                    onChange={handleChange}>
                                                    <FormControlLabel value={50} control={<Radio />}
                                                        disabled
                                                        style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                        className="radioButtonsD" label="50%" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={3} lg={2} xl={2}>
                                            <FormControl component="fieldset" >
                                                <RadioGroup

                                                    name="intensityValue"
                                                    value={input?.intensityValue}
                                                    onChange={handleChange}>
                                                    <FormControlLabel value={75} control={<Radio />}
                                                        disabled
                                                        style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                        className="radioButtonsD" label="75%" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={3} lg={2} xl={2}>
                                            <FormControl component="fieldset" >
                                                <RadioGroup
                                                    name="intensityValue"
                                                    value={input?.intensityValue}
                                                    onChange={handleChange}>
                                                    <FormControlLabel value={100} control={<Radio />}
                                                        disabled
                                                        style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                        className="radioButtonsD" label="100%" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </> : <>
                                    <Grid container>
                                        <Grid item xs={3} lg={2} xl={2}>
                                            <FormControl component="fieldset" >
                                                <RadioGroup
                                                    name="intensityValue"
                                                    value={input?.intensityValue}
                                                    onChange={handleChange}>
                                                    <FormControlLabel value={25} control={<Radio />}
                                                        style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                        className="radioButtonsD" label="25%" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={3} lg={2} xl={2}>
                                            <FormControl component="fieldset" >
                                                <RadioGroup
                                                    name="intensityValue"
                                                    value={input?.intensityValue}
                                                    onChange={handleChange}>
                                                    <FormControlLabel value={50} control={<Radio />}
                                                        style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                        className="radioButtonsD" label="50%" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={3} lg={2} xl={2}>
                                            <FormControl component="fieldset" >
                                                <RadioGroup
                                                    name="intensityValue"
                                                    value={input?.intensityValue}
                                                    onChange={handleChange}>
                                                    <FormControlLabel value={75} control={<Radio />}
                                                        style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                        className="radioButtonsD" label="75%" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={3} lg={2} xl={2}>
                                            <FormControl component="fieldset" >
                                                <RadioGroup
                                                    name="intensityValue"
                                                    value={input?.intensityValue}
                                                    onChange={handleChange}>
                                                    <FormControlLabel value={100} control={<Radio />}
                                                        style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                        className="radioButtonsD" label="100%" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </>
                            }
                        </Grid>
                    </Grid>
                    {/* <Grid container style={{ paddingBottom: "4.18%", marginLeft: "165px" }}>
                        <Grid container style={{ width: "23.93%" }}>
                            <Grid item xs={12} style={{ paddingLeft: "59px", alignItems: "center", paddingTop: "15px", display: "flex" }}>
                                Set Intensity<span className="asterisk">*</span>
                            </Grid>
                        </Grid>
                        <Grid container style={{ width: "44.12%", paddingTop: "3.36%" }}>
                            {input?.intensityMode == "Auto" ?
                                <> <Grid item xs={3}>
                                    <FormControl component="fieldset" >
                                        <RadioGroup

                                            name="intensityValue"
                                            value={input?.intensityValue}
                                            onChange={handleChange}>
                                            <FormControlLabel value={25}
                                                disabled
                                                control={<Radio />}
                                                style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                className="radioButtonsD" label="25%" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>

                                    <Grid item xs={3}>
                                        <FormControl component="fieldset" >
                                            <RadioGroup
                                                name="intensityValue"
                                                value={input?.intensityValue}
                                                onChange={handleChange}>
                                                <FormControlLabel value={50} control={<Radio />}
                                                    disabled
                                                    style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                    className="radioButtonsD" label="50%" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormControl component="fieldset" >
                                            <RadioGroup

                                                name="intensityValue"
                                                value={input?.intensityValue}
                                                onChange={handleChange}>
                                                <FormControlLabel value={75} control={<Radio />}
                                                    disabled
                                                    style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                    className="radioButtonsD" label="75%" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormControl component="fieldset" >
                                            <RadioGroup
                                                name="intensityValue"
                                                value={input?.intensityValue}
                                                onChange={handleChange}>
                                                <FormControlLabel value={100} control={<Radio />}
                                                    disabled
                                                    style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                    className="radioButtonsD" label="100%" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid></> :
                                <><Grid item xs={3}>
                                    <FormControl component="fieldset" >
                                        <RadioGroup
                                            name="intensityValue"
                                            value={input?.intensityValue}
                                            onChange={handleChange}>
                                            <FormControlLabel value={25} control={<Radio />}
                                                style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                className="radioButtonsD" label="25%" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>

                                    <Grid item xs={3}>
                                        <FormControl component="fieldset" >
                                            <RadioGroup
                                                name="intensityValue"
                                                value={input?.intensityValue}
                                                onChange={handleChange}>
                                                <FormControlLabel value={50} control={<Radio />}
                                                    style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                    className="radioButtonsD" label="50%" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormControl component="fieldset" >
                                            <RadioGroup
                                                name="intensityValue"
                                                value={input?.intensityValue}
                                                onChange={handleChange}>
                                                <FormControlLabel value={75} control={<Radio />}
                                                    style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                    className="radioButtonsD" label="75%" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormControl component="fieldset" >
                                            <RadioGroup
                                                name="intensityValue"
                                                value={input?.intensityValue}
                                                onChange={handleChange}>
                                                <FormControlLabel value={100} control={<Radio />}
                                                    style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                                    className="radioButtonsD" label="100%" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid></>}
                        </Grid>
                    </Grid> */}
                </Card>
                {appUser.userRole == "ROLE_STATION MASTER" ? <></>
                    :
                    <Grid container
                        style={{ justifyContent: "center", marginTop: '34px', marginBottom: "50px" }}
                        spacing={2}
                    >

                        {/* <Grid item xs={4} md={4} lg={4} xl={3}>
                            <Button
                                type="submit"
                                className="DISSave"
                                variant="contained"
                                onClick={handleConf}
                            >
                                <DoneIcon className="icon" />
                                <span className="bttnfont btn-font">GET CONFIGURATION</span>
                            </Button>
                        </Grid> */}
                        <Grid item xs={3} md={3} lg={3} xl={2}>
                            <Button
                                type="submit"
                                className="DISSave"
                                variant="contained"
                                onClick={handleSubmit}
                            >
                                <DoneIcon className="icon" />
                                <span className="bttnfont btn-font">SET INTENSITY</span>
                            </Button>
                        </Grid>
                        <Grid item xs={3} md={3} lg={3} xl={2}>
                            <Button
                                type="reset"
                                value="Reset"
                                variant="outlined"
                                className="DISCancle"
                                onClick={handleCancel}
                            >
                                <CloseIcon className="icon" />
                                <span className="bttnfont btn-font">Cancel</span>
                            </Button>
                        </Grid>
                    </Grid>
                }
            </Grid>
        </Grid>
        </>
    )
}