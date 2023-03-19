import { Card, Grid, TextField, Typography, Button } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
export const UserProfile = () => {
    return (
        <>
            <Card className="adminUserProfileCard">
                <Grid className="adminUserProfileCard2">
                    <Typography className="userProfileText1">
                        Personal Details
                    </Typography>
                    <Grid container className="userProfileGridStyle">
                        <Grid item xs={4} style={{ display: "flex", justifyContent: "flex-end" }}>
                            <Typography className="userProfileText2">
                                First Name
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                size="small"
                                className="TextboxAdmin"
                                variant="outlined"
                                required={true}
                            />
                        </Grid>
                        
                    </Grid>
                    <Grid container className="userProfileGridStyle">
                        <Grid item xs={4} style={{ display: "flex", justifyContent: "flex-end" }}>
                            <Typography className="userProfileText2">
                                Last Name
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                size="small"
                                className="TextboxAdmin"
                                variant="outlined"
                                required={true}
                            />
                        </Grid>
                    </Grid>
                    <Grid container className="userProfileGridStyle">
                        <Grid item xs={4} style={{ display: "flex", justifyContent: "flex-end" }}>
                            <Typography className="userProfileText2">
                                Email-ID
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                size="small"
                                className="TextboxAdmin"
                                variant="outlined"
                                required={true}
                            />
                        </Grid>
                    </Grid>
                    <Grid container className="userProfileGridStyle">
                        <Grid item xs={4} style={{ display: "flex", justifyContent: "flex-end" }}>
                            <Typography className="userProfileText2">
                                Username
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                size="small"
                                className="TextboxAdmin"
                                variant="outlined"
                                required={true}
                            />
                        </Grid>
                    </Grid>
                    <Grid container className="userProfileGridStyle">
                        <Grid item xs={4} style={{ display: "flex", justifyContent: "flex-end" }}>
                            <Typography className="userProfileText2">
                                Mobile No.
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                size="small"
                                className="TextboxAdmin"
                                variant="outlined"
                                required={true}
                            />
                        </Grid>
                    </Grid>
                    <Grid container className="userProfileGridStyle">
                        <Grid item xs={4} style={{ display: "flex", justifyContent: "flex-end" }}>
                            <Typography className="userProfileText2">
                                Employee ID
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                size="small"
                                className="TextboxAdmin"
                                variant="outlined"
                                required={true}
                            />
                        </Grid>
                    </Grid>
                    <Typography className="userProfileText3">
                        Change Password
                    </Typography>
                    <Grid container className="userProfileGridStyle">
                        <Grid item xs={4} style={{ display: "flex", justifyContent: "flex-end" }}>
                            <Typography className="userProfileText2">
                                Old Password
                            </Typography>
                        </Grid>
                        <Grid item xs={8} style={{ display: "flex" }}>
                            <TextField
                                size="small"
                                className="TextboxAdmin"
                                variant="outlined"
                                required={true}
                            />
                        </Grid>
                    </Grid>
                    <Grid container className="userProfileGridStyle">
                        <Grid item xs={4} style={{ display: "flex", justifyContent: "flex-end" }}>
                            <Typography className="userProfileText2">
                                New Password
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                size="small"
                                className="TextboxAdmin"
                                variant="outlined"
                                required={true}
                            />
                        </Grid>
                    </Grid>
                    <Grid container className="userProfileGridStyle">
                        <Grid item xs={4} style={{ display: "flex", justifyContent: "flex-end" }}>
                            <Typography className="userProfileText2">
                                Confirm Password
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                size="small"
                                className="TextboxAdmin"
                                variant="outlined"
                                required={true}
                            />
                        </Grid>
                    </Grid>
                    <Grid container className="userProfileGridStyle2">
                        <Grid item xs={4}>
                        </Grid>
                        <Grid item xs={8} style={{ display: "flex", justifyContent: "flex-start" }}>
                            <Button type="reset" value="Reset" variant="outlined" className="adminStationCancel">
                                <CloseIcon className="clearIcon" />
                                Cancel
                            </Button>
                            <Button type="submit" className="adminStationSave" variant="outlined" >
                                <DoneIcon className="SaveIcon" style={{ display: "inherit" }} />
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </>
    )
}
