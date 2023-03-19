import { Card, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@material-ui/core";

export const DeviceSystem = (props: any) => {

    var stationDetails;

    if (props && props.getDeviceSystem && props.getDeviceSystem.stationDetails) {
        stationDetails = props.getDeviceSystem.stationDetails
    }

    const handleChange = (e: any) => {
        var { name, value } = e.target;
        props.getDeviceSystem.getStationData({ [name]: value })
    }

    return (
        <>
            <Grid item xs={12}>
                <Card className="SDCardStyle">
                    <Grid container className="mb-20">
                        <Typography className="t1">
                            Device Systems
                        </Typography>
                    </Grid>
                    <Grid style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                        <FormControl component="fieldset" >
                            <RadioGroup name="deviceSchema" onClick={handleChange} value={stationDetails.deviceSchema}>
                                <FormControlLabel style={{ paddingTop: "9%" }} value="IPBasedDevices" control={<Radio className="intigratinRadio" />} label={<span className="intigratinCheckboxlabel" >IP Based Devices</span>} />
                                <FormControlLabel style={{ paddingTop: "9%" }} value="IDBasedDevices" control={<Radio className="intigratinRadio" />} label={<span className="intigratinCheckboxlabel" >ID based Devices</span>} />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Card>
            </Grid>
        </>
    )
}