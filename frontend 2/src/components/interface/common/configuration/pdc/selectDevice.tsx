import { Button, Card, CardContent, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@material-ui/core"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PdcAttatchedDevices } from ".";
import frwdArrowIcon from "../../../../../assets/images/frwdArrowIcon.svg";
import { updatePdcChildDeviceName } from "../../../../../redux/actions/interface/interface";
import { interfaceStateSelector } from "../../../../../redux/reducers/interface/interface";

export const SelectDevice = (props: any) => {
    const dispatch = useDispatch();
    const { currentSelectedPdcEthernetDevice } = useSelector(interfaceStateSelector);
    const [ethernetDevice, setEthernetDevice] = useState("");

    const handleContinue = () => {
        if (ethernetDevice != "") {
            let data: any = {
                deviceName: ethernetDevice
            };
            dispatch(updatePdcChildDeviceName(data))
        }
    }

    useEffect(() => {
        if (currentSelectedPdcEthernetDevice !== "") {
            console.log(currentSelectedPdcEthernetDevice)
            setEthernetDevice(currentSelectedPdcEthernetDevice)
        }
    }, [currentSelectedPdcEthernetDevice])

    return (
        <>

            <Card style={{ border: "1px solid #DDDDDD", height:'100%' }} >
                <CardContent style={{ padding: "30px" }}>
                    <Grid container>
                        <Typography style={{ fontSize: "14px", fontWeight: 500, fontFamily: "roboto", lineHeight: "16px", fontStyle: "normal", color: "#222222" }}>
                            Select Zigbee device over PDC
                        </Typography>
                    </Grid>
                    <Grid container >
                        <FormControl component="fieldset" >
                            <RadioGroup
                                name="radio-buttons-group"
                                onChange={event => setEthernetDevice(event.target.value)}
                            >
                                <Grid item xs={12}>
                                    <FormControlLabel value="cgdb" control={<Radio checked={ethernetDevice === 'cgdb'} />}
                                        style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                        className="radioButtons f-14" label="Coach Guidance Display Board"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel value="pfdb" control={<Radio checked={ethernetDevice === 'pfdb'} />}
                                        style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                        className="radioButtons f-14" label="Platform Display Board"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel value="mldb" control={<Radio checked={ethernetDevice === 'mldb'} />}
                                        style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                        className="radioButtons f-14" label="Multiline Display Board"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel value="ivd" control={<Radio checked={ethernetDevice === 'ivd'} />}
                                        style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                        className="radioButtons f-14" label="IVD"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel value="tvDisplay" control={<Radio checked={ethernetDevice === 'tvDisplay'} />}
                                        style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                        className="radioButtons f-14" label="TV"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel value="agdb" control={<Radio checked={ethernetDevice === 'agdb'} />}
                                        style={{ color: "black", fontSize: "10px", fontFamily: "Roboto" }}
                                        className="radioButtons f-14" label="At a Glance Display Board" />
                                </Grid>
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid container style={{ textAlign: "center", marginTop: "10%" }}>
                        <Grid item xs={5} md={12} lg={7} xl={5}><Button variant="contained" size="large" color="primary" className="btn_continue"
                            onClick={handleContinue}
                        >
                            Continue <img src={frwdArrowIcon} />
                        </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

        </>
    )
}
