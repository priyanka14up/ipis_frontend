import { Button, Card, CircularProgress, createStyles, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Theme, Typography, withStyles } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from '@material-ui/icons/Add';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import { useEffect, useRef, useState } from "react";
import StationCodeModel from "../../model/setup/stationcodeModel";
import SetupService from "../service/setup/setup";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { authuserStateSelector } from "../../redux/reducers/authUser/authUser";
import { Autocomplete } from "@material-ui/lab";
import ClearIcon from '@material-ui/icons/Clear';
import Keyboard from "react-simple-keyboard";
import hindi from "simple-keyboard-layouts/build/layouts/hindi";
import punjabi from "../common/languages/punjabi";
import tamil from "../common/languages/tamil";
import oriya from "../common/languages/oriya";
import marathi from "../common/languages/marathi";
import telugu from "../common/languages/telugu";
import gujarati from "../common/languages/gujarati";
import bengali from "simple-keyboard-layouts/build/layouts/bengali";
import urdu from "simple-keyboard-layouts/build/layouts/urdu";
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

export const StationCodeEntry = (props: any) => {
    const { regionalLanguage } = props;
    const { appUser } = useSelector(authuserStateSelector)
    const [input, setInput] = useState<StationCodeModel | any>({
        id: 0,
        stationCode: "",
        englishStationName: "",
        hindiStationName: "",
        regionalStationName: "",
        englishWaveFile: "",
        hindiWaveFile: "",
        regionalWaveFile: "",
        createdBy: "1"
    });
    const [array, setArray] = useState<[]>([]);
    const [stationCodesArray, setStationCodesArray] = useState<[]>([]);
    const [error, setError] = useState("");
    const buttonText = "Add";
    const updateText = "Update";
    const [englishCleardisplay, setEnglishClearDisplay] = useState("displayNone");
    const [hindiCleardisplay, setHindiClearDisplay] = useState("displayNone");
    const [regionalCleardisplay, setRegionalClearDisplay] = useState("displayNone");
    const [keyboardVisibility, setKeyboardVisibility] = useState(false);
    const [regionalKeyboardVisibility, setRegionalKeyboardVisibility] = useState(false);
    const FileData = new FormData();
    const [file, setFile] = useState<any>([])
    const [loading, setLoading] = useState<any>(false);
    const [fileType, setFileType] = useState<any>("")
    const [layout, setLayout] = useState("default");
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

    const deleteFile = (fileType: any, fileName: any) => {
        setup.deleteStationCodeUploadedFile(fileType, fileName);
        if (fileType == "English") {
            setInput({ ...input, ["englishWaveFile"]: "" })
            setEnglishClearDisplay("displayNone")
        } else if (fileType == "Hindi") {
            setInput({ ...input, ["hindiWaveFile"]: "" })
            setHindiClearDisplay("displayNone")
        } else if (fileType == "Regional") {
            setInput({ ...input, ["regionalWaveFile"]: "" })
            setRegionalClearDisplay("displayNone")
        }
    }

    useEffect(() => {
        if (file?.length != 0) {
            FileData.append('file', file[0]);
            setup.uploadStationCodeFile(fileType, FileData);
        }
    }, [file])

    const handleChange = (e: any) => {
        var { name, value } = e.target;
        if (name == 'stationCode') {
            if (value.match(/^[a-z ]{0,10}$/i)) {
                setInput({ ...input, [name]: value.toUpperCase() });

            }
        }
        else if (name === "englishStationName" || name === "hindiStationName" || name === "regionalStationName") {
            if (value.match(/^[a-z ]{0,20}$/i)) {
                setInput({ ...input, [name]: value });
            }
        }
        else {
            setInput({ ...input, [name]: value });
            keyboardRef?.current?.setInput(value);

            if (name == "englishWaveFile" || name == "hindiWaveFile" || name == "regionalWaveFile" && value != "") {
                if (name == "englishWaveFile") {
                    setEnglishClearDisplay("")
                }
                else if (name == "hindiWaveFile") {
                    setHindiClearDisplay("")
                }
                else if (name == "regionalWaveFile") {
                    setRegionalClearDisplay("")
                }
            }
        }
    };

    const handleFileChange = (e: any, fileType: any) => {
        if (e.target?.files && e.target?.value != "") {
            if (fileType == "English" && input.englishWaveFile != "") {
                deleteFile(fileType, input.englishWaveFile)
            } else if (fileType == "Hindi" && input.hindiWaveFile != "") {
                deleteFile(fileType, input.hindiWaveFile)
            } else if (fileType == "Regional" && input.regionalWaveFile != "") {
                deleteFile(fileType, input.regionalWaveFile)
            }
            handleChange(e);
            setFileType(fileType)
            let files: any = []
            setFile([])
            if (e.target?.files?.length != 0) {
                files.push(e.target?.files[0]);
            }
            setFile(files)
        }
    }


    const handleAutocomplete = (value: any) => {
        setInput({ ...input, ["stationCode"]: value });
    };

    useEffect(() => {
        if (props?.stationData) {
            setLoading(true);
            getStationCodeEntryData();
        }
        else if (props?.stationData == false) {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Please Enter Station Details",
                showConfirmButton: false,
                allowOutsideClick: false,
                timer: 3000
            })
                .then(() => {
                    props?.updateSelectedSideBarMenu("setupMain");
                })
        }
    }, [])

    const getStationCodeEntryData = () => {
        setup.getStationCodeEntry().then((data) => {
            if (data && data?.data && data?.status == 200) {
                setArray(data?.data);
                setLoading(false);
            }
            else if (data?.status != 200) {
                setArray([]);
                setLoading(false);
            }

        }
        )
    }



    const handleSubmit = () => {
        if (input?.id === 0) {
            setup.createStationCodeEntry(input).then((data: any) => {
                if (data && data?.status === 200) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `Station Code added successfully`,
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        timer: 3000,
                    })
                    setup.getStationCodeEntry().then((data) => {
                        if (data && data?.data) {
                            setArray(data?.data);
                        }
                        setInput({
                            id: 0,
                            stationCode: "",
                            englishStationName: "",
                            hindiStationName: "",
                            regionalStationName: "",
                            englishWaveFile: "",
                            hindiWaveFile: "",
                            regionalWaveFile: "",
                        })
                        setEnglishClearDisplay("displayNone")
                        setHindiClearDisplay("displayNone")
                        setRegionalClearDisplay("displayNone")
                        setError("")
                    })
                }
                else {
                    setError(data?.errorMsg);
                }
            });
        }
        else {
            setup.updateStationCodeEntry(input).then((response: any) => {
                if (response && response?.status === 200) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `Station Code updated successfully`,
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        timer: 3000,
                    })
                    setup.getStationCodeEntry().then((data) => {
                        if (data && data?.data) {
                            setArray(data?.data);
                        }
                        setInput({
                            id: 0,
                            stationCode: "",
                            englishStationName: "",
                            hindiStationName: "",
                            regionalStationName: "",
                            englishWaveFile: "",
                            hindiWaveFile: "",
                            regionalWaveFile: "",
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

    useEffect(() => {
        setup.getAllStationCodes().then((data) => {
            if (data && data?.data && data?.data?.length != 0) {
                setStationCodesArray(data?.data);
            } else {
                setStationCodesArray([]);
            }
        }
        )
    }, [array])



    const handleEdit = (el: any) => {
        let data: any = {
            id: el,
        }
        setup.getStationCodeEntryById(data).then((datas) => {
            if (datas && datas?.data) {
                setInput({
                    id: datas?.data?.id,
                    stationCode: datas?.data?.stationCode,
                    englishStationName: datas?.data?.englishStationName,
                    hindiStationName: datas?.data?.hindiStationName,
                    regionalStationName: datas?.data?.regionalStationName,
                    englishWaveFile: datas?.data?.englishWaveFile,
                    hindiWaveFile: datas?.data?.hindiWaveFile,
                    regionalWaveFile: datas?.data?.regionalWaveFile,
                })
                if (datas?.data?.englishWaveFile != "" || datas?.data?.hindiWaveFile != "" || datas?.data?.regionalWaveFile != "") {
                    if (datas?.data?.englishWaveFile != "") {
                        setEnglishClearDisplay("")
                    }
                    else {
                        setEnglishClearDisplay("displayNone")
                    }
                    if (datas?.data?.hindiWaveFile != "") {
                        setHindiClearDisplay("")
                    }
                    else {
                        setHindiClearDisplay("displayNone")
                    }
                    if (datas?.data?.regionalWaveFile != "") {
                        setRegionalClearDisplay("")
                    }
                    else {
                        setRegionalClearDisplay("displayNone")
                    }
                }
            }
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
                setup.removeStationCodeEntry(data).then((datas) => {
                    if (datas && datas?.status === 200) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Station Code Entry deleted successfully',
                            showConfirmButton: false,
                            allowOutsideClick: false,
                            timer: 1500,
                        });
                        setup.getStationCodeEntry().then((data) => {
                            if (data && data?.data) {
                                setArray(data?.data);
                            }
                        })
                    }
                })
            }
        })
    }

    const handleCancel = () => {
        if (input.englishWaveFile != "") {
            deleteFile("English", input.englishWaveFile)
        }
        if (input.hindiWaveFile != "") {
            deleteFile("Hindi", input.hindiWaveFile)
        }
        if (input.regionalWaveFile != "") {
            deleteFile("Regional", input.regionalWaveFile)
        }
        setInput({
            id: 0,
            stationCode: "",
            englishStationName: "",
            hindiStationName: "",
            regionalStationName: "",
            englishWaveFile: "",
            hindiWaveFile: "",
            regionalWaveFile: "",
        });
        setError("")
        setEnglishClearDisplay("displayNone");
        setHindiClearDisplay("displayNone");
        setRegionalClearDisplay("displayNone");
        setError("")

    }
    useEffect(() => {
        stationData()
    }, [array])

    const stationData = () => {
        if (array?.length != 0) {
            return (
                array?.map((el: any, i: any) => {
                    return (
                        <StyledTableRow>
                            <TableCell className="tblcolm">{i + 1}</TableCell>
                            <TableCell className="tblcolm">{el?.stationCode}</TableCell>
                            <TableCell className="tblcolm">{el?.englishStationName}</TableCell>
                            <TableCell className="tblcolm">{el?.hindiStationName}</TableCell>
                            <TableCell className="tblcolm">{el?.regionalStationName}</TableCell>
                            <TableCell colSpan={1} className="tblcolm">{el?.englishWaveFile} <br />{el?.hindiWaveFile} <br />{el?.regionalWaveFile}</TableCell>
                            {/* <TableCell colSpan={1} className="tblcolm">{el?.hindiWaveFile}</TableCell>
    
                            <TableCell colSpan={1} className="tblcolm">{el?.regionalWaveFile}</TableCell> */}
                            {appUser?.userRole == "ROLE_STATION MASTER" ?
                                <></>
                                :
                                <TableCell className="tblcolm">
                                    <IconButton aria-label="edit" onClick={() => handleEdit(el?.id)} style={{ fontSize: "14px" }} >
                                        <EditIcon className="stationCodeIconStyle" />
                                        <span className="stationCodeIcon"> Edit</span>
                                    </IconButton>
                                </TableCell>
                            }
                            {appUser?.userRole == "ROLE_STATION MASTER" ?
                                <></>
                                :
                                <TableCell className="tblcolm">
                                    <IconButton aria-label="edit" onClick={() => handleDelete(el?.id)} style={{ fontSize: "14px", paddingLeft: "10px" }} >
                                        <DeleteIcon className="stationCodeIconStyle" />
                                        <span className="stationCodeIcon" > Delete</span>
                                    </IconButton>
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
                    {appUser?.userRole == "ROLE_STATION MASTER" ? <></> :
                        <Card style={{ border: "1px solid #DDDDDD" }} className="TSCardStyle">
                            <Grid container style={{ marginBottom: '15px' }}>
                                <Typography className="txt">
                                    <b> New Station Entry</b>
                                </Typography>
                            </Grid>
                            <Grid container className="mb-20">
                                {/* <Grid container style={{ width: "26.4%" }} >
                                    <Grid item xs={6} className="E-StaitionCode">
                                        Station Code<span className="asterisk">*</span>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Autocomplete
                                            className="eselectType"
                                            freeSolo
                                            onChange={(event, value) => handleAutocomplete(value)}
                                            disableClearable
                                            options={stationCodesArray?.map((option: any) => option)}
                                            inputValue={input?.stationCode}
                                            renderInput={(params: any) => (
                                                <TextField
                                                    value={input?.stationCode}
                                                    {...params}
                                                    onChange={handleChange}
                                                    name="stationCode"
                                                    variant="outlined"
                                                    size="small"
                                                    className="eautoComplete"

                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container style={{ width: "29.31%" }}>
                                    <Grid item xs={7} className="E-StaitionName">
                                        English Station Name<span className="asterisk">*</span>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            size="small"
                                            name="englishStationName"
                                            required={true}
                                            value={input?.englishStationName}
                                            onChange={handleChange}
                                            className="sceSmallbox"
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container style={{ width: "44.2%" }}>
                                    <Grid item xs={4} className="E-File">
                                        English File
                                    </Grid>
                                    <Grid item xs={5}>
                                        <TextField
                                            size="small"
                                            name="englishWaveFile"
                                            value={input?.englishWaveFile}
                                            onChange={handleChange}
                                            className="sceBigbox"
                                            variant="outlined"
                                            disabled={true}
                                            placeholder="Choose .mp3 or .wav files"
                                            InputProps={{
                                                endAdornment: <ClearIcon className={englishCleardisplay} onClick={() => { deleteFile("English", input?.englishWaveFile) }} style={{ color: "red", cursor: "pointer" }} />
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
                                                name="englishWaveFile"
                                                type="file"
                                                hidden
                                                accept="audio/mp3 , audio/wav"
                                            />
                                        </Button>
                                    </Grid>

                                </Grid>*/}
                                <Grid item xs={3}>
                                    <Grid container>
                                        <Grid item xs={5} className="TSLabels">
                                            <Typography className="labelAlign"> Station Code<span className="asterisk">*</span></Typography>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <Autocomplete
                                                className="eselectType"
                                                freeSolo
                                                onChange={(event, value) => handleAutocomplete(value)}
                                                disableClearable
                                                options={stationCodesArray?.map((option: any) => option)}
                                                inputValue={input?.stationCode}
                                                renderInput={(params: any) => (
                                                    <TextField
                                                        value={input?.stationCode}
                                                        {...params}
                                                        onChange={handleChange}
                                                        name="stationCode"
                                                        variant="outlined"
                                                        size="small"
                                                        className="eautoComplete"

                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={3}>
                                    <Grid container>
                                        <Grid item xs={5} className="TSLa">
                                            <Typography className="labelAlign">  English Station Name<span className="asterisk">*</span></Typography>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <TextField
                                                size="small"
                                                name="englishStationName"
                                                required={true}
                                                value={input?.englishStationName}
                                                onChange={handleChange}
                                                className="sceSmallbox TSTextbox"
                                                variant="outlined"
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={3}>
                                    <Grid container>
                                        <Grid item xs={5} className="TSLabels">
                                            <Typography className="labelAlign"> English File</Typography>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <TextField
                                                size="small"
                                                name="englishWaveFile"
                                                value={input?.englishWaveFile}
                                                onChange={handleChange}
                                                className="sceBigbox TSTextbox"
                                                variant="outlined"
                                                disabled={true}
                                                placeholder="Choose .mp3 or .wav files"
                                                InputProps={{
                                                    endAdornment: <ClearIcon className={englishCleardisplay} onClick={() => { deleteFile("English", input?.englishWaveFile) }} style={{ color: "red", cursor: "pointer" }} />
                                                }}
                                            />
                                        </Grid>

                                    </Grid>
                                </Grid>
                                <Grid item xs={3} lg={1} xl={2} style = {{ alignSelf : "center" }}>
                                    <Button
                                        className="browsebtn"
                                        variant="contained"
                                        component="label"
                                    >
                                        BROWSE
                                        <input
                                            value={""}
                                            onChange={(e: any) => { handleFileChange(e, "English") }}
                                            name="englishWaveFile"
                                            type="file"
                                            hidden
                                            accept="audio/mp3 , audio/wav"
                                        />
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid container className="mb-20">
                                <Grid item xs={3}></Grid>
                                <Grid item xs={3}>
                                    <Grid container>
                                        <Grid item xs={5} className="TSLabels">
                                            <Typography className="labelAlign"> Hindi Station Name</Typography>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <TextField
                                                size="small"
                                                name="hindiStationName"
                                                value={input?.hindiStationName}
                                                onChange={handleChange}
                                                className="sceSmallbox2 TSTextbox"
                                                variant="outlined"
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
                                            <Typography className="labelAlign">
                                                Hindi File
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <TextField
                                                size="small"
                                                name="hindiWaveFile"
                                                value={input?.hindiWaveFile}
                                                onChange={handleChange}
                                                className="sceBigbox2 TSTextbox"
                                                variant="outlined"
                                                disabled={true}
                                                placeholder="Choose .mp3 or .wav files"
                                                InputProps={{
                                                    endAdornment: <ClearIcon className={hindiCleardisplay} onClick={() => { deleteFile("Hindi", input?.hindiWaveFile) }} style={{ color: "red", cursor: "pointer" }} />
                                                }}
                                            />
                                        </Grid>

                                    </Grid>
                                </Grid>
                                <Grid item xs={3} lg={1} xl={2} style = {{ alignSelf : "center" }}>
                                    <Button
                                        className="browsebtn"
                                        variant="contained"
                                        component="label"
                                    >
                                        BROWSE
                                        <input
                                            value={""}
                                            onChange={(e: any) => { handleFileChange(e, "Hindi") }}
                                            name="hindiWaveFile"
                                            type="file"
                                            accept="audio/mp3 , audio/wav"
                                            hidden
                                        />
                                    </Button>
                                </Grid>
                                {/*<Grid container style={{ width: "29.31%" }}>
                                    <Grid item xs={7} className="H-StaitionName">
                                        Hindi Station Name
                                    </Grid>

                                    <Grid item xs={4}>
                                        <TextField
                                            size="small"
                                            name="hindiStationName"
                                            value={input?.hindiStationName}
                                            onChange={handleChange}
                                            className="sceSmallbox2"
                                            variant="outlined"
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
                                            name="hindiWaveFile"
                                            value={input?.hindiWaveFile}
                                            onChange={handleChange}
                                            className="sceBigbox2"
                                            variant="outlined"
                                            disabled={true}
                                            placeholder="Choose .mp3 or .wav files"
                                            InputProps={{
                                                endAdornment: <ClearIcon className={hindiCleardisplay} onClick={() => { deleteFile("Hindi", input?.hindiWaveFile) }} style={{ color: "red", cursor: "pointer" }} />
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
                                                onChange={(e: any) => { handleFileChange(e, "Hindi") }}
                                                name="hindiWaveFile"
                                                type="file"
                                                accept="audio/mp3 , audio/wav"
                                                hidden
                                            />
                                        </Button>
                                    </Grid>

                                </Grid> */}

                            </Grid>
                            <Grid container className="mb-60">
                                <Grid item xs={3}></Grid>
                                <Grid item xs={3}>
                                    <Grid container>
                                        <Grid item xs={5} className="TSLabels">
                                            <Typography className="labelAlign"> {regionalLanguage} Station Name</Typography>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <TextField
                                                size="small"
                                                name="regionalStationName"
                                                required={true}
                                                value={input?.regionalStationName}
                                                onChange={handleChange}
                                                className="sceSmallbox3 TSTextbox"
                                                variant="outlined"
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
                                        <Grid item xs={5} className="TSLabels">
                                            <Typography className="labelAlign">  {regionalLanguage} File</Typography>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <TextField
                                                size="small"
                                                name="regionalWaveFile"
                                                required={true}
                                                onChange={handleChange}
                                                value={input?.regionalWaveFile}
                                                className="sceBigbox3 TSTextbox"
                                                variant="outlined"
                                                disabled={true}
                                                placeholder="Choose .mp3 or .wav files"
                                                InputProps={{
                                                    endAdornment: <ClearIcon className={regionalCleardisplay} onClick={() => { deleteFile("Regional", input?.regionalWaveFile) }} style={{ color: "red", cursor: "pointer" }} />
                                                }}
                                            />
                                        </Grid>
                                       
                                    </Grid>
                                </Grid>
                                <Grid item xs={3} lg={1} xl={2} style = {{ alignSelf : "center" }}>
                                    <Button
                                        className="browsebtn"
                                        variant="contained"
                                        component="label"
                                    >
                                        BROWSE
                                        <input
                                            value={""}
                                            onChange={(e: any) => { handleFileChange(e, "Regional") }}
                                            name="regionalWaveFile"
                                            type="file"
                                            accept="audio/mp3 , audio/wav"
                                            hidden
                                        />
                                    </Button>
                                </Grid>
                            </Grid>

                            {/* <Grid container style={{ width: "29.31%", display: "flex" }}>
                                    <Grid item xs={7} className="R-StaitionName">
                                        {regionalLanguage} Station Name
                                    </Grid>

                                    <Grid item xs={4}>
                                        <TextField
                                            size="small"
                                            name="regionalStationName"
                                            required={true}
                                            value={input?.regionalStationName}
                                            onChange={handleChange}
                                            className="sceSmallbox3"
                                            variant="outlined"
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
                                            name="regionalWaveFile"
                                            required={true}
                                            onChange={handleChange}
                                            value={input?.regionalWaveFile}
                                            className="sceBigbox3"
                                            variant="outlined"
                                            disabled={true}
                                            placeholder="Choose .mp3 or .wav files"
                                            InputProps={{
                                                endAdornment: <ClearIcon className={regionalCleardisplay} onClick={() => { deleteFile("Regional", input?.regionalWaveFile) }} style={{ color: "red", cursor: "pointer" }} />
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
                                                name="regionalWaveFile"
                                                type="file"
                                                accept="audio/mp3 , audio/wav"
                                                hidden
                                            />
                                        </Button>
                                    </Grid>

                                </Grid>*/}
                            <Grid container>
                                {error != "" ? <div style={{ color: "red", textAlign: "center" }}> {error}</div> : <></>}
                            </Grid>
                            <Grid container spacing={2} style={{ justifyContent: "center" }}>
                                <Grid item xs={2}> <Button
                                    onClick={handleSubmit}
                                    type="submit"
                                    className="savebutton tsBtn"
                                    variant="contained"
                                >
                                    <AddIcon className="icon" type="submit" />
                                    <span className="btnfont">{input?.id == 0 ? buttonText : updateText}</span>
                                </Button></Grid>
                                <Grid item xs={2}><Button
                                    type="reset"
                                    value="Reset"
                                    variant="outlined"
                                    className="canclebutton tsBtn"
                                    onClick={handleCancel}
                                >
                                    <CloseIcon className="icon" />
                                    <span className="btnfont">CANCEL</span>
                                </Button></Grid>
                            </Grid>

                        </Card>
                    }

                    <Card style={{ border: "1px solid #DDDDDD", marginTop: "1.75%" }} className="TSCardStyle">
                        <Grid container style={{ marginBottom: "10px" }}> <Typography className="txt">
                            <b> Existing Station Data</b>
                        </Typography></Grid>
                        <TableContainer style={{ maxHeight: "30vh" }}>
                            <Table stickyHeader aria-label="sticky table" className="uniqueName">
                                <TableHead className="tblhead">
                                    <TableRow>
                                        <TableCell className="tblRow">
                                            S.No.
                                        </TableCell >
                                        <TableCell className="tblRow w7">
                                            Station Code
                                        </TableCell>
                                        <TableCell className="tblRow w11">
                                            English Station Name
                                        </TableCell>
                                        <TableCell className="tblRow w10">
                                            Hindi Station Name
                                        </TableCell>
                                        <TableCell className="tblRow w12">
                                            Regional Station Name
                                        </TableCell>
                                        <TableCell className="tblRow" colSpan={1}>
                                            Audio Files
                                        </TableCell>
                                        {appUser.userRole == "ROLE_STATION MASTER" ? <></> :
                                            <TableCell className="tblRow" colSpan={2}>
                                                Actions
                                            </TableCell>
                                        }
                                    </TableRow>
                                </TableHead>
                                {
                                    loading ? (<TableRow><TableCell colSpan={6} className="loderIcon"><Grid style={{ textAlign: "center" }}><CircularProgress size={30} /><br />Loading...</Grid></TableCell></TableRow>) :
                                        <TableBody className="tblbdy">
                                            {stationData()} <br />
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
                    onChange={(e: any) => setInput({ ...input, "hindiStationName": e })}
                    onKeyPress={(button: any) => onKeyPress(button)}
                    {...hindi}
                    layoutName={layout == "default" ? "default" : "shift"}
                />)}

            {regionalKeyboardVisibility && (
                <Keyboard
                    keyboardRef={(r: any) => (keyboardRef.current = r)}
                    onChange={(e: any) => setInput({ ...input, "regionalStationName": e })}
                    onClick={(e: any) => e.stopPropagation()}
                    onKeyPress={(button: any) => onKeyPress(button)}
                    {...keyboardRegionalLanguage}
                    layoutName={layout == "default" ? "default" : "shift"}
                />)}
        </>
    )

}