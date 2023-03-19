import { Button, Card, CardContent, Grid, Typography } from "@material-ui/core";
import { AppHeader } from "../common/app-header";
import Machine from "../../assets/images/machine.svg";
import Human from "../../assets/images/human.svg";
import { CentralDataSwitch } from "./common/cds";
import { SelectEthernetDevice } from "./common/sed";
import { ConfigurationSetting } from "./common/configuration";
import { useSelector } from "react-redux";
import { interfaceStateSelector } from "../../redux/reducers/interface/interface";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { authuserStateSelector } from "../../redux/reducers/authUser/authUser";
import SetupService from "../service/setup/setup";
export const Interface = () => {
    const setup = new SetupService();
    const { currentSelectedCdsPortName, currentSelectedCdsEthernetDevice, currentSelectedCdsPortNumber } = useSelector(interfaceStateSelector);
    const { appUser } = useSelector(authuserStateSelector)
    const [showInterface, setShowInterface] = useState<boolean>(false);
    const [checkMaster, setCheckMaster] = useState<boolean>(false);
    const [selectedPortId,setSelectedPortId] = useState<any>()

    let history = useHistory();

    const [platformNumbers, setPlatformNumbers] = useState<[]>([]);

    useEffect(() => {
        setup.getPlatformNumbers().then((data) => {
            if (data?.status === 200) {
                setPlatformNumbers(data?.data);
            }
        });
    },[]);
    useEffect(() => {
        if (appUser.userRole == "ROLE_OPERATOR") {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Operation not allowed please contact admin",
                showConfirmButton: false,
                allowOutsideClick: false,
                timer: 3000
            }).then(() => {
                history.push("/help")
            })
        }
    }, [appUser.userRole])

    useEffect(() => {
        setup.getStationDetails().then((response) => {
            if (response && response.status === 200) {
                if (response && response.data) {
                    if (response.data.length != 0) {
                        setShowInterface(true)
                    }
                    else {
                        setShowInterface(false)
                        Swal.fire({
                            position: "center",
                            icon: "warning",
                            title: "Please Enter Station Details",
                            showConfirmButton: false,
                            allowOutsideClick: false,
                            timer: 3000
                        }).then(() => {
                            history.push("/setup");
                        })
                    }
                }
            }
        })
    }, [])


    return (
        <>
            {appUser.userRole == "ROLE_OPERATOR" ? <></> :
            showInterface?
            <>
                <Grid container style={{ padding: "10px 20px", background: "rgb(229, 229, 229)" }} >
                    <CentralDataSwitch selectedPortId={selectedPortId}   setSelectedPortId={setSelectedPortId}/>
                </Grid>
                <Grid container style={{padding:"0px 20px"}}>
                    <Grid item sm={12} md={4} lg={3} xl={2} style={{height:"100%", paddingRight:"20px"}}>
                        {(currentSelectedCdsPortName === '') ? (
                            <Card className="humanCard">
                                <CardContent className="p-0">
                                    <Typography className="portHedstyle">
                                        <b>Select Ethernet Device</b>
                                    </Typography>
                                    <Typography className="portSubHedstyle">
                                        To view all the available devices, select a CDS port from<br />the above menu
                                    </Typography>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <img src={Human} className="humanImg" />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>) : (
                            <SelectEthernetDevice checkMaster={checkMaster}/>
                        )}
                    </Grid>
                    <Grid item sm={12} md={8} lg={9} xl={10} className="guresha">
                        {(currentSelectedCdsEthernetDevice == "" || currentSelectedCdsEthernetDevice == undefined || currentSelectedCdsEthernetDevice == "CDS") ?
                            (<Card className="machineCard interface-card">
                                <CardContent className="p-0">
                                    <Typography className="portHedstyle">
                                       <b>Configuration Settings</b>
                                    </Typography>
                                    <Typography className="portSubHedstyle">
                                        To view all the available configuration settings, select an <br />ethernet device from the side menu.
                                    </Typography>
                                    <Grid item xs={12} className="machineBox">
                                        <img src={Machine} className="machineHome" />
                                    </Grid>
                                </CardContent>
                            </Card>) : (
                                <ConfigurationSetting platformNumbers={platformNumbers} selectedPortId={selectedPortId} checkMaster={checkMaster} setCheckMaster={setCheckMaster}/>)}
                    </Grid>
                    </Grid>
                    </>:null
            }
        </>
    )
}
