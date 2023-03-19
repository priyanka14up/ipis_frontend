import {
    Button,
    Card,
    Checkbox,
    FormControl,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@material-ui/core";
import { useState } from "react";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import "./style.css";
import frwdArrowIcon from "../../../../../../../../src/assets/images/frwdArrowIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { agdbPost, IvdOvdTvPost, updateDeviceName } from "../../../../../../../redux/actions/interface/interface";
import { interfaceStateSelector } from "../../../../../../../redux/reducers/interface/interface";
import { IVD } from "./ivd";
import { OVD } from "./ovd";
import { TV } from "./tv";
import { useEffect } from "react";

enum EthernetDevice {
    IVD = "ivd",
    OVD = "ovd",
    TV = "tvDisplay",

}


export const IVD_OVD_TV = (props: any) => {
    const { platformNumbers } = props;
    const dispatch = useDispatch();
    const { currentSelectedCdsEthernetDevice, currentSelectedCdsPortNumber } = useSelector(interfaceStateSelector)

    const [currentDisplayDeviceName, setCurrentDisplayDevice] = useState("ivd")

    const handleRadioButtons = (e: any) => {
        setCurrentDisplayDevice(e)
    }

    const handleContinue = () => {
        const data: any = {
            deviceName: currentDisplayDeviceName
        };
        dispatch(updateDeviceName(data))
    }

    useEffect(() => {
        if (currentSelectedCdsEthernetDevice != "") {
            setCurrentDisplayDevice(currentSelectedCdsEthernetDevice)
        }
    }, [currentSelectedCdsEthernetDevice])

    return (
        <>
            {/* <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={3} style={{ paddingRight: "8px" }}>
                        <Card className="indexCard" style={{ padding: "9.28% 12.38%" }}>
                            
                            <Typography className="sddHed">
                                <b>Select Display Device</b>
                            </Typography>
                            <Grid>

                                <FormControl component="fieldset" style={{ paddingLeft: "1.5px" }}>
                                    <RadioGroup name="radio-buttons-group" 
                                        value={currentDisplayDeviceName} 
                                        onChange={(event) => handleRadioButtons(event.target.value)} >
                                        <FormControlLabel value="ivd" className="sddSubMenu" control={<Radio />} label="IVD Display"
                                        />
                                        <FormControlLabel value="ovd" className="sddSubMenu" control={<Radio />} label="OVD Display"
                                        />
                                        <FormControlLabel value="tvDisplay" className="sddSubMenu" control={<Radio />} label="TV Display"
                                        />
                                    </RadioGroup>
                                </FormControl>
                                <Grid style={{ textAlign: "center", paddingTop: "11.35%" }}>
                                <Button variant="contained" size="large" color="primary" className="btn_continue"
                                    onClick={handleContinue}
                                >
                                    Continue <img src={frwdArrowIcon} />
                                </Button>
                            </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item xs={9} style={{ paddingLeft: "8px", width: "100%" }}>
                        {currentSelectedCdsEthernetDevice == EthernetDevice.IVD ? (<IVD platformNumbers={platformNumbers}/>):(<></>)}
                        {currentSelectedCdsEthernetDevice == EthernetDevice.OVD ? (<OVD platformNumbers={platformNumbers} />):(<></>)}
                        {currentSelectedCdsEthernetDevice == EthernetDevice.TV ? (<TV platformNumbers={platformNumbers} />):(<></>)}
                        
                    </Grid>
                </Grid>
            </Grid> */}



            <Grid item xs={12} style={{ height : "100%" }}>
                <Grid container style={{ height : "100%" }}>
                    <Grid item xs={3} style={{height : "100%"}}>
                        <Card style={{padding: "30px" , height : "100%", borderRadius : "10px"}}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography className="sddHed">
                                        <b>Select Display Device</b>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl component="fieldset" style={{ paddingLeft: "1.5px" }}>
                                        <RadioGroup name="radio-buttons-group"
                                            value={currentDisplayDeviceName}
                                            onChange={(event) => handleRadioButtons(event.target.value)} >
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <FormControlLabel value="ivd" className="sddSubMenu" control={<Radio />} label="IVD Display"
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormControlLabel value="ovd" className="sddSubMenu" control={<Radio />} label="OVD Display"
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormControlLabel value="tvDisplay" className="sddSubMenu" control={<Radio />} label="TV Display"
                                                    />
                                                </Grid>
                                            </Grid>
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} style={{ textAlign: "center", paddingTop: "23.35%"}}>
                                    <Button variant="contained" size="large" color="primary" className="btn_continue"
                                        onClick={handleContinue}
                                    >
                                        Continue <img src={frwdArrowIcon} />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item xs={9} style={{ paddingLeft: "8px", width: "100%" }}>
                        {currentSelectedCdsEthernetDevice == EthernetDevice.IVD ? (<IVD platformNumbers={platformNumbers} />) : (<></>)}
                        {currentSelectedCdsEthernetDevice == EthernetDevice.OVD ? (<OVD platformNumbers={platformNumbers} />) : (<></>)}
                        {currentSelectedCdsEthernetDevice == EthernetDevice.TV ? (<TV platformNumbers={platformNumbers} />) : (<></>)}

                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};
