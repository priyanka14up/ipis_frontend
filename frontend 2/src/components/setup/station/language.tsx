import { Card, Checkbox, FormControlLabel, Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";

export const LanguageCard = (props: any) => {

    var stationDetails: any;

    if (props && props.getLanguageCard && props.getLanguageCard.stationDetails) {
        stationDetails = props.getLanguageCard.stationDetails
    }

    const lang = new Array(3);

    const [regionalLang, setRegionalLang] = useState(false);
    const [enableEnglish, setEnglish] = useState(false)
    const [enableHindi, setHindi] = useState(false)


    const handleChange = (e: any) => {
        var { name, value, checked } = e.target;
        console.log(name, value, checked)
        const stationData = props.getLanguageCard.stationDetails
        // console.log(stationData)
        const lang = stationData.languages
        if (lang && name == "language1") {
            if (checked) {
                lang[0] = value
                setEnglish(true);
            }
            else {
                lang[0] = ""
                setEnglish(false);

            }
        } else if (lang && name == "language2") {
            if (checked) {
                lang[1] = value
                setHindi(true);
            }
            else {
                lang[1] = ""
                setHindi(false);
            }
        }
        else if (lang && name == "language3") {
            lang[2] = value
        }
        else if (name == "regionalLang") {
            if (checked) {
                setRegionalLang(true)
            }
            else {
                setRegionalLang(false)
                lang[2] = ""
            }
        }

        // if (regionalLang === true) {
        //     setRegionalLang(!regionalLang)
        //     props.getLanguageCard({ "languages3": "" })
        // }
        stationData.languages = lang
        console.log(name, value, checked, props);
        props.getLanguageCard.getStationData(stationData)

        // setRegionalLang(!regionalLang)
        // if (regionalLang === true)
        //     props.getLanguageCard({ "regionalLang": "" })
    }

    // const handleSubmit = () =>{

    // }

    // const handleCheck = () => {
    //     setRegionalLang(!regionalLang)
    //     if (regionalLang === true)
    //         props.getLanguageCard({ "languages3": "" })
    // }

    // console.log(regionalLang, "Regional")

    // useEffect(()=>{
    //      if(props.callback){
    //         props.callback(regLang);
    //      }
    // }, [regLang])

    useEffect(() => {
        if (stationDetails.languages.length != 0) {
            for (let i = 0; i < stationDetails.languages.length; i++) {
                if (stationDetails.languages[i] == "English") {
                    setEnglish(true)
                }
                if (stationDetails.languages[i] == "Hindi") {
                    setHindi(true)
                }
                if (stationDetails.languages[i] != "" && stationDetails.languages[i] != "Hindi" && stationDetails.languages[i] != "English" && stationDetails.languages[i] != null) {
                    setRegionalLang(true)
                }
            }
        } else {
            setEnglish(false);
            setHindi(false);
            setRegionalLang(false);
        }
    }, [stationDetails?.languages])

    return (
        <>
            <Card className="SDCardStyle">
                <Grid container className="mb-20"> <Typography className="t1">
                   <b> Language</b>
                </Typography></Grid>

                <Grid container className="languagecheckBoxStyle mb-20"
                // style={{ display: "flex", flexDirection: "column", paddingLeft: "10%" }}
                >
                    <FormControlLabel onClick={handleChange}
                        control={
                            <Checkbox checked={enableEnglish} size="small" name="language1" value="English" />
                        }
                        label={<span className="intigratinCheckboxlabel">English</span>}
                    />
                </Grid>
                <Grid container className="mb-20"><FormControlLabel onClick={handleChange}
                    control={
                        <Checkbox checked={enableHindi}  size="small" name="language2" value="Hindi" />
                    }
                    label={<span className="intigratinCheckboxlabel">Hindi</span>}
                /></Grid>

                <Grid container>
                    <Grid item xs={6} md={7} style={{textAlign:'left'}}>
                        <FormControlLabel onChange={handleChange}
                            control={
                                <Checkbox checked={regionalLang}  size="small" name="regionalLang" value={regionalLang} />
                            }
                            label={<span className="intigratinCheckboxlabel">Regional</span>}
                        />
                    </Grid>
                    <Grid item xs={6} md={5}>
                        {regionalLang == false ? (<select disabled className="selectLanguage" name="language3" onChange={handleChange} value={stationDetails.languages[2]} >
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

                        </select>) : (<select className="selectLanguage" name="language3" onChange={handleChange} value={stationDetails.languages[2]}>
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

                        </select>)}
                    </Grid>
                </Grid>
                {/* </Grid> */}
            </Card>
        </>
    )
}