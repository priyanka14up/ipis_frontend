import { Card, Divider, Grid, TextField, Typography } from "@material-ui/core";
import { useState } from "react";

export const StationData = (props: any) => {
    var stationDetails;
    var stationErrors;

    if (props && props.getStationData && props.getStationData.stationDetails) {
        stationDetails = props.getStationData.stationDetails
    }

    if (props && props.getStationData && props.getStationData.stationError) {
        stationErrors = props.getStationData.stationError
    }
    const handleChange = (e: any) => {
        var { name, value } = e.target;
        if((name=="stationCode" || name=="regionCode" ) && value.match(/^[a-z ]{0,10}$/i)){
            props.getStationData.getStationData({ [name]: value })
        }
        if((name=="northEastEnd" || name =="divisionCode" || name=="divisionName" || name=="southWestEnd" || name=="regionName") && value.match(/^[a-z ]{0,30}$/i)){
            props.getStationData.getStationData({ [name]: value })
        }
    
        if(name=="stationName"){
            props.getStationData.getStationData({ [name]: value })
        }
    }

    return (
        <>
            {/* <Grid item xs={12} >
            <Card style={{padding: "2% 1.8% 2.6% 2.9%",marginBottom:"0.8px",border:"1px solid #DDDDDD", borderRadius:"10px",height:'325px'}} >
                <Typography className="t1">
                    Station Details
                </Typography>
                <Typography className="t2">
                    Enter Station Details
                </Typography>
                <Grid container>
                    <Grid item xs={4}>
                        <Grid container>
                            <Grid item xs={4} style={{display: "flex", alignItems: "center", justifyContent:"flex-end"}}>
                                <Typography className="Label">
                                    Station Name<sup className="asterisk">*</sup>
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                            <TextField variant="outlined" className="stationDataBox"
                                    name="stationName" onChange={handleChange} value={stationDetails.stationName} required={true}/> */}
            {/* <select className="selectName" name="stationName" required={true} onChange={handleChange} value={stationDetails.stationName}>
                                <option >Select</option>
                                <option value="Anand Vihar" >Anand Vihar</option>
                                <option value="New Delhi">New Delhi</option>
                                <option value="Delhi">Delhi</option>
                                </select> */}
            {/* </Grid>
                            <div>
                  {stationErrors != "" ? <div style={{ color: "red", textAlign: "center" }}> {stationErrors}</div> : <></>}

                </div>
                <Divider style={{width:'100%',marginTop:'10px',marginBottom:'15px'}}></Divider>
                            <Grid item xs={4} style={{display: "flex", alignItems: "center" , justifyContent:"flex-end"}}>
                                <Typography className="Label">
                                Division Name<sup className="asterisk">*</sup>
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                            <TextField variant="outlined" className="stationDataBox"
                                    name="divisionName" onChange={handleChange} value={stationDetails.divisionName} required={true}/> */}
            {/* <select className="selectName" name="divisionName" required={true} onChange={handleChange} value={stationDetails.divisionName}>
                                    <option >Select</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="Both">Both</option>
                                </select> */}
            {/* </Grid>
                            <Divider style={{width:'100%',marginTop:'10px',marginBottom:'15px'}}></Divider>
                        
                            <Grid item xs={4} style={{display: "flex", alignItems: "center" ,justifyContent:"flex-end"}}>
                                <Typography className="Label">
                                Region Name<sup className="asterisk">*</sup>
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                            <TextField variant="outlined" className="stationDataBox"
                                    name="regionName" onChange={handleChange} value={stationDetails.regionName} required={true}/> */}
            {/* <select className="selectName" name="regionName" required={true} onChange={handleChange} value={stationDetails.regionName}>
                                    <option >Select</option>
                                    <option value="South Central">South Central</option>
                                    <option value="South East">South East</option>
                                    <option value="South West">South West</option>
                                </select> */}
            {/* </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4} >
                        <Grid container>
                            <Grid item xs={4} style={{display: "flex", alignItems: "center" ,justifyContent:"flex-end"}}>
                                <Typography className="Label">
                                    Station Code<sup className="asterisk">*</sup>
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                            <TextField variant="outlined" className="stationDataBox" name="stationCode" required={true} onChange={handleChange} value={stationDetails.stationCode}/>
                            </Grid>
                            <Divider style={{width:'100%',marginTop:'10px',marginBottom:'15px'}}></Divider>
                            <Grid item xs={4} style={{display: "flex", alignItems: "center" ,justifyContent:"flex-end"}}>
                                <Typography className="Label">
                                    Division Code<sup className="asterisk">*</sup>
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                            <TextField variant="outlined" className="stationDataBox" name="divisionCode" required={true} onChange={handleChange} value={stationDetails.divisionCode}  />
                            </Grid>
                            <Divider style={{width:'100%',marginTop:'10px',marginBottom:'15px'}}></Divider>
                        
                            <Grid item xs={4} style={{display: "flex", alignItems: "center" ,justifyContent:"flex-end"}}>
                                <Typography className="Label">
                                    Region Code<sup className="asterisk">*</sup>
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                            <TextField variant="outlined" className="stationDataBox" name="regionCode" required={true} onChange={handleChange} value={stationDetails.regionCode} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4} >
                        <Grid container>
                            <Grid item xs={5} style={{display: "flex", alignItems: "center" ,justifyContent:"flex-end"}}>
                                <Typography className="Label">
                                    North/ East End<sup className="asterisk">*</sup>
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                            <TextField variant="outlined" className="stationDataBox" name="northEastEnd" required={true} onChange={handleChange} value={stationDetails.northEastEnd} />
                            </Grid>
                            <Divider style={{width:'100%',marginTop:'10px',marginBottom:'15px'}}></Divider>
                            <Grid item xs={5} style={{display: "flex", alignItems: "center" ,justifyContent:"flex-end"}}>
                                <Typography className="Label">
                                South/ West End<sup className="asterisk">*</sup>
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                            <TextField variant="outlined" className="stationDataBox" name="southWestEnd" required={true} onChange={handleChange} value={stationDetails.southWestEnd} />
                            </Grid>
                            <Divider style={{width:'100%',marginTop:'10px',marginBottom:'15px'}}></Divider>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </Grid> */}
            <Card className="SDCardStyle">
                <Grid container style={{marginBottom:'5px'}}>
                    <Typography className="stationDetails"><b>Station Details</b></Typography>
                </Grid>
                <Grid container className="mb-20">
                    <Typography className="enterDetail">Enter Station Details</Typography>
                </Grid>
                <Grid container style={{marginTop:'15px'}}>
                    <Grid item xs={4}>
                        <Grid container>
                            <Grid item xs={6} md-={6} xl={4} style={{alignSelf:"center"}}><Typography className="labelAlign pr-10">Station Name<span className="asterisk">*</span></Typography></Grid>
                            <Grid item xs={6} md={6}> <TextField variant="outlined" className="SDTextbox" name="stationName" onChange={handleChange} value={stationDetails.stationName} required={true} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <Grid container>
                            <Grid item xs={6} xl={4} style={{alignSelf:"center"}}><Typography className="labelAlign pr-10">Station Code<span className="asterisk">*</span></Typography></Grid>
                            <Grid item xs={6}><TextField variant="outlined" className="SDTextbox stationCodeTxtBox" name="stationCode" required={true} onChange={handleChange} value={stationDetails.stationCode}/></Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <Grid container>
                            <Grid item xs={6} xl={4} style={{alignSelf:"center"}}><Typography  className="labelAlign pr-10">North/East End<span className="asterisk">*</span></Typography></Grid>
                            <Grid item xs={6}><TextField variant="outlined" className="SDTextbox" name="northEastEnd" required={true} onChange={handleChange} value={stationDetails.northEastEnd} /></Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container style={{marginTop:'20px'}}>
                    <Grid item xs={4}>
                        <Grid container>
                            <Grid item xs={6} xl={4} style={{alignSelf:"center"}}><Typography className="labelAlign pr-10">Division Name<span className="asterisk">*</span></Typography></Grid>
                            <Grid item xs={6}> <TextField variant="outlined" className="SDTextbox" name="divisionName" onChange={handleChange} value={stationDetails.divisionName} required={true}/></Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <Grid container>
                            <Grid item xs={6} xl={4} style={{alignSelf:"center"}}><Typography className="labelAlign pr-10">Division Code<span className="asterisk">*</span></Typography></Grid>
                            <Grid item xs={6}><TextField variant="outlined"  className="SDTextbox" name="divisionCode" required={true} onChange={handleChange} value={stationDetails.divisionCode}/></Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <Grid container>
                            <Grid item xs={6} xl={4} style={{alignSelf:"center"}}><Typography className="labelAlign pr-10">South/West End<span className="asterisk">*</span></Typography></Grid>
                            <Grid item xs={6}><TextField variant="outlined" className="SDTextbox" name="southWestEnd" required={true} onChange={handleChange} value={stationDetails.southWestEnd}/></Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container style={{marginTop:'20px'}}>
                    <Grid item xs={4}>
                        <Grid container>
                            <Grid item xs={6} xl={4} style={{alignSelf:"center"}}><Typography className="labelAlign pr-10">Region Name<span className="asterisk">*</span></Typography></Grid>
                            <Grid item xs={6}> <TextField variant="outlined" className="SDTextbox" name="regionName" onChange={handleChange} value={stationDetails.regionName} required={true}/></Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <Grid container>
                            <Grid item xs={6} xl={4} style={{alignSelf:"center"}}><Typography className="labelAlign pr-10">Region Code<span className="asterisk">*</span></Typography></Grid>
                            <Grid item xs={6}><TextField variant="outlined" className="SDTextbox" name="regionCode" required={true} onChange={handleChange} value={stationDetails.regionCode}/></Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </>
    )
}