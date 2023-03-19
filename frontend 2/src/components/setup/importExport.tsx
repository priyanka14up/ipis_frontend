import {
    Button,
    Card,
    Checkbox,
    CircularProgress,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import SetupService from "../service/setup/setup";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { authuserStateSelector } from "../../redux/reducers/authUser/authUser";
const setup = new SetupService();

export const ImportExport = (props: any) => {
    const { appUser } = useSelector(authuserStateSelector)
    const [dbName, setDbName] = useState<any>("");
    const [fileName, setFileName] = useState<any>("");
    const [waitForSave, setwaitForSave] = useState(false)
    const formData = new FormData();
    const [file, setFile] = useState<any>([]);
    useEffect(() => {
        if (props.stationData) {
            return;
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

    const handleFileChange = (e: any) => {
        var { name, value, checked, files } = e.target;
        let filesArray = [];
        if (files) {
            setFile([]);
            if (files.length != 0) {
                filesArray.push(files[0]);
            }
            setFileName(files[0]?.name)
            setFile(filesArray);
        }
    }

    useEffect(() => {
        console.log(fileName, "444")
        if (file?.length != 0) {
            formData.append('file', file[0]);
            setup.uploadDatabaseFile(formData);
        }
    }, [file])

    const handleSubmit = () => {
        setwaitForSave(true)
        setup.export(dbName).then(data => {
            console.log(data, "5555");
              if (data.status === 200) {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: `File Export Successfully`,
                  showConfirmButton: false,
                  allowOutsideClick: false,
                  timer: 3000,
                })
                setwaitForSave(false);
                setDbName("");
                // setError("")
              }
              else  {
                // setError(data.errorMsg);
                console.log("error");
              }
        })
    }
    const handleImport = () => {
        setwaitForSave(true)
        setup.import(fileName).then(data => {
            console.log(data, "5555");
              if (data.status === 200) {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: `Data Saved Successfully`,
                  showConfirmButton: false,
                  allowOutsideClick: false,
                  timer: 3000,
                })
                setwaitForSave(false)
                // setError("")
              }
              else  {
                // setError(data.errorMsg);
                console.log("error");
              }
        })
    }



    return (
        <>
            {/* <Grid>
                <Card style={{ paddingTop: "6.5%", paddingBottom: "6.8%", paddingLeft: "28.69%", paddingRight: "28.69%" }} className="webConfigGridStyle">
                    <Grid>Exports</Grid>
                    <hr />
                    <TextField variant="outlined" name="dbname" onChange={(e) => { setDbName(e.target.value) }}></TextField>
                    <Button
                        onClick={handleSubmit}
                        type="submit"
                        className="Save"
                        variant="contained"
                    >
                        <span className="bttnfont">Export</span>
                    </Button>

                    <hr />
                    <Grid>Imports</Grid>
                    <hr />
                    <Grid container style={{ width: "44.2%" }}>
                        <Grid item xs={4} className="E-File">
                            File Name
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                size="small"
                                name="fileName"
                                value={fileName}
                                className="sceBigbox"
                                variant="outlined"
                                disabled={true}
                                placeholder="Choose .mp3 or .wav files"
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
                                    onChange={(e: any) => { handleFileChange(e) }}
                                    name="fileName"
                                    type="file"
                                    hidden
                                // accept="audio/mp3 , audio/wav"
                                />
                            </Button>
                        </Grid>

                    </Grid>
                    <Button
                        onClick={handleImport}
                        type="submit"
                        className="Save"
                        variant="contained"
                    >
                        <span className="bttnfont">Import</span>
                    </Button>

                </Card>
            </Grid> */}



            <Grid style={{ position: "relative" }}
                container
                className={
                    appUser.userRole == "ROLE_STATION MASTER"
                        ? "overlapBackground"
                        : ""
                }
            >
                {appUser.userRole == "ROLE_STATION MASTER" ? (
                    <Grid className="stationForm formFields"></Grid>
                ) : (
                    <></>
                )}
                {waitForSave == true ? <Grid item xs={12} className="loaderCss">
                        <CircularProgress className="ldrcircle" />
                        <h1 style={{ color: "white", justifyContent: "center" }}>Loading...</h1>
                    </Grid> : <></>
                    }
                <Grid item xs={12}>
                    <Card className="h100im">
                        <Grid container className="imepohmain"><b className="mainspn">Import/Export</b></Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <Card className="fristcardimex">
                                    <Grid container className="imepoh">
                                        <b>Exports</b>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={1} className="fn">
                                            File Name<sup className="asterisk">*</sup>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <TextField variant="outlined" value={dbName} name="dbname" required={true} onChange={(e) => { setDbName(e.target.value) }}></TextField>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Button
                                                disabled={!dbName}
                                                onClick={handleSubmit}
                                                type="submit"
                                                className="Save"
                                                variant="contained"
                                            >
                                                <span className="bttnfont">Export</span>
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <Card className="fristcardimex">
                                    <Grid container className="imepoh">
                                        <b>Imports</b>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={1} className="fn">
                                            File Name<sup className="asterisk">*</sup>
                                        </Grid>
                                    </Grid>
                                    <Grid container className="alc">
                                        <Grid item xs={4}>
                                            <TextField
                                                required={true}
                                                size="small"
                                                name="fileName"
                                                value={fileName}
                                                className="sceBigbox"
                                                variant="outlined"
                                                disabled={true}
                                                placeholder="Choose .mp3 or .wav files"
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Button
                                                className="Save"
                                                variant="contained"
                                                component="label"
                                            >
                                                BROWSE
                                                <input
                                                    value={""}
                                                    onChange={(e: any) => { handleFileChange(e) }}
                                                    name="fileName"
                                                    type="file"
                                                    hidden
                                                    accept=".sql"
                                                // accept="audio/mp3 , audio/wav"
                                                />
                                            </Button>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Button
                                                onClick={handleImport}
                                                type="submit"
                                                className="Save"
                                                variant="contained"
                                            >
                                                <span className="bttnfont">Import</span>
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}