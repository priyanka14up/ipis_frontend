import { Button, Card, CircularProgress, FormControlLabel, Grid, IconButton, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@material-ui/core"
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import pauseBtn from "../../assets/images/pause_circle_outline (2).svg";
import playCircleBtn from "../../assets/images/play_circle_outline (1).svg"
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import PublicAnnouncementServices from "../service/publicAnnouncement/publicAnnouncementServices";
import { AnyObject } from "immer/dist/internal";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";

const { ReactMic } = require('react-mic')

const publicAnnoucementSVC = new PublicAnnouncementServices();
const MicRecorder = require('mic-recorder-to-mp3');
const Mp3Recorder = new MicRecorder({
    bitRate: 128
});

export const ManualRecording = (props: any) => {
    const { getManualRecording } = props;
    const { setLoading, loading } = getManualRecording;
    const formData = new FormData();
    const [file, setFile] = useState<any>([])
    const [publicAnnouncement, setPublicAnnouncement] = useState({
        fileName: "",
        fileLocation: "",
        messageType: "",
        fileURL: "",
    })
    const [isRecording, setIsRecording] = useState(false);
    const [uploadingLoader, setUploadingLoader] = useState(false);
    const [manualUploadingLoader, setManualUploadingLoader] = useState(false);


    let playlistArray: any = [];
    let fileArray: any = [];

    if (props && props.getManualRecording && props.getManualRecording.playlistArray) {
        playlistArray = props.getManualRecording.playlistArray
    }

    if (props && props.getManualRecording && props.getManualRecording.fileArray) {
        fileArray = props.getManualRecording.fileArray
    }

    const handleChange = (e: any) => {
        setAddFileError("");
        var { name, value } = e.target;
        let files: any = []
        if (e.target.files) {
            setFile([])
            if (e.target.files.length != 0) {
                files.push(e.target.files[0]);
            }
            setFile(files);
        }
        setPublicAnnouncement({ ...publicAnnouncement, [name]: value })
        console.log(publicAnnouncement, name, value)
    }

    const [addFileError, setAddFileError] = useState("");

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
                publicAnnoucementSVC.removePublicAnnouncement(data).then((datas) => {
                    if (datas && datas?.status === 200) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'File deleted successfully',
                            showConfirmButton: false,
                            allowOutsideClick: false,
                            timer: 1500,
                        }).then(() => {
                            setPublicAnnouncement({
                                fileName: "",
                                fileLocation: "",
                                messageType: "",
                                fileURL: "",

                            })
                        }).then(() => {
                            publicAnnoucementSVC.getPublicAnnouncementData().then((data: any) => {
                                if (data && data?.data) {
                                    props.getManualRecording.setFileArray(data?.data);
                                    console.log("song details", data?.data)
                                }
                                else if (data?.errorMsg || data?.status != 200) {
                                    props.getManualRecording.setFileArray([]);
                                }
                            })
                        })
                    }
                })
            }
        })
    }

    const handleSubmit = () => {
        if (publicAnnouncement?.fileName != "" && publicAnnouncement?.fileLocation != "" && publicAnnouncement?.messageType != "") {
            formData.append('file', file[0]);
            const data: any = {
                fileName: publicAnnouncement?.fileName,
                fileLocation: publicAnnouncement?.fileLocation,
                messageType: publicAnnouncement?.messageType,
            };
            setUploadingLoader(true);
            publicAnnoucementSVC.uploadPublicAnnouncementFile(formData).then((resp: any) => {
                if (resp?.status == 200) {
                    publicAnnoucementSVC.createPublicAnnouncementData(data).then((response) => {
                        if (response && response?.status === 200) {
                            setAddFileError("");
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: `Message added successfully`,
                                showConfirmButton: false,
                                allowOutsideClick: false,
                                timer: 3000,
                            }).then(() => {
                                setPublicAnnouncement({
                                    fileName: "",
                                    fileLocation: "",
                                    messageType: "",
                                    fileURL: "",
                                })
                            }).then(() => {
                                publicAnnoucementSVC.getPublicAnnouncementData().then((data: any) => {
                                    if (data && data?.data) {
                                        props.getManualRecording.setFileArray(data?.data);
                                        setUploadingLoader(false)
                                    }
                                    else if (data?.errorMsg || data?.status != 200) {
                                        props.getManualRecording.setFileArray([]);
                                        setUploadingLoader(false)
                                    }
                                })
                            })
                        }
                        else {
                            setAddFileError(response?.errorMsg);
                        }

                    });
                }
                else {
                    setAddFileError("Uploading Failed!!!");
                }
            });

        }
        else {
            setAddFileError("All field are required!");
        }
    }


    const handleCancel = () => {
        setPublicAnnouncement({

            fileName: "",
            fileLocation: "",
            messageType: "",
            fileURL: "",

        })
        setAddFileError("");
    }

    const [manualError, setManualError] = useState<any>("");

    const addToPlayList = (el: any, i: any) => {
        if (el) {
            let fileId = el.id;
            publicAnnoucementSVC.createPlaylistData(fileId).then((response) => {
                if (response && response?.status === 200) {
                    Swal.fire({
                        position: "center",
                        customClass: {
                            container: 'my-swal'
                        },
                        icon: "success",
                        title: `Add to playlist successfully`,
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        timer: 1500,
                    })
                        .then(() => {
                            props.getManualRecording.setPlaylistArray(response?.data?.announcementList);
                            props.getManualRecording.setFileArray(response?.data?.announcementData)
                        })
                }
                else {
                    props.getManualRecording.setPlaylistArray([]);
                }
            });
            console.log(playlistArray, "testing")
        }
    }
    useEffect(() => {
        setLoading(true);
        publicAnnoucementSVC.getPublicAnnouncementData().then((data: any) => {
            if (data && data?.data && data?.status == 200) {
                setLoading(false);
                props.getManualRecording.setFileArray(data?.data);
            }
            else if (data?.errorMsg || data?.status != 200) {
                props.getManualRecording.setFileArray([]);
            }
        }
        )
        publicAnnoucementSVC.getPlaylistData().then((datas) => {
            if (datas && datas?.data) {
                setLoading(false);
                props.getManualRecording.setPlaylistArray(datas?.data);
            }
            else if (datas?.errorMsg || datas?.status != 200) {
                props.getManualRecording.setPlaylistArray([]);
            }
        })
    }, [])

    const manualData = () => {
        if (fileArray?.length != 0) {
            return (
                fileArray?.map((el: any, i: any) => {
                    return (
                        <TableRow>
                            <TableCell className="tblcolm">
                                {el?.fileName}
                            </TableCell>
                            <TableCell className="tblcolm">{el?.messageType}</TableCell>
                            <TableCell className="tblcolm">{el?.fileLocation}</TableCell>

                            <TableCell className="tblcolm">
                                {
                                    el.fileAdded == false ?
                                        <IconButton aria-label="edit" style={{ fontSize: "14px" }} onClick={() => addToPlayList(el, i)}>
                                            <ArrowRightAltIcon className="arrowIcon" style={{ color: "grey", padding: "1px", width: "20px", height: "20px" }} />
                                            <span style={{ paddingLeft: "10px", fontFamily: "Roboto" }}>  Add To Playlist</span>
                                        </IconButton>
                                        :
                                        <IconButton aria-label="edit" style={{ fontSize: "14px" }}>
                                            <ArrowRightAltIcon className="arrowIcon" style={{ color: "grey", padding: "1px", width: "20px", height: "20px" }} />
                                            <span style={{ paddingLeft: "10px", fontFamily: "Roboto" }}>Added</span>
                                        </IconButton>
                                }
                            </TableCell>
                            <TableCell className="tblcolm">
                                <IconButton aria-label="edit" style={{ fontSize: "14px", paddingLeft: "10px" }} onClick={() => handleDelete(el.id)}>
                                    <DeleteIcon style={{ color: "grey", padding: "1px", width: "20px", height: "20px" }} />
                                    <span style={{ paddingLeft: "10px", fontFamily: "Roboto" }}> Delete</span>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    )
                })
            )
        }
        else {
            return (
                <TableRow>
                    <TableCell colSpan={4} style={{ borderBottom: '0px' }}><span className="cdsNoTable">No Data Available</span></TableCell>
                </TableRow>
            )
        }

    }
    const start = () => {
        setManualError("");
        Mp3Recorder
            .start()
            .then(() => {
                setIsRecording(true);
            }).catch((e: AnyObject) => console.error(e));
    };

    const [manualFile, setManualFile] = useState<any>([])
    let manualFormData = new FormData();
    const stop = () => {
        Mp3Recorder
            .stop()
            .getMp3()
            .then(([buffer, blob]: any) => {
                setManualFile([buffer, blob]);
                setIsRecording(false);
            }).catch((e: any) => console.log(e));
    };

    const handleManualCancel = () => {
        setManualFileName("");
        setManualError("");
        setManualFile([]);
        Mp3Recorder.stop();
        setIsRecording(false);
    }


    const handleManualUpload = () => {
        console.log(manualFile, "test")
        const file = new File(manualFile[0], manualFileName + ".mp3", {
            type: manualFile[1].type,
            lastModified: Date.now()
        });
        manualFormData.append("file", file);
        setManualUploadingLoader(true);
        publicAnnoucementSVC.uploadPublicAnnouncementFile(manualFormData).then((resp: any) => {
            if (resp?.status == 200) {
                publicAnnoucementSVC.createManualRecord(manualFileName).then((data: any) => {
                    if (data?.status == 200) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `Recording added successfully`,
                            showConfirmButton: false,
                            allowOutsideClick: false,
                            timer: 3000,
                        }).then(() => {
                            publicAnnoucementSVC.getPublicAnnouncementData().then((data: any) => {
                                if (data && data?.data && data?.status == 200) {
                                    props.getManualRecording.setFileArray(data?.data);
                                    setManualUploadingLoader(false);
                                }
                                else if (data?.errorMsg || data?.status != 200) {
                                    setManualUploadingLoader(false);
                                    props.getManualRecording.setFileArray([]);
                                }
                            }
                            )
                        })
                    }
                    else {
                        console.log("Errors")
                    }
                }).then(() => {
                    setManualError("");
                    setManualFileName("");
                    setManualFile([]);
                })
            }
            else {
                setManualError("Uploading Failed!!");
            }
        })
    }

    const handleSave = () => {
        if (manualFileName != "" && manualFile.length != 0) {
            handleManualUpload();
        }
        else {
            setManualError("File Name or Recording is Required")
        }
    }


    const recordingButtons = () => {
        return (
            <div >
                {isRecording ?
                    <img src={playCircleBtn} className="disabled pl-8 pr-10 linkHover" /> :
                    <img onClick={start} src={playCircleBtn} className="pl-8 pr-10 linkHover" />

                }
                {isRecording ?
                    <img onClick={stop} src={pauseBtn} className="pl-8 pr-10 linkHover" />
                    :
                    <img src={pauseBtn} className="pl-8 pr-10 disabled linkHover" />
                }
            </div>

        );
    }

    const [manualFileName, setManualFileName] = useState<any>("");

    const RecordView = () => {
        // return (
        //     <>
        //         <Grid style={{ display: "flex", fontSize: "14px" }} container className="col-12 saveRecorder">
        //             <Grid style={{ marginLeft: "35%" }}>Save Recording</Grid>
        //             <Grid>
        //                 <TextField name="manaulFileName" onChange={(e: any) => { setManualFileName(e.target.value); setManualError("") }} value={manualFileName} className="col-8 saveRec_Margine" variant="outlined"></TextField>
        //             </Grid>

        //             <Grid className="btnRecorder" >
        //                 {
        //                     manualUploadingLoader ? <div style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}><Grid style={{ textAlign: "center" }}><CircularProgress color="inherit" size={30} /></Grid></div> :
        //                         <Button disabled={isRecording} onClick={handleSave} className="addMessageBtn btnsavRecorder">
        //                             <DoneIcon className="SaveIcon saveButtonDisplayCss" />
        //                             Save Recording</Button>
        //                 }
        //                 {/* <Button disabled={isRecording} onClick={handleSave} className="addMessageBtn btnsavRecorder">Save Recording</Button> */}
        //                 <Button onClick={handleManualCancel} className="btnsavRecorder btncancelrecorder ">
        //                     <CloseIcon className="clearIcon" />
        //                     Cancel Recording</Button>
        //             </Grid>

        //         </Grid>
        //         <Grid style={{ color: "red" }}>{manualError}</Grid>
        //     </>
        // );

        // return (
        //     <>
        //         <Grid container className="save" >
        //             <Grid item xs={6} md={6} lg={4}>
        //                 <Grid container spacing={1}>
        //                     <Grid item xs={4} md={6} lg={5} className="saveRec">
        //                         <Typography>
        //                             Save Recording
        //                         </Typography>
        //                     </Grid>
        //                     <Grid item xs={8} md={6} lg={7}>
        //                         <TextField name="manaulFileName" onChange={(e: any) => { setManualFileName(e.target.value); setManualError("") }} value={manualFileName} className="col-8 saveRec_Margine" variant="outlined"></TextField>
        //                     </Grid>
        //                 </Grid>
        //             </Grid>
        //             <Grid item xs={6} md={6} lg={8}>
        //                 <Grid container>
        //                     <Grid item xs={6} md={12} lg={6} xl={6} className="btn-alignment sbtn">
        //                         {
        //                             manualUploadingLoader ? <div style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}><Grid style={{ textAlign: "center" }}><CircularProgress color="inherit" size={30} /></Grid></div> :
        //                                 <Button style = {{ marginBottom : "0px !important" }} disabled={isRecording} onClick={handleSave} className="addMessageBtn btnsavRecorder SaveBttn">
        //                                     <DoneIcon className="SaveIcon saveButtonDisplayCss" />
        //                                     Save Recording</Button>
        //                         }
        //                     </Grid>
        //                     <Grid item xs={6} md={12} lg={6} xl={6} className="btn-alignment cancelButton">
        //                         <Button onClick={handleManualCancel} className="btnsavRecorder btncancelrecorder cnclBtn">
        //                             <CloseIcon className="clearIcon" />
        //                             Cancel Recording
        //                         </Button>
        //                     </Grid>
        //                 </Grid>
        //             </Grid>
        //         </Grid>
        //     </>
        // )




        return (
            <>
                <Grid container className="save" >
                    <Grid item xs={2} md={2} lg={2} xl={2} className="saveRec">
                        <Typography className="saveRecordingFont">
                            Save Recording
                        </Typography>
                    </Grid>
                    <Grid item xs={2} md={2} lg={4} xl={6}>
                        <TextField name="manaulFileName" onChange={(e: any) => { setManualFileName(e.target.value); setManualError("") }} value={manualFileName} className="col-8 text-field-style text-field-style2 recField paTextField" variant="outlined"></TextField>
                    </Grid>
                    <Grid item xs={4} md={4} lg={3} xl={2} className="btn-alignment sbtn">
                        {
                            manualUploadingLoader ? <div style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}><Grid style={{ textAlign: "center" }}><CircularProgress color="inherit" size={30} /></Grid></div> :
                                <Button style={{ marginBottom: "0px !important" }} disabled={isRecording} onClick={handleSave} className="addMessageBtn btnsavRecorder SaveBttn">
                                    <DoneIcon className="SaveIcon saveButtonDisplayCss" />
                                    <span className="btn-span">Save Recording</span>
                                </Button>
                        }
                    </Grid>
                    <Grid item xs={4} md={4} lg={3} xl={2} className="btn-alignment cancelButton">
                        <Button onClick={handleManualCancel} className="btnsavRecorder btncancelrecorder cnclBtn">
                            <CloseIcon className="clearIcon" />
                            <span className="btn-span">Cancel Recording</span>
                        </Button>
                    </Grid>
                </Grid>
            </>
        )


    };


    // return (
    //     <>
    //         <Grid>
    //             <Card className="manualRecordCardStyle4">
    //                 <Card className="manualRecordCardStyle1">
    //                     <Grid>
    //                         <Grid style={{ padding: "10px 23px 25px 23px" }}>
    //                             <Typography className="announcmentMessage">Add Message</Typography>
    //                             <Typography className="departmentalMessage">Explore Special and Departmental messages
    //                                 from your device and add them to the playlist. Alternately,
    //                                 you can also record and add messages directly.

    //                             </Typography>


    //                             <Grid container style={{ paddingTop: "15px" }}>
    //                                 <Grid item xs={4} >
    //                                     <Grid container>
    //                                         <Grid item xs={4} className="recordingFileName">
    //                                            <b>File Name</b> <span className="asterisk">*</span>
    //                                         </Grid>
    //                                         <Grid item xs={8}>
    //                                             <TextField
    //                                                 size="small"
    //                                                 name="fileName"
    //                                                 required={true}
    //                                                 className="recordingFileNameBox recordingFileNameBox11"
    //                                                 variant="outlined"
    //                                                 onChange={handleChange}
    //                                                 value={publicAnnouncement?.fileName}
    //                                             />

    //                                         </Grid>
    //                                     </Grid>
    //                                 </Grid>
    //                                 <Grid item xs={6}>
    //                                     <Grid container>
    //                                         <Grid item xs={4} className="recordingFileLocation">
    //                                            <b> File Location</b><span className="asterisk">*</span>
    //                                         </Grid>
    //                                         <Grid item xs={8}>
    //                                             <TextField
    //                                                 size="small"
    //                                                 name="fileLocation"
    //                                                 className="recordingFileNameBox"
    //                                                 required={true}
    //                                                 variant="outlined"
    //                                                 onChange={handleChange}
    //                                                 value={publicAnnouncement?.fileLocation}
    //                                                 disabled={true}
    //                                                 placeholder="Choose .mp3 or .wav files"

    //                                             />
    //                                         </Grid>


    //                                     </Grid>
    //                                 </Grid>
    //                                 <Grid item xs={2} style={{ paddingTop: "5px",textAlign:'end' }}>
    //                                     <Button
    //                                         className="messagebrowsebtn"
    //                                         variant="contained"
    //                                         component="label"

    //                                     >
    //                                         <span className="i">BROWSE</span>
    //                                         <input
    //                                             onChange={handleChange}
    //                                             name="fileLocation"
    //                                             accept="audio/mp3 , audio/wav"
    //                                             type="file"

    //                                             hidden
    //                                         />
    //                                     </Button>
    //                                 </Grid>

    //                             </Grid>

    //                             <Grid container style={{ textAlign: "start", paddingTop: "2.9%" }}>
    //                                 <Typography><b className="paMsgtype">Message Type</b><span className="asterisk">*</span></Typography>

    //                                 <RadioGroup row name="messageType"
    //                                     value={publicAnnouncement?.messageType}
    //                                     onClick={handleChange}
    //                                     className="radiostyle" style={{ paddingLeft: "5%" }}>
    //                                     <div>
    //                                         <FormControlLabel
    //                                             control={
    //                                                 <Radio
    //                                                     name="messageType"
    //                                                     value="SpecialMessage "
    //                                                     size="small" style={{ color: "#033733", marginRight: "10px",marginBottom: "8px"}}
    //                                                 />
    //                                             }
    //                                             label={
    //                                                 <span
    //                                                     style={{
    //                                                         fontSize: "16px",
    //                                                         fontFamily: "Roboto",
    //                                                         marginRight: "25px",
    //                                                     }}
    //                                                 >
    //                                                     Special Message                                                </span>
    //                                             }
    //                                         /></div>
    //                                     <div>
    //                                         <FormControlLabel

    //                                             control={
    //                                                 <Radio
    //                                                     name="messageType"
    //                                                     size="small"
    //                                                     value="Departmental Message"
    //                                                     style={{ color: "#033733", marginRight: "10px" ,marginBottom: "8px"}} />
    //                                             }
    //                                             label={
    //                                                 <span style={{
    //                                                     fontSize: "16px", fontFamily: "Roboto",
    //                                                     marginRight: "10px"
    //                                                 }}>
    //                                                     Departmental Message
    //                                                 </span>
    //                                             }
    //                                         />
    //                                     </div>
    //                                 </RadioGroup>

    //                             </Grid>
    //                             <Grid container className="publiAnAddMesage">
    //                                 <span>
    //                                     {addFileError != "" ? <div style={{ color: "red", textAlign: "center", marginRight: "100px" }}> {addFileError}</div> : <></>}
    //                                 </span>
    //                                 <Button
    //                                     type="reset"
    //                                     value="Reset"
    //                                     variant="outlined"
    //                                     className="cancleMessagebutton"
    //                                     onClick={handleCancel}
    //                                 >

    //                                     <span className="btnfont">CANCEL</span>
    //                                 </Button>
    //                                 {
    //                                     uploadingLoader ? <div style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}><Grid style={{ textAlign: "center" }}><CircularProgress color="inherit" size={30} /></Grid></div> :
    //                                         <Button
    //                                             type="submit"
    //                                             className="addMessageBtn"
    //                                             variant="contained"
    //                                             onClick={handleSubmit}>
    //                                             <span className="i">ADD FILE</span>
    //                                         </Button>
    //                                 }

    //                             </Grid>

    //                         </Grid>
    //                     </Grid>
    //                 </Card>

    //                 <Card className="manualRecordCardStyle2">
    //                     <Grid>


    //                         <Typography className="fileList" >
    //                             File List
    //                         </Typography>
    //                             <TableContainer className="messageTable" style={{maxHeight:"40vh"}}>
    //                                 <Table stickyHeader aria-label="sticky table" className="uniqueName">
    //                                     <TableHead className="tblhead">
    //                                         <TableRow>
    //                                             <TableCell className="tblRow">
    //                                                 File Name
    //                                             </TableCell >
    //                                             <TableCell className="tblRow">
    //                                                 File Type
    //                                             </TableCell>
    //                                             <TableCell className="tblRow">
    //                                                 File Location
    //                                             </TableCell>

    //                                             <TableCell className="tblRow" colSpan={2}>
    //                                                 Actions
    //                                             </TableCell>
    //                                         </TableRow>
    //                                     </TableHead>
    //                                     {
    //                                         loading?
    //                                         <TableRow>
    //                                         <TableCell colSpan={4}>
    //                                         <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", height: '20vh' }}><Grid style={{ textAlign: "center" }}><CircularProgress size={30}/><br/>Loading...</Grid></div>

    //                                         </TableCell>    
    //                                         </TableRow>
    //                                             :
    //                                         <TableBody className="tblbdy">
    //                                             {manualData()}
    //                                         </TableBody>
    //                                     }
    //                                 </Table>
    //                             </TableContainer>
    //                             {/* } */}

    //                     </Grid>
    //                 </Card>
    //             </Card>
    //             <Card className="manualRecordCardStyle3">
    //                 <Grid>
    //                     <Grid container>
    //                         <Grid item xs={6}>
    //                             <Typography className="manualRecording">Manual Recording</Typography>
    //                             <Typography className="messageRecording">Record a new Message</Typography>
    //                         </Grid>
    //                         <Grid item xs={6} className="recordingBtn">
    //                             {recordingButtons()}
    //                         </Grid>
    //                     </Grid>
    //                     <ReactMic
    //                         record={isRecording}
    //                         visualSetting="sinewave"
    //                         strokeColor="green"
    //                     />
    //                     {RecordView()}

    //                 </Grid>
    //             </Card>
    //         </Grid>
    //     </>
    // )


    return (
        <>
            <Grid container>
                <Card className="manualRecordingCard">
                    <Grid container className="add-message">
                        <Typography className="add-message">
                            Add Messsage
                        </Typography>
                    </Grid>
                    <Grid container className="messages">
                        <Typography className="messages2">
                            Explore Special and Departmental messages
                            from your device and add them to the playlist. Alternately,
                            you can also record and add messages directly.
                        </Typography>
                    </Grid>
                    <Grid container className="file">
                        <Grid item xs={5} md={4} lg={4} xl={4}>
                            <Grid container>
                                <Grid item xs={5} md={5} lg={4} xl={3} className="label-alignment-2">
                                    <Typography className="label-alignment labels-font">
                                        <strong>File Name</strong><span className="asterisk">*</span>
                                    </Typography>
                                </Grid>
                                <Grid item xs={7} md={6} lg={7} xl={8}>
                                    <TextField
                                        size="small"
                                        name="fileName"
                                        required={true}
                                        className="recordingFileNameBox recordingFileNameBox11 text-field-style text-field-style2 paTextField"
                                        variant="outlined"
                                        onChange={handleChange}
                                        value={publicAnnouncement?.fileName}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={5} md={6} lg={6} xl={6}>
                            <Grid container>
                                <Grid item xs={5} md={4} lg={3} xl={2} className="label-alignment-2">
                                    <Typography className="label-alignment labels-font">
                                        <strong>File Location</strong><span className="asterisk">*</span>
                                    </Typography>
                                </Grid>
                                <Grid item xs={7} md={7} lg={8} xl={10}>
                                    <TextField
                                        size="small"
                                        name="fileLocation"
                                        className="recordingFileNameBox text-field-style text-field-style2 paTextField"
                                        required={true}
                                        variant="outlined"
                                        onChange={handleChange}
                                        value={publicAnnouncement?.fileLocation}
                                        disabled={true}
                                        placeholder="Choose .mp3 or .wav files"

                                    />

                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid item xs={2} md={2} lg={2} xl={2} className="browseButton">
                            <Button
                                className="messagebrowsebtn"
                                variant="contained"
                                component="label"
                            >
                                <span className="btn-span">BROWSE</span>
                                <input
                                    onChange={handleChange}
                                    name="fileLocation"
                                    accept="audio/mp3 , audio/wav"
                                    type="file"
                                    hidden
                                />
                            </Button>

                        </Grid>
                    </Grid>
                    <Grid container className="message-type">
                        <Grid item xs={3} md={3} lg={2} xl={1} className="messageType">
                            <Typography className="labels-font">
                                <strong>Message Type</strong><span className="asterisk">*</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={9} md={9} lg={10} xl={10} className="radio-buttons">
                            <RadioGroup row name="messageType"
                                value={publicAnnouncement?.messageType}
                                onClick={handleChange}
                                className="radiostyle radio-style">
                                <div>
                                    <FormControlLabel
                                        control={
                                            <Radio
                                                name="messageType"
                                                value="SpecialMessage "
                                                size="small" style={{ color: "#033733", marginRight: "10px", marginBottom: "8px", marginTop: "5px" }}
                                            />
                                        }
                                        label={
                                            <span
                                                style={{
                                                    fontSize: "16px",
                                                    fontFamily: "Roboto",
                                                    marginRight: "25px",
                                                }}
                                            >
                                                Special Message                                                </span>
                                        }
                                    /></div>
                                <div>
                                    <FormControlLabel

                                        control={
                                            <Radio
                                                name="messageType"
                                                size="small"
                                                value="Departmental Message"
                                                style={{ color: "#033733", marginRight: "10px", marginBottom: "8px", marginTop: "5px" }} />
                                        }
                                        label={
                                            <span style={{
                                                fontSize: "16px", fontFamily: "Roboto",
                                                marginRight: "10px"
                                            }}>
                                                Departmental Message
                                            </span>
                                        }
                                    />
                                </div>
                            </RadioGroup>
                        </Grid>
                    </Grid>
                    <Grid container className="button">
                        <Button
                            type="reset"
                            value="Reset"
                            variant="outlined"
                            className="cancleMessagebutton cancelMsgBtn"
                            onClick={handleCancel}
                        >
                            <span className="btn-span">CANCEL</span>
                        </Button>
                        {
                            uploadingLoader ? <div style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}><Grid style={{ textAlign: "center" }}><CircularProgress color="inherit" size={30} /></Grid></div> :
                                <Button
                                    type="submit"
                                    className="addMessageBtn addMsgBtn"
                                    variant="contained"
                                    onClick={handleSubmit}>
                                    <span className="btn-span">ADD FILE</span>
                                </Button>
                        }
                    </Grid>
                </Card>
                <Card className="manualRecordingCard2">
                    <Grid container>
                        <Typography className="file-list">
                            File List
                        </Typography>
                    </Grid>
                    <Grid container>
                        <TableContainer className="message-table" style={{ maxHeight: "40vh" }}>
                            <Table stickyHeader aria-label="sticky table" className="uniqueName">
                                <TableHead className="tblhead">
                                    <TableRow>
                                        <TableCell style={{ left: "auto" }} className="tblRow">
                                            <strong>File Name</strong>
                                        </TableCell >
                                        <TableCell className="tblRow">
                                            <strong>File Type</strong>
                                        </TableCell>
                                        <TableCell className="tblRow">
                                            <strong>File Location</strong>
                                        </TableCell>
                                        <TableCell className="tblRow" colSpan={2}>
                                            <strong>Actions</strong>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                {
                                    loading ?
                                        <TableRow>
                                            <TableCell colSpan={4}>
                                                <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", height: '20vh' }}><Grid style={{ textAlign: "center" }}><CircularProgress size={30} /><br />Loading...</Grid></div>
                                            </TableCell>
                                        </TableRow>
                                        :
                                        <TableBody className="tblbdy">
                                            {manualData()}
                                        </TableBody>
                                }
                            </Table>
                        </TableContainer>

                    </Grid>
                </Card>
                <Card className="manualRecordingCard3">
                    <Grid container>
                        <Grid item xs={6}>
                            <Grid container>
                                <Typography className="manual-recording">
                                    Manual Recording
                                </Typography>
                            </Grid>
                            <Grid container>
                                <Typography className="record-message">
                                    Record a new Message
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={6} className="recording-buttons">
                            {recordingButtons()}
                        </Grid>
                    </Grid>
                    <Grid container>
                        <ReactMic
                            height="90"
                            width="640"
                            className="reactMic"
                            record={isRecording}
                            visualSetting="sinewave"
                            strokeColor="green"
                        />
                        {RecordView()}
                    </Grid>
                </Card>
            </Grid>


        </>
    )


}



