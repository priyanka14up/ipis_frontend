import { Button, Card, CircularProgress, createStyles, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, withStyles } from "@material-ui/core"
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import DeleteIcon from '@material-ui/icons/Delete';
import 'react-h5-audio-player/lib/styles.css';
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import prevBtn from "../../assets/images/Prev.svg";
import pauseBtn from "../../assets/images/pause.svg";
import stopBtn from "../../assets/images/stop.svg"
import playBtn from "../../assets/images/play.svg";
import nextBtn from "../../assets/images/next.svg";
import PublicAnnouncementServices from "../service/publicAnnouncement/publicAnnouncementServices";
import WarnUnsavedChanges from "../common/modal/warnUnsaveModal";
import { WarnUnSave, WarnUnsaveStateSelector } from "../../redux/reducers/warnUnsaveReducer/warnUnsave";
const publicAnnoucementSVC = new PublicAnnouncementServices();

export const Playlist = (props: any) => {
    const { getPlaylistArray } = props;
    const { setLoading, loading } = getPlaylistArray;
    const [repeatAnnouncement, setRepeatAnnouncement] = useState<any>("1")
    const [playPause, setPlayPause] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const { isDirty } = useSelector(WarnUnsaveStateSelector)
    let playlistArray: any = [];
    let idString: string = "";
    const dispatch = useDispatch();

    if (props && props.getPlaylistArray && props.getPlaylistArray.playlistArray) {
        playlistArray = props.getPlaylistArray.playlistArray
    }
    useEffect(() => {
        if (playPause) {
            dispatch(WarnUnSave(true))
        } else {
            dispatch(WarnUnSave(false))
        }
    }, [playPause])

    const handleMoveUp = (id: any, idString: string) => {
        let idStr = idString.slice(0, -1);
        publicAnnoucementSVC.getPublicAnnouncementMoveUpData(id, idStr).then((data: any) => {
            if (data && data?.data && data?.status == 200) {
                props.getPlaylistArray.setPlaylistArray(data?.data);
            }
            else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: `Some Error occurred.`,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    timer: 2000,
                })
            }
        });
    }

    const handleMoveDown = (id: any, idString: string) => {
        let idStr = idString.slice(0, -1);
        publicAnnoucementSVC.getPublicAnnouncementMoveDownData(id, idStr).then((data: any) => {
            if (data && data?.data && data?.status == 200) {
                props.getPlaylistArray.setPlaylistArray(data?.data);
            }
            else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: `Some Error occurred.`,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    timer: 2000,
                })
            }
        });
    }

    const handlePlay = () => {
        setPlayPause(true)
        setIsPlaying(true);
        publicAnnoucementSVC.playAnnouncement(repeatAnnouncement).then((resp) => {
            if (resp && resp?.status == 200) {
                if (resp?.data?.data && resp?.status == 200) {
                    Swal.fire({
                        position: "center",
                        icon: "warning",
                        title: `Not found Audio Device to Play.`,
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        timer: 3000,
                    }).then(() => {
                        handleStop();
                        setPlayPause(false);
                    })
                }
                else {
                    handleStop();
                    setPlayPause(false);
                }
            }
            else if (resp?.status != 200) {
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: `Some Error Found.`,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    timer: 3000,
                }).then(() => {
                    handleStop();
                })
            }
        });
    }
    const handlePause = () => {
        setPlayPause(false)
        publicAnnoucementSVC.pauseAnnouncement();
    }

    const handleStop = () => {
        setPlayPause(false)
        setIsPlaying(false);
        publicAnnoucementSVC.stopAnnouncement().then((resp) => {
            if (resp.status == 200) {
                setPlayPause(false);
            }
        });
    }
    const handlePrev = () => {
        publicAnnoucementSVC.prevAnnouncement()
    }
    const handleNext = () => {
        publicAnnoucementSVC.nextAnnouncement()
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
                    id: el?.id,
                    announcementId: el?.announcementId,
                }
                publicAnnoucementSVC.removePlaylistData(data).then((datas) => {
                    if (datas && datas?.status === 200) {
                        props.getPlaylistArray.setPlaylistArray(datas?.data?.announcementList);
                        props.getPlaylistArray.setFileArray(datas?.data?.announcementData);
                    }
                    else {
                        // props.getPlaylistArray.setPlaylistArray([]);
                        console.log("delete error")
                    }
                })
            }
        })
    }

    const playData = () => {
        if (playlistArray?.length !== 0) {
            return (
                playlistArray?.map((el: any, i: any) => {
                    return (
                        <TableRow>
                            <TableCell className="tblcolm" >
                                {el.fileName}
                            </TableCell>
                            <TableCell className="tblcolm">
                                {i != 0 ?
                                    <IconButton aria-label="edit" style={{ fontSize: "14px" }} onClick={() => handleMoveUp(el.id, idString)} >
                                        <ArrowUpwardIcon style={{ color: "grey", padding: "1px", width: "20px", height: "20px" }} />
                                        <span style={{ paddingLeft: "10px" }}> Move Up</span>
                                    </IconButton> : <Grid aria-label="edit" style={{ fontSize: "14px", color: "grey", cursor: "not-allowed" }} >
                                        <span style={{ paddingLeft: "10px" }}> Top</span>
                                    </Grid>
                                }
                            </TableCell>
                            <TableCell className="tblcolm">
                                {i == playlistArray?.length - 1 ?

                                    <Grid aria-label="edit" style={{ fontSize: "14px", color: "grey", paddingLeft: "10px", cursor: "not-allowed" }}>
                                        <span style={{ paddingLeft: "10px" }}> Bottom</span>
                                    </Grid> :
                                    <IconButton aria-label="edit" style={{ fontSize: "14px", paddingLeft: "10px" }} onClick={() => handleMoveDown(el.id, idString)} >
                                        <ArrowDownwardIcon style={{ color: "grey", padding: "1px", width: "20px", height: "20px" }} />
                                        <span style={{ paddingLeft: "10px" }}> Move Down</span>
                                    </IconButton>
                                }
                            </TableCell>
                            <TableCell className="tblcolm">
                                <IconButton aria-label="edit" style={{ fontSize: "14px", paddingLeft: "10px" }} onClick={() => handleDelete(el)} >
                                    <DeleteIcon style={{ color: "grey", padding: "1px", width: "20px", height: "20px" }} />
                                    <span style={{ paddingLeft: "10px", fontFamily: 'Roboto' }}>Delete</span>
                                </IconButton>
                            </TableCell>
                        </TableRow>

                    )
                })
            )
        } else {
            return (
                <TableRow>
                    <TableCell colSpan={9} style={{ borderBottom: '0px' }}><span className="cdsNoTable">No Data Available</span></TableCell>
                </TableRow>
            )
        }
    }


    useEffect(() => {
        playData()
    }, [playlistArray])

    playlistArray?.map((el: any) => {
        idString += el.id + ',';
    })

    //     return (
    //         <>
    //             <Grid>
    //                 <Card style={{minHeight:"77vh"}}>
    //                     <Grid>
    //                         <Typography className="playlist">Playlist</Typography>
    //                     </Grid>
    //                     <Grid className="playListTable">
    //                         <Card style={{ height: "67vh" }}>
    //                             <TableContainer className="messageTable" style={{ height: "47vh" }}>
    //                                 <Table stickyHeader aria-label="sticky table" className="uniqueName">
    //                                     <TableHead className="tblhead">
    //                                         <TableRow>
    //                                             <TableCell className="tblRow" colSpan={1}>
    //                                                 File Name
    //                                             </TableCell >

    //                                             <TableCell className="tblRow" colSpan={8}>
    //                                                 Actions
    //                                             </TableCell>
    //                                         </TableRow>
    //                                     </TableHead>
    //                                     {
    //                                         loading ? 
    //                                         <TableRow>
    //                                             <TableCell colSpan={9}>
    //                                             <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", height: '20vh' }}><Grid style={{ textAlign: "center" }}><CircularProgress size={30}/><br/>Loading...</Grid></div>
    //                                             </TableCell>
    //                                         </TableRow> 
    //                                         :
    //                                             <TableBody className="tblbdy">
    //                                                 {playData()}
    //                                             </TableBody>
    //                                     }
    //                                 </Table>
    //                             </TableContainer>
    //                         </Card>
    //                     </Grid>
    //                     <Grid container className="sect-announcement">
    //                         <Grid item xs={3} >
    //                             <Typography className="repeatAnnouncement"> Repeat Announcement</Typography>
    //                         </Grid>
    //                         <Grid item xs={2}>
    //                             <select name="repeatAnnouncement" value={repeatAnnouncement} className="repeatAnnouncementBox" onChange={(e) => {
    //                                 setRepeatAnnouncement(e.target.value);
    //                                 handleStop()
    //                             }} >
    //                                 <option>Select</option>
    //                                 <option value="1">1</option>
    //                                 <option value="2">2</option>
    //                                 <option value="3">3</option>
    //                                 <option value="4">4</option>
    //                                 <option value="5">5</option>
    //                             </select>
    //                         </Grid>

    //                     </Grid>
    //                     <Card className="announceCard announcementPlay">
    //                         <div className="displayStyle">
    //                             {
    //                                 props.getPlaylistArray?.playlistArray?.length ?
    //                                 isPlaying ?
    //                                     <img src={prevBtn} className="pr-20 linkHover" onClick={handlePrev} /> : 
    //                                     <img src={prevBtn} className=" disabled pr-20 linkHover" />:
    //                                     <img src={prevBtn} className=" disabled pr-20 linkHover" />

    //                             }

    //                             {props.getPlaylistArray?.playlistArray?.length ?
    //                                 playPause ? <img src={pauseBtn} className="pl-10 pr-20 linkHover" onClick={handlePause} /> : <img src={playBtn} className="pl-10 pr-20 linkHover" onClick={handlePlay} /> : <img src={playBtn} className=" disabled pl-10 pr-20 linkHover" />
    //                             }

    //                             {props.getPlaylistArray?.playlistArray?.length ?
    //                                 !isPlaying ?
    //                                 <img src={stopBtn} className=" disabled pr-20 linkHover" /> :
    //                                 <img src={stopBtn} className="pr-20 linkHover" onClick={handleStop} />:
    //                                 <img src={stopBtn} className=" disabled pr-20 linkHover" /> 
    //                             }
    //                             {


    //                             }

    // {
    //                                 props.getPlaylistArray?.playlistArray?.length ?
    //                                 isPlaying ?
    //                                 <img src={nextBtn} className="pl-10 linkHover" onClick={handleNext} /> : 
    //                                     <img src={nextBtn} className="disabled pl-10 linkHover" />:
    //                                     <img src={nextBtn} className="disabled pl-10 linkHover" />
    //                             }

    //                         </div>
    //                     </Card>
    //                 </Card>
    //             </Grid>
    //             <WarnUnsavedChanges
    //                 ignorePrompt={false}
    //                 navigateOnCancel={true}
    //                 title="Are you sure ?"
    //                 content="You want to stop the announcement and exit this page !"
    //                 cancelBtnText="Cancel"
    //                 confirmBtnText="confirm"
    //                 isDirty={isDirty}
    //                 handleStop={handleStop}
    //                 playPause={playPause}
    //             />
    //         </>
    //     )


    return (
        <>
            <Card className="playlistCard">
                <Grid container className="playlist-text">
                    <Typography className="playlist">
                        Playlist
                    </Typography>
                </Grid>
                <Card className="playlist-card">
                    <Grid container>
                        <TableContainer className="messageTable" style={{ height: "47vh" }}>
                            <Table stickyHeader aria-label="sticky table" className="uniqueName">
                                <TableHead className="tblhead">                                        <TableRow>
                                    <TableCell style={{ left : "auto" }} className="tblRow" colSpan={1}>
                                        <strong>File Name</strong>                                            </TableCell >
                                    <TableCell className="tblRow" colSpan={8}>
                                        <strong>Actions</strong>
                                    </TableCell>
                                </TableRow>
                                </TableHead>
                                {
                                    loading ?
                                        <TableRow>
                                            <TableCell colSpan={9}>
                                                <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", height: '20vh' }}><Grid style={{ textAlign: "center" }}><CircularProgress size={30} /><br />Loading...</Grid></div>
                                            </TableCell>
                                        </TableRow>
                                        :
                                        <TableBody className="tblbdy">
                                            {playData()}
                                        </TableBody>
                                }
                            </Table>
                        </TableContainer>
                    </Grid>
                </Card>
                <Grid container className="announcement-grid">
                    <Grid item xs={12} md={12} className="announcement">
                        <Grid container className="anncmnt-grid">
                            <Grid item xs={7} className="anncmnt">
                                <Typography className="repeat">
                                    Repeat Announcement
                                </Typography>
                            </Grid>
                            <Grid item xs={5} className="repeatAnncmnt">
                                <select name="repeatAnnouncement" value={repeatAnnouncement} className="repeatAnnouncementBox" onChange={(e) => {
                                    setRepeatAnnouncement(e.target.value);
                                    handleStop()
                                }} >
                                    <option>Select</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>

                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid item xs={12} md={12} className="displayStyle">

                        <Card className="announceCard2 announcementPlay announcementCard">
                            <Grid container className="buttons-container">

                                {
                                    props.getPlaylistArray?.playlistArray?.length ?
                                        isPlaying ?
                                            <img src={prevBtn} className="pr-20 linkHover announcement-btn-dimensions" onClick={handlePrev} /> :
                                            <img src={prevBtn} className=" disabled pr-20 linkHover announcement-btn-dimensions" /> :
                                        <img src={prevBtn} className=" disabled pr-20 linkHover announcement-btn-dimensions" />

                                }

                                {props.getPlaylistArray?.playlistArray?.length ?
                                    playPause ? <img src={pauseBtn} className="pl-10 pr-20 linkHover announcement-btn-dimensions" onClick={handlePause} /> : <img src={playBtn} className="pl-10 pr-20 linkHover" onClick={handlePlay} /> : <img src={playBtn} className=" disabled pl-10 pr-20 linkHover" />
                                }

                                {props.getPlaylistArray?.playlistArray?.length ?
                                    !isPlaying ?
                                        <img src={stopBtn} className=" disabled pr-20 linkHover announcement-btn-dimensions" /> :
                                        <img src={stopBtn} className="pr-20 linkHover announcement-btn-dimensions" onClick={handleStop} /> :
                                    <img src={stopBtn} className=" disabled pr-20 linkHover announcement-btn-dimensions" />
                                }                            {


                                }

                                {
                                    props.getPlaylistArray?.playlistArray?.length ?
                                        isPlaying ?
                                            <img src={nextBtn} className="pl-10 linkHover announcement-btn-dimensions" onClick={handleNext} /> :
                                            <img src={nextBtn} className="disabled pl-10 linkHover announcement-btn-dimensions" /> :
                                        <img src={nextBtn} className="disabled pl-10 linkHover announcement-btn-dimensions" />
                                }
                            </Grid>
                        </Card>
                    </Grid>

                </Grid>
                <WarnUnsavedChanges
                    ignorePrompt={false}
                    navigateOnCancel={true}
                    title="Are you sure ?"
                    content="You want to stop the announcement and exit this page !"
                    cancelBtnText="Cancel"
                    confirmBtnText="confirm"
                    isDirty={isDirty}
                    handleStop={handleStop}
                    playPause={playPause}
                />
            </Card>
        </>
    )


}

