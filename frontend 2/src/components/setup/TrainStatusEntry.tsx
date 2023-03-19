import { Button, Card, CircularProgress, createStyles, FormControl, Grid, IconButton, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Theme, Typography, withStyles } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from "@material-ui/icons/Delete";
import KeyboardIcon from '@material-ui/icons/Keyboard';
import { useState, useEffect, useRef } from "react";
import TrainStatusModel from "../../model/setup/trianStatusModel";
import { useSelector } from "react-redux";
import { authuserStateSelector } from "../../redux/reducers/authUser/authUser";
import SetupService from "../service/setup/setup";
import Swal from "sweetalert2";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ClearIcon from '@material-ui/icons/Clear';
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
import "react-simple-keyboard/build/css/index.css";
import Malayalam from "simple-keyboard-layouts/build/layouts/malayalam";


const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }),
)(TableRow);

const setup = new SetupService();
const buttonText = "Add";
const updateText = "Update";
export const TrainStatusEntry = (props: any) => {
    const { regionalLanguage } = props;
    const { appUser } = useSelector(authuserStateSelector)
    const [englishCleardisplay, setEnglishClearDisplay] = useState("displayNone");
    const [hindiCleardisplay, setHindiClearDisplay] = useState("displayNone");
    const [regionalCleardisplay, setRegionalClearDisplay] = useState("displayNone");
    const [statusEntry, setStatusEntry] = useState<TrainStatusModel | any>({
        id: 0,
        statusCode: "",
        englishStatus: "",
        hindiStatus: "",
        regionalStatus: "",
        englishFile: "",
        hindiFile: "",
        regionalFile: "",

    })
    const [statusCodeType, setStationCodeType] = useState<any>("")
    const [error, setError] = useState("");
    const [array, setArray] = useState<[]>([]);
    const [loading, setLoading] = useState<any>(false);
    const FileData = new FormData();
    const [file, setFile] = useState<any>([])
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
    const handleChange = (e: any) => {
        var { name, value } = e.target;
        if (name == "statusCode" && value != "" && value != undefined) {
            let codeType = value.substring(0, 1)
            console.log(codeType, "Test")
            let code = value.substring(1)
            setStationCodeType(codeType)
            setStatusEntry({ ...statusEntry, [name]: code })
        }
        else if (name === "englishStatus" || name === "hindiStatus" || name === "regionalStatus") {
            if (value.match(/^[a-z ]{0,20}$/i)) {
                setStatusEntry({ ...statusEntry, [name]: value });
            }
        }
        else {
            setStatusEntry({ ...statusEntry, [name]: value })

            // bug Here :- I have to set this for particular input boxes.
            keyboardRef?.current?.setInput(value);
            if (name == "englishFile" || name == "hindiFile" || name == "regionalFile" && value != "") {
                if (name == "englishFile") {
                    setEnglishClearDisplay("")
                }
                else if (name == "hindiFile") {
                    setHindiClearDisplay("")
                }
                else if (name == "regionalFile") {
                    setRegionalClearDisplay("")
                }
            }
        }
    };

    const [fileType, setFileType] = useState<any>("")

    const handleFileChange = (e: any, fileType: any) => {
        if (e.target?.files && e.target?.value != "") {
            if (fileType == "English" && statusEntry.englishFile != "") {
                deleteFile(fileType, statusEntry.englishFile)
            } else if (fileType == "Hindi" && statusEntry.hindiFile != "") {
                deleteFile(fileType, statusEntry.hindiFile)
            } else if (fileType == "Regional" && statusEntry.regionalFile != "") {
                deleteFile(fileType, statusEntry.regionalFile)
            }
            handleChange(e);
            setFileType(fileType)
            let files: any = []
            setFile([])
            if (e.target.files.length != 0) {
                files.push(e.target.files[0]);
            }
            setFile(files)
        }
    }

    const deleteFile = (fileType: any, fileName: any) => {
        setup.deleteUploadedFile(fileType, fileName);
        if (fileType == "English") {
            setStatusEntry({ ...statusEntry, ["englishFile"]: "" })
            setEnglishClearDisplay("displayNone")
        } else if (fileType == "Hindi") {
            setStatusEntry({ ...statusEntry, ["hindiFile"]: "" })
            setHindiClearDisplay("displayNone")
        } else if (fileType == "Regional") {
            setStatusEntry({ ...statusEntry, ["regionalFile"]: "" })
            setRegionalClearDisplay("displayNone")
        }
    }

    useEffect(() => {
        if (file?.length != 0) {
            FileData.append('file', file[0]);
            setup.uploadTrainStatusFile(fileType, FileData);
        }
    }, [file])

    useEffect(() => {
        trainData()
    })

    useEffect(() => {
        if (props.stationData) {
            setLoading(true);
            getTrainStatusData();
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


    const getTrainStatusData = () => {
        setup.getTrainStatus().then((data: any) => {
            if (data && data?.data && data?.status == 200) {
                setArray(data?.data);
                setLoading(false);
            }
            else if (data && data?.status != 200) {
                setArray([]);
                setLoading(false);
            }

        }
        )
    }


    const handleCancel = () => {
        if (statusEntry.englishFile != "") {
            deleteFile("English", statusEntry.englishFile)
        }
        if (statusEntry.hindiFile != "") {
            deleteFile("Hindi", statusEntry.hindiFile)
        }
        if (statusEntry.regionalFile != "") {
            deleteFile("Regional", statusEntry.regionalFile)
        }
        setStatusEntry({
            id: 0,
            statusCode: "",
            englishStatus: "",
            hindiStatus: "",
            regionalStatus: "",
            englishFile: "",
            hindiFile: "",
            regionalFile: ""
        })
        setEnglishClearDisplay("displayNone");
        setHindiClearDisplay("displayNone");
        setRegionalClearDisplay("displayNone");
        setError("")

    }
    const handleSubmit = () => {
        if (statusEntry?.id === 0) {
            setup.createTrainStatus(statusEntry, statusCodeType).then((data: any) => {
                if (data && data?.status === 200) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `Train Status added successfully`,
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        timer: 3000,
                    })
                    setup.getTrainStatus().then((data) => {
                        if (data && data?.data) {
                            setArray(data?.data)
                            setStatusEntry({
                                id: 0,
                                statusCode: "",
                                englishStatus: "",
                                hindiStatus: "",
                                regionalStatus: "",
                                englishFile: "",
                                hindiFile: "",
                                regionalFile: ""
                            })
                            setError("")

                        }
                    })
                }
                else {

                    setError(data);
                }
            });
        }
        else {
            setup.updateTrainStatus(statusEntry, statusCodeType).then((response: any) => {
                if (response && response?.status === 200) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `Train Status updated successfully`,
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        timer: 3000,
                    })
                    setup.getTrainStatus().then((data) => {
                        if (data && data?.data) {
                            setArray(data?.data);
                        }
                        setStatusEntry({
                            id: 0,
                            statusCode: "",
                            englishStatus: "",
                            hindiStatus: "",
                            regionalStatus: "",
                            englishFile: "",
                            hindiFile: "",
                            regionalFile: ""
                        })
                        setError("")
                    })
                }
                else {
                    setError(response);
                }
            });
        }
    }

    const handleEdit = (el: any) => {
        let data: any = {
            id: el,
        }
        setup.getTrainStatusById(data).then((datas) => {
            if (datas && datas?.data) {
                setStatusEntry({
                    id: datas?.data?.id,
                    statusCode: datas?.data?.statusCode,
                    englishStatus: datas?.data?.englishStatus,
                    hindiStatus: datas?.data?.hindiStatus,
                    regionalStatus: datas?.data?.regionalStatus,
                    englishFile: datas?.data?.englishFile,
                    hindiFile: datas?.data?.hindiFile,
                    regionalFile: datas?.data?.regionalFile,
                })
                if (datas?.data?.englishFile != "englishFile" || datas?.data?.hindiFile != "hindiFile" || datas?.data?.regionalFile != "regionalFile") {
                    if (datas?.data?.englishFile != "") {
                        setEnglishClearDisplay("")
                    }
                    if (datas?.data?.englishFile != "") {
                        setHindiClearDisplay("")
                    }
                    if (datas?.data?.englishFile != "") {
                        setRegionalClearDisplay("")
                    }
                }
            }
            setError("")
        });
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
            if (result?.isConfirmed) {
                let data: any = {
                    id: el,
                }
                setup.removeTrainStatus(data).then((datas) => {
                    if (datas && datas?.status === 200) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Train Status deleted successfully',
                            showConfirmButton: false,
                            allowOutsideClick: false,
                            timer: 1500,
                        });
                        setup.getTrainStatus().then((data) => {
                            if (data && data?.data) {
                                setArray(data?.data);
                            }
                        })
                    }
                })
            }
        })
    }



    const trainData = () => {
        if (array?.length != 0) {
            return (
                array?.map((el: any, i: any) => {
                    return (
                        <StyledTableRow>
                            <TableCell className="tblcolm">{i + 1}</TableCell>
                            <TableCell className="tblcolm">{el.statusCode}</TableCell>
                            <TableCell className="tblcolm">{el.englishStatus}</TableCell>
                            <TableCell className="tblcolm">{el.hindiStatus}</TableCell>
                            <TableCell className="tblcolm">{el.regionalStatus}</TableCell>
                            <TableCell className="tblcolm">{el.englishFile}<br /> {el.hindiFile}<br /> {el.regionalFile}</TableCell>
                            {/* <TableCell className="tblcolm">{el.hindiFile}</TableCell>

                        <TableCell className="tblcolm">{el.regionalFile}</TableCell> */}
                            {appUser.userRole == "ROLE_STATION MASTER" ?
                                <></>
                                :
                                <TableCell className="tblcolm">
                                    <IconButton aria-label="edit" onClick={() => handleEdit(el.id)} style={{ fontSize: "14px" }} >
                                        <EditIcon className="stationCodeIconStyle" />
                                        <span className="stationCodeIcon"> Edit</span>
                                    </IconButton>
                                </TableCell>
                            }
                            {appUser.userRole == "ROLE_STATION MASTER" ?
                                <></>
                                :
                                <TableCell className="tblcolm">
                                    <Button aria-label="edit" style={{ fontSize: "14px", paddingLeft: "10px" }} onClick={() => handleDelete(el.id)}>
                                        <DeleteIcon className="stationCodeIconStyle" />
                                        <span className="stationCodeIcon" > Delete</span>
                                    </Button>
                                </TableCell>
                            }
                        </StyledTableRow>
                    )
                })
            )
        }
        else {
            return (
                <TableRow>
                    <TableCell colSpan={6} style={{ borderBottom: '0px' }}><span className="cdsNoTable">No Data Available</span></TableCell>
                </TableRow>
            )
        }
    }

    return (
        <>

            <Card className="TSCardStyle">
                <Grid>
                    {appUser.userRole == "ROLE_STATION MASTER" ? <></> :
                        <Card style={{ border: "1px solid #DDDDDD" }} className="TSCardStyle">
                            <Grid container style={{ marginBottom: "16px" }}><Typography className="txt">
                                <b> Train Status Entry</b>
                            </Typography></Grid>

                            {/* <Grid container>

                                <Grid item xs={6} className="E-StaitionCode">
                                    Status Code<span className="asterisk">*</span>
                                </Grid>

                                <Grid item xs={6}>
                                    <Select name="statusCode"
                                        defaultValue={statusEntry.statusCode}
                                        className="eselectType"
                                        required={true}
                                        onChange={handleChange}
                                        id="grouped-select">
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <ListSubheader>Arrival</ListSubheader>
                                        <MenuItem value="ACancelled">Cancelled</MenuItem>
                                        <MenuItem value="AHas Arrived On">Has Arrived On</MenuItem>
                                        <MenuItem value="AIndefinite Late">Indefinite Late</MenuItem>
                                        <MenuItem value="AIs Arriving On">Is Arriving On</MenuItem>
                                        <MenuItem value="APlatform Change">Platform Change</MenuItem>
                                        <MenuItem value="ARunning Late">Running Late</MenuItem>
                                        <MenuItem value="ARunning Right Time">Running Right Time</MenuItem>
                                        <MenuItem value="ATerminated">Terminated</MenuItem>
                                        <MenuItem value="AWill Arrive Shortly">Will Arrive Shortly</MenuItem>
                                        <ListSubheader>Departure</ListSubheader>
                                        <MenuItem value="DCancelled">Cancelled</MenuItem>
                                        <MenuItem value="DDiverted">Diverted</MenuItem>
                                        <MenuItem value="DHas Left">Has Left</MenuItem>
                                        <MenuItem value="DIs On Platform">Is On Platform</MenuItem>
                                        <MenuItem value="DIs Ready To Leave">Is Ready To Leave</MenuItem>
                                        <MenuItem value="DPlatform change">Platform change</MenuItem>
                                        <MenuItem value="DRescheduled">Rescheduled</MenuItem>
                                        <MenuItem value="DRunning Right Time">Running Right Time</MenuItem>
                                        <MenuItem value="DScheduled departure">Scheduled departure</MenuItem>
                                    </Select>

                                </Grid>
                            </Grid>
                            <Grid container style={{ width: "29.31%" }}>
                                <Grid item xs={7} className="E-Status">
                                    English Status<span className="asterisk">*</span>
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        size="small"
                                        name="englishStatus"
                                        value={statusEntry.englishStatus}
                                        className="sceSmallbox"
                                        required={true}
                                        variant="outlined"
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container style={{ width: "44.2%" }}>
                                <Grid item lg={4} className="E-File">
                                    English File
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField
                                        size="small"
                                        value={statusEntry.englishFile}
                                        name="englishFile"
                                        className="sceBigbox"
                                        variant="outlined"
                                        onChange={handleChange}
                                        disabled={true}
                                        placeholder="Choose .mp3 or .wav files"
                                        InputProps={{
                                            endAdornment: <ClearIcon className={englishCleardisplay} onClick={() => { deleteFile("English", statusEntry.englishFile) }} style={{ color: "red", cursor: "pointer" }} />
                                        }}
                                    />

                                </Grid>
                                <Grid item xs={3} style={{ paddingTop: "6.73%" }}>
                                    <Button
                                        className="browsebtn"
                                        variant="contained"
                                        component="label"
                                    >
                                        BROWSE
                                        <input
                                            value={""}
                                            onChange={(e: any) => { handleFileChange(e, "English") }}
                                            name="englishFile"
                                            type="file"
                                            accept="audio/mp3 , audio/wav"
                                            hidden
                                        />
                                    </Button>
                                </Grid>
                            </Grid> */}
                            <Grid container className="mb-20">
                                <Grid item xs={3}>
                                    <Grid container>
                                        <Grid item xs={5} className="TSLabels">
                                            <Typography style={{ textAlign: 'end' }}>Status Code<span className="asterisk">*</span></Typography>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <Select name="statusCode"
                                                defaultValue={statusEntry.statusCode}
                                                className="eselectType2"
                                                required={true}
                                                onChange={handleChange}
                                                id="grouped-select">
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <ListSubheader>Arrival</ListSubheader>
                                                <MenuItem value="ACancelled">Cancelled</MenuItem>
                                                <MenuItem value="AHas Arrived On">Has Arrived On</MenuItem>
                                                <MenuItem value="AIndefinite Late">Indefinite Late</MenuItem>
                                                <MenuItem value="AIs Arriving On">Is Arriving On</MenuItem>
                                                <MenuItem value="APlatform Change">Platform Change</MenuItem>
                                                <MenuItem value="ARunning Late">Running Late</MenuItem>
                                                <MenuItem value="ARunning Right Time">Running Right Time</MenuItem>
                                                <MenuItem value="ATerminated">Terminated</MenuItem>
                                                <MenuItem value="AWill Arrive Shortly">Will Arrive Shortly</MenuItem>
                                                <ListSubheader>Departure</ListSubheader>
                                                <MenuItem value="DCancelled">Cancelled</MenuItem>
                                                <MenuItem value="DDiverted">Diverted</MenuItem>
                                                <MenuItem value="DHas Left">Has Left</MenuItem>
                                                <MenuItem value="DIs On Platform">Is On Platform</MenuItem>
                                                <MenuItem value="DIs Ready To Leave">Is Ready To Leave</MenuItem>
                                                <MenuItem value="DPlatform change">Platform change</MenuItem>
                                                <MenuItem value="DRescheduled">Rescheduled</MenuItem>
                                                <MenuItem value="DRunning Right Time">Running Right Time</MenuItem>
                                                <MenuItem value="DScheduled departure">Scheduled departure</MenuItem>
                                            </Select>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={3}>
                                    <Grid container>
                                        <Grid item xs={5} className="TSLabels">
                                            <Typography style={{ textAlign: 'end' }}>English Status<span className="asterisk">*</span></Typography>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <TextField
                                                size="small"
                                                name="englishStatus"
                                                value={statusEntry.englishStatus}
                                                className="sceSmallbox TSTextbox"
                                                required={true}
                                                variant="outlined"
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={3}>
                                    <Grid container>
                                        <Grid item xs={5} className="TSLabels">
                                            <Typography style={{ textAlign: 'end' }}> English File</Typography>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <TextField
                                                size="small"
                                                value={statusEntry.englishFile}
                                                name="englishFile"
                                                className="sceBigbox TSTextbox"
                                                variant="outlined"
                                                onChange={handleChange}
                                                disabled={true}
                                                placeholder="Choose .mp3 or .wav files"
                                                InputProps={{
                                                    endAdornment: <ClearIcon className={englishCleardisplay} onClick={() => { deleteFile("English", statusEntry.englishFile) }} style={{ color: "red", cursor: "pointer" }} />
                                                }}
                                            /></Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={2} lg={1} xl={2} style = {{ alignSelf : "center" }}>
                                    <Button
                                        className="browsebtn"
                                        variant="contained"
                                        component="label"
                                    >
                                        BROWSE
                                        <input
                                            value={""}
                                            onChange={(e: any) => { handleFileChange(e, "English") }}
                                            name="englishFile"
                                            type="file"
                                            accept="audio/mp3 , audio/wav"
                                            hidden
                                        />
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid container className="mb-20">
                                <Grid item xs={3}></Grid>
                                <Grid item xs={3}>
                                    <Grid container>
                                        <Grid item xs={5} className="TSLabels">
                                            <Typography style={{ textAlign: 'end' }}> Hindi Status<span className="asterisk">*</span></Typography>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <TextField
                                                size="small"
                                                value={statusEntry.hindiStatus}
                                                name="hindiStatus"
                                                className="sceSmallbox2 TSTextbox"
                                                variant="outlined"
                                                onChange={handleChange}
                                                onFocus={() => {
                                                    setKeyboardVisibility(true);
                                                    setRegionalKeyboardVisibility(false);
                                                }}
                                            />
                                        </Grid>
                                    </Grid>

                                </Grid>
                                <Grid item xs={3}>
                                    <Grid container>
                                        <Grid item xs={5} className="TSLabels">
                                            <Typography style={{ textAlign: 'end' }}> Hindi File</Typography>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <TextField
                                                size="small"
                                                name="hindiFile"
                                                value={statusEntry.hindiFile}
                                                className="sceBigbox2 TSTextbox"
                                                variant="outlined"
                                                onChange={handleChange}
                                                disabled={true}
                                                placeholder="Choose .mp3 or .wav files"
                                                InputProps={{
                                                    endAdornment: <ClearIcon className={hindiCleardisplay} onClick={() => { deleteFile("Hindi", statusEntry.hindiFile) }} style={{ color: "red", cursor: "pointer" }} />
                                                }}

                                            />
                                        </Grid>
                                    </Grid>
                                    
                                </Grid>
                                <Grid item xs={3} lg={1} xl={2} style = {{ alignSelf : "center"}}>
                                        <Button
                                            className="browsebtn"
                                            variant="contained"
                                            component="label"
                                        >
                                            BROWSE
                                            <input
                                                onChange={(e: any) => { handleFileChange(e, "Hindi") }}
                                                name="hindiFile"
                                                value={""}
                                                type="file"
                                                accept="audio/mp3 , audio/wav"
                                                hidden
                                            />
                                        </Button>
                                    </Grid>
                                {/* <Grid container style={{ width: "26.4%" }}>
                                </Grid>
                                <Grid container style={{ width: "29.31%" }}>
                                    <Grid item xs={7} className="H-Status">
                                        Hindi Status<span className="asterisk">*</span>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <TextField
                                            size="small"
                                            value={statusEntry.hindiStatus}
                                            name="hindiStatus"
                                            className="sceSmallbox2"
                                            variant="outlined"
                                            onChange={handleChange}
                                            onFocus={() => {
                                                setKeyboardVisibility(true);
                                                setRegionalKeyboardVisibility(false);
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container style={{ width: "44.2%" }}>
                                    <Grid item xs={4} className="H-File">
                                        Hindi File
                                    </Grid>
                                    <Grid item xs={5}>
                                        <TextField
                                            size="small"
                                            name="hindiFile"
                                            value={statusEntry.hindiFile}
                                            className="sceBigbox2"
                                            variant="outlined"
                                            onChange={handleChange}
                                            disabled={true}
                                            placeholder="Choose .mp3 or .wav files"
                                            InputProps={{
                                                endAdornment: <ClearIcon className={hindiCleardisplay} onClick={() => { deleteFile("Hindi", statusEntry.hindiFile) }} style={{ color: "red", cursor: "pointer" }} />
                                            }}

                                        />
                                    </Grid>
                                    <Grid item xs={3} style={{ paddingTop: "6.73%" }}>
                                        <Button
                                            className="browsebtn"
                                            variant="contained"
                                            component="label"
                                        >
                                            BROWSE
                                            <input
                                                onChange={(e: any) => { handleFileChange(e, "Hindi") }}
                                                name="hindiFile"
                                                value={""}
                                                type="file"
                                                accept="audio/mp3 , audio/wav"
                                                hidden
                                            />
                                        </Button>
                                    </Grid>

                                </Grid>*/}

                            </Grid>
                            {/* <Grid container>
                                <Grid container style={{ width: "26.4%" }}>
                                </Grid>
                                <Grid container style={{ width: "29.31%" }}>
                                    <Grid item xs={7} className="R-Status">
                                        {regionalLanguage} Status
                                    </Grid>

                                    <Grid item xs={4}>
                                        <TextField
                                            size="small"
                                            value={statusEntry.regionalStatus}
                                            name="regionalStatus"
                                            className="sceSmallbox3"
                                            required={true}
                                            variant="outlined"
                                            onChange={handleChange}
                                            onFocus={() => {
                                                setKeyboardVisibility(false);
                                                setRegionalKeyboardVisibility(true);
                                            }}
                                        />

                                    </Grid>
                                </Grid>
                                <Grid container style={{ width: "44.2%" }}>
                                    <Grid item xs={4} className="R-File">
                                        {regionalLanguage} File
                                    </Grid>
                                    <Grid item xs={5}>
                                        <TextField
                                            size="small"
                                            name="regionalFile"
                                            value={statusEntry.regionalFile}
                                            required={true}
                                            className="sceBigbox3"
                                            variant="outlined"
                                            onChange={handleChange}
                                            disabled={true}
                                            placeholder="Choose .mp3 or .wav files"
                                            InputProps={{
                                                endAdornment: <ClearIcon className={regionalCleardisplay} onClick={() => { deleteFile("Regional", statusEntry.regionalFile) }} style={{ color: "red", cursor: "pointer" }} />
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={3} style={{ paddingTop: "5.5%" }}>
                                        <Button
                                            className="browsebtn"
                                            variant="contained"
                                            component="label"
                                        >
                                            BROWSE
                                            <input
                                                value={""}
                                                onChange={(e: any) => { handleFileChange(e, "Regional") }}
                                                name="regionalFile"
                                                accept="audio/mp3 , audio/wav"
                                                type="file"
                                                hidden
                                            />
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid>
                                    <div>
                                        {error != "" ? <div style={{ color: "red", textAlign: "center" }}> {error}</div> : <></>}
                                    </div>
                                </Grid>
                                <Grid container style={{ justifyContent: "center", paddingTop: "2.11%", paddingBottom: "2.54%" }}>
                                    <Button
                                        onClick={handleSubmit}
                                        type="submit"
                                        className="savebutton"
                                        variant="contained"
                                    >
                                        <AddIcon className="icon" type="submit" />
                                        <span className="btnfont">{statusEntry.id == 0 ? buttonText : updateText}</span>
                                    </Button>
                                    <Button
                                        type="reset"
                                        value="Reset"
                                        variant="outlined"
                                        className="canclebutton"
                                        onClick={handleCancel}
                                    >
                                        <CloseIcon className="icon" />
                                        <span className="btnfont">CANCEL</span>
                                    </Button>
                                </Grid>
                            </Grid> */}
                            <Grid container className="mb-60">
                                <Grid item xs={3}></Grid>
                                <Grid item xs={3}>
                                    <Grid container>
                                        <Grid item xs={5} className="TSLabels">
                                            <Typography style={{ textAlign: "end" }}>{regionalLanguage} Status
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <TextField
                                                size="small"
                                                value={statusEntry.regionalStatus}
                                                name="regionalStatus"
                                                className="sceSmallbox3 TSTextbox"
                                                required={true}
                                                variant="outlined"
                                                onChange={handleChange}
                                                onFocus={() => {
                                                    setKeyboardVisibility(false);
                                                    setRegionalKeyboardVisibility(true);
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={3}>
                                    <Grid container>
                                        <Grid item xs={5} className="TSLabels"><Typography style={{ textAlign: 'end' }}>{regionalLanguage} File</Typography></Grid>
                                        <Grid item xs={7}>
                                            <TextField
                                                size="small"
                                                name="regionalFile"
                                                value={statusEntry.regionalFile}
                                                required={true}
                                                className="sceBigbox3 TSTextbox"
                                                variant="outlined"
                                                onChange={handleChange}
                                                disabled={true}
                                                placeholder="Choose .mp3 or .wav files"
                                                InputProps={{
                                                    endAdornment: <ClearIcon className={regionalCleardisplay} onClick={() => { deleteFile("Regional", statusEntry.regionalFile) }} style={{ color: "red", cursor: "pointer" }} />
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={3} lg={1} xl={2} style = {{ alignSelf : "center"}}>
                                        <Button
                                            className="browsebtn"
                                            variant="contained"
                                            component="label"
                                        >
                                            BROWSE
                                            <input
                                                value={""}
                                                onChange={(e: any) => { handleFileChange(e, "Regional") }}
                                                name="regionalFile"
                                                accept="audio/mp3 , audio/wav"
                                                type="file"
                                                hidden
                                            />
                                        </Button>
                                    </Grid>
                            </Grid>
                                {error != "" ? <Grid container style={{ color: "red", textAlign: "center", display: "flex" , justifyContent : "center" , marginBottom : "10px"}}> {error}</Grid> : <></>}
                            <Grid container spacing={2} style={{ justifyContent: "center" }}>
                                <Grid item xs={2} md={3} xl={2}>
                                    <Button
                                        onClick={handleSubmit}
                                        type="submit"
                                        className="savebutton tsBtn"
                                        variant="contained"
                                    >
                                        <AddIcon className="icon" type="submit" />
                                        <span className="btnfont btn-font">{statusEntry.id == 0 ? buttonText : updateText}</span>
                                    </Button>
                                </Grid>
                                <Grid item xs={2} md={3} xl={2}>
                                    <Button
                                        type="reset"
                                        value="Reset"
                                        variant="outlined"
                                        className="canclebutton tsBtn"
                                        onClick={handleCancel}
                                    >
                                        <CloseIcon className="icon" />
                                        <span className="btnfont btn-font">CANCEL</span>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Card>
                    }

                    <Card style={{ border: "1px solid #DDDDDD", marginTop: "1.75%" }} className="TSCardStyle">
                        <Grid container style={{ marginBottom: "10px" }}>
                            <Typography className="txt"><b>Exisitng Station Data</b></Typography>
                        </Grid>
                        <TableContainer style={{ maxHeight: "32vh" }}>
                            <Table stickyHeader aria-label="sticky table" className="uniqueName">
                                <TableHead className="tblhead">
                                    <TableRow>
                                        <TableCell className="tblRow" style={{ width: "5%" }}>
                                            S.No.
                                        </TableCell >
                                        <TableCell className="tblRow w6">
                                            Status Code
                                        </TableCell>
                                        <TableCell className="tblRow w12">
                                            English Status
                                        </TableCell>
                                        <TableCell className="tblRow" style={{ width: '13%' }}>
                                            Hindi Status
                                        </TableCell>
                                        <TableCell className="tblRow w12">
                                            Regional Status
                                        </TableCell>

                                        <TableCell className="tblRow" colSpan={1}>
                                            Audio Files
                                        </TableCell>
                                        {appUser.userRole == "ROLE_STATION MASTER" ? <></> :
                                            <TableCell className="tblRow" style={{ width: "15%" }} colSpan={2}>
                                                Actions
                                            </TableCell>}
                                    </TableRow>
                                </TableHead>
                                {
                                    loading ? (<TableRow><TableCell colSpan={6} className="loderIcon" ><CircularProgress size={30} /><br />Loading...</TableCell></TableRow>) :
                                        <TableBody className="tblbdy">
                                            {trainData()}
                                        </TableBody>
                                }
                            </Table>
                        </TableContainer>
                    </Card>
                </Grid>
            </Card>
            {keyboardVisibility && (
                <Keyboard
                    keyboardRef={(r: any) => (keyboardRef.current = r)}
                    onChange={(e: any) => setStatusEntry({ ...statusEntry, "hindiStatus": e })}
                    onKeyPress={(button: any) => onKeyPress(button)}
                    {...hindi}
                    layoutName={layout == "default" ? "default" : "shift"}
                />)}

            {regionalKeyboardVisibility && (
                <Keyboard
                    keyboardRef={(r: any) => (keyboardRef.current = r)}
                    onChange={(e: any) => setStatusEntry({ ...statusEntry, "regionalStatus": e })}
                    onClick={(e: any) => e.stopPropagation()}
                    onKeyPress={(button: any) => onKeyPress(button)}
                    {...keyboardRegionalLanguage}
                    layoutName={layout == "default" ? "default" : "shift"}
                />)}
        </>
    )

}