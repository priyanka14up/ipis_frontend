import { Card, Grid, TextField, Typography, Button, FormControl, RadioGroup, FormControlLabel, Radio, Checkbox } from "@material-ui/core"
import DateRangeIcon from '@material-ui/icons/DateRange';
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
export const Setting = () => {
    return (
        <>
            <Card className="settingCardStyle">
                <Grid>
                    <Card className="settingGridStyle1">
                        <Typography className="settingTextStyle1">
                            Bulk Import
                        </Typography>
                        <Typography className="settingTextStyle2">
                            Select items to Import
                        </Typography>
                        <Grid container style={{ paddingBottom: "20px" }} >
                            <Grid item xs={5}>
                                <Grid container style={{ display: "flex", justifyContent: "center" }}>
                                    <Grid item xs={3}>
                                        <Typography className="settingTextStyle1">
                                            Select Items
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <select className="settingSelectStyle" >
                                            <option></option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                        </select>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={5}>
                                <Grid container style={{ display: "flex", justifyContent: "center" }}>
                                    <Grid item xs={3}>
                                        <Typography className="settingTextStyle1">
                                            Select File
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <TextField
                                            size="small"
                                            className="settingTextBoxStyle1"
                                            variant="outlined"
                                            required={true}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={2} >
                                <Grid container>
                                    <Grid item xs={6} style={{ display: "flex", justifyContent: "center" }}>
                                        <Button type="reset" value="Reset" variant="outlined" className="settingBrowseBtnStyle">
                                            browse
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} style={{ display: "flex", justifyContent: "flex-end" }}>
                                        <Button type="submit" className="settingImportBtnStyle" variant="outlined" >
                                            import
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Typography className="settingTextStyle1">
                            Bulk Export
                        </Typography>
                        <Typography className="settingTextStyle2">
                            Select items to Export
                        </Typography>
                        <Grid container style={{ paddingBottom: "20px" }} >
                            <Grid item xs={5}>
                                <Grid container style={{ display: "flex", justifyContent: "center" }}>
                                    <Grid item xs={3}>
                                        <Typography className="settingTextStyle1">
                                            Select Items
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <select className="settingSelectStyle" >
                                            <option></option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                        </select>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={5}>
                                <Grid container style={{ display: "flex", justifyContent: "center" }}>
                                    <Grid item xs={3}>
                                        <Typography className="settingTextStyle1">
                                            Select Loction
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <TextField
                                            size="small"
                                            className="settingTextBoxStyle1"
                                            variant="outlined"
                                            required={true}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={2} >
                                <Grid container>
                                    <Grid item xs={6} style={{ display: "flex", justifyContent: "center" }}>
                                        <Button type="reset" value="Reset" variant="outlined" className="settingBrowseBtnStyle">
                                            browse
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} style={{ display: "flex", justifyContent: "flex-end" }}>
                                        <Button type="submit" className="settingImportBtnStyle" variant="outlined" >
                                            export
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid >
                    <Card className="settingGridStyle1">
                        <Typography className="settingTextStyle1">
                            Log threshold
                        </Typography>
                        <Typography className="settingTextStyle2">
                            Enter Threshold Value
                        </Typography>
                        <Grid container style={{ paddingBottom: "20px" }} >
                            <Grid item xs={4}>
                                <Grid container style={{ display: "flex", justifyContent: "center" }}>
                                    <Grid item xs={3}>
                                        <Typography className="settingTextStyle1">
                                            Threshold Value
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <TextField
                                            size="small"
                                            className="settingTextBoxStyle1"
                                            variant="outlined"
                                            required={true}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={4}>
                            </Grid>
                            <Grid item xs={4} >
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid container >
                    <Grid item xs={6} >
                        <Card className="settingGridStyle2">
                            <Typography className="settingTextStyle1">
                                Automatic backup
                            </Typography>
                            <FormControl style={{ paddingBottom: "20px" }}>
                                <RadioGroup row style={{ paddingLeft: "10px" }}>
                                    <FormControlLabel style={{ paddingRight: "6%" }} control={<Radio className="settingRadio" />} label={<span className="settingRadiolabel" >Enable</span>} />
                                    <FormControlLabel control={<Radio className="settingRadio" />} label={<span className="settingRadiolabel" >Disable</span>} />
                                </RadioGroup>
                            </FormControl>
                            <Grid container style={{ paddingBottom: "20px" }} >
                                <Grid item xs={2} style={{ display: "flex", justifyContent: "flex-end", paddingRight: "10px" }}>
                                    <Typography className="settingTextStyle1">
                                        Frequency
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} style={{ display: "flex", justifyContent: "center" }}>
                                    <TextField
                                        size="small"
                                        className="settingTextBoxStyle1"

                                        variant="outlined"
                                        required={true}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                </Grid>
                            </Grid>
                            <Grid container style={{ paddingBottom: "20px" }} >
                                <Grid item xs={2} style={{ display: "flex", justifyContent: "flex-end", paddingRight: "10px" }}>
                                    <Typography className="settingTextStyle1">
                                        Schedule
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} style={{ display: "flex", justifyContent: "center" }}>
                                    <TextField
                                        size="small"
                                        className="settingTextBoxStyle1"
                                        variant="outlined"
                                        required={true}
                                    />
                                </Grid>
                                <Grid item xs={4} style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", fontSize: "2em" }}>
                                    <DateRangeIcon />
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item xs={6} >
                        <Card className="settingGridStyle3">
                            <Typography className="settingTextStyle1">
                                Truncation
                            </Typography>
                            <FormControl style={{ paddingBottom: "20px" }}>
                                <RadioGroup row style={{ paddingLeft: "10px" }}>
                                    <FormControlLabel style={{ paddingRight: "6%" }} control={<Radio className="settingRadio" />} label={<span className="settingRadiolabel" >Enable</span>} />
                                    <FormControlLabel control={<Radio className="settingRadio" />} label={<span className="settingRadiolabel" >Disable</span>} />
                                </RadioGroup>
                            </FormControl>
                            <Grid container style={{ paddingBottom: "20px" }} >
                                <Grid item xs={2} style={{ display: "flex", justifyContent: "flex-end", paddingRight: "10px" }}>
                                    <Typography className="settingTextStyle1">
                                        Threshold Value
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} style={{ display: "flex", justifyContent: "center" }}>
                                    <TextField
                                        size="small"
                                        className="settingTextBoxStyle1"
                                        variant="outlined"
                                        required={true}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                </Grid>
                            </Grid>
                            <Grid container style={{ paddingBottom: "20px" }} >
                                <Grid item xs={2} style={{ display: "flex", justifyContent: "flex-end", paddingRight: "10px" }}>
                                    <Typography className="settingTextStyle1">
                                        Schedule
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} style={{ display: "flex", justifyContent: "center" }}>
                                    <TextField
                                        size="small"
                                        className="settingTextBoxStyle1"
                                        variant="outlined"
                                        required={true}
                                    />
                                </Grid>
                                <Grid item xs={4} style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", fontSize: "2em" }}>
                                    <DateRangeIcon />
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
                <Grid >
                    <Card className="settingGridStyle1">
                        <Typography className="settingTextStyle1">
                            Delete
                        </Typography>
                        <Grid container style={{ paddingBottom: "20px" }} >
                            <Grid item xs={6}>
                                <Grid container style={{ display: "flex", justifyContent: "center" }}>
                                    <Grid item xs={9} style={{ paddingLeft: "10px" }}>
                                        <Grid style={{ paddingBottom: "10px" }}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox className="intigratinCheckbox" size="small" />
                                                }
                                                label={<span className="intigratinCheckboxlabel">Delete debugging logs</span>}
                                            />
                                        </Grid>
                                        <Grid>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox className="intigratinCheckbox" size="small" />
                                                }
                                                label={<span className="intigratinCheckboxlabel">delete railway logs</span>}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Button type="submit" className="stationDelete" variant="outlined" >
                                            Delete
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid style={{ display: "flex", justifyContent: "center" }}>
                    <Button type="reset" value="Reset" variant="outlined" className="settingCancel">
                        <CloseIcon className="clearIcon" />
                        Cancel
                    </Button>
                    <Button type="submit" className="settingSave" variant="outlined" >
                        <DoneIcon className="SaveIcon" style={{ display: "inherit" }} />
                        Save
                    </Button>

                </Grid>
            </Card>
        </>
    )
}

