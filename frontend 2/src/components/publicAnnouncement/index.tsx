import { Card, Grid } from "@material-ui/core"
import { useState } from "react";
import { useStore } from "react-redux";
import Swal from "sweetalert2";
import { AppHeader } from "../common/app-header"
import PublicAnnouncementServices from "../service/publicAnnouncement/publicAnnouncementServices";
import { ManualRecording } from "./manualRecording"
import { Playlist } from "./playlist"
import "./style.css";

export const PublicAnnouncement = () => {

    
    const [playlistArray,setPlaylistArray]=useState<any>([])
    const [file, setFiles] = useState([])
    const [fileArray, setFileArray] = useState<[]>([]);
    const [loading ,setLoading] = useState<any>(false);
    var obj = {
        playlistArray,
        setPlaylistArray,
        setFiles,
        file,
        fileArray,
        setFileArray,
        loading,
        setLoading
    }
    
    return (
        <>
            <Grid>
                {/* <Grid>
                    {" "}
                    <AppHeader />
                </Grid> */}
                <Card style={{ padding: "15px", borderRadius: "10px" }}>
                    <Grid container>
                        <Grid item xs={8}>
                            <ManualRecording getManualRecording={obj} />
                        </Grid>
                        <Grid item xs={4}>
                            <Playlist getPlaylistArray={obj}/>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </>
    )
}