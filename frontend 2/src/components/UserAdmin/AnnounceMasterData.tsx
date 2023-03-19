import { Card, Grid, Typography, TextField, Button, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from '@material-ui/icons/Add';
export const AnnouncementMasterData = () => {
    return (
        <>
            <Card className="settingCardStyle">
                <Grid>
                    <Card className="announceGridStyle1">
                        <Typography className="settingTextStyle1">
                            Create Announcement Template
                        </Typography>
                        <Grid container style={{ paddingBottom: "20px" }}>
                            <Grid item xs={3} style={{ display: "flex", justifyContent: "flex-end", paddingRight: "2%" }}>
                                <Typography className="settingTextStyle1">
                                    Template Number
                                </Typography>
                            </Grid>
                            <Grid container xs={8}>
                                <Grid item xs={4}>
                                    <select className="settingSelectStyle" >
                                        <option></option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                    </select>
                                </Grid>
                                <Grid container xs={8}>
                                    <Grid item xs={6} style={{ display: "flex", justifyContent: "flex-end", paddingRight: "5%" }}>
                                        <Typography className="settingTextStyle1">
                                            Message Type
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <select className="settingSelectStyle" >
                                            <option></option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                        </select>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={1}></Grid>
                        </Grid>
                        <Grid container style={{ paddingBottom: "20px" }}>
                            <Grid item xs={3} style={{ display: "flex", justifyContent: "flex-end", paddingRight: "1%" }}>
                                <Typography className="settingTextStyle1">
                                    Template Description
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    size="small"
                                    className="settingTextBoxStyle1"
                                    variant="outlined"
                                    required={true}
                                />
                            </Grid>
                            <Grid item xs={1}></Grid>
                        </Grid>
                        <Grid container style={{ display: "flex", justifyContent: "center" }}>
                            <Button type="reset" value="Reset" variant="outlined" className="announceCancel">
                                <CloseIcon className="clearIcon" />
                                Cancel
                            </Button>
                            <Button type="submit" className="announceAdd" variant="outlined" >
                            <AddIcon className="SaveIcon" style={{ display: "inherit" }} />
                                Add
                            </Button>
                        </Grid>
                    </Card>
                </Grid>
                <Grid>
                    <Card>
                        <Grid className="announceGridStyle">
                            <Grid className="announceGridStyle2">
                                <Typography className="announceText1">
                                    Announcement Template
                                </Typography>
                            </Grid>
                            <TableContainer style={{ maxHeight: "18vh" }}>
                                <Table stickyHeader aria-label="sticky table" className="announceTableSyle">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className="announceTblRow1">
                                                Template No.
                                            </TableCell >
                                            <TableCell className="announceTblRow2">
                                                Message Type
                                            </TableCell >
                                            <TableCell className="announceTblRow3">
                                                Template Description
                                            </TableCell>
                                            <TableCell className="announceTblRow3" colSpan={2}>
                                                Actions
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody className="announceTblbdy1">
                                        <TableRow>
                                            <TableCell className="announceTblcol1">
                                                1
                                            </TableCell>
                                            <TableCell className="announceCol2">GPS</TableCell>
                                            <TableCell className="announceCol2">Pre-Departure</TableCell>
                                            <TableCell className="announceCol2">
                                                <Button aria-label="edit" style={{ fontSize: "14px" }} >
                                                    <EditIcon className="DisplayPlayListIconstyle" />
                                                    Edit
                                                </Button>
                                            </TableCell>
                                            <TableCell className="announceCol2">
                                                <Button aria-label="Delete" style={{ padding: "1px" }} >
                                                    <DeleteIcon className="DisplayPlayListIconstyle" />
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Card>
                </Grid>
            </Card>
        </>
    )
}