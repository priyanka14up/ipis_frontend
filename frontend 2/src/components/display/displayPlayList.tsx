import { Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Grid, Button, withStyles, Theme, createStyles } from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Checkbox from '@material-ui/core/Checkbox';
import DisplayService from "../service/display/displayService";
import { useEffect, useState } from "react";
import DisplayMediaQueueModel from "../../model/display/mediaQueue";
import Swal from "sweetalert2";
import { Tooltip } from "@material-ui/core";
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

export const DisplayPlayList = (props: any) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [hideTable, setHideTable] = useState<any>("")

    const [checkArray, setCheckArray] = useState<any>([]);

    const [mediaQueue, setMediaQueue] = useState<DisplayMediaQueueModel | any>({
        id: 0,
        mediaName: "",
        mediaLocation: "",
        isPlaying: isPlaying,
    });

    const handlePlaying = (data1: any) => {
        let data: any = {
            id: data1.id,
            isPlaying: !data1.isPlaying,
            mediaLocation: data1.mediaLocation,
            mediaName: data1.mediaName,
        }
        displayService.updateMediaQueue(data).then((response: any) => {
            if (response && response.status === 200) {
                if (data1.isPlaying == true) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `Media file unselected successfully`,
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        timer: 3000,
                    })
                }
                else if (data1.isPlaying == false) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `Media file selected successfully`,
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        timer: 3000,
                    })
                }
                displayService.getMediaQueueByDeviceType(displayControl).then((data: any) => {
                    if (data && data.data) {
                        setMediaQueue(data.data);
                    }
                })
                displayService.getMediaQueueByDeviceType(displayControl).then((data) => {
                    if (data && data.data) {
                        props.getDisplayMediaQueue.setMediaArray(data.data);
                    }
                })
            }
        });
    }

    const handleMoveUp = (id: any, idString: string) => {
        let idStr = idString.slice(0, -1);
        displayService.getMediaQueueMoveUp(id, idStr).then((data: any) => {
            if (data && data.data) {
                props.getDisplayMediaQueue.setMediaArray(data.data);
            }
        });
    }

    const handleMoveDown = (id: any, idString: string) => {
        let idStr = idString.slice(0, -1);
        displayService.getMediaQueueMoveDown(id, idStr).then((data: any) => {
            if (data && data.data) {
                props.getDisplayMediaQueue.setMediaArray(data.data);
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
            if (result.isConfirmed) {
                let data: any = {
                    id: el,
                }
                displayService.removeMediaQueueById(data).then((datas) => {
                    if (datas && datas.status === 200) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Media File deleted successfully',
                            showConfirmButton: false,
                            allowOutsideClick: false,
                            timer: 1500,
                        });
                        displayService.getMediaQueueByDeviceType(displayControl).then((data) => {
                            if (data && data.data) {
                                props.getDisplayMediaQueue.setMediaArray(data.data);
                            }
                            else if (data && data.errorMsg) {
                                props.getDisplayMediaQueue.setMediaArray([]);
                                props.getDisplayMediaQueue.setMediaError(data.errorMsg);
                            }
                        })
                    }
                })
            }
        })
    }


    let mediaArray: any;
    var displayControl: any;
    let idString: string = "";

    if (props && props.getDisplayMediaQueue && props.getDisplayMediaQueue.mediaArray) {
        mediaArray = props.getDisplayMediaQueue.mediaArray
    }
    if (props && props.getDisplayMediaQueue && props.getDisplayMediaQueue.displayControl) {
        displayControl = props.getDisplayMediaQueue.displayControl
    }

    useEffect(() => {
        queueData()
    }, [mediaArray])

    mediaArray.map((el: any) => {
        idString += el.id + ',';
    })
    useEffect(() => {
        if (props.getDisplayMediaQueue.showMedia) {
            setHideTable("showmediaDisable")
        }
        else {
            setHideTable("")
        }
    }, [props.getDisplayMediaQueue.showMedia])
    // const xyz = props.getDisplayMediaQueue.showMedia;

    const queueData = () => {
        if (mediaArray.length !== 0) {
            return (
                mediaArray.map((el: any, i1: any) => {
                    return (
                        <>
                            <StyledTableRow>
                                <Tooltip placement="bottom-end" title={props.getDisplayMediaQueue.showMedia?"Not Allowed":""}>
                                    <TableCell className="DisplayPlayListTblcol1" onChange={(() => handlePlaying(el))}>
                                        <Grid className={hideTable}>
                                            <Checkbox
                                                className="displayPlayListCheckbox"
                                                name="isPlaying"
                                                checked={el.isPlaying}
                                            />
                                        </Grid>
                                    </TableCell>
                                </Tooltip>
                                <Tooltip placement="bottom-end" title={props.getDisplayMediaQueue.showMedia?"Not Allowed":""}>
                                    <TableCell className="DisplayPlayListTblcol2"><Grid className={hideTable}>{el.mediaName}</Grid></TableCell>
                                </Tooltip>
                                <Tooltip placement="bottom-end" title={props.getDisplayMediaQueue.showMedia?"Not Allowed":""}>
                                    <TableCell className="DisplayPlayListTblcol2"><Grid className={hideTable}>{el.mediaLocation}</Grid></TableCell>
                                </Tooltip>
                                <Tooltip placement="bottom-end" title={props.getDisplayMediaQueue.showMedia?"Not Allowed":""}>
                                    <TableCell className="DisplayPlayListTblcol2">
                                        <Grid className={hideTable}>
                                            <Button aria-label="edit" className="padding-1Css" onClick={() => handleMoveUp(el.id, idString)} >
                                                <ArrowUpwardIcon className="DisplayPlayListIconstyle" />
                                                Move Up
                                            </Button>
                                        </Grid>
                                    </TableCell>
                                </Tooltip>
                                <Tooltip placement="bottom-end" title={props.getDisplayMediaQueue.showMedia?"Not Allowed":""}>
                                    <TableCell className="DisplayPlayListTblcol2">
                                        <Grid className={hideTable}>
                                            <Button aria-label="edit" className="padding-1Css" onClick={() => handleMoveDown(el.id, idString)} >
                                                <ArrowDownwardIcon className="DisplayPlayListIconstyle" />
                                                Move Down
                                            </Button>
                                        </Grid>
                                    </TableCell>
                                </Tooltip>
                                <Tooltip placement="bottom-end" title={props.getDisplayMediaQueue.showMedia?"Not Allowed":""}>
                                    <TableCell className="DisplayPlayListTblcol2">
                                        <Grid className={hideTable}>
                                            <Button aria-label="Delete" className="padding-1Css" onClick={() => handleDelete(el.id)}>
                                                <DeleteIcon className="DisplayPlayListIconstyle" />
                                                Delete
                                            </Button>
                                        </Grid>
                                    </TableCell>
                                </Tooltip>
                            </StyledTableRow >
                        </>
                    )
                })
            )
        }
    }

    return (
        <>
            <Grid className="DisplayFileListGridStyle">
                <Grid className="DisplayFileListGridStyle2">
                    <Typography className="DisplayFileListText1">
                        <b>Media Queue </b>
                    </Typography>
                </Grid>
                <TableContainer className="maxHeightTableContainer">
                    <Table stickyHeader aria-label="sticky table" className="DisplayPlayListTableSyle">
                        <TableHead>
                            <TableRow>
                                <TableCell className="DisplayPlayListTblRow1">
                                    Select
                                </TableCell >
                                <TableCell className="DisplayPlayListTblRow2">
                                    File Name
                                </TableCell >
                                <TableCell className="DisplayPlayListTblRow2">
                                    File Location
                                </TableCell>
                                <TableCell className="DisplayPlayListTblRow2" colSpan={3}>
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="DisplayPlayListTblbdy">
                            {queueData()}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </>
    )
}