import { Card, Grid } from "@material-ui/core"
import { useEffect, useState } from "react"
// import DisplayBoardSettingModel from "../../../model/setup/displayBoardSettingModel"
import { DisplayBoard } from "./displayBoard"
import { DisplayBoardDigno } from "./displayBoardDiagno"
import { DisplayLedTesting } from "./displayLedTesting"
import { useSelector } from "react-redux"
import { authuserStateSelector } from "../../../redux/reducers/authUser/authUser"
import Swal from "sweetalert2"
import SetupService from "../../service/setup/setup";
export const DisplayBoardSetting = (props: any) => {
    const setup = new SetupService();
    const { appUser } = useSelector(authuserStateSelector)

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

    // const getDisplayBoardData = (displayBoardSetting: DisplayBoardSettingModel )=> {
    //     setDisplayBoardSetting(displayBoardSetting)
    //     console.log(displayBoardSetting)

    // }

    // const getDisplayLedTesting = (displayBoardSetting: DisplayBoardSettingModel )=> {
    // setDisplayBoardSetting(displayBoardSetting)}

    // const getDisplayBoardDigno = (displayBoardSetting: DisplayBoardSettingModel )=> {
    //     setDisplayBoardSetting(displayBoardSetting)}
    //     console.log(displayBoardSetting)



    return (
        <>

            <Card style={{ padding: '20px', boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.1)", borderRadius: "10px",height:'100%' }}>
                <Grid container spacing={1}>
                    {props.stationData ?
                        <>
                            <Grid item xs={3} xl={3} className="DBSCards">
                                <DisplayBoard />
                            </Grid>
                            <Grid item xs={9} xl={9} >
                                <Grid container spacing={1}>
                                    <Grid item xs={12} className="DBSCards">
                                        <DisplayBoardDigno />
                                    </Grid>
                                    <Grid item xs={12} className="DBSCards">
                                        <DisplayLedTesting />
                                    </Grid>
                                </Grid>
                            </Grid></> : <></>}
                </Grid>
            </Card>
        </>
    )
}