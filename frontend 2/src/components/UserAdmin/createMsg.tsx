import { Card, Grid, Typography, TextField, Button, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Checkbox } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
export const CreateMessage = () => {
    return (
        <>
            <Card className="createMsgCardStyle">
                <Grid>
                    <Card className="createMsgGridStyle1">
                        <Typography className="createMsgTextStyle1">
                            Create Message
                        </Typography>
                        <Grid container style={{ paddingBottom: "20px" }}>
                            <Grid item xs={2} style={{ display: "flex", justifyContent: "flex-end", paddingRight: "2%" }}>
                                <Typography className="createMsgTextStyle1">
                                    Page Number
                                </Typography>
                            </Grid>
                            <Grid container xs={10}>
                                <Grid item xs={2}>
                                    <select className="createMsgSelectStyle1" >
                                        <option></option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                    </select>
                                </Grid>
                                <Grid container xs={5}>
                                    <Grid item xs={6} style={{ display: "flex", justifyContent: "flex-end", paddingRight: "5%" }}>
                                        <Typography className="createMsgTextStyle1">
                                            Page Duration
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <select className="createMsgSelectStyle2" >
                                            <option></option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                        </select>
                                    </Grid>
                                </Grid>
                                <Grid container xs={5}>
                                    <Grid item xs={6} style={{ display: "flex", justifyContent: "flex-end", paddingRight: "5%" }}>
                                        <Typography className="createMsgTextStyle1">
                                            Language
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <select className="createMsgSelectStyle2" >
                                            <option></option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                        </select>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid container style={{ paddingBottom: "20px" }}>
                            <Grid item xs={2} style={{ display: "flex", justifyContent: "flex-end", paddingRight: "1%" }}>
                                <Typography className="createMsgTextStyle1">
                                    Template Description
                                </Typography>
                            </Grid>
                            <Grid item xs={10}>
                                <TextField
                                    size="small"
                                    className="createMsgTextBoxStyle1"
                                    variant="outlined"
                                    required={true}
                                />
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid>
                    <Card className="createMsgGridStyle1">
                        <Typography className="createMsgTextStyle1">
                            Message Display
                        </Typography>
                        <Grid item xs={12}>
                            <TextField
                                size="small"
                                className="createMsgTextBoxStyle2"
                                variant="outlined"
                                required={true}
                            />
                        </Grid>
                    </Card>
                </Grid>
                <Grid container >
                    <Grid item xs={6} style={{ paddingRight: "10px" }}>
                        <Card>
                            <Grid className="announceGridStyle">
                                <Grid container className="announceGridStyle2">
                                    <Grid item xs={8}>
                                        <Typography className="audioFileListText1">
                                            Audio List
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4} className="DisplayFileListAddGrid">
                                        <Button className="audioFileListAdd" variant="outlined">
                                            Upload audio
                                        </Button>
                                    </Grid>
                                </Grid>
                                <TableContainer style={{ maxHeight: "18vh" }}>
                                    <Table stickyHeader aria-label="sticky table" className="announceTableSyle">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className="AudioListTblRow1">
                                                    S No.
                                                </TableCell >
                                                <TableCell className="AudioListTblRow2">
                                                    Template Description
                                                </TableCell >
                                                <TableCell className="AudioListTblRow3">
                                                    Actions
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody className="announceTblbdy1">
                                            <TableRow>
                                                <TableCell className="announceTblcol1">
                                                    1
                                                </TableCell>
                                                <TableCell className="announceCol2">ARR-ENG1.mp3</TableCell>
                                                <TableCell className="announceCol2">
                                                    <Button aria-label="Delete" >
                                                        <DeleteIcon className="CreateMsgIconstyle" />
                                                        <span style={{fontFamily:"Roboto",fontSize:"14px",textTransform:"capitalize"}}>Delete</span>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card>
                            <Grid className="announceGridStyle">
                                <Grid className="announceGridStyle2">
                                    <Typography className="audioFileListText1">
                                        Tags
                                    </Typography>
                                </Grid>
                                <TableContainer style={{ maxHeight: "18vh" }}>
                                    <Table stickyHeader aria-label="sticky table" className="announceTableSyle">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className="announceTblRow1">
                                                    Select
                                                </TableCell >
                                                <TableCell className="announceTblRow2">
                                                    Tags
                                                </TableCell >
                                            </TableRow>
                                        </TableHead>
                                        <TableBody className="announceTblbdy1">
                                            <TableRow>
                                                <TableCell className="announceTblcol1">
                                                    <Checkbox
                                                        className="displayPlayListCheckbox"
                                                    />
                                                </TableCell>
                                                <TableCell className="announceCol2">All Station</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
                <Grid container style={{ paddingTop: "20px" }}>
                    <Grid item xs={6} style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button type="reset" value="Reset" variant="outlined" className="createMsgCancel">
                            <CloseIcon className="clearIcon" />
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={6} style={{ display: "flex", justifyContent: "flex-start" }}>
                        <Button type="submit" className="createMsgSave" variant="outlined" >
                            <DoneIcon className="SaveIcon" style={{ display: "inherit" }} />
                           save
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        </>
    )
}