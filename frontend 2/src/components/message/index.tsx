import "./style.css";
import { useEffect, useRef, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import MessageModel from "../../model/message/messageModel";
import MessageServices from "../service/message/messageServices";
import { Button, Card, Checkbox, CircularProgress, createStyles, FormControl, FormControlLabel, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Theme, Typography, withStyles } from "@material-ui/core"
import EditIcon from "@material-ui/icons/Edit";
import KeyboardIcon from '@material-ui/icons/Keyboard';
import Swal from "sweetalert2";
import Keyboard from "react-simple-keyboard";
import hindi from "simple-keyboard-layouts/build/layouts/hindi";
import punjabi from "../common/languages/punjabi";
import tamil from "../common/languages/tamil";
import oriya from "../common/languages/oriya";
import telugu from "../common/languages/telugu";
import gujarati from "../common/languages/gujarati";
import bengali from "simple-keyboard-layouts/build/layouts/bengali";
import urdu from "simple-keyboard-layouts/build/layouts/urdu";
import marathi from "../common/languages/marathi";
import kannada from "simple-keyboard-layouts/build/layouts/kannada";
import Malayalam from "simple-keyboard-layouts/build/layouts/malayalam";


const messagesvc = new MessageServices();
const buttonText = "Add Message";
const updateText = "update Message"
var flag = false

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }),
)(TableRow);

