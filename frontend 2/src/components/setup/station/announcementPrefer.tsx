import { Card, Checkbox, FormControlLabel, Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";


export const AnnouncementPrefer = (props: any) => {

    var stationDetails: any;

    const [announcementLang, setAnnouncementLang] = useState<any | []>([]);
    if (props && props.getAnnouncementPrefer && props.getAnnouncementPrefer.stationDetails) {
        stationDetails = props.getAnnouncementPrefer.stationDetails
    }


    const [announcementPrefer1, setAnnouncementPrefer1] = useState(false);
    const [announcementPrefLang2, setAnnouncementPrefLang2] = useState(false);
    const [announcementPrefLang3, setAnnouncementPrefLang3] = useState(false);


    // const announcementLang = new Array(3); 

    const stationData = props.getAnnouncementPrefer.stationDetails
    // useEffect(()=>{
    //    setAnnouncementLang(stationData.languages);
    //    if(stationData.languages[0] !==""){

    //    }
    // },[stationData.languages])

    const isSelected = (option: any) => {
        return props.thirdLang === option;

    }

    const handleChange = (e: any) => {
        var { name, value, checked } = e.target;
        if (name === "announcementPrefer01") {
            if (checked) {
                setAnnouncementPrefer1(checked)
            }
            else {
                setAnnouncementPrefer1(checked)
                announcementLang[0] = "";
            }
        }
        if (name === "announcementPrefLang2") {
            if (checked) {
                setAnnouncementPrefLang2(checked)
            }
            else {
                setAnnouncementPrefLang2(checked)
                announcementLang[1] = "";
            }
        }
        if (name === "announcementPrefLang3") {
            if (checked) {
                setAnnouncementPrefLang3(checked)
            }
            else {
                setAnnouncementPrefLang3(checked)
                announcementLang[2] = "";
            }
        }
        stationData.announcementPreference = announcementLang;
        props.getAnnouncementPrefer.getStationData(stationData)
    }
    
    const handleSelect = (e: any) => {
        var { name, value } = e.target;
        if (name == "announcementPrefer1") {
            announcementLang[0] = value
        }
        else if (name == "announcementPrefer2") {
            announcementLang[1] = value
        }
        else if (name == "announcementPrefer3") {
            announcementLang[2] = value
        }
        stationData.announcementPreference = announcementLang;

        props.getAnnouncementPrefer.getStationData(stationData)
        console.log(stationData.announcementPreference, "arrraayyyyy");
    }

    useEffect(() => {
        setAnnouncementLang(stationDetails?.announcementPreference)

            if ((stationDetails.announcementPreference[0] == "" || stationDetails.announcementPreference[0] == null|| stationDetails.announcementPreference[0] == undefined ) && announcementPrefer1 == false) {
                setAnnouncementPrefer1(false)
            }
            else{
                setAnnouncementPrefer1(true)
            }
            if ((stationDetails.announcementPreference[1] == "" || stationDetails.announcementPreference[1] == null || stationDetails.announcementPreference[1] == undefined) && announcementPrefLang2 == false) {
                setAnnouncementPrefLang2(false)
            }
            else{
                setAnnouncementPrefLang2(true)

            }
            if ((stationDetails.announcementPreference[2] == "" || stationDetails.announcementPreference[2] == null || stationDetails.announcementPreference[2] == undefined)  && announcementPrefLang3 == false) {
                setAnnouncementPrefLang3(false)
            }
            else{
                setAnnouncementPrefLang3(true)

            }    
    }, [stationDetails?.announcementPreference])


    return (
        <>
            <Card className="SDCardStyle apH">
                <Grid container className="mb-20">
                <Typography className="t1">
                   <b> Announcement Preferences</b>
                </Typography></Grid>
                <Grid >
                    <Grid container>
                        <Grid item xs={8} lg={7} className="langCheck" style={{ textAlign: "start" }}>
                            <FormControlLabel onChange={handleChange}
                                control={
                                    <Checkbox checked={announcementPrefer1} className="announcementCheckbox" size="small" name="announcementPrefer01" />
                                }
                                label={<span className="intigratinCheckboxlabel">First Language</span>}
                            />
                        </Grid>
                        <Grid item xs={4} lg={5}>
                            {announcementPrefer1 == false ?
                                (<select disabled className="AnnouncePrefer" onChange={handleSelect} name="announcementPrefer1" value={stationDetails.announcementPreference[0]}>
                                    <option value="">Select</option>
                                    <option value="English">English</option>
                                    <option value="Hindi">Hindi</option>
                                    
                                </select>) : (<select className="AnnouncePrefer" onChange={handleSelect} name="announcementPrefer1" value={stationDetails.announcementPreference[0]}>
                                    <option value="">Select</option>
                                    <option value="English">English</option>
                                    <option value="Hindi">Hindi</option>
                                   
                                </select>)
                            }
                        </Grid>
                    </Grid>
                    <Grid container style={{ paddingTop: "10px" }}>
                        <Grid item xs={8} lg={7} className="langCheck" style={{ textAlign: "start"}}>
                            <FormControlLabel onChange={handleChange}
                                control={
                                    <Checkbox checked={announcementPrefLang2} className="announcementCheckbox" size="small" name="announcementPrefLang2" />
                                }
                                label={<span className="intigratinCheckboxlabel" style={{wordBreak:'break-word'}}>Second Language</span>}
                            />
                        </Grid>
                        <Grid item xs={4} lg={5}>
                            {announcementPrefLang2 == false ?
                                <select disabled className="AnnouncePrefer" onChange={handleSelect} name="announcementPrefer2" value={stationDetails.announcementPreference[1]} >
                                    <option value="">Select</option>
                                    <option value="English">English</option>
                                    <option value="Hindi">Hindi</option>
                                   
                                </select> : <select className="AnnouncePrefer" onChange={handleSelect} name="announcementPrefer2" value={stationDetails.announcementPreference[1]} >
                                    <option value="">Select</option>
                                    <option value="English">English</option>
                                    <option value="Hindi">Hindi</option>
                                   
                                </select>}
                        </Grid>
                    </Grid>
                    <Grid container style={{ paddingTop: "10px" }}>
                        <Grid item xs={8} lg={7} className="langCheck" style={{ textAlign: "start" }}>
                            <FormControlLabel onChange={handleChange}
                                control={
                                    <Checkbox checked={announcementPrefLang3} className="announcementCheckbox" size="small" name="announcementPrefLang3" />
                                }
                                label={<span className="intigratinCheckboxlabel">Third Language</span>}
                            />
                        </Grid>
                        <Grid item xs={4} lg={5}>
                            {announcementPrefLang3 == false ?
                                <select disabled className="AnnouncePrefer" onChange={handleSelect} name="announcementPrefer3" value={stationDetails.announcementPreference[2]} >
                                    <option value="">Select</option>
                                    <option value="Bengali">Bengali</option>
                                    <option value="Gujarati">Gujarati</option>
                                    <option value="Kannada">Kannada</option>
                                    <option value="Malayalam">Malayalam</option>
                                    <option value="Marathi">Marathi</option>
                                    <option value="Oriya">Oriya</option>
                                    <option value="Punjabi">Punjabi</option>
                                    <option value="Tamil">Tamil</option>
                                    <option value="Telugu">Telugu</option>
                                    <option value="Urdu">Urdu</option>
                                </select> : <select className="AnnouncePrefer" onChange={handleSelect} name="announcementPrefer3" value={stationDetails.announcementPreference[2]} >
                                    <option value="">Select</option>
                                    <option value="Bengali">Bengali</option>
                                    <option value="Gujarati">Gujarati</option>
                                    <option value="Kannada">Kannada</option>
                                    <option value="Malayalam">Malayalam</option>
                                    <option value="Marathi">Marathi</option>
                                    <option value="Oriya">Oriya</option>
                                    <option value="Punjabi">Punjabi</option>
                                    <option value="Tamil">Tamil</option>
                                    <option value="Telugu">Telugu</option>
                                    <option value="Urdu">Urdu</option>
                                    
                                </select>}

                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </>
    )
}