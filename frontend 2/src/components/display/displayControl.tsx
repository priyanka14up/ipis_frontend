import { Card, Checkbox, FormControlLabel, Grid, TextField, Typography } from "@material-ui/core"
import { useState, useEffect } from "react";



export const DisplayControl = (props: any) => {
    // const {handleChecked} = props
    var displayControl: any;
    var enableDisplay: any;
    var showMessage: any;
    var showCoach: any;
    var showMedia: any;
    var handleDisplayControlChange: any;
    var handleChecked: any;

    const [enableCheck, setEnableCheck] = useState(enableDisplay);
    // const []

    const [input, setInput] = useState({
        showCoach: false,
        showMedia: false,
        showMessage: false
    });

    if (props && props.getDisplayControl && props.getDisplayControl.displayControl) {
        displayControl = props.getDisplayControl.displayControl
    }
    if (props && props.getDisplayControl && props.getDisplayControl.handleDisplayControlChange) {
        handleDisplayControlChange = props.getDisplayControl.handleDisplayControlChange
    }
    if (props && props.getDisplayControl && props.getDisplayControl.handleChecked) {
        handleChecked = props.getDisplayControl.handleChecked
    }

    if (props && props.getDisplayControl && props.getDisplayControl.showMessage) {
        showMessage = props.getDisplayControl.showMessage
    }

    if (props && props.getDisplayControl && props.getDisplayControl.showCoach) {
        showCoach = props.getDisplayControl.showCoach
    }

    if (props && props.getDisplayControl && props.getDisplayControl.showMedia) {
        showMedia = props.getDisplayControl.showMedia
    }

    if (props && props.getDisplayControl && props.getDisplayControl.enableDisplay) {
        enableDisplay = props.getDisplayControl.enableDisplay
    }



    const handleEnableDisplay = () => {
        enableDisplay = !enableDisplay;
        setEnableCheck(enableDisplay)
        if (enableDisplay === false) {
            showMessage = enableDisplay;
            showCoach = enableDisplay;
            showMedia = enableDisplay;
            setInput({
                showCoach: false,
                showMedia: false,
                showMessage: false
            });
        }
        console.log(enableDisplay)
    }
    const handleShowMessage = () => {
        showMessage = !showMessage
    }
    const handleShowCoach = () => {
        showCoach = !showCoach
    }

    const handleShowMedia = () => {
        showMedia = !showMedia
    }

    return (
        <>
            <Card className="sideCardpadding10">
                <Grid container className="sideCardDisplaypadding">
                    <Typography className="displayControlText1">
                        <b>Display Controls </b>
                    </Typography>
                </Grid>
                <Grid container>
                    <Typography className="displayControlText2">
                        Enable/ Disable the Display function. Also, Control what type of message should be displayed.
                    </Typography>
                </Grid>
                <Grid container className="sideCardDisplaypadding">
                    <select
                        className="displayControlSelect1"
                        onChange={handleDisplayControlChange}
                        required={true}
                        name="displayType"
                        value={displayControl?.displayType}
                    >
                        <option value="Select">Select</option>
                        <option value="ovd">OVD Display</option>
                        <option value="ivd">IVD Display</option>
                        <option value="tvDisplay">TV Display</option>
                    </select>
                </Grid >
                <Grid container className="positionrelative">
                    {displayControl.displayType == "" || displayControl.displayType == "Select" ? <Grid className="side_display_formFields side_display_Background">
                    </Grid> : <></>
                    }
                    <Grid container className="sideCardDisplaypadding">
                        <FormControlLabel
                            onClick={handleChecked}
                            control={
                                <Checkbox className="displayControlcheckBox2"
                                    size="small"
                                    name="enableDisplay"
                                    checked={displayControl?.enableDisplay}
                                    onClick={handleEnableDisplay}
                                />
                            }
                            label={<span className="displayControlLabel1">Enable Display</span>}
                            className="displayControlcheckBox1"
                        />
                    </Grid>
                    <Grid container className="displayContentCss">
                        {displayControl.enableDisplay === true ?
                            <>
                                <Grid item xs={12} className="sideCardDisplaypadding">
                                    <FormControlLabel
                                        onClick={handleChecked}
                                        control={
                                            <Checkbox className="displayControlcheckBox2"
                                                size="small"
                                                name="showMessage"
                                                checked={displayControl?.showMessage}
                                                onClick={handleShowMessage}
                                            />
                                        }
                                        label={<span className="displayControlLabel1">Show Message</span>}
                                        className="displayControlcheckBox3"
                                    />
                                </Grid>
                                <Grid item xs={12} className="sideCardDisplaypadding">
                                    <FormControlLabel
                                        onClick={handleChecked}
                                        control={
                                            <Checkbox className="displayControlcheckBox2"
                                                size="small"
                                                name="showCoach"
                                                checked={displayControl?.showCoach}
                                                onClick={handleShowCoach}
                                            />
                                        }
                                        label={<span className="displayControlLabel1">Show Coach Details</span>}
                                        className="displayControlcheckBox3"
                                    />
                                </Grid>
                                <Grid item xs={12} className="sideCardDisplaypadding">
                                    <FormControlLabel
                                        onClick={handleChecked}
                                        control={
                                            <Checkbox className="displayControlcheckBox2"
                                                size="small"
                                                name="showMedia"
                                                checked={displayControl?.showMedia}
                                                onClick={handleShowMedia}
                                            />
                                        }
                                        label={<span className="displayControlLabel1">Show Media</span>}
                                        className="displayControlcheckBox3"
                                    />
                                </Grid>
                            </>
                            :
                            <>
                                <Grid item xs={12} className="sideCardDisplaypadding">
                                    <FormControlLabel
                                        disabled
                                        // disableCheck
                                        onClick={handleChecked}
                                        control={
                                            <Checkbox className="displayControlcheckBox2"
                                                size="small"
                                                name="showMessage"
                                                checked={displayControl?.showMessage}
                                                onClick={handleShowMessage}
                                            />
                                        }
                                        label={<span className="displayControlLabel1">Show Message</span>}
                                        className="displayControlcheckBox3"
                                    />
                                </Grid>
                                <Grid item xs={12} className="sideCardDisplaypadding">
                                    <FormControlLabel
                                        disabled
                                        control={
                                            <Checkbox className="displayControlcheckBox2"
                                                size="small"
                                                name="showCoach"
                                                checked={displayControl?.showCoach}
                                                onClick={handleShowCoach}
                                            />
                                        }
                                        label={<span className="displayControlLabel1">Show Coach Details</span>}
                                        className="displayControlcheckBox3"
                                    />
                                </Grid>
                                <Grid item xs={12} className="sideCardDisplaypadding">
                                    <FormControlLabel
                                        disabled
                                        onClick={handleChecked}
                                        control={
                                            <Checkbox className="displayControlcheckBox2"
                                                size="small"
                                                name="showMedia"
                                                checked={displayControl?.showMedia}
                                                onClick={handleShowMedia}
                                            />
                                        }
                                        label={<span className="displayControlLabel1">Show Media</span>}
                                        className="displayControlcheckBox3"
                                    />
                                </Grid>
                            </>
                        }
                    </Grid>

                    <Grid container className="displayTimeOut displayTimeoutCss sideCardDisplaypadding">
                        <Grid item xs={8} style={{alignSelf:"center"}}>
                            <Typography className="displayControlText3">
                                Display Timeout (Seconds)
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                className="displayControlText4"
                                // type="number"
                                size="small"
                                variant="outlined"
                                name="displayTimeout"
                                required={true}
                                onChange={handleDisplayControlChange}
                                value={displayControl?.displayTimeout}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </>
    )
}