export const Message = (props: any) => {
    const { regionalLanguage } = props;
    const [msgError, setMsgError] = useState("")
    const [deviceIdError, setDeviceIdError] = useState("")
    const [platformNoError, setPlatformNoError] = useState("")
    const [loading, setLoading] = useState<any>(false);
    const [message, setMessage] = useState<MessageModel | any>({
        id: 0,
        displayBoard: "",
        messageEnglish: "",
        messageHindi: "",
        messageRegional: "",
        platformNo: "",
        deviceId: "",
        speed: "",
        messageEffect: "",
        displayStatus: false,
        letterSize: 0,
        characterGap: 0,
        pageChangeTime: 0,
    })

    const [platformNoArray, setplatformNoArray] = useState([]);
    const [array, setArray] = useState<[]>([]);
    const [error, setError] = useState("");
    const [disabled, setDisabled] = useState(true)
    const [deviceIdArray, setDeviceIdArray] = useState<any>([]);

    const [layout, setLayout] = useState("default");
    const [keyboardVisibility, setKeyboardVisibility] = useState(false);
    const [regionalKeyboardVisibility, setRegionalKeyboardVisibility] = useState(false);
    const [keyboardRegionalLanguage, setKeyboardRegionalLanguage] = useState<any>(null);
    const keyboardRef: any = useRef(null);

    useEffect(() => {
        if (regionalLanguage == "Bengali") {
            setKeyboardRegionalLanguage(bengali)
        }
        else if (regionalLanguage == "Urdu") {
            setKeyboardRegionalLanguage(urdu)
        }
        else if (regionalLanguage == "Punjabi") {
            setKeyboardRegionalLanguage(punjabi)
        }
        else if (regionalLanguage == "Tamil") {
            setKeyboardRegionalLanguage(tamil)
        }
        else if (regionalLanguage == "Oriya") {
            setKeyboardRegionalLanguage(oriya)
        }
        else if (regionalLanguage == "Gujarati") {
            setKeyboardRegionalLanguage(gujarati)
        }
        else if (regionalLanguage == "Telugu") {
            setKeyboardRegionalLanguage(telugu)
        } else if (regionalLanguage == "Kannada") {
            setKeyboardRegionalLanguage(kannada)
        }
        else if (regionalLanguage == "Marathi") {
            setKeyboardRegionalLanguage(marathi)
        }
        else if (regionalLanguage == "Malayalam") {
            setKeyboardRegionalLanguage(Malayalam)
        }

    })


    useEffect(() => {
        function clickHandler(e: any) {
            if (
                !(e.target.nodeName === "INPUT") &&
                !e.target.classList.contains("hg-button") &&
                !e.target.classList.contains("hg-row") && !e.target.classList.contains("hg-rows")
            ) {
                setKeyboardVisibility(false);
                setRegionalKeyboardVisibility(false);
            }
        }

        window.addEventListener("click", clickHandler);
        return window.removeEventListener("click", clickHandler, true);
    }, []);

    const onKeyPress = (button: string) => {
        if (button === "{shift}" || button === "{lock}") {
            setLayout(layout == "default" ? "shift" : "default");
        }

    };


    const getMessageData = (messageData: any) => {
        let name = Object.keys(messageData)[0];
        let value = messageData[name];
        setMessage(() => ({
            ...message,
            [name]: value
        }));
    }

    const handleChange = (e: any) => {
        var { name, value } = e.target;
        if(name=="pageChangeTime"){
            if(value>0 || value==""){
                getMessageData({ [name]: value })
            }
            else{
                getMessageData({ [name]: 0 })
            }
        }
        else{
            getMessageData({ [name]: value })
            keyboardRef?.current?.setInput(value);
            console.log(getMessageData)
        }
    }

    const handleChecked = (e: any, el: any) => {
        const messageData = {
            id: el?.id,
            displayBoard: el?.displayBoard,
            messageEnglish: el?.messageEnglish,
            messageHindi: el?.messageHindi,
            messageRegional: el?.messageRegional,
            platformNo: el?.platformNo,
            deviceId: el?.deviceId,
            speed: el?.speed,
            messageEffect: el?.messageEffect,
            displayStatus: e?.target?.checked,
            letterSize: el?.letterSize,
            characterGap: el?.characterGap,
            pageChangeTime: el?.pageChangeTime,
        }
        setLoading(true);
        messagesvc.createMessageData(messageData).then((data: any) => {
            if (data && data?.status === 200) {
                if (messageData?.displayStatus == true) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `Selected Successfully`,
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        timer: 1000,
                    }).then(() => {
                        messagesvc.getAllMessage().then((data: any) => {
                            if (data && data?.data) {
                                setArray(data?.data);
                                setLoading(false)
                            }
                        })
                    })
                }
                else if (messageData?.displayStatus == false) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: ` Unselected successfully`,
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        timer: 1000,
                    }).then(() => {
                        messagesvc.getAllMessage().then((data: any) => {
                            if (data && data?.data) {
                                setArray(data?.data);
                                setLoading(false);
                            }
                        })
                    })
                }
            }
        });
    }



    useEffect(() => {
        if (message.displayBoard != "") {
            messagesvc.getPlatformNo(message).then((resp: any) => {
                if (resp && resp?.status === 200) {
                    setDisabled(false)
                    setplatformNoArray(resp?.data);
                    setPlatformNoError("")
                }
                else if (resp && resp?.status != 200) {
                    setDisabled(true);
                    setPlatformNoError(resp?.errorMsg)
                }
            })
        }
    }, [message.displayBoard])

    useEffect(() => {
        if (message?.deviceId != "") {
            let result = array?.filter((id: any) => id.deviceId == message?.deviceId);
            if (result.length != 0) {
                setMessage(result[0])

            }
            else {
                setDisabled(false)
                setMessage({
                    ...message,
                    messageEnglish: "",
                    messageHindi: "",
                    messageRegional: "",
                    id: 0,
                });
            }
        }
    }, [message?.deviceId])

    useEffect(() => {
        if (message?.displayBoard != "" && message?.platformNo != "" && message?.platformNo != undefined) {
            messagesvc.getDeviceId(message).then((resp: any) => {
                if (resp && resp?.status === 200) {
                    setDisabled(false)
                    setDeviceIdArray(resp?.data);
                    // setMessage({...message,["deviceId"]: resp?.data})
                    setDeviceIdError("")
                }
                else if (resp && resp?.errorMsg && resp?.status != 200) {
                    setDeviceIdError(resp?.errorMsg)
                    setDisabled(true)
                }
            })
        }
    }, [message?.displayBoard, message?.platformNo])

    const handleDisplayMedia = (message: any) => {
        messagesvc.postDisplaySelectedMessage(message).then((resp: any) => {
            if (resp && resp?.status === 200) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Data Send Successfully`,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    timer: 3000,
                })
            }
        })
    }



    const handleSubmit = () => {
        const data: any = {
            id: message?.id,
            displayBoard: message?.displayBoard,
            messageEnglish: message?.messageEnglish,
            messageHindi: message?.messageHindi,
            messageRegional: message?.messageRegional,
            platformNo: message?.platformNo,
            deviceId: message?.deviceId,
            speed: message?.speed,
            messageEffect: message?.messageEffect,
            displayStatus: message?.displayStatus,
            letterSize: message?.letterSize,
            characterGap: message?.characterGap,
            pageChangeTime: message?.pageChangeTime,
        }
        if (message?.id === 0) {
            setLoading(true);
            messagesvc.createMessageData(data).then((data: any) => {
                if (data && data?.status === 200) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `Message added successfully`,
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        timer: 3000,
                    }).then(() => {
                        setMessage({
                            id: 0,
                            displayBoard: "",
                            messageEnglish: "",
                            messageHindi: "",
                            messageRegional: "",
                            platformNo: "",
                            deviceId: "",
                            speed: "",
                            messageEffect: "",
                            displayStatus: false,
                            letterSize: 0,
                            characterGap: 0,
                            pageChangeTime: 0,
                        })
                        setMsgError("")
                    }).then(() => {
                        messagesvc.getAllMessage().then((data: any) => {
                            if (data && data?.data) {
                                setArray(data?.data);
                                setLoading(false);
                            }
                        })
                    })
                }
                else {
                    setMsgError(data?.errorMsg)
                    setLoading(false);
                }
            });
        }
        else {
            setLoading(true);
            messagesvc.updateMessageData(data).then((data: any) => {
                if (data && data?.status === 200) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `Message updated successfully`,
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        timer: 3000,
                    }).then(() => {
                        setMessage({
                            id: 0,
                            displayBoard: "",
                            messageEnglish: "",
                            messageHindi: "",
                            messageRegional: "",
                            platformNo: "",
                            deviceId: "",
                            speed: "",
                            messageEffect: "",
                            displayStatus: false,
                            letterSize: 0,
                            characterGap: 0,
                            pageChangeTime: 0,
                        })
                        setMsgError("")
                        flag = false
                    }).then(() => {
                        messagesvc.getAllMessage().then((data: any) => {
                            if (data && data?.data) {
                                setArray(data?.data);
                                setLoading(false);
                            }
                        })
                    })
                    setError("")
                    setMsgError("")
                }
                else {
                    setMsgError(data?.errorMsg)
                    setLoading(false);
                }
            });
        }
    }

    const handleDelete = (el: any) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                let data: any = {
                    id: el,
                }
                setLoading(true);
                messagesvc.removeMessage(data).then((datas) => {
                    if (datas && datas?.status === 200) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Message deleted successfully',
                            showConfirmButton: false,
                            allowOutsideClick: false,
                            timer: 1500,
                        }).then(() => {
                            setMessage({
                                id: 0,
                                displayBoard: "",
                                messageEnglish: "",
                                messageHindi: "",
                                messageRegional: "",
                                platformNo: "",
                                deviceId: "",
                                speed: "",
                                messageEffect: "",
                                letterSize: 0,
                                characterGap: 0,
                                pageChangeTime: 0,
                            })
                            flag = false
                            setMsgError("")
                            setError("")
                        }).then(() => {
                            messagesvc.getAllMessage().then((data: any) => {
                                if (data && data?.data) {
                                    setArray(data?.data);
                                    setLoading(false);
                                }
                            })
                        })
                    }
                })
            }
        })
    }

    const deviceIdView = () => {
        return (
            <select disabled={!message?.platformNo} name="deviceId" className="sideLableBox" value={message?.deviceId} onChange={handleChange}>
                <option value="">Select</option>
                {deviceIdArray.map((deviceId: any, i: any) => {
                    return (
                        <option value={deviceId}>{deviceId}</option>
                    )
                })}

            </select>
        )
    }

    const platformNoView = () => {
        return (
            <select disabled={disabled} name="platformNo" className="sideLableBox" value={message?.platformNo} onChange={handleChange}>
                <option >Select</option>
                {platformNoArray.map((el: any, i: any) => {
                    return (
                        <option value={el}>{el}</option>
                    )
                }
                )}
            </select>
        )
    }
    useEffect(() => {
        setLoading(true);
        messagesvc.getAllMessage().then((response: any) => {
            if (response && response?.status === 200) {
                setArray(response?.data);
                setLoading(false);
            }
            else {
                setLoading(false);
            }
        })
    }, [])

    const handleEdit = (el: any) => {
        flag = true
        setMessage({
            id: el?.id,
            displayBoard: el?.displayBoard,
            messageEnglish: el?.messageEnglish,
            messageHindi: el?.messageHindi,
            messageRegional: el?.messageRegional,
            platformNo: el?.platformNo,
            deviceId: el?.deviceId,
            speed: el?.speed,
            messageEffect: el?.messageEffect,
            displayStatus: el?.displayStatus,
            letterSize: el?.letterSize,
            characterGap: el?.characterGap,
            pageChangeTime: el?.pageChangeTime,
        })


    }

    const handleCancel = () => {
        setMessage({
            id: 0,
            displayBoard: "",
            messageEnglish: "",
            messageHindi: "",
            messageRegional: "",
            platformNo: "",
            deviceId: "",
            speed: "",
            messageEffect: "",
            displayStatus: false,
            letterSize: 0,
            characterGap: 0,
            pageChangeTime: 0,
        });
        setMsgError("")
        setError("")
        flag = false

    }
    useEffect(() => {
        messageData()
    }, [array])


    const messageData = () => {
        if (array?.length != 0) {
            return (
                array?.map((el: any, i: any) => {
                    return (
                        <StyledTableRow>
                            <TableCell className="tblcolm">
                                <Checkbox color="primary" name="displayStatus" onClick={(e) => { handleChecked(e, el) }}
                                    checked={el.displayStatus}
                                    className="messageCheckbox" inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                            </TableCell>
                            <TableCell className="tblcolm">{el?.deviceId}</TableCell>
                            <TableCell className="tblcolm">{el?.displayBoard}</TableCell>
                            <TableCell className="tblcolm">{el?.messageEnglish} </TableCell>
                            <TableCell className="tblcolm">
                                <IconButton aria-label="edit" className="fontSize14pxCss" onClick={() => handleEdit(el)} >
                                    <EditIcon className="editIconeMessageCss" />
                                    <span className="messageEditIconeCss"> Edit</span>
                                </IconButton>
                            </TableCell>
                            <TableCell className="tblcolm">
                                <IconButton aria-label="edit" className="deleteIconeButtoneCss" onClick={() => handleDelete(el?.id)}>
                                    <DeleteIcon className="deleteIconecss" />
                                    <span className="deleteIconeSpanCss"> Delete</span>
                                </IconButton>
                            </TableCell>
                        </StyledTableRow>
                    )
                })
            )
        }
        else {
            return (
                <TableCell colSpan={5} style={{ borderBottom: '0px' }}><span className="cdsNoTable">No Data Available</span></TableCell>
            )
        }
    }

    return (
        <>
            <Card>
                <Grid container>
                    <Grid item xs={3}>
                        <Grid>
                            <Card className="sideGridMaincard">
                                <Grid className="fontSize16"><b>Message Controls</b></Grid>
                                <Grid className="fontSize14">Control the setting for displaying message</Grid>
                                <Grid container className="marginTop5" >
                                    <Grid item className="fontSize14 sideLableText textalignlastSt" xs={4}>
                                        Display Board<span className="asterisk">*</span>
                                    </Grid>
                                    <Grid item xs={8}>
                                        {flag === false ?
                                            <select
                                                name="displayBoard"
                                                className="sideLableBox"
                                                value={message?.displayBoard}
                                                onChange={handleChange}>
                                                <option value="">Select</option>
                                                <option value="agdb">AGDB</option>
                                                <option value="mldb">MLDB</option>
                                                <option value="pfdb">PFDB</option>
                                            </select>
                                            :
                                            <select
                                                disabled={true}
                                                name="displayBoard"
                                                className="sideLableBox"
                                                value={message?.displayBoard}
                                                onChange={handleChange}>
                                                <option value="">Select</option>
                                                <option value="agdb">AGDB</option>
                                                <option value="mldb">MLDB</option>
                                                <option value="pfdb">PFDB</option>
                                            </select>
                                        }
                                    </Grid>
                                </Grid>
                                <Grid container className="marginTop5">
                                    <Grid item className="fontSize14 sideLableText textalignlastSt" xs={4}>
                                        Platform No.<span className="asterisk" >*</span>
                                    </Grid>
                                    <Grid item xs={8}>
                                        {platformNoView()}
                                        <div className="redColor">{platformNoError}</div>
                                    </Grid>
                                </Grid>
                                <Grid container className="marginTop5">
                                    <Grid item className="fontSize14 sideLableText2 textalignlastSt" xs={4}>
                                        Device ID<span className="asterisk" >*</span>
                                    </Grid>
                                    <Grid item xs={8}>
                                        {deviceIdView()}
                                        <div className="redColor">{deviceIdError}</div>
                                    </Grid>
                                </Grid>
                                <Grid container className="marginTop5">
                                    <Grid item className="fontSize14 sideLableText2 textalignlastSt" xs={4}>
                                        Speed<span className="asterisk" >*</span>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <select
                                            name="speed"
                                            className="sideLableBox"
                                            onChange={handleChange}
                                            value={message?.speed}>
                                            <option value="" >Select</option>
                                            <option value="Lowest">Lowest</option>
                                            <option value="Low">Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="High">High</option>
                                            <option value="Highest">Highest</option>

                                        </select>
                                    </Grid>
                                </Grid>
                                <Grid container className="marginTop5">
                                    <Grid item className="fontSize14 sideLableText textalignlastSt" xs={4}>
                                        Message Effect<span className="asterisk" >*</span>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <select
                                            className="sideLableBox"
                                            name="messageEffect"
                                            onChange={handleChange}
                                            value={message?.messageEffect}>
                                            <option value="">
                                                Select
                                            </option>
                                            <option value="Reserved">Reserved</option>
                                            <option value="Curtain Left to Right">Curtain Left to Right</option>
                                            <option value="Curtain Top to Bottom">Curtain Top to Bottom</option>
                                            <option value="Curtain Bottom to Top">Curtain Bottom to Top</option>
                                            <option value="Typing Left to Right">Typing Left to Right</option>
                                            <option value="Running Right to Left">Running Right to Left</option>
                                            <option value="Running Top to Bottom">Running Top to Bottom</option>
                                            <option value="Running Bottom to Top">Running Bottom to Top</option>
                                            <option value="Flashing">Flashing</option>
                                            <option value="Stable/Static">Stable/Static</option>
                                        </select>
                                    </Grid>
                                </Grid>
                                <Grid container className="marginTop5">
                                    <Grid item className="fontSize14 sideLableText textalignlastSt" xs={4}>
                                        Letter Size<span className="asterisk" >*</span>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <select
                                            className="sideLableBox"
                                            name="letterSize"
                                            onChange={handleChange}
                                            value={message?.letterSize}>
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
                                <Grid container className="marginTop5">
                                    <Grid item className="fontSize14 sideLableText textalignlastSt" xs={4}>
                                        Character Gap<span className="asterisk" >*</span>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <select
                                            className="sideLableBox"
                                            name="characterGap"
                                            onChange={handleChange}
                                            value={message?.characterGap}>
                                            <option value="">Select</option>
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                        </select>
                                    </Grid>
                                </Grid>
                                <Grid container className="marginTop5">
                                    <Grid item className="fontSize14 sideLableText textalignlastSt" xs={4}>
                                        Page Change Time<span className="asterisk" >*</span>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            type="number"
                                            size="small"
                                            value={message.pageChangeTime}
                                            name="pageChangeTime"
                                            variant="outlined"
                                            className="sideLableBox"
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </Grid>
                                {/* </Grid>*/}
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid item xs={9}>
                        <Card className="addMessage">
                            <Grid container>
                                <Typography>
                                    <b> Add Message </b>
                                </Typography>
                            </Grid>
                            <Grid container>
                                <Typography>
                                    Add message to displayed on Display Board. Seprate AGDB and MLDB lines by #
                                </Typography>
                            </Grid>
                            <Grid container>
                                <Grid container className="marginTopMes">
                                    <Grid item xs={2}></Grid>
                                    <Grid item xs={2} className="mesTextLable">
                                        Message (English)<span className="asterisk">*</span>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            size="small"
                                            name="messageEnglish"
                                            value={message?.messageEnglish}
                                            variant="outlined"
                                            required={true}
                                            onChange={handleChange}
                                        />
                                        {error != "" ? <span style={{ color: "red", textAlign: "center" }}> {error}</span> : <></>}
                                    </Grid>
                                    <Grid item xs={2}></Grid>
                                </Grid>
                                <Grid container className="marginTopMes">
                                    <Grid item xs={2}></Grid>
                                    <Grid item xs={2} className="mesTextLable">
                                        Message (Hindi)
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            size="small"
                                            name="messageHindi"
                                            value={message?.messageHindi}
                                            variant="outlined"
                                            required={true}
                                            onChange={handleChange}
                                            onFocus={() => {
                                                setKeyboardVisibility(true);
                                                setRegionalKeyboardVisibility(false);
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={2}></Grid>
                                </Grid>
                                <Grid container className="marginTopMes">
                                    <Grid item xs={2}></Grid>
                                    <Grid item xs={2} className="mesTextLable">
                                        Message ({regionalLanguage})
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            size="small"
                                            name="messageRegional"
                                            value={message?.messageRegional}
                                            variant="outlined"
                                            required={true}
                                            onChange={handleChange}
                                            onFocus={() => {
                                                setKeyboardVisibility(false);
                                                setRegionalKeyboardVisibility(true);
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container className="marginTopMes">
                                    <Grid item xs={8} className="textWidth">
                                        <Button
                                            type="reset"
                                            value="Reset"
                                            variant="outlined"
                                            onClick={handleCancel}
                                            className="messBtn-W"
                                        >
                                            <span className="btnfont">CANCEL</span>
                                        </Button>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button
                                            type="submit"
                                            className="displaySelectedBtn"
                                            variant="outlined"
                                            onClick={handleSubmit}
                                        >
                                            <span className="i">{message.id == 0 ? <b> {buttonText}</b> : updateText}</span>
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <span> {msgError != "" ? <div style={{ color: "red", textAlign: "center", position: "relative", top: "30%" }}> {msgError}</div> : <></>}
                                    </span>
                                </Grid>
                            </Grid>
                        </Card>
                        <Grid container>
                            {/* <Grid item xs={3}></Grid> */}
                            <Grid item xs={12}>
                                <Card className="tableCardPadding">
                                    <Grid container>
                                        <Grid item xs={2}>
                                            <Typography>
                                                <b>Saved Messages</b>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid container>
                                            <TableContainer className="messageTable">
                                                <Table stickyHeader aria-label="sticky table" className="uniqueName">
                                                    <TableHead className="tblhead">
                                                        <TableRow>
                                                            <TableCell className="tblRow">
                                                                <b>Select</b>
                                                            </TableCell >
                                                            <TableCell className="tblRow">
                                                                <b>ID</b>
                                                            </TableCell >
                                                            <TableCell className="tblRow">
                                                                <b>Display Board</b>
                                                            </TableCell>
                                                            <TableCell className="tblRow">
                                                                <b> Message</b>
                                                            </TableCell>
                                                            <TableCell className="tblRow" colSpan={2}>
                                                                <b> Actions</b>
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    {
                                                        loading ?
                                                            <StyledTableRow >
                                                                <TableCell colSpan={5}>
                                                                    <div className="messgetable"><Grid style={{ textAlign: "center" }}><CircularProgress size={30} /><br />Loading...</Grid></div>
                                                                </TableCell></StyledTableRow>
                                                            :
                                                            <TableBody className="tblbdy">
                                                                {messageData()}
                                                            </TableBody>
                                                    }
                                                </Table>
                                            </TableContainer>
                                        </Grid>
                                        <Grid container className="cancelDisplayButtonCss">
                                            <Grid item xs={9} className="textWidth">
                                                <Button
                                                    type="reset"
                                                    value="Reset"
                                                    variant="outlined"
                                                    className="messageCanclebutton messBtn-W">
                                                    <span className="btnfont">CANCEL</span>
                                                </Button>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Button
                                                    type="submit"
                                                    className="displaySelectedBtn2"
                                                    variant="contained"
                                                    onClick={() => handleDisplayMedia("displaymessage")}>
                                                    <span className="i"><b>Display Selected Media</b></span>
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid >

            </Card >
            {keyboardVisibility && (
                <Keyboard
                    keyboardRef={(r: any) => (keyboardRef.current = r)}
                    onChange={(e: any) => setMessage({ ...message, "messageHindi": e })}
                    onKeyPress={(button: any) => onKeyPress(button)}
                    {...hindi}
                    layoutName={layout == "default" ? "default" : "shift"}
                />)}

            {regionalKeyboardVisibility && (
                <Keyboard
                    keyboardRef={(r: any) => (keyboardRef.current = r)}
                    onChange={(e: any) => setMessage({ ...message, "messageRegional": e })}
                    onClick={(e: any) => e.stopPropagation()}
                    onKeyPress={(button: any) => onKeyPress(button)}
                    {...keyboardRegionalLanguage}
                    layoutName={layout == "default" ? "default" : "shift"}
                />)}
        </>
    )
}