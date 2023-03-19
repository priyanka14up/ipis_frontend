import { Button, Card, Grid, TextField, Typography } from "@material-ui/core"
import { DisplayBoardSetting } from "."
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import { useEffect, useState } from "react";
import DisplayBoardSettingModel from "../../../model/setup/displayBoardSettingModel"
import SetupService from "../../service/setup/setup";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { authuserStateSelector } from "../../../redux/reducers/authUser/authUser";



export const DisplayBoard = (props: any) => {

    const setup = new SetupService();
    const { appUser } = useSelector(authuserStateSelector)
    const [error1, setError1] = useState("");
    const [boardDataArray, setBoardDataArray] = useState<any>([]);
    const [displayBoardSetting, setDisplayBoardSetting] = useState<DisplayBoardSettingModel | any>({
        boardType: "",
        displayTime: 0,
        effect: "",
        speed: "",
        letterSize: "",
        characterGap: 0,
        pageChangeTime: 0,
        createdBy: ""
    })

    const handleChange = (e: any) => {
        console.log("display board")
        var { name, value } = e.target;
        if(name=="boardType"){
            let selectedData=boardDataArray.find((res:any) => res.boardType == value);
            if(selectedData){
                setDisplayBoardSetting({
                    boardType: selectedData.boardType,
                    displayTime: selectedData.displayTime,
                    effect: selectedData.effect,
                    speed: selectedData.speed,
                    letterSize: selectedData.letterSize,
                    characterGap: selectedData.characterGap,
                    pageChangeTime: selectedData.pageChangeTime,
                    createdBy: selectedData.createdBy}
                    );
            }
            else{
                setDisplayBoardSetting({
                    boardType: value,
                    displayTime: 0,
                    effect: "",
                    speed: "",
                    letterSize: "",
                    characterGap: 0,
                    pageChangeTime: 0,
                    createdBy: ""}
                );                
                console.log(displayBoardSetting,"opop");
            }
        }
        else if(name=="pageChangeTime" || name=="displayTime"){
            if((value.match(/^[0-9\b]+$/) )|| value==""){
                if(value.length<4){
                    setDisplayBoardSetting({...displayBoardSetting, [name]: value })
                }
            }
            // else{
            //     setDisplayBoardSetting({ [name]: 0 })
            // }
        }
        else{
            setDisplayBoardSetting({ ...displayBoardSetting, [name]: value })
        }
    }

    const handleSubmit = () => {
        let DisplayBoard: any = {
            boardType: displayBoardSetting.boardType,
            displayTime: displayBoardSetting.displayTime,
            effect: displayBoardSetting.effect,
            speed: displayBoardSetting.speed,
            letterSize: displayBoardSetting.letterSize,
            characterGap: displayBoardSetting.characterGap,
            pageChangeTime: displayBoardSetting.pageChangeTime,
        };
        setup.createDisplayBoardSetting(DisplayBoard).then((response) => {
            if (response && response.status === 200) {
                setError1("")
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Setting updated successfully`,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    timer: 3000,
                })

            }

            else if (response && response.errorMsg !== "") {
                setError1(response)
                console.log(setError1);
            }

        });
        console.log(DisplayBoard);
    }

    const handleCancel = () => {
        setDisplayBoardSetting({
            boardType: "",
            displayTime: 0,
            effect: "",
            speed: "",
            letterSize: "",
            characterGap: 0,
            pageChangeTime: 0,
            createdBy: ""
        })
        setError1("")
    }

    useEffect(() => {
        setup.getDisplayBoardSetting().then(resp => {
            if (resp && resp.data && resp.data[0]) {
                setBoardDataArray(resp.data)
                console.log(resp.data[0])
            }
        })
    }, []);

    return (
        <>
            <Grid style={{ height: '100%', width: "100%" }}>

                <Card style={{ border: "1px solid #DDDDDD", padding: '20px', height: '100%', borderRadius: "10px" }} className="overlapBackground">
                    {appUser.userRole == "ROLE_STATION MASTER" ? <Grid className="stationForm formFields">

                    </Grid> : <></>
                    }
                    <Grid container className="mb-30"><Typography className="fs-16"><b>Display Board Settings</b></Typography></Grid>
                    <Grid container style={{ marginBottom: "30px" }}>
                        <Grid item xs={5} md={12} lg={12} xl={6} className="label-alignn">
                            <Typography className="DBtext">
                                Board Type
                            </Typography>
                        </Grid>
                        <Grid item xs={7} md={12} lg={12} xl={6} style={{ paddingLeft: '5px' }}>
                            <select
                                value={displayBoardSetting.boardType}
                                className="DBselectBox"
                                name="boardType"
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                <option value="cgdb">CGDB</option>
                                <option value="mldb">MLDB</option>
                                <option value="agdb">AGDB</option>
                                <option value="ivd">IVD</option>
                                <option value="ovd">OVD</option>
                                <option value="tv">TV</option>
                                <option value="pfdb">PFDB</option>
                            </select>
                        </Grid>
                    </Grid>
                    <Grid container style={{ marginBottom: "30px" }}>
                        <Grid item xs={5} md={12} lg={12} xl={6} className="label-alignn">
                            <Typography className="DBtext">
                                Display Time Out(Min)<span className="asterisk">*</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={7} md={12} lg={12} xl={6} style={{ paddingLeft: '5px' }} >
                            <TextField
                                // type="number"
                                size="small"
                                value={displayBoardSetting.displayTime}
                                name="displayTime"
                                variant="outlined"
                                className="DBselectBox2 DBTextfield-border"
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>

                    <Grid container style={{ marginBottom: "30px" }}>
                        <Grid item xs={5} md={12} lg={12} xl={6} className="pr-10 label-alignn">
                            <Typography className="DBtext">
                                Effect
                            </Typography>

                        </Grid>
                        <Grid item xs={7} md={12} lg={12} xl={6} style={{ paddingLeft: '5px' }}>
                            <select
                                className="DBselectBox"
                                name="effect"
                                onChange={handleChange}
                                value={displayBoardSetting.effect}

                            >
                                <option value="">Select</option>
                                <option value="Reserved">Reserved</option>
                                <option value="Curtain Left to Right">Curtain Left to Right</option>
                                <option value="Curtain Top to Bottom">Curtain Top to Bottom</option>
                                <option value="Curtain Bottom to Top">Curtain Bottom to Top</option>
                                <option value="Typing Left to Right">Typing Left to Right</option>
                                <option value="Running Right to Left">Running Right to Left</option>
                                <option value="Running Top to Bottom">Running Top to Bottom</option>
                                <option value="Running Bottom to Top">Running Bottom to Top</option>
                                <option value="Flashing">Flashing</option>
                                <option value="Stable">Stable</option>
                            </select>
                        </Grid>
                    </Grid>
                    <Grid container style={{ marginBottom: "30px" }}>
                        <Grid item xs={5} md={12} lg={12} xl={6} className="pr-10 label-alignn">
                            <Typography className="DBtext">Speed</Typography>
                        </Grid>
                        <Grid item xs={7} md={12} lg={12} xl={6} style={{ paddingLeft: '5px' }}>
                            <select
                                className="DBselectBox"
                                name="speed"
                                value={displayBoardSetting.speed}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                <option value="Lowest">Lowest</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                                <option value="Highest">Highest</option>
                            </select>
                        </Grid>
                    </Grid>
                    <Grid container style={{ marginBottom: "30px" }}>
                        <Grid item xs={5} md={12} lg={12} xl={6} className="pr-10 label-alignn">
                            <Typography className="DBtext">
                                Letter Size
                            </Typography>
                        </Grid>
                        <Grid item xs={7} md={12} lg={12} xl={6} style={{ paddingLeft: '5px' }}>
                            <select
                                className="DBselectBox"
                                name="letterSize"
                                onChange={handleChange}
                                value={displayBoardSetting.letterSize}
                            >
                                <option value="">Select</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="10">10</option>
                                <option value="12">12</option>
                                <option value="14">14</option>
                                <option value="16">16</option>
                            </select>
                        </Grid>
                    </Grid>
                    <Grid container style={{ marginBottom: "30px" }}>
                        <Grid item xs={5} md={12} lg={12} xl={6} className="pr-10 label-alignn">
                            <Typography className="DBtext">
                                Character Gap
                            </Typography>
                        </Grid>
                        <Grid item xs={7} md={12} lg={12} xl={6} style={{ paddingLeft: '5px' }}>
                            <select
                                className="DBselectBox"
                                name="characterGap"
                                onChange={handleChange}
                                value={displayBoardSetting.characterGap}

                            >
                                <option value="">Select</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select>
                        </Grid>
                    </Grid>
                    <Grid container className="mb-60">
                        <Grid item xs={5} md={12} lg={12} xl={6} className="label-alignn">
                            <Typography className="DBtext">
                                Page Change Time(Sec)<span className="asterisk">*</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={7} md={12} lg={12} xl={6} style={{ paddingLeft: '5px' }} >
                            <TextField
                                size="small"
                                value={displayBoardSetting.pageChangeTime}
                                name="pageChangeTime"
                                variant="outlined"
                                className="DBselectBox2 DBTextfield-border"
                                onChange={handleChange}

                            />
                        </Grid>
                    </Grid>
                    {error1 != "" ? <div style={{ color: "red", textAlign: "center", display: "flex", justifyContent: "center" }}> {error1}</div> : <></>}
                    {appUser.userRole == "ROLE_STATION MASTER" ? <></> :
                        <Grid container style={{ justifyContent: 'space-between', marginTop: '10px' }}>
                            <Grid item xs={4} md={12} lg={6} >
                                <Button
                                    type="submit"
                                    className="DBSave"
                                    variant="contained"
                                    onClick={handleSubmit}
                                >
                                    <DoneIcon className="icon" />
                                    <span className="bttnfont btn-font">Save</span>
                                </Button>
                            </Grid>
                            <Grid item xs={5} md={12} lg={6} className="cnacelGrid">
                                <Button
                                    type="reset"
                                    value="Reset"
                                    variant="outlined"
                                    className="DBCancle"
                                    onClick={handleCancel}

                                >
                                    <CloseIcon className="icon" />
                                    <span className="bttnfont btn-font">Cancel</span>
                                </Button>
                            </Grid>

                        </Grid>
                    }
                </Card>

            </Grid>
        </>
    )
}