import { Card, FormControlLabel, Grid, Typography, Checkbox, TextField, Button, FormControl, RadioGroup, Radio } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import React from "react";
import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import DefaultMessagesModel from "../../model/setup/defaultMessages";
import SetupService from "../service/setup/setup";
import { useSelector } from "react-redux";
import { authuserStateSelector } from "../../redux/reducers/authUser/authUser";
import { Messages } from "../../constants/messages";
import Keyboard from "react-simple-keyboard";
import hindi from "simple-keyboard-layouts/build/layouts/hindi";
import punjabi from "../common/languages/punjabi";
import tamil from "../common/languages/tamil";
import oriya from "../common/languages/oriya";
import telugu from "../common/languages/telugu";
import marathi from "../common/languages/marathi";
import gujarati from "../common/languages/gujarati";
import bengali from "simple-keyboard-layouts/build/layouts/bengali";
import urdu from "simple-keyboard-layouts/build/layouts/urdu";
import kannada from "simple-keyboard-layouts/build/layouts/kannada";
import Malayalam from "simple-keyboard-layouts/build/layouts/malayalam";
import MessageServices from "../service/message/messageServices";

const setup = new SetupService();
const messagesvc = new MessageServices();
export const DefaultMessage = (props: any) => {
    const { regionalLanguage } = props;
    const { appUser } = useSelector(authuserStateSelector)
    const [platformNumbers, setPlatformNumbers] = useState<[]>([]);
    const [error, setError] = useState();
    const [defaultMessage, setDefaultMessage] = useState<DefaultMessagesModel | any>({
        id: 0,
        mldbDefaultMessage: "",
        pfdDefaultMessage: "",
        agdbDefaultMessage: "",
        ivdDefaultMessage: "",
        ovdDefaultMessage: "",
        tvDisplayDefaultMessage: "",
        cgdbDefaultMessage: [],
        language: "",
        cgdbDefaultMessage1: "",
        cgdbDefaultMessage2: "",
        cgdbDefaultMessage3: "",
        cgdbDefaultMessage4: "",
    });
    const [defaultBoardSettings, setDefaultBoardSetting] = useState<any>({
        defaultBoardType: "",
        defaultPlatformNumber: ""
    })
    const [enableEnglish, setEnglish] = useState(false)
    const [enableHindi, setHindi] = useState(false)
    const [enableRegional, setRegional] = useState(false)
    const [defaultBoardTypeError, setDefaultBoardTypeError] =
        React.useState<string>();
    const [platformNumberError, setPlatformNumberError] =
        React.useState<string>();

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
        }
        else if (regionalLanguage == "Kannada") {
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

    const [inputName, setInputName] = useState("")
    const handleHindiKeyboardChange = (e: any) => {
        keyboardRef?.current?.setInput(e.target.value);
        // keyboardRef?.current?.setInput(defaultMessage[inputName]);
        setInputName(e.target.name);
        setKeyboardVisibility(true);
        setRegionalKeyboardVisibility(false);
    }

    const handleRegionalKeyboardChange = (e: any) => {
        setInputName(e.target.name);
        setKeyboardVisibility(false);
        setRegionalKeyboardVisibility(true);
    }




    useEffect(() => {
        if (props.stationData) {
            getDefaultMessageData();
        }
        else {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Please Enter Station Details",
                showConfirmButton: false,
                allowOutsideClick: false,
                timer: 3000
            })
                .then(() => {
                    props.updateSelectedSideBarMenu("setupMain");
                })
        }
    }, [])



    const handleChange = (e: any) => {
        var { name, value } = e.target;
        keyboardRef?.current?.setInput(value);
        setDefaultMessage({ ...defaultMessage, [name]: value });
        console.log(defaultMessage)
    };

    const handleSetChange = (e: any) => {
        var { name, value } = e.target;
        setDefaultBoardSetting({ ...defaultBoardSettings, [name]: value });
        console.log(defaultBoardSettings)
    };

    const handleBoardType = (event: any) => {
        const {
            target: { value },
        } = event;
        console.log(event);
        if (event.target.value == "") {
            setDefaultBoardTypeError(`${Messages.BOARD_TYPE}`);
        }
        else {
            setDefaultBoardTypeError("");
        }
    }

    const handleSet = (data: any) => {
        setup.setDefaultMessage(data).then(res => {
            if (res?.status === 200) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Data Set Successfully`,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    timer: 3000,
                })

            }
        })
    }

    const handleSelect = (e: any) => {
        var { name, value, checked } = e.target;
        if (checked && defaultMessage.language) {
            defaultMessage.language.push(value)
            if (value == "English") {
                setEnglish(true)
            }
            else if (value == "Hindi") {
                setHindi(true)
            }
            else if (value == "Regional") {
                setRegional(true)
            }
        } else {
            if (value == "English") {
                setEnglish(false)
            }
            else if (value == "Hindi") {
                setHindi(false)
            }
            else if (value == "Regional") {
                setRegional(false)
            }
            defaultMessage.language.splice(defaultMessage.language.indexOf(value))

        }
    }
    const handleSubmit = () => {
        let inte: any = {
            mldbDefaultMessage: defaultMessage.mldbDefaultMessage,
            pfdDefaultMessage: defaultMessage.pfdDefaultMessage,
            agdbDefaultMessage: defaultMessage.agdbDefaultMessage,
            ivdDefaultMessage: defaultMessage.ivdDefaultMessage,
            ovdDefaultMessage: defaultMessage.ovdDefaultMessage,
            tvDisplayDefaultMessage: defaultMessage.tvDisplayDefaultMessage,
            language: defaultMessage.language,
            cgdbDefaultMessage: [defaultMessage.cgdbDefaultMessage1, defaultMessage.cgdbDefaultMessage2, defaultMessage.cgdbDefaultMessage3, defaultMessage.cgdbDefaultMessage4]
        };
        setup.createDefaultMessage(inte).then(data => {
            if (data?.status === 200 && data?.data) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Data Saved Successfully`,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    timer: 3000,
                }).then((willSubmitted) => {
                    if (willSubmitted) {
                        setDefaultMessage(data?.data)
                    }
                })
            }
            else {
                setError(data?.errorMsg)
            }

        })

    }


    const getDefaultMessageData = () => {
        setup.getDefaultMessage().then(resp => {
            if (resp && resp?.data && resp?.data[0]) {
                defaultMessage.language = resp?.data[0]?.language
                setDefaultMessage({
                    id: resp?.data[0]?.id,
                    mldbDefaultMessage: resp?.data[0]?.mldbDefaultMessage,
                    pfdDefaultMessage: resp?.data[0]?.pfdDefaultMessage,
                    agdbDefaultMessage: resp?.data[0]?.agdbDefaultMessage,
                    language: resp?.data[0]?.language,
                    cgdbDefaultMessage1: resp?.data[0]?.cgdbDefaultMessage[0],
                    cgdbDefaultMessage2: resp?.data[0]?.cgdbDefaultMessage[1],
                    cgdbDefaultMessage3: resp?.data[0]?.cgdbDefaultMessage[2],
                    cgdbDefaultMessage4: resp?.data[0]?.cgdbDefaultMessage[3],
                    tvDisplayDefaultMessage: resp?.data[0]?.tvDisplayDefaultMessage,
                    ovdDefaultMessage: resp?.data[0]?.ovdDefaultMessage,
                    ivdDefaultMessage: resp?.data[0]?.ivdDefaultMessage,


                })
            }
        })
    }

    useEffect(() => {
        if (defaultMessage.language.length != 0) {
            for (let i = 0; i < defaultMessage.language.length; i++) {
                if (defaultMessage.language[i] == "English") {
                    setEnglish(true)
                }
                if (defaultMessage.language[i] == "Hindi") {
                    setHindi(true)
                }
                if (defaultMessage.language[i] == "Regional") {
                    setRegional(true)
                }
            }
        }
    }, [defaultMessage?.language])

    const handleCancel = () => {
        setEnglish(false)
        setHindi(false)
        setRegional(false)
        setDefaultMessage({
            id: 0,
            mldbDefaultMessage: "",
            pfdDefaultMessage: "",
            agdbDefaultMessage: "",
            cgdbDefaultMessage: [],
            language: [],
            ivdDefaultMessage: "",
            cgdbDefaultMessage1: "",
            cgdbDefaultMessage2: "",
            cgdbDefaultMessage3: "",
            cgdbDefaultMessage4: "",
        });
    }
    const CancelBoardSetting = () => {
        setDefaultBoardSetting({
            defaultBoardType: "",
            defaultPlatformNumber: ""
        })
        setDefaultBoardTypeError("");
        setPlatformNumberError("");
    }


    const handlePlateformNo = (event: any) => {
        const {
            target: { value },
        } = event;
        console.log(event);
        if (event.target.value == "") {
            setPlatformNumberError(`${Messages.PLATFORM_NUMBER}`);
        }
        else {
            setPlatformNumberError("");
        }

    }

    const getPlatformNumbers = () => {
        if (defaultBoardSettings?.defaultBoardType!= "") {
            let defaultmessagePlno:any={
                  displayBoard:defaultBoardSettings.defaultBoardType,
                  displayBoardplformno:defaultBoardSettings.defaultPlatformNumber
            }            
            messagesvc.getPlatformNo(defaultmessagePlno).then((response:any) => {
                if (response && response?.status === 200) {
                    setPlatformNumbers(response?.data);
                }
            })
        }
    }

    useEffect(() => {
        getPlatformNumbers();
    }, [defaultBoardSettings?.defaultBoardType
    ]);



    return (
        <>
            <Grid className="gridStyle2">
                <Grid item xs={9} style={{ margin: 'auto', paddingTop: '20px', paddingBottom: '20px' }}>
                    <Card style={{ padding: "30px", borderRadius: "10px" }} className={appUser.userRole == "ROLE_STATION MASTER" ? "overlapBackground  DefaultMesgCard" : " DefaultMesgCard"}>
                        {appUser.userRole == "ROLE_STATION MASTER" ? <Grid className="stationForm formFields">

                        </Grid> : <></>
                        }
                        <Grid container className="mb-5">
                            <Typography className="messagetext1">
                                Default Message
                            </Typography>
                        </Grid>
                        <Grid container className="mb-25">
                            <Typography className="messagetext2">
                                Set the default message to be displayed on Display Board. Separate AGDB and MLDB lines by #
                            </Typography>
                        </Grid>

                        <Grid container className="mb-25">
                            <Grid item xs={2} className="Defaultmsgbox"><b>Language:</b></Grid>
                            <Grid item xs={8} style={{ display: "flex", alignItems: "center" }}>

                                <RadioGroup row name="language"
                                    value={defaultMessage.language}
                                    onChange={handleChange}
                                    style={{ width: '100%' }}
                                >
                                    <Grid item xs={4}>
                                        <FormControlLabel value="English"
                                            control={
                                                <Radio

                                                    size="small" className="rdBtndeaultMsg"
                                                    style={{ color: "#033733", marginRight: "10px" }}
                                                />
                                            }
                                            label={
                                                <span
                                                    style={{
                                                        fontSize: "14px",
                                                        fontFamily: "Roboto",
                                                        marginRight: "10px",
                                                    }}
                                                >
                                                    English</span>
                                            }
                                        /></Grid>
                                    <Grid item xs={4}>
                                        <FormControlLabel

                                            control={
                                                <Radio
                                                    size="small"
                                                    // name="hindi"
                                                    // onChange={handleLanguageKeyboardChange}
                                                    value="Hindi"
                                                    style={{ color: "#033733", marginRight: "10px" }}
                                                />
                                            }
                                            label={
                                                <span style={{
                                                    fontSize: "14px", fontFamily: "Roboto",
                                                    marginRight: "10px"
                                                }}>
                                                    Hindi
                                                </span>
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControlLabel

                                            control={
                                                <Radio
                                                    size="small"
                                                    // name="regional"
                                                    // onChange={handleLanguageKeyboardChange}
                                                    value="Regional"
                                                    style={{ color: "#033733", marginRight: "10px" }}
                                                />
                                            }
                                            label={
                                                <span style={{
                                                    fontSize: "14px", fontFamily: "Roboto",
                                                    marginRight: "10px"
                                                }}>
                                                    {regionalLanguage}
                                                </span>
                                            }
                                        />
                                    </Grid>
                                </RadioGroup>

                            </Grid>
                        </Grid>

                        <Grid container style={{ marginTop: '10px' }} className="mb-20">
                            <Grid item xs={5} md={7} xl={5} style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }} className="pr-32">
                                <Typography className="DefaultMsgTextBoxLabel">Multi Line Display Board (MLDB) Default Message<span className="asterisk">*</span> </Typography>
                            </Grid>
                            <Grid item xs={7} md={5} xl={7}> <TextField variant="outlined" className="DefaultMsgTextBox input-height" name="mldbDefaultMessage" required={true} onChange={handleChange} value={defaultMessage?.mldbDefaultMessage}
                                onFocus={defaultMessage.language == "Hindi" ? handleHindiKeyboardChange : defaultMessage.language == "Regional" ? handleRegionalKeyboardChange : undefined} /></Grid>
                        </Grid>
                        <Grid container style={{ marginTop: '10px' }} className="mb-20">
                            <Grid item xs={5} md={7} xl={5} style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }} className="pr-32">
                                <Typography className="DefaultMsgTextBoxLabel">Platform Display Board (PFDB) Default Message </Typography></Grid>
                            <Grid item xs={7} md={5} xl={7}> <TextField variant="outlined" className="DefaultMsgTextBox Device Systemsx input-height" name="pfdDefaultMessage" required={true} onChange={handleChange} value={defaultMessage?.pfdDefaultMessage}
                                onFocus={defaultMessage.language == "Hindi" ? handleHindiKeyboardChange : defaultMessage.language == "Regional" ? handleRegionalKeyboardChange : undefined} /></Grid>
                        </Grid>
                        <Grid container style={{ marginTop: '10px' }} className="mb-20">
                            <Grid item xs={5} md={7} xl={5} style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }} className="pr-32">
                                <Typography className="DefaultMsgTextBoxLabel">At a Glance Display Board (aGDB) Default Message <span className="asterisk">*</span></Typography></Grid>
                            <Grid item xs={7} md={5} xl={7}> <TextField variant="outlined" className="DefaultMsgTextBox input-height" name="agdbDefaultMessage" required={true} onChange={handleChange} value={defaultMessage?.agdbDefaultMessage}
                                onFocus={defaultMessage.language == "Hindi" ? handleHindiKeyboardChange : defaultMessage.language == "Regional" ? handleRegionalKeyboardChange : undefined} /></Grid>
                        </Grid>
                        <Grid container style={{ marginTop: '10px' }} className="mb-20">
                            <Grid item xs={5} md={7} xl={5} style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }} className="pr-32">
                                <Typography className="DefaultMsgTextBoxLabel">IVD<span className="asterisk">*</span></Typography></Grid>
                            <Grid item xs={7} md={5} xl={7}> <TextField variant="outlined" className="DefaultMsgTextBox input-height" name="ivdDefaultMessage" required={true} onChange={handleChange} value={defaultMessage?.ivdDefaultMessage}
                                onFocus={defaultMessage.language == "Hindi" ? handleHindiKeyboardChange : defaultMessage.language == "Regional" ? handleRegionalKeyboardChange : undefined} /></Grid>
                        </Grid>
                        <Grid container style={{ marginTop: '10px' }} className="mb-20">
                            <Grid item xs={5} md={7} xl={5} style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }} className="pr-32">
                                <Typography className="DefaultMsgTextBoxLabel">OVD<span className="asterisk">*</span></Typography></Grid>
                            <Grid item xs={7} md={5} xl={7}> <TextField variant="outlined" className="DefaultMsgTextBox input-height" name="ovdDefaultMessage" required={true} onChange={handleChange} value={defaultMessage?.ovdDefaultMessage}
                                onFocus={defaultMessage.language == "Hindi" ? handleHindiKeyboardChange : defaultMessage.language == "Regional" ? handleRegionalKeyboardChange : undefined} /></Grid>
                        </Grid>
                        <Grid container style={{ marginTop: '10px' }} className="mb-20">
                            <Grid item xs={5} md={7} xl={5} style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }} className="pr-32">
                                <Typography className="DefaultMsgTextBoxLabel">TV-DISPLAY<span className="asterisk">*</span></Typography></Grid>
                            <Grid item xs={7} md={5} xl={7}> <TextField variant="outlined" className="DefaultMsgTextBox input-height" name="tvDisplayDefaultMessage" required={true} onChange={handleChange} value={defaultMessage?.tvDisplayDefaultMessage}
                                onFocus={defaultMessage.language == "Hindi" ? handleHindiKeyboardChange : defaultMessage.language == "Regional" ? handleRegionalKeyboardChange : undefined} /></Grid>
                        </Grid>
                        <Grid container style={{ marginTop: '10px' }} className="mb-30">
                            <Grid item xs={5} md={7} xl={5} style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }} className="pr-32">
                                <Typography className="DefaultMsgTextBoxLabel">Coach Guidance Display Board (CGDB) Default Message<span className="asterisk">*</span></Typography>

                            </Grid>
                            <Grid item xs={7} md={5} xl={7}>
                                <Grid container>
                                    <Grid item xs={3} style={{ display: "flex" }}>
                                        <Grid container>
                                            <Grid item xs={6} md={4} style={{ alignSelf: 'center' }}>
                                                <Typography className="DefaultMesgSubTextBoxLabel">1</Typography>
                                            </Grid>
                                            <Grid item xs={6} md={8}>
                                                <TextField variant="outlined" className="DefaultMesgSubTextBox input-height"
                                                    name="cgdbDefaultMessage1" required={true} onChange={handleChange} value={defaultMessage?.cgdbDefaultMessage1}
                                                    onFocus={defaultMessage.language == "Hindi" ? handleHindiKeyboardChange : defaultMessage.language == "Regional" ? handleRegionalKeyboardChange : undefined}

                                                />
                                            </Grid>
                                        </Grid>


                                    </Grid>
                                    <Grid item xs={3} style={{ display: "flex" }}>
                                        <Grid container>
                                            <Grid item xs={6} md={4} style={{ alignSelf: 'center' }}>
                                                <Typography className="DefaultMesgSubTextBoxLabel">2</Typography>
                                            </Grid>
                                            <Grid item xs={6} md={8}>
                                                <TextField variant="outlined" className="DefaultMesgSubTextBox input-height"
                                                    name="cgdbDefaultMessage2" required={true} onChange={handleChange} value={defaultMessage?.cgdbDefaultMessage2}
                                                    onFocus={defaultMessage.language == "Hindi" ? handleHindiKeyboardChange : defaultMessage.language == "Regional" ? handleRegionalKeyboardChange : undefined}
                                                />
                                            </Grid>
                                        </Grid>


                                    </Grid>
                                    <Grid item xs={3} style={{ display: "flex" }}>
                                        <Grid container>
                                            <Grid item xs={6} md={4} style={{ alignSelf: 'center' }}>
                                                <Typography className="DefaultMesgSubTextBoxLabel">3</Typography>
                                            </Grid>
                                            <Grid item xs={6} md={8}>
                                                <TextField variant="outlined" className="DefaultMesgSubTextBox input-height"
                                                    name="cgdbDefaultMessage3" required={true} onChange={handleChange} value={defaultMessage?.cgdbDefaultMessage3}
                                                    onFocus={defaultMessage.language == "Hindi" ? handleHindiKeyboardChange : defaultMessage.language == "Regional" ? handleRegionalKeyboardChange : undefined}
                                                />
                                            </Grid>
                                        </Grid>


                                    </Grid>
                                    <Grid item xs={3} style={{ display: "flex" }}>
                                        <Grid container>
                                            <Grid item xs={6} md={4} style={{ alignSelf: 'center' }}>
                                                <Typography className="DefaultMesgSubTextBoxLabel">4</Typography>
                                            </Grid>
                                            <Grid item xs={6} md={8} style={{ display: "flex", justifyContent: "flex-end" }}>
                                                <TextField variant="outlined" className="DefaultMesgSubTextBox input-height"
                                                    name="cgdbDefaultMessage4" required={true} onChange={handleChange} value={defaultMessage?.cgdbDefaultMessage4}
                                                    onFocus={defaultMessage.language == "Hindi" ? handleHindiKeyboardChange : defaultMessage.language == "Regional" ? handleRegionalKeyboardChange : undefined}
                                                />
                                            </Grid>
                                        </Grid>


                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container className="errorDflt">{error}</Grid>
                        {appUser.userRole == "ROLE_STATION MASTER" ?
                            <></>
                            :
                            <Grid container spacing={2} style={{ justifyContent: "flex-end", display: "flex" }} className="mb-30">
                                <Grid item xs={3} md={4} lg={3} xl={3} className="button-align-1">
                                    <Button type="submit" onClick={handleSubmit} className="DefaultMsgSave ht-30" variant="outlined">
                                        <DoneIcon className="DefaultMsgIcon" fontSize="small" />
                                        <span className="btn-font"> Save</span>
                                    </Button>
                                </Grid>
                                <Grid item xs={3} md={4} lg={3} xl={3} className="button-align-2">
                                    <Button type="reset" onClick={handleCancel} variant="outlined" className="DefaultMsgCancel ht-30">
                                        <CloseIcon className="DefaultMsgIcon" fontSize="small" />
                                        <span className="btn-font">Cancel</span>
                                    </Button>
                                </Grid>


                            </Grid>
                        }
                        <Grid container style={{ marginTop: '10px' }}>
                            <Typography className="messagetext1">
                                Board Settings
                            </Typography>
                        </Grid>
                        <Grid container style={{ marginTop: '10px' }} className="mb-30">
                            <Grid item xs={6}>
                                <Grid container>
                                    <Grid item xs={4} md={6} className="Defaultmessagetext pr-32">Board Type&nbsp;<sup className="asterisk">*</sup></Grid>
                                    <Grid item xs={8} md={6} lg={5} xl={5}>
                                        <select className="DefaultMsgSelector input-height2" name="defaultBoardType" required={true} value={defaultBoardSettings?.defaultBoardType} onChange={handleSetChange} onBlur={handleBoardType}  >
                                            <option value="">Select</option>
                                            <option value="agdb">AGDB</option>
                                            <option value="pfdb">PFDB</option>
                                            <option value="mldb">MLDB</option>
                                            <option value="ivd">IVD</option>
                                            <option value="ovd">OVD</option>
                                            <option value="cgdb">CGDB</option>
                                        </select>
                                        <span>
                                            {defaultBoardTypeError != "" ? <div style={{ color: "red", textAlign: "center", marginTop: "3%" }}> {defaultBoardTypeError}</div> : <></>}
                                        </span>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6} style={{ justifyContent: 'end' }}>
                                <Grid container>
                                    <Grid item xs={4} md={6} className="Defaultmessagetext pr-32">Platform No.<sup className="asterisk">*</sup></Grid>
                                    <Grid item xs={8} md={6} lg={5} xl={5}>
                                        <select className="DefaultMsgSelector input-height2" name="defaultPlatformNumber" onBlur={handlePlateformNo} required={true} value={defaultBoardSettings?.defaultPlatformNumber} onChange={handleSetChange}  >
                                            <option value="" selected>Select</option>
                                            {platformNumbers.map((platformNo: any, i: any) => {
                                                return (
                                                    <option value={platformNo}>{platformNo}</option>
                                                )
                                            })}

                                        </select>
                                        <span>
                                            {platformNumberError != "" ? <div style={{ color: "red", textAlign: "center", marginTop: "3%" }}> {platformNumberError}</div> : <></>}
                                        </span>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>


                        {appUser.userRole == "ROLE_STATION MASTER" ?
                            <></>
                            :
                            <Grid container style={{ marginTop: '10px' }} className="btnsection" spacing={2}>
                                <Grid item xs={4} md={4} lg={6} xl={5} style={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Button
                                        className="restoreFactorySettings ht-30"
                                    >
                                        Restore Factory Settings
                                    </Button>
                                </Grid>
                                <Grid item xs={3} md={4} lg={3} xl={3} className="button-align-1">
                                    <Button type="submit" className="DefaultMsgSave2 ht-30" variant="outlined" onClick={() => handleSet(defaultBoardSettings)}>
                                        <DoneIcon className="DefaultMsgIcon" fontSize="small" />
                                        <span className="btn-font">Set</span>
                                    </Button>
                                </Grid>
                                <Grid item xs={3} md={4} lg={3} xl={3} className="button-align-2">
                                    <Button type="reset" onClick={CancelBoardSetting} variant="outlined" className="DefaultMsgCancel2 ht-30">
                                        <CloseIcon className="DefaultMsgIcon" fontSize="small" />
                                        <span className="btn-font">Cancel</span>
                                    </Button>
                                </Grid>
                            </Grid>
                        }
                    </Card>
                </Grid>
            </Grid>

            {keyboardVisibility && (
                <Keyboard
                    keyboardRef={(r: any) => (keyboardRef.current = r)}
                    onChange={(e: any) => setDefaultMessage({ ...defaultMessage, [inputName]: e })}
                    onKeyPress={(button: any) => onKeyPress(button)}
                    {...hindi}
                    layoutName={layout == "default" ? "default" : "shift"}
                />)}

            {regionalKeyboardVisibility && (
                <Keyboard
                    keyboardRef={(r: any) => (keyboardRef.current = r)}
                    onChange={(e: any) => setDefaultMessage({ ...defaultMessage, [inputName]: e })}
                    onClick={(e: any) => e.stopPropagation()}
                    onKeyPress={(button: any) => onKeyPress(button)}
                    {...keyboardRegionalLanguage}
                    layoutName={layout == "default" ? "default" : "shift"}
                />)}
        </>
    )
}
