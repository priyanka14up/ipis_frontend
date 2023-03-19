import { Grid } from "@material-ui/core"
import { AppHeader } from "../common/app-header"
import { DisplayControl } from "./displayControl";
import "./style.css";
import { Card, Typography, TextField, Button } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import { DisplayFileList } from "./displayFileList";
import { DisplayPlayList } from "./displayPlayList";
import { useEffect, useState } from "react";
import DisplayControlModel from "./../../model/display/displayControl"
import DisplayService from "../service/display/displayService";
import Swal from "sweetalert2";

const displayService = new DisplayService();
export const Display = () => {


    const [enableDisplay, setEnableDisplay] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [disableCheck, setDisableCheck] = useState(true)
    const [enableChecked, setEnabledChecked] = useState(false)
    const [showCoach, setShowCoach] = useState(false);
    const [array, setArray] = useState([]);
    const [mediaArray, setMediaArray] = useState([]);
    const [showMedia, setShowMedia] = useState(false);
    const [tvDisplayError, setTvDisplayError] = useState("")
    const [displayError, setDisplayError] = useState("")
    const [fileListError, setFileListError] = useState("")
    const [mediaError, setMediaError] = useState("")
    const [displayControl, setDisplayControl] = useState<DisplayControlModel | any>({
        displayType: "",
        enableDisplay: enableDisplay,
        showMessage: showMessage,
        showCoach: showCoach,
        showMedia: showMedia,
        displayTimeout: 0,
        gridRowHeight: 0,
        trainNoWidth: 0,
        expectedTimeWidth: 0,
        arrivalDepartureWidth: 0,
        platformWidth: 0,
        gridPageTime: 0,
        messageScrollSpeed: 0,
        mediaStartIntervalTime: 0,
    });

    const getDisplayData = (displayData: any) => {
        let name = Object.keys(displayData)[0];
        let value = displayData[name];
        let checked = displayData[name];
        setDisplayControl(() => ({
            ...displayControl,
            [name]: value, [name]: checked
        }));
    }

    const handleSelectedMedia = () => {
        displayService.postMediaQueueSelectedMedia(displayControl).then((data: any) => {
            if (data && data.status === 200) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Display Media selected successfully`,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    timer: 3000,
                })
            }
        });
    };

    const handleChange = (e: any) => {
        var { name, value } = e.target;
        if (value.length < 9 && (value>0 || value=="")) {
            setDisplayControl({ ...displayControl, [name]: value })
        }
        else{
            setDisplayControl({ ...displayControl, [name]: 0 })
        }
    };

    const handleDisplayControlChange = (e: any) => {
        var { name, value } = e.target;
        if (name == "displayTimeout" && value.match(/^[\d]{0,6}$/i)) {
            setDisplayControl({ ...displayControl, [name]: value })
        }
        else if (name != "displayTimeout"){
            setDisplayControl({ ...displayControl, [name]: value })
        }

    }


    const handleChecked = (e: any) => {
        var { name, checked } = e.target;
        setDisplayControl({ ...displayControl, [name]: checked });
        if (name == "enableDisplay" && checked == false) {
            setDisplayControl({
                ...displayControl,
                enableDisplay: false,
                showMessage: false,
                showCoach: false,
                showMedia: false,
            })
        }

    };

    const handleSubmit = () => {

        (displayError !== "") && setDisplayError("")

        if (displayControl) {
            if (displayControl.displayTimeout !== "" && displayControl.gridRowHeight !== "" && displayControl.trainNoWidth !== "" && displayControl.expectedTimeWidth !== "" && displayControl.arrivalDepartureWidth !== "" && displayControl.platformWidth !== "" && displayControl.gridPageTime !== "" && displayControl.messageScrollSpeed !== "" && displayControl.mediaStartIntervalTime !== "") {
                const data: any = {
                    displayType: displayControl.displayType,
                    enableDisplay: displayControl.enableDisplay,
                    showMessage: displayControl.showMessage,
                    showCoach: displayControl.showCoach,
                    showMedia: displayControl.showMedia,
                    displayTimeout: displayControl.displayTimeout,
                    gridRowHeight: displayControl.gridRowHeight,
                    trainNoWidth: displayControl.trainNoWidth,
                    expectedTimeWidth: displayControl.expectedTimeWidth,
                    arrivalDepartureWidth: displayControl.arrivalDepartureWidth,
                    platformWidth: displayControl.platformWidth,
                    gridPageTime: displayControl.gridPageTime,
                    messageScrollSpeed: displayControl.messageScrollSpeed,
                    mediaStartIntervalTime: displayControl.mediaStartIntervalTime,
                };
                displayService.createDisplayControl(data).then((response) => {
                    if (response && response.status === 200) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `Display data added successfully`,
                            showConfirmButton: false,
                            allowOutsideClick: false,
                            timer: 3000,
                        })
                        setTvDisplayError("")
                    }
                    else {
                        setTvDisplayError(response)
                    }
                    console.log(response)
                });
            }

        }



    }


    useEffect(() => {
        if (displayControl?.displayType !== "" && displayControl?.displayType !== undefined) {
            displayService.getDisplayControlByDisplayType(displayControl).then((resp) => {
                if (resp && resp?.data && resp?.status == 200) {
                    setDisplayControl(resp?.data)
                    setDisplayError("")
                    setDisableCheck(false)

                }
                else {
                    setDisplayError(resp?.errorMsg)
                    setDisplayControl({
                        ...displayControl,
                        enableDisplay: false,
                        showMessage: false,
                        showCoach: false,
                        showMedia: false,
                        displayTimeout: 0,
                        gridRowHeight: 0,
                        trainNoWidth: 0,
                        expectedTimeWidth: 0,
                        arrivalDepartureWidth: 0,
                        platformWidth: 0,
                        gridPageTime: 0,
                        messageScrollSpeed: 0,
                        mediaStartIntervalTime: 0,
                    })
                }
            })
            displayService.getMediaFileByDisplayType(displayControl).then((data) => {
                if (data && data.status === 200) {
                    if (data && data.data) {
                        setArray(data.data);
                        setFileListError("")
                    }
                }
                else {
                    setArray([])
                    setFileListError(data?.errorMsg)
                }
            })
            displayService.getMediaQueueByDeviceType(displayControl).then((data) => {
                if (data && data.status === 200) {
                    if (data && data.data) {
                        setMediaArray(data.data);
                        setMediaError("")
                    }
                }
                else {
                    setMediaArray([])
                    setMediaError(data?.errorMsg)
                }
            })

        }
    }, [displayControl?.displayType])

    useEffect(() => {
        setEnableDisplay(displayControl?.enableDisplay)
    }, [displayControl?.enableDisplay])

    useEffect(() => {
        setShowMessage(displayControl?.showMessage)
        setDisableCheck(false)
    }, [displayControl?.showMessage])

    useEffect(() => {
        setShowCoach(displayControl?.showCoach)
    }, [displayControl?.showCoach])

    useEffect(() => {
        setShowMedia(displayControl?.showMedia)
    }, [displayControl?.showMedia])

    var obj = {
        displayControl,
        setDisplayControl,
        getDisplayData,
        enableDisplay,
        showMessage,
        showCoach,
        showMedia,
        disableCheck,
        setDisableCheck,
        handleChange,
        handleDisplayControlChange,
        array,
        setArray,
        mediaArray,
        setMediaArray,
        setMediaError,
        handleChecked
    }

    const handleCancel = () => {
        setDisplayControl({
            displayType: "",
            enableDisplay: false,
            showMessage: false,
            showCoach: false,
            showMedia: false,
            displayTimeout: 0,
            gridRowHeight: 0,
            trainNoWidth: 0,
            expectedTimeWidth: 0,
            arrivalDepartureWidth: 0,
            platformWidth: 0,
            gridPageTime: 0,
            messageScrollSpeed: 0,
            mediaStartIntervalTime: 0,
        });
        setTvDisplayError("")
    }


    return (
        <>
            {/* <Grid>
                {" "}
                <AppHeader />
            </Grid> */}
            {/* <Grid container className="padding-15Css">
                <Grid item xs={2}>
                    <DisplayControl getDisplayControl={obj} />
                </Grid>
                <br /><br />
                { displayControl.displayType == "" || displayControl.displayType == "Select" ? <Grid className="display_formFields display_Background">
                <h1 style={{marginTop:"19%"}}> Please Select Display Type </h1>
          </Grid>: <></>
          }
                <Grid item xs={10}>
                    <Card className="ivdDisplayCard">
                        <Grid>
                            <Card className="ivdDisplaySettingCard">
                                <Typography className="ivdDisplayText1">
                                    Display Settings
                                </Typography>
                                <Grid container >
                                    <Grid item xs={3}>
                                        <Grid container  className="padding-15Css">
                                            <Grid item xs={9} md={9}>
                                                <Typography className="ivdDisplayText3">
                                                    Grid Row Height
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={3} md={3} >
                                                <TextField
                                                    required={true}
                                                    name="gridRowHeight"
                                                    value={displayControl?.gridRowHeight}
                                                    onChange={handleChange}
                                                    className="ivdDisplayText2"
                                                    type="number"
                                                    size="small"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container className="padding-15Css">
                                        <Grid item xs={9} md={9}>
                                                <Typography className="ivdDisplayText3">
                                                    Platform Width (%)
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={3} md={3} >
                                                <TextField
                                                    required={true}
                                                    name="platformWidth"
                                                    value={displayControl?.platformWidth}
                                                    onChange={handleChange}
                                                    className="ivdDisplayText2"
                                                    type="number"
                                                    size="small"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Grid container className="padding-15Css">
                                        <Grid item xs={9} md={9}>
                                                <Typography className="ivdDisplayText3">
                                                    Train No.  Width (%)
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={3} md={3} >
                                                <TextField
                                                    required={true}
                                                    name="trainNoWidth"
                                                    value={displayControl?.trainNoWidth}
                                                    onChange={handleChange}
                                                    className="ivdDisplayText2"
                                                    type="number"
                                                    size="small"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container className="padding-15Css">
                                        <Grid item xs={9} md={9}>
                                                <Typography className="ivdDisplayText3">
                                                    Grid Page Time (sec)
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={3} md={3} >
                                                <TextField
                                                    required={true}
                                                    name="gridPageTime"
                                                    value={displayControl?.gridPageTime}
                                                    onChange={handleChange}
                                                    className="ivdDisplayText2"
                                                    type="number"
                                                    size="small"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Grid container className="padding-15Css">
                                        <Grid item xs={9} md={9}>
                                                <Typography className="ivdDisplayText3">
                                                    Expected Time  Width (%)
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={3} md={3} >
                                                <TextField
                                                    required={true}
                                                    name="expectedTimeWidth"
                                                    value={displayControl?.expectedTimeWidth}
                                                    onChange={handleChange}
                                                    className="ivdDisplayText2"
                                                    type="number"
                                                    size="small"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container className="padding-15Css">
                                            <Grid item xs={9} md={9}>
                                                <Typography className="ivdDisplayText3">
                                                    Message Scroll Speed
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={3} md={3} >
                                                <TextField
                                                    required={true}
                                                    name="messageScrollSpeed"
                                                    value={displayControl?.messageScrollSpeed}
                                                    onChange={handleChange}
                                                    className="ivdDisplayText2"
                                                    type="number"
                                                    size="small"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Grid container className="padding-15Css">
                                        <Grid item xs={9} md={9}>
                                                <Typography className="ivdDisplayText3">
                                                    Arrival/Departure  Width (%)
                                                </Typography>
                                            </Grid>
                                            <Grid item  md={3} >
                                                <TextField
                                                    required={true}
                                                    name="arrivalDepartureWidth"
                                                    value={displayControl?.arrivalDepartureWidth}
                                                    onChange={handleChange}
                                                    className="ivdDisplayText2"
                                                    InputProps={{ inputProps: { min: 0, max: 10 } }}
                                                    type="number"
                                                    size="small"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container className="padding-15Css">
                                        <Grid item xs={9} md={9}>
                                                <Typography className="ivdDisplayText4">
                                                    Media Start Interval Time (min)

                                                </Typography>
                                            </Grid>
                                            <Grid item xs={3} md={3} >
                                                <TextField
                                                    required={true}
                                                    name="mediaStartIntervalTime"
                                                    value={displayControl?.mediaStartIntervalTime}
                                                    onChange={handleChange}
                                                    className="ivdDisplayText2"
                                                    type="number"
                                                    size="small"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid >
                                   
                                    <div className="SaveCancelButtonCss">
                                        <Button type="submit" className="DisplaySettingSave" variant="outlined" onClick={handleSubmit}>
                                            <DoneIcon className="SaveIcon saveButtonDisplayCss"/>
                                            Save
                                        </Button>
                                        <Button type="reset" value="Reset" onClick={handleCancel} variant="outlined" className="DisplaySettingCancel">
                                            <CloseIcon className="clearIcon" />
                                            Cancel
                                        </Button>
                                    </div>
                                </Grid>
                            </Card>
                            <Grid className="margineTopCss">
                                <Grid >
                                    <div>
                                        {fileListError != "" ? <div style={{ color: "red", textAlign: "center", justifyContent: "center", fontSize: "18px" }}> {fileListError}</div> : <></>}
                                    </div>
                                </Grid>
                                <DisplayFileList getDisplayFileList={obj} />
                            </Grid>
                            <br />
                            <Grid>
                                <Grid >
                                    <div>
                                        {mediaError != "" ? <div style={{ color: "red", textAlign: "center", justifyContent: "center", fontSize: "18px" }}> {mediaError}</div> : <></>}
                                    </div>
                                </Grid>
                                <DisplayPlayList getDisplayMediaQueue={obj} />
                            </Grid>
                            <Grid className="displaySelectedCss">
                                <Button type="submit" className="IvdDisplaySave" variant="outlined" onClick={() => handleSelectedMedia()}>
                                    DISPLAY SELECTED MEDIA
                                </Button>
                            </Grid>
                        </Grid>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "20px" }}>
                                        {tvDisplayError != "" ? <div style={{ color: "red", textAlign: "left", justifyContent: "center", fontSize: "18px", }}> {tvDisplayError}</div> : <></>}
                                    </div>
                    </Card>
                </Grid>
            </Grid> */}


            <Grid container className="padding-15Css">
                <Grid item xs={3}>
                    <DisplayControl className="Displaypadding" getDisplayControl={obj} />
                </Grid>
                <Grid item xs={9}>
                    <Card className="ivdDisplayCard">
                        {displayControl.displayType == "" || displayControl.displayType == "Select" ? <Grid item xs={12} className="display_formFields display_Background">
                            <h1 style={{ marginTop: "19%" }}> Please Select Display Type </h1>
                        </Grid> : <></>
                        }
                        <Grid>
                            <Card className="ivdDisplaySettingCard">
                                <Grid container >
                                    <Typography className="ivdDisplayText1">
                                        <b>Display Settings</b>
                                    </Typography>
                                </Grid>
                                <Grid container className="margineTopCss2">
                                    <Grid item xs={2} md={2}>
                                        <Typography className="ivdDisplayText3">
                                            Grid Row Height
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={1} md={1} spacing={2}>
                                        <TextField
                                            required={true}
                                            name="gridRowHeight"
                                            value={displayControl?.gridRowHeight}
                                            onChange={handleChange}
                                            className="ivdDisplayText2"
                                            type="number"
                                            size="small"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={2} md={2}>
                                        <Typography className="ivdDisplayText3">
                                            Train No. Width (%)
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={1} md={1} >
                                        <TextField
                                            required={true}
                                            name="trainNoWidth"
                                            value={displayControl?.trainNoWidth}
                                            onChange={handleChange}
                                            className="ivdDisplayText2"
                                            type="number"
                                            size="small"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={2} md={2}>
                                        <Typography className="ivdDisplayText3">
                                            Expected Time  Width (%)
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={1} md={1} >
                                        <TextField
                                            required={true}
                                            name="expectedTimeWidth"
                                            value={displayControl?.expectedTimeWidth}
                                            onChange={handleChange}
                                            className="ivdDisplayText2"
                                            type="number"
                                            size="small"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={2} md={2}>
                                        <Typography className="ivdDisplayText3">
                                            Arrival/Departure Width (%)
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={1} md={1} >
                                        <TextField
                                            required={true}
                                            name="arrivalDepartureWidth"
                                            value={displayControl?.arrivalDepartureWidth}
                                            onChange={handleChange}
                                            className="ivdDisplayText2"
                                            InputProps={{ inputProps: { min: 0, max: 10 } }}
                                            type="number"
                                            size="small"
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container className="margineTopCss2">
                                    <Grid item xs={2} md={2}>
                                        <Typography className="ivdDisplayText3">
                                            Platform Width (%)
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={1} md={1} >
                                        <TextField
                                            required={true}
                                            name="platformWidth"
                                            value={displayControl?.platformWidth}
                                            onChange={handleChange}
                                            className="ivdDisplayText2"
                                            type="number"
                                            size="small"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={2} md={2}>
                                        <Typography className="ivdDisplayText3">
                                            Grid Page Time(sec)
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={1} md={1}>
                                        <TextField
                                            required={true}
                                            name="gridPageTime"
                                            value={displayControl?.gridPageTime}
                                            onChange={handleChange}
                                            className="ivdDisplayText2"
                                            type="number"
                                            size="small"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={2} md={2}>
                                        <Typography className="ivdDisplayText3">
                                            Message Scroll Speed
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={1} md={1} >
                                        <TextField
                                            required={true}
                                            name="messageScrollSpeed"
                                            value={displayControl?.messageScrollSpeed}
                                            onChange={handleChange}
                                            className="ivdDisplayText2"
                                            type="number"
                                            size="small"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={2} md={2}>
                                        <Typography className="ivdDisplayText4">
                                            Media Start Interval Time (min)
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={1} md={1}>
                                        <TextField
                                            required={true}
                                            name="mediaStartIntervalTime"
                                            value={displayControl?.mediaStartIntervalTime}
                                            onChange={handleChange}
                                            className="ivdDisplayText2"
                                            type="number"
                                            size="small"
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container className="margineTopCss2">
                                    <Grid item xs={8}></Grid>
                                    <Grid item xs={2}> <Button type="submit" className="DisplaySettingSave" variant="outlined" onClick={handleSubmit}>
                                        <DoneIcon className="SaveIcon saveButtonDisplayCss" />
                                        Save
                                    </Button>
                                    </Grid>
                                    <Grid item xs={2}><Button type="reset" value="Reset" onClick={handleCancel} variant="outlined" className="DisplaySettingCancel">
                                        <CloseIcon className="clearIcon" />
                                        Cancel
                                    </Button>
                                    </Grid>
                                </Grid>
                            </Card>
                            <Grid className="margineTopCss">
                                <Grid >
                                    <div>
                                        {fileListError != "" ? <div style={{ color: "red", textAlign: "center", justifyContent: "center", fontSize: "18px" }}> {fileListError}</div> : <></>}
                                    </div>
                                </Grid>
                                <DisplayFileList getDisplayFileList={obj} />
                            </Grid>
                            <Grid>
                                <Grid className="margineTopCss">
                                    <div>
                                        {mediaError != "" ? <div style={{ color: "red", textAlign: "center", justifyContent: "center", fontSize: "18px" }}> {mediaError}</div> : <></>}
                                    </div>
                                </Grid>
                                <DisplayPlayList getDisplayMediaQueue={obj} />
                            </Grid>
                            <Grid container style={{margin: "0% 0% 1% -1%"}}>
                                <Grid item xs={9}></Grid>
                                <Grid item xs={3} className="displaySelectedCss">
                                    <Button disabled={!showMedia} type="submit" className="IvdDisplaySave" variant="outlined" onClick={() => handleSelectedMedia()}>
                                        DISPLAY SELECTED MEDIA
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
                            {tvDisplayError != "" ? <div style={{ color: "red", textAlign: "left", justifyContent: "center", fontSize: "18px", }}> {tvDisplayError}</div> : <></>}
                        </div>
                    </Card>
                </Grid>
            </Grid >
        </>
    )
}