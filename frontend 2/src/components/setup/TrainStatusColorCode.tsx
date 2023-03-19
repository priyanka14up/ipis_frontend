import { Button, Card, CircularProgress, FormControl, Grid, InputLabel, ListSubheader, MenuItem, Select, TextField } from "@material-ui/core";
import { useEffect, useRef, useState } from 'react';
import Swal from "sweetalert2";
import SetupService from "../service/setup/setup";
import { ColorSketchPicker } from "./ColorSketchPicker";
import './trainStatusCode.css';
import { useSelector } from "react-redux";
import { authuserStateSelector } from "../../redux/reducers/authUser/authUser";

const setup = new SetupService();

const TrainStatusCode = () => {

    const [statusChoice, setStatusChoice] = useState("");
    const handleStatusChoice = (e: any) => {
        var { name, value } = e.target;
        setStatusChoice(value);
        console.log("..Status Choice..", statusChoice);
    }

    //.....BackGround Color.....//

    const [hColor, setHcolor] = useState("");
    const [vColor, setVColor] = useState("");
    const [bColor, setBColor] = useState("");
    const [mColor, setMColor] = useState("");

    const [visible, setVisible] = useState(true);
    const [hHidden, sethHidden] = useState(false)
    const [vHidden, setvHidden] = useState(false)
    const [bHidden, setbHidden] = useState(false)
    const [mHidden, setmHidden] = useState(false)
    const [waitForSave, setwaitForSave] = useState(false)
    const { appUser } = useSelector(authuserStateSelector);


    const openHcolor = () => {
        sethHidden(!hHidden)
        setvHidden(false)
        setbHidden(false)
        setmHidden(false)
        setNoHidden(false)
        setNameHidden(false)
        setTimeHidden(false)
        setADHidden(false)
        setPFHidden(false)
    }

    const openVcolor = () => {
        sethHidden(false)
        setvHidden(!vHidden)
        setbHidden(false)
        setmHidden(false)
        setNoHidden(false)
        setNameHidden(false)
        setTimeHidden(false)
        setADHidden(false)
        setPFHidden(false)
    }

    const openBcolor = () => {
        sethHidden(false)
        setvHidden(false)
        setbHidden(!bHidden)
        setmHidden(false)
        setNoHidden(false)
        setNameHidden(false)
        setTimeHidden(false)
        setADHidden(false)
        setPFHidden(false)
    }
    const openMcolor = () => {
        sethHidden(false)
        setvHidden(false)
        setbHidden(false)
        setmHidden(!mHidden)
        setNoHidden(false)
        setNameHidden(false)
        setTimeHidden(false)
        setADHidden(false)
        setPFHidden(false)
    }

    const openNocolor = () => {
        sethHidden(false)
        setvHidden(false)
        setbHidden(false)
        setmHidden(false)
        setNoHidden(!noHidden)
        setNameHidden(false)
        setTimeHidden(false)
        setADHidden(false)
        setPFHidden(false)
    }
    const openNamecolor = () => {
        sethHidden(false)
        setvHidden(false)
        setbHidden(false)
        setmHidden(false)
        setNoHidden(false)
        setNameHidden(!nameHidden)
        setTimeHidden(false)
        setADHidden(false)
        setPFHidden(false)
    }
    const openTimecolor = () => {
        sethHidden(false)
        setvHidden(false)
        setbHidden(false)
        setmHidden(false)
        setNoHidden(false)
        setNameHidden(false)
        setTimeHidden(!timeHidden)
        setADHidden(false)
        setPFHidden(false)
    }
    const openADcolor = () => {
        sethHidden(false)
        setvHidden(false)
        setbHidden(false)
        setmHidden(false)
        setNoHidden(false)
        setNameHidden(false)
        setTimeHidden(false)
        setADHidden(!adHidden)
        setPFHidden(false)
    }
    const openPFcolor = () => {
        sethHidden(false)
        setvHidden(false)
        setbHidden(false)
        setmHidden(false)
        setNoHidden(false)
        setNameHidden(false)
        setTimeHidden(false)
        setADHidden(false)
        setPFHidden(!pfHidden)
    }
    const horizontalChange = (hColor: any) => {
        setHcolor(hColor.hex)
    }
    const verticalChange = (vColor: any) => {
        setVColor(vColor.hex)
    }
    const backgroundChange = (bColor: any) => {
        setBColor(bColor.hex)
    }
    const messageChange = (mColor: any) => {
        setMColor(mColor.hex)
    }
    //............................//


    //.....Train Setting .....//
    const [noColor, setNocolor] = useState("");
    const [nameColor, setNamecolor] = useState("");
    const [timeColor, setTimecolor] = useState("");
    const [adColor, setADcolor] = useState("");
    const [pfColor, setPFcolor] = useState("");

    const [noHidden, setNoHidden] = useState(false)
    const [nameHidden, setNameHidden] = useState(false)
    const [timeHidden, setTimeHidden] = useState(false)
    const [adHidden, setADHidden] = useState(false)
    const [pfHidden, setPFHidden] = useState(false)
    const [idStatus, setIdStatus] = useState(0);
    const [idBgColor, setIdBgStatus] = useState(0);
    const [error, setError] = useState("")
    const refColor = useRef<any>();

    const rgbToHex = (data: any) => {
        console.log("hii");
        console.log("#" + (1 << 24 | data?.r << 16 | data?.g << 8 | data?.b).toString(16).slice(1));
        return "#" + (1 << 24 | data?.r << 16 | data?.g << 8 | data?.b).toString(16).slice(1);
    }

    useEffect(() => {
        setup.getTrainStatusColorCode(statusChoice).then((data: any) => {
            console.log(data);
            if (data?.status == 200) {
                setStatusChoice(data?.data?.status)
                setNocolor(rgbToHex(data?.data?.trainNoColor))
                setNamecolor(rgbToHex(data?.data?.trainNameColor))
                setTimecolor(rgbToHex(data?.data?.trainTimeColor))
                setADcolor(rgbToHex(data?.data?.trainADColor))
                setPFcolor(rgbToHex(data?.data?.trainPfColor))
                setIdStatus(data?.data?.id)
                setError("")
            }
            else if (data?.status != 200) {
                setError(data?.errorMsg)
            }
        })
    }, [statusChoice])

    useEffect(() => {
        setup.getTrainBackgroundColorCode().then((data: any) => {
            console.log(data);
            if (data?.status == 200) {
                setBColor(rgbToHex(data?.data?.backgroundColor))
                setHcolor(rgbToHex(data?.data?.horizontalColor))
                setMColor(rgbToHex(data?.data?.messageColor))
                setVColor(rgbToHex(data?.data?.verticalColor))
            }
            else if (data?.status != 200) {
                setError(data?.errorMsg)
            }
        })
    }, [])

    const noChange = (noColor: any) => {
        setNocolor(noColor.hex)
    }
    const nameChange = (nameColor: any) => {
        setNamecolor(nameColor.hex)

    }
    const timeChange = (timeColor: any) => {
        setTimecolor(timeColor.hex)

    }
    const adChange = (adColor: any) => {
        setADcolor(adColor.hex)
    }
    const pfChange = (pfColor: any) => {
        setPFcolor(pfColor.hex)
    }
    //........................//

    //.....Hex To Rgb Convertor.....//

    const hexToRgb = (color: any) => {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    console.log("<<<<>>>>", hexToRgb(mColor));

    //..............................//

    const handleBackGroundSave = () => {
        if (idStatus == 0) {
            const backrgbColor: any = {
                'horizontalColor': hexToRgb(hColor),
                'verticalColor': hexToRgb(vColor),
                'backgroundColor': hexToRgb(bColor),
                'messageColor': hexToRgb(mColor),
            }
            setup.createBackgroundColorCode(backrgbColor).then((response: any) => {
                // console.log("BackGround Color response");
                if (response?.status == 200) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: 'BackGround Color Added Successfully',
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        timer: 3000,
                    })
                }
                else if (response?.status != 200) {
                    setError(response?.errorMsg)
                }

            })
        }
        else {
            const putStatus: any = {
                'id': idStatus,
                'backgroundColor': hexToRgb(bColor),
                'horizontalColor': hexToRgb(hColor),
                'messageColor': hexToRgb(mColor),
                'verticalColor': hexToRgb(vColor),
            }
            setup.updateBackgroundColorCode(putStatus).then((response: any) => {
                console.log("Id.....response", response);
                if (response?.status == 200) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: 'Train Status Color Updated Successfully',
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        timer: 3000,
                    })
                }
                else if (response?.status != 200) {
                    setError(response?.errorMsg)
                }
            })
        }

        sethHidden(false)
        setvHidden(false)
        setbHidden(false)
        setmHidden(false)
        setNoHidden(false)
        setNameHidden(false)
        setTimeHidden(false)
        setADHidden(false)
        setPFHidden(false)
        // console.log("BackGround RGB Color", backrgbColor);
    }
    const handleSend = () => {
        setwaitForSave(true)
        setup.createSend().then((response: any) => {
            if (response?.status == 200) {
                setwaitForSave(false);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: 'Command Send Successfully',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    timer: 3000,
                })
            }
            else if (response?.status != 200) {
                setError(response?.errorMsg)
            }

        })
    }
    const handleSave = () => {
        if (idStatus == 0) {
            const rgbColor: any = {
                'status': statusChoice,
                'trainNoColor': hexToRgb(noColor),
                'trainNameColor': hexToRgb(nameColor),
                'trainTimeColor': hexToRgb(timeColor),
                'trainADColor': hexToRgb(adColor),
                'trainPfColor': hexToRgb(pfColor),
            }
            setup.createStationColorCode(rgbColor).then((response: any) => {
                if (response?.status == 200) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: 'Train Status Color Added Successfully',
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        timer: 3000,
                    })
                }
                else if (response?.status != 200) {
                    setError(response?.errorMsg)
                }

            })
        }
        else {
            const postStatus: any = {
                'id': idStatus,
                'status': statusChoice,
                'trainNoColor': hexToRgb(noColor),
                'trainNameColor': hexToRgb(nameColor),
                'trainTimeColor': hexToRgb(timeColor),
                'trainADColor': hexToRgb(adColor),
                'trainPfColor': hexToRgb(pfColor),
            }
            setup.updateStatusColorCode(postStatus).then((response: any) => {
                console.log("Id.....response", response);
                if (response?.status == 200) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: 'Train Status Color Updated Successfully',
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        timer: 3000,
                    })
                }
                else if (response?.status != 200) {
                    setError(response?.errorMsg)
                }
            })
        }
        sethHidden(false)
        setvHidden(false)
        setbHidden(false)
        setmHidden(false)
        setNoHidden(false)
        setNameHidden(false)
        setTimeHidden(false)
        setADHidden(false)
        setPFHidden(false)
        console.log("223");
    }
    const handleBackGroundCancel = () => {
        sethHidden(false)
        setvHidden(false)
        setbHidden(false)
        setmHidden(false)
        setHcolor("")
        setVColor("")
        setBColor("")
        setMColor("")
    }

    const handleCancel = () => {
        setNoHidden(false)
        setNameHidden(false)
        setTimeHidden(false)
        setADHidden(false)
        setPFHidden(false)
        setStatusChoice("")
        setNocolor("")
        setNamecolor("")
        setTimecolor("")
        setADcolor("")
        setPFcolor("")
    }

    return (
        <>
            <Grid container style={{ position: "relative" }}>
                <Grid
                    container
                    className={
                        appUser.userRole == "ROLE_STATION MASTER"
                            ? "overlapBackground"
                            : ""
                    }
                >
                    {appUser.userRole == "ROLE_STATION MASTER" ? (
                        <Grid className="stationForm formFields"></Grid>
                    ) : (
                        <></>
                    )}
                    {waitForSave == true ? <Grid item xs={12} className="loaderCss">
                        <CircularProgress className="ldrcircle" />
                        <h1 style={{ color: "white", justifyContent: "center" }}>Loading...</h1>
                    </Grid> : <></>
                    }
                    <Grid container className="jce">
                        <Grid item xs={2}>
                            <Button className="tscBtnSub" onClick={handleSend} >Send</Button>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={6}>
                            <Card className="h100p p5">
                                <Grid container className="headingCss">
                                    <Grid item xs={12} sm={12} className="mb4">
                                        <b>Background Color</b>
                                    </Grid>
                                </Grid>
                                <Grid container className="marginetrainstatustext textalineStart">
                                    <Grid item xs={5} sm={5}>Horizontal Line Color</Grid>
                                    <Grid item xs={2} sm={2}>
                                        <ColorSketchPicker
                                            color={hColor}
                                            onChange={horizontalChange}
                                            visible={hHidden}
                                            setVisible={sethHidden}
                                            skpclass="frstColor"
                                        />
                                        <Button
                                            style={{ border: "2px solid", height: "35px" }}
                                            onClick={openHcolor}
                                        >
                                            {hHidden ? "Close" : "Open"}
                                        </Button>
                                    </Grid>
                                    <Grid item xs={4} sm={4}>
                                        <TextField
                                            fullWidth
                                            className="tal transforn inputRadius"
                                            id="outlined-basic"
                                            variant="outlined"
                                            disabled
                                            style={{ background: hColor, color: "white" }}
                                            onClick={openHcolor}
                                        >
                                            {hHidden}
                                        </TextField>
                                    </Grid>
                                </Grid>
                                <Grid container className="marginetrainstatustext textalineStart">
                                    <Grid item xs={5} sm={5}>Vertical Line Color</Grid>
                                    <Grid item xs={2} sm={2}>
                                        <ColorSketchPicker
                                            color={vColor}
                                            onChange={verticalChange}
                                            visible={vHidden}
                                            setVisible={setvHidden}
                                            skpclass={"frstColor"} />
                                        <Button
                                            style={{ border: "2px solid", height: "35px" }}
                                            onClick={openVcolor}
                                        >
                                            {vHidden ? "Close" : "Open"}
                                        </Button>
                                    </Grid>
                                    <Grid item xs={4} sm={4}>
                                        <TextField
                                            fullWidth
                                            className="tal transforn inputRadius"
                                            id="outlined-basic"
                                            variant="outlined"
                                            style={{ background: vColor }}
                                            disabled
                                            onClick={openVcolor}
                                        >
                                            {vHidden}
                                        </TextField>
                                    </Grid>
                                </Grid>
                                <Grid container className="marginetrainstatustext textalineStart">
                                    <Grid item xs={5} sm={5}>Background Line Colorl</Grid>
                                    <Grid item xs={2} sm={2}>
                                        <ColorSketchPicker
                                            color={bColor}
                                            onChange={backgroundChange}
                                            visible={bHidden}
                                            setVisible={setbHidden}
                                            skpclass={"frstColor"}
                                        />
                                        <Button
                                            style={{ border: "2px solid", height: "35px" }}
                                            onClick={openBcolor}
                                        >
                                            {bHidden ? "Close" : "Open"}
                                        </Button>
                                    </Grid>
                                    <Grid item xs={4} sm={4}>
                                        <TextField
                                            className="tal transforn inputRadius"
                                            id="outlined-basic"
                                            variant="outlined"
                                            style={{ background: bColor }}
                                            disabled
                                            onClick={openBcolor}
                                        >
                                            {bHidden}
                                        </TextField>
                                    </Grid>
                                </Grid>
                                <Grid container className="marginetrainstatustext textalineStart">
                                    <Grid item xs={5} sm={5}>Message Line Color</Grid>
                                    <Grid item xs={2} sm={2}>
                                        <ColorSketchPicker
                                            color={mColor}
                                            onChange={messageChange}
                                            visible={mHidden}
                                            setVisible={setmHidden}
                                            skpclass={"frstColor"}
                                        />
                                        <Button
                                            style={{ border: "2px solid", height: "35px" }}
                                            onClick={openMcolor}
                                            name="mhidden"
                                        >
                                            {mHidden ? "Close" : "Open"}
                                        </Button>
                                    </Grid>
                                    <Grid item xs={4} sm={4}>
                                        <TextField
                                            className="tal transforn inputRadius"
                                            id="outlined-basic"
                                            variant="outlined"
                                            style={{ background: mColor }}
                                            disabled
                                            onClick={openMcolor}
                                        >
                                            {mHidden}
                                        </TextField>
                                    </Grid>
                                </Grid>
                                <Grid container style={{ margin: "4%", marginTop: "4%" }}>
                                    <Grid item xs={5}></Grid>
                                    <Grid item xs={3} ><Button
                                        className="tscBtn"
                                        onClick={handleBackGroundSave}>
                                        Save
                                    </Button>
                                    </Grid>
                                    <Grid item xs={3} ><Button
                                        className="tscBtn"
                                        onClick={handleBackGroundCancel}>
                                        Cancel
                                    </Button>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card className="h100p p5">
                                <Grid container className="tA">

                                    <b>Train Status Color Code </b>

                                </Grid>
                                <Grid container>
                                    <Grid item xs={5} className="uprFont">
                                        Train Status
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl style={{ width: "17vw" }}>
                                            <InputLabel >Select Train Status</InputLabel>
                                            <Select onChange={handleStatusChoice} name="Status" value={statusChoice} className="choiceFild">
                                                <ListSubheader>Arrival</ListSubheader>
                                                <MenuItem value="ACancelled">Cancelled</MenuItem>
                                                <MenuItem value="AHas Arrived On">Has Arrived On</MenuItem>
                                                <MenuItem value="AIndefinite Late">Indefinite Late</MenuItem>
                                                <MenuItem value="AIs Arriving On">Is Arriving On</MenuItem>
                                                <MenuItem value="APlatform Change">Platform Change</MenuItem>
                                                <MenuItem value="ARunning Late">Running Late</MenuItem>
                                                <MenuItem value="ARunning Right Time">Running Right Time</MenuItem>
                                                <MenuItem value="ATerminated">Terminated</MenuItem>
                                                <MenuItem value="AWill Arrive Shortly">Will Arrive Shortly</MenuItem>
                                                <ListSubheader>Departure</ListSubheader>
                                                <MenuItem value="DCancelled">Cancelled</MenuItem>
                                                <MenuItem value="DDiverted">Diverted</MenuItem>
                                                <MenuItem value="DHas Left">Has Left</MenuItem>
                                                <MenuItem value="DIs On Platform">Is On Platform</MenuItem>
                                                <MenuItem value="DIs Ready To Leave">Is Ready To Leave</MenuItem>
                                                <MenuItem value="DPlatform change">Platform change</MenuItem>
                                                <MenuItem value="DRescheduled">Rescheduled</MenuItem>
                                                <MenuItem value="DRunning Right Time">Running Right Time</MenuItem>
                                                <MenuItem value="DScheduled departure">Scheduled departure</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid container >
                                    <Grid container className="headingCss">
                                        <Grid item xs={12} className="trainSetting">
                                            <b>Train Setting</b>
                                        </Grid>
                                    </Grid>
                                    <Grid container className="marginetrainstatustext textalineStart">
                                        <Grid item xs={5}>Train No. Color</Grid>
                                        <Grid item xs={2} sm={2}>
                                            <ColorSketchPicker
                                                color={noColor}
                                                onChange={noChange}
                                                visible={noHidden}
                                                setVisible={setNoHidden}
                                                skpclass={"scndColor"}
                                            />
                                            <Button
                                                style={{ border: "2px solid", height: "35px" }}
                                                onClick={openNocolor}
                                                name="noHidden"
                                            >
                                                {noHidden ? "Close" : "Open"}
                                            </Button>
                                        </Grid>
                                        <Grid item xs={4} sm={4}>
                                            <TextField
                                                className="tal transforn inputRadius"
                                                id="outlined-basic"
                                                variant="outlined"
                                                style={{ background: noColor }}
                                                disabled
                                                onClick={openNocolor}
                                            >
                                                {noHidden}
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                    <Grid container className="marginetrainstatustext textalineStart">
                                        <Grid item xs={5}>Train Name Color</Grid>
                                        <Grid item xs={2} sm={2}>
                                            <ColorSketchPicker
                                                color={nameColor}
                                                onChange={nameChange}
                                                visible={nameHidden}
                                                setVisible={setNameHidden}
                                                skpclass={"scndColor"}
                                            />
                                            <Button
                                                style={{ border: "2px solid", height: "35px" }}
                                                onClick={openNamecolor}
                                                name="nameHidden"
                                            >
                                                {nameHidden ? "Close" : "Open"}
                                            </Button>
                                        </Grid>
                                        <Grid item xs={4} sm={4}>
                                            <TextField
                                                className="tal transforn inputRadius"
                                                id="outlined-basic"
                                                variant="outlined"
                                                style={{ background: nameColor }}
                                                disabled
                                                onClick={openNamecolor}
                                            >
                                                {nameHidden}
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                    <Grid container className="marginetrainstatustext textalineStart">
                                        <Grid item xs={5}>Train Time Color</Grid>
                                        <Grid item xs={2} sm={2}>
                                            <ColorSketchPicker
                                                color={timeColor}
                                                onChange={timeChange}
                                                visible={timeHidden}
                                                setVisible={setTimeHidden}
                                                skpclass={"scndColor"}
                                            />
                                            <Button
                                                style={{ border: "2px solid", height: "35px" }}
                                                onClick={openTimecolor}
                                                name="timeHidden"
                                            >
                                                {timeHidden ? "Close" : "Open"}
                                            </Button>
                                        </Grid>
                                        <Grid item xs={4} sm={4}>
                                            <TextField
                                                className="tal transforn inputRadius"
                                                id="outlined-basic"
                                                variant="outlined"
                                                style={{ background: timeColor }}
                                                disabled
                                                onClick={openTimecolor}
                                            >
                                                {timeHidden}
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                    <Grid container className="marginetrainstatustext textalineStart">
                                        <Grid item xs={5}>Train A/D Color</Grid>
                                        <Grid item xs={2} sm={2}>
                                            <ColorSketchPicker
                                                color={adColor}
                                                onChange={adChange}
                                                visible={adHidden}
                                                setVisible={setADHidden}
                                                skpclass={"scndColor"}
                                            />
                                            <Button
                                                style={{ border: "2px solid", height: "35px" }}
                                                onClick={openADcolor}
                                                name="adHidden"
                                            >
                                                {adHidden ? "Close" : "Open"}
                                            </Button>
                                        </Grid>
                                        <Grid item xs={4} sm={4}>
                                            <TextField
                                                className="tal transforn inputRadius"
                                                id="outlined-basic"
                                                variant="outlined"
                                                style={{ background: adColor }}
                                                disabled
                                                onClick={openADcolor}
                                            >
                                                {adHidden}
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                    <Grid container className="marginetrainstatustext textalineStart">
                                        <Grid item xs={5}>Train PF Color</Grid>
                                        <Grid item xs={2} sm={2}>
                                            <ColorSketchPicker
                                                color={pfColor}
                                                onChange={pfChange}
                                                visible={pfHidden}
                                                setVisible={setPFHidden}
                                                skpclass={"scndColor"}
                                            />
                                            <Button
                                                style={{ border: "2px solid", height: "35px" }}
                                                onClick={openPFcolor}
                                                name="pfHidden"
                                            >
                                                {pfHidden ? "Close" : "Open"}
                                            </Button>
                                        </Grid>
                                        <Grid item xs={4} sm={4}>
                                            <TextField
                                                className="tal transforn inputRadius"
                                                id="outlined-basic"
                                                variant="outlined"
                                                style={{ background: pfColor }}
                                                disabled
                                                onClick={openPFcolor}
                                            >
                                                {pfHidden}
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                    {error != "" ? <Grid container style={{ color: "red", textAlign: "center", display: "flex", justifyContent: "center" }}> {error}</Grid> : <></>}
                                    <Grid container style={{ justifyContent: "end" }}>
                                        <Grid item xs={3}>
                                            <Button className="tscBtn" onClick={handleSave}>Save</Button>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Button className="tscBtn" onClick={handleCancel}>cancel</Button>
                                        </Grid>
                                        <Grid item xs={1}></Grid>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
export default TrainStatusCode;