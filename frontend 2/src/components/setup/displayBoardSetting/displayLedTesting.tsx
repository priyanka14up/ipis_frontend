import { Button, Card, Checkbox, FormControlLabel, Grid, Input, TextField, Typography } from "@material-ui/core"
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import DisplayLedTestingModel from "../../../model/setup/displayLedTestingModel";
import SetupService from "../../service/setup/setup";
import { useSelector } from "react-redux";
import { authuserStateSelector } from "../../../redux/reducers/authUser/authUser";
import refresh from "../../../assets/images/sync.svg";

export const DisplayLedTesting = (props: any) => {
    const setup = new SetupService();
    const { appUser } = useSelector(authuserStateSelector)
    const [platformNumbers, setPlatformNumbers] = useState<[]>([]);
    const [deviceIdArray, setDeviceIdArray] = useState<any>([]);
    const [error, setError] = useState("")
    const [deviceIdError, setDeviceIdError] = useState("")
    const [platformNoError, setPlatformNoError] = useState("")
    const [disabled, setDisabled] = useState(true)
    const [displayLedTesting, setDisplayLedTesting] = useState<DisplayLedTestingModel | any>({
        boardType: "",
        deviceId: "",
        testPattern: "",
        platformNo: "",
        installationTest: true,
        ledAutoTest: true,
        time: 0,
        createdBy: 0
    })
    var flag = false;
    const range = (start: any, end: any) => {
        let len = end - start + 1;
        let idArray = [];
        for (let i = 0; i < len; i++) {
            idArray.push(start + i);
        }
        return (idArray);
    }


    const handleChange = (e: any) => {
        var { name, value } = e.target;
        if (name == "boardType") {
            if (value == "mldb" && value != "") {
                setDeviceIdArray(range(101, 130));
            }
            else if (value == "agdb") {
                setDeviceIdArray(range(131, 160));
            }
            else if (value == "ivd") {
                setDeviceIdArray(range(71, 100));
            }
            else if (value == "ovd") {
                setDeviceIdArray(range(40, 70));
            }
            else if (value == "tv") {
                setDeviceIdArray(range(191, 220));
            }
            else if (value == "pfdb") {
                setDeviceIdArray(range(161, 190));
            }
            else if(value == ""){
                setDisabled(true)
            }
        }
        setDisplayLedTesting({ ...displayLedTesting, [name]: value })
        setPlatformNoError("")
        setDeviceIdError("")
    }
    console.log(displayLedTesting,"9009")
    const handleSubmit = () => {
        let DisplayLed: any = {
            boardType: displayLedTesting.boardType,
            deviceId: displayLedTesting.deviceId,
            testPattern: displayLedTesting.testPattern,
            platformNo: displayLedTesting.platformNo,
            installationTest: displayLedTesting.installationTest,
            ledAutoTest: displayLedTesting.ledAutoTest,
            time: displayLedTesting.time,
        };
        setup.createDisplayLedTesting(DisplayLed).then((response: any) => {
            if (response && response.status === 200) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Testing Started Successfully`,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    timer: 3000,
                });
            }
        });
    }

    // useEffect(() => {
    //     if (displayLedTesting.platformNo != "" && displayLedTesting.platformNo == undefined) {
    //         setup.getDisplayLedTesting(displayLedTesting).then(resp => {
    //             if (resp && resp.data && resp.data[0]) {
    //                 setDisplayLedTesting(resp.data[0])
    //                 if (resp.data[0].boardType == "mldb") {
    //                     setDeviceIdArray(range(101, 130));
    //                 }
    //                 else if (resp.data[0].boardType == "agdb") {
    //                     setDeviceIdArray(range(131, 160));
    //                 }
    //                 else if (resp.data[0].boardType == "ivd") {
    //                     setDeviceIdArray(range(71, 100));
    //                 }
    //                 else if (resp.data[0].boardType == "ovd") {
    //                     setDeviceIdArray(range(40, 70));
    //                 }
    //                 else if (resp.data[0].boardType == "tv") {
    //                     setDeviceIdArray(range(191, 220));
    //                 }
    //                 else if (resp.data[0].boardType == "pfdb") {
    //                     setDeviceIdArray(range(161, 190));
    //                 }
    //             }

    //         })
    //     }
    // }, [displayLedTesting.platformNo])


    useEffect(() => {
        console.log(displayLedTesting);
        if (displayLedTesting.platformNo != "" && displayLedTesting.platformNo != undefined) {
            setup.getDeviceId(displayLedTesting.boardType, displayLedTesting.platformNo).then((resp: any) => {
                if (resp && resp?.status === 200) {
                    setDeviceIdArray(resp?.data);
                    setDisabled(false)
                    // setMessage({...message,["deviceId"]: resp?.data})
                }
                else if (resp && resp?.errorMsg && resp?.status != 200) {
                    setDeviceIdError(resp?.errorMsg)
                    setDisabled(true)
                }
            })
        }
    }, [displayLedTesting.platformNo])

    const getPlatformNumbers = () => {
        setDisplayLedTesting({...displayLedTesting,["platformNo"]:""})
        setup.getPlatformNo(displayLedTesting.boardType).then((response) => {
            if (response && response.status === 200) {
                setPlatformNumbers(response.data);
                setDisabled(false)
            }
            else if (response && response.status != 200) {
                setPlatformNoError(response?.errorMsg)
                setDisabled(true)
            }
        })
    }

    useEffect(() => {
        getPlatformNumbers();
    }, [displayLedTesting.boardType]);

    const handleSoftReset = () => {
        const softReset: any = {
            "boardType": displayLedTesting.boardType
        }
        setup.postSoftReset(softReset).then((response: any) => {
            if (response?.status == 200) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: 'Soft Reset Successfully',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    timer: 3000,
                })
            }
            else if (response?.status == 404) {
                setError(response?.errorMsg)
            }
        })
    }
    return (
        <>
            <Grid style={{ width: "100%" }}>
                <Card style={{ padding: "20px", borderRadius: "10px" }} className={appUser.userRole == "ROLE_STATION MASTER" ? "overlapBackground  displayBoard" : " displayBoard"}>
                    {appUser.userRole == "ROLE_STATION MASTER" ? <Grid className="stationForm formFields">

                    </Grid> : <></>
                    }
                    <Grid container className="mb-30">
                        <Typography ><b>Display Board LED Testing</b></Typography>
                    </Grid>
                    <Grid container style={{ marginTop: '10px' }} className="mb-30">
                        <Grid item xs={4}>
                            <Grid container>
                                <Grid item xs={6} className="boardTypeBoxLabel pr-10">
                                    Board Type
                                </Grid>
                                <Grid item xs={6}>
                                    <select
                                        value={displayLedTesting.boardType}
                                        className="boardTypeBox ht-40"
                                        required={true}
                                        name="boardType"
                                        onChange={handleChange}
                                    >
                                        <option value="">Select</option>
                                        {/* <option value="all">All</option> */}
                                        <option value="mldb">MLDB</option>
                                        <option value="agdb">AGDB</option>
                                        <option value="ivd">IVD</option>
                                        <option value="ovd">OVD</option>
                                        <option value="pfdb">PFDB</option>
                                        <option value="cgdb">CGDB</option>
                                        <option value="pdc">PDC</option>
                                    </select>
                                </Grid>

                            </Grid>
                        </Grid>
                        <Grid item xs={4}>
                            <Grid container>
                                <Grid item xs={6} className="boardTypeBoxLabel pr-10" >
                                    Platform No.
                                </Grid>
                                <Grid item xs={6}>
                                    <select
                                        disabled={disabled}
                                        name="platformNo"
                                        className="boardTypeBox ht-40"
                                        required={true}
                                        onChange={handleChange}
                                        value={displayLedTesting.platformNo}>
                                        <option value="" selected>
                                            Select
                                        </option>
                                        {/* <option value="all" selected>
                                            All
                                        </option> */}
                                        {platformNumbers.map((platformNo: any, i: any) => {
                                            return (
                                                <option value={platformNumbers[i]}>{platformNumbers[i]}</option>
                                            )
                                        })}


                                    </select>
                                    <div className="redColor">{platformNoError}</div>
                                </Grid>


                            </Grid>

                        </Grid>
                        <Grid item xs={4}>
                            <Grid container>
                                <Grid item xs={6} className="boardTypeBoxLabel pr-10" >
                                    Device ID
                                </Grid>
                                <Grid item xs={6}>
                                    {/* {displayLedTesting.boardType == "" || displayLedTesting.boardType == "all" ? */}
                                    {/* <select
                                        disabled={true}
                                        name="deviceId"
                                        className="boardTypeBox ht-40">
                                        <option value="" selected>
                                            Select
                                        </option>
                                    </select> */}
                                    {/* :  */}
                                    <select
                                        disabled={!displayLedTesting.platformNo}
                                        name="deviceId"
                                        className="boardTypeBox"
                                        required={true}
                                        onChange={handleChange}
                                        value={displayLedTesting.deviceId}>
                                        <option value="" selected>
                                            Select
                                        </option>
                                        {deviceIdArray.map((deviceId: any, i: any) => {
                                            return (
                                                <option value={deviceId}>{deviceId}</option>
                                            )
                                        })}
                                    </select>
                                    {/* } */}
                                    <div className="redColor">{deviceIdError}</div>
                                </Grid>

                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid container style={{ marginTop: '10px' }} className="mb-30">
                        <Grid item xs={8}>
                            <Grid container>
                                <Grid item xs={3} style={{ alignSelf: 'center' }} className="pr-10">
                                    <Typography className="testPattern labelAlign"> Test Pattern</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <TextField
                                        // size="small"
                                        name="testPattern"
                                        value={displayLedTesting.testPattern}
                                        className="testPatternBox textBox-height tpTextbox"
                                        variant="outlined"
                                        onChange={handleChange}
                                        required={true}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={4}>
                            <Grid container >
                                <Grid item xs={6} md={7} lg={6} style={{ alignSelf: 'center' }} className="pr-10">
                                    <Typography className="seconds">  Time(In Seconds)</Typography>
                                </Grid>
                                <Grid item xs={6} md={5} lg={6}>
                                    <TextField
                                        // size="small"
                                        name="time"
                                        value={displayLedTesting.time}
                                        className="secondsBox textBox-height"
                                        variant="outlined"
                                        onChange={handleChange}
                                        required={true}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container style={{ marginTop: '10px' }}>
                        <Grid item xs={8}>
                            <Grid container>
                                <Grid item xs={3}></Grid>
                                <Grid item xs={9}>
                                    <Grid container>
                                        <Grid item xs={4} lg={5} xl={4} style={{ display: "flex", justifyContent: "flex-start" }}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox onClick={handleChange}
                                                        value={true}
                                                        size="small"
                                                        name="Installation Test"
                                                        style={{ color: "#033733" }}
                                                        className="onlineChckBoxs"
                                                    />
                                                }
                                                label={<span className="intigratinCheckboxlabel">Installation Test</span>}
                                            />
                                        </Grid>
                                        <Grid item xs={6} style={{ display: "flex", justifyContent: "flex-start" }}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        onClick={handleChange}
                                                        value={true}
                                                        name="LED Auto Test"
                                                        size="small"
                                                        style={{ color: "#033733" }}
                                                        className="onlineChckBoxs"
                                                    />
                                                }
                                                label={<span className="intigratinCheckboxlabel">LED Auto Test</span>}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    {appUser.userRole == "ROLE_STATION MASTER" ? <></> :
                        <>
                            <Grid container style={{ display: 'flex', justifyContent: 'end' }}>
                                <Grid item xs={7} md={6} lg={6} style={{ marginTop: "1%" }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={8} md={4} lg={4}>
                                            <Button
                                                type="reset"
                                                className="softReset ht-30"
                                                variant="contained"
                                                onClick={handleSoftReset}

                                            >
                                                <img src={refresh} className="pr-8" />
                                                <span className="bttnfont btn-font">Soft Reset</span>
                                            </Button>
                                        </Grid>
                                        <Grid item xs={2} md={4} lg={4}>
                                            <Button
                                                type="submit"
                                                className="DBStart ht-30"
                                                variant="contained"
                                                onClick={handleSubmit}

                                            >
                                                <PlayArrowIcon className="icon" />
                                                <span className="bttnfont btn-font">Start</span>
                                            </Button>
                                        </Grid>
                                        <Grid item xs={2} md={4} lg={4}>
                                            <Button
                                                type="reset"
                                                value="Reset"
                                                variant="outlined"
                                                className="DBStop ht-30"
                                            >
                                                <StopIcon className="icon" />
                                                <span className="bttnfont btn-font">Stop</span>
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </>

                        // <Grid container>
                        //     <Grid item xs={7}>
                        //     </Grid>
                        //     <Grid item xs={5}>
                        //         <Grid container
                        //             style={{
                        //                 justifyContent: "space-evenly", paddingTop: "3.21%",
                        //                 paddingBottom: "31px"
                        //             }}>
                        //             <Button
                        //                 type="submit"
                        //                 className="DBStart"
                        //                 variant="contained"
                        //                 onClick={handleSubmit}

                        //             >
                        //                 <PlayArrowIcon className="icon" />
                        //                 <span className="bttnfont">Start</span>
                        //             </Button>

                        //             <Button
                        //                 type="reset"
                        //                 value="Reset"
                        //                 variant="outlined"
                        //                 className="DBStop"
                        //             >
                        //                 <StopIcon className="icon" />
                        //                 <span className="bttnfont">Stop</span>
                        //             </Button>
                        //         </Grid>

                        //     </Grid>
                        // </Grid>
                    }
                </Card></Grid>
        </>
    )
}