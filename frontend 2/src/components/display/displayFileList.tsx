import { Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Grid, Button, Modal, Card, IconButton, TextField, withStyles, Theme, createStyles, CircularProgress } from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ClearIcon from '@material-ui/icons/Clear';
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import DisplayService from "../service/display/displayService";
import DisplayFileListModel from "../../model/display/fileList";
import el from "date-fns/esm/locale/el/index.js";

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }),
)(TableRow);

const displayService = new DisplayService();

export const DisplayFileList = (props: any) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false)
    const formData = new FormData();
    const [file, setFile] = useState<any>([]);
    const [mediaFile, setMediaFile] = useState<DisplayFileListModel | any>({
        id: 0,
        mediaName: "",
        mediaLocation: "",
    });
    const [error, setError] = useState("");
    const handleChange = (e: any) => {
        var { name, value, files } = e.target;
        let filesArray = [];
        if (files) {
            setFile([]);
            if (files.length != 0) {
                filesArray.push(files[0]);
            }
            setFile(filesArray);
        }
        setMediaFile({ ...mediaFile, [name]: value })
    };


    var displayControl: any = null;
    if (props && props.getDisplayFileList && props.getDisplayFileList.array.length != 0) {
    }

    if (props && props.getDisplayFileList && props.getDisplayFileList.displayControl) {
        displayControl = props.getDisplayFileList.displayControl
    }

    if (props && props.getDisplayFileList && props.getDisplayFileList.mediaArray.length != 0) {
    }

    const handleSubmit = () => {
        if (mediaFile.mediaName != "" && mediaFile.mediaLocation != "") {
            formData.append('file', file[0]);
            const data: any = {
                id: mediaFile.id,
                mediaName: mediaFile.mediaName,
                mediaLocation: mediaFile.mediaLocation,
            };
            displayService.uploadTVDisplayFile(formData).then((response: any) => {
                if (response && response?.status === 200) {
                    displayService.createMediaFile(data, displayControl).then((response: any) => {
                        if (response && response?.status === 200) {
                            setError("");
                            Swal.fire({
                                position: "center",
                                customClass: {
                                    container: 'my-swal'
                                },
                                icon: "success",
                                title: `Display Data added successfully`,
                                showConfirmButton: false,
                                allowOutsideClick: false,
                                timer: 1500,
                            }).then(() => {
                                setMediaFile({
                                    id: 0,
                                    mediaName: "",
                                    mediaLocation: "",
                                })
                            }).then(() => {
                                displayService.getMediaFileByDisplayType(displayControl).then((datas) => {
                                    if (datas && datas.data) {
                                        props.getDisplayFileList.setArray(datas?.data);
                                        setOpen(false);
                                        setError("")
                                    }
                                })
                            })
                        }
                        else {
                            setError(response?.errorMsg)
                        }
                    });
                }


            });

        }
    }

    useEffect(() => {
        mediaData()
    }, [props.getDisplayFileList.array])

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
                displayService.removeMediaFileById(data).then((datas) => {
                    if (datas && datas.status === 200) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'File deleted successfully',
                            showConfirmButton: false,
                            allowOutsideClick: false,
                            timer: 1500,
                        });
                        displayService.getMediaFileByDisplayType(displayControl).then((data) => {
                            if (data && data?.data) {
                                props.getDisplayFileList.setArray(data?.data);
                            }
                        })
                    }
                })
            }
        })
    }

    const handleCancel = () => {
        setMediaFile({
            mediaName: "",
            mediaLocation: "",
        });
        setError("");
    }


    const moveToPlayList = (el: any) => {
        if (el) {
            const data: any = {
                id: el.id,
                mediaName: el.mediaName,
                mediaLocation: el.mediaLocation,
                isPlaying: false,
            };
            displayService.createMediaQueue(data, displayControl).then((response) => {
                if (response && response.status === 200) {
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
                            displayService.getMediaQueueByDeviceType(displayControl).then((datas) => {
                                if (datas && datas.data) {
                                    props.getDisplayFileList.setMediaArray(datas.data);
                                    props.getDisplayFileList.setMediaError("");
                                }
                            })
                        })
                }
            });

        }
    }




    const mediaData = () => {
        if (props.getDisplayFileList.array.length !== 0) {
            return (
                props.getDisplayFileList.array.map((el: any, i: any) => {
                    return (
                        <StyledTableRow>
                            <TableCell className="DisplayFileListTblcol">{el.mediaName}</TableCell>
                            <TableCell className="DisplayFileListTblcol">{el.mediaLocation}</TableCell>
                            <TableCell className="DisplayFileListTblcol">
                                <Button aria-label="edit" className="editCss"
                                    onClick={() => moveToPlayList(el)}
                                >
                                    <ArrowForwardIcon className="DisplayFileListIconstyle" />
                                    {props.getDisplayFileList.mediaArray.includes(el.mediaLocation) ? "Added" : "Move To playlist"}
                                </Button>
                            </TableCell>
                            <TableCell className="DisplayFileListTblcol">
                                <Button aria-label="Delete" className="editCss" onClick={() => handleDelete(el?.id)} >
                                    <DeleteIcon className="DisplayFileListIconstyle" />
                                    Delete
                                </Button>
                            </TableCell>
                        </StyledTableRow>
                    )
                })
            )
        }
    }
    return (
        <>
            <Grid className="DisplayFileListGridStyle">
                <Grid container>
                    <Grid item xs={9} md={7} xl={11} >
                        <Typography className="DisplayFileListText1">
                           <b>File List</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={3} md={5} xl={1} className="DisplayFileListAddGrid">
                        <Button className="DisplayFileListAdd" variant="outlined" onClick={handleOpen} >
                            Add file
                        </Button>
                    </Grid>
                </Grid>
                <Modal open={open} className="addFileModalcss" >
                    <Card className="displayModalStyle">
                        <Grid container className="addFileGridcss">
                            <Grid item xs={10}></Grid>
                            <Grid item xs={2} >
                                <IconButton onClick={handleClose}>
                                    <ClearIcon className="iconButtonCss" />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Typography className="displayModalText1">
                                <b>Add Media</b>
                            </Typography>
                        </Grid>
                        <Grid container>
                            <Typography className="displayModalText2">
                                Add Media for Display
                            </Typography>
                        </Grid>
                        <Grid container className="fileNameGridCss">
                            <Grid item xs={3} className="fileNameGridCss-two">
                                <Typography className="displayModalText3">
                                    <b>file Name</b>
                                </Typography>
                            </Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={6}>
                                <TextField variant="outlined" className="displayModalText4" required={true}
                                    name="mediaName"
                                    value={mediaFile?.mediaName}
                                    onChange={handleChange} />
                            </Grid>
                            <Grid item xs={2}></Grid>
                        </Grid>
                        <Grid container className="fileLocationCss">
                            <Grid item xs={3} className="fileNameGridCss-two">
                                <Typography className="displayModalText3">
                                    <b>file Location</b>
                                </Typography>
                            </Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={6}>
                                <TextField variant="outlined" className="displayModalText4"
                                    name="mediaLocation"
                                    value={mediaFile?.mediaLocation}
                                    onChange={handleChange}
                                    disabled={true}
                                />
                            </Grid>
                            <Grid item xs={2} className="browseButtonGridCss">
                                <Button
                                    className="displayModalBrowseButton"
                                    variant="contained"
                                    component="label"
                                >
                                    browse
                                    <input
                                        onChange={handleChange}
                                        name="mediaLocation"
                                        type="file"
                                        hidden
                                    />
                                </Button>
                            </Grid>
                        </Grid>
                        <br />
                        <Grid>
                            <div>
                                {error != "" ? <div style={{ color: "red", textAlign: "center" }}>{error}</div> : <></>}
                            </div>
                        </Grid>
                        <Grid container className="textAlignCenter">
                            <Grid item xs={6}>
                                <Button type="reset" variant="outlined" className="displayModalCancelBtn" onClick={handleCancel} >
                                    <CloseIcon className="DefaultMsgIcon" fontSize="small" />
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button type="submit" className="displayModalSaveBtn" variant="outlined" onClick={handleSubmit}>
                                    <DoneIcon className="DefaultMsgIcon" fontSize="small" />
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </Card>
                </Modal>
                <Grid className="textAlignCenter">
                    {
                        displayControl?.displayType === "" && props.getDisplayFileList.array.length === 0 && props.getDisplayFileList.mediaArray.length == 0 ? <span style={{ textAlign: "center", color: "red" }}>Please select display type</span> :
                            <> <TableContainer className="tableCss" style={{ maxHeight: "17vh", overflow:"scroll",height:"17vh" }}>
                                <Table stickyHeader aria-label="sticky table" className="DisplayFileListTableSyle">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className="DisplayFileListTblRow">
                                                <b>File Name</b>
                                            </TableCell >
                                            <TableCell className="DisplayFileListTblRow">
                                               <b>File Location</b>
                                            </TableCell>
                                            <TableCell className="DisplayFileListTblRow" colSpan={2}>
                                               <b>Actions</b>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody className="DisplayFileListTblbdy">
                                        {mediaData()}
                                    </TableBody>
                                </Table>
                            </TableContainer></>
                    }
                </Grid>
            </Grid>
        </>
    )
}


