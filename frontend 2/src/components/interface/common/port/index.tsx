import { Button, Typography, Grid } from "@material-ui/core";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { interfaceStateSelector } from "../../../../redux/reducers/interface/interface";
import "./style.css";

export const Port = (props:any) =>
{
    const { currentSelectedCdsPortNumber, cdsData,cdcState} = useSelector(interfaceStateSelector);
    // console.log(props, "port props")
    
    return(
        <Grid id={props.id} container style={{ margin: "0px 6px" }}>
            <Grid id={props.id} item xs={1} className="centralDataSwich" style={{ backgroundColor: props.styleColor }}>
                <Grid container justifyContent="center" style={{ display: 'grid' }}>
                    <Typography style={{fontSize:"12px", lineHeight: "14px", fontWeight: 500, fontStyle: "normal", fontFamily:"Roboto", paddingBottom:"10px", textAlign:"center",inlineSize: 'max-content'}} > PORT {props.port.portNumber}</Typography>
                     {(props.port && props.port.deviceType != "CDS" ) ? (
                        <>
                            <Typography style={{fontSize:"14px", lineHeight: "16px", fontWeight: 500, fontStyle: "normal", fontFamily:"Roboto", paddingBottom:"10px", textAlign:"center", textTransform: "capitalize"}}>
                                {props.port.deviceType}
                            </Typography>
                            <div style={{textAlign:"center", backgroundColor: "#4FCD4C"}} className="port"
                            ></div>
                            </>
                        ):(
                        <>
                            <Typography style={{fontSize:"14px", lineHeight: "16px", fontWeight: 500, fontStyle: "normal", fontFamily:"Roboto", paddingBottom:"10px", textAlign:"center", textTransform: "capitalize"}}>
                                Available
                            </Typography>
                            <div 
                                style={{textAlign:"center" , backgroundColor: props.styleColor2}} 
                                className="port"
                            ></div></>
                       )}
                </Grid>
            </Grid>
        </Grid>
    )
}




