import { Grid, Card, CardContent, Typography, Button, CircularProgress } from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import { Port } from "../port";
import "./style.css";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDevices, fetchDevicesDetails, updateDeviceName, updatePdcChildDeviceName, updatePortName } from "../../../../redux/actions/interface/interface";
import { useEffect } from "react";
import { interfaceStateSelector } from "../../../../redux/reducers/interface/interface";
import { PdcAttatchedDevices } from "../configuration/pdc";

export const CentralDataSwitch = (props:any) => {
    const {setSelectedPortId,selectedPortId} = props;
    const { currentSelectedCdsPortNumber,currentSelectedCdsPortName,ovdState,cdcState, cdsData, formState, currentSelectedCdsEthernetDevice,deleteState } = useSelector(interfaceStateSelector);
    const [colorChange, setColorChange] = useState(0);
    const dispatch = useDispatch();
    const [portNumber, setPortNumber] = useState(0);
    const [portArray, setPortArray] = useState([{
        portNumber: 1,
        deviceType: "CDS"
    }, {
        portNumber: 2,
        deviceType: "CDS"
    }, {
        portNumber: 3,
        deviceType: "CDS"
    }, {
        portNumber: 4,
        deviceType: "CDS"
    }, {
        portNumber: 5,
        deviceType: "CDS"
    }, {
        portNumber: 6,
        deviceType: "CDS"
    }, {
        portNumber: 7,
        deviceType: "CDS"
    }, {
        portNumber: 8,
        deviceType: "CDS"
    }, {
        portNumber: 9,
        deviceType: "CDS"
    }, {
        portNumber: 10,
        deviceType: "CDS"
    }, {
        portNumber: 11,
        deviceType: "CDS"
    },
    {
        portNumber: 12,
        deviceType: "CDS"
    },
    {
        portNumber: 13,
        deviceType: "CDS"
    },
    {
        portNumber: 14,
        deviceType: "CDS"
    },
    {
        portNumber: 15,
        deviceType: "CDS"
    },
    {
        portNumber: 16,
        deviceType: "CDS"
    },
    {
        portNumber: 17,
        deviceType: "CDS"
    },
    {
        portNumber: 18,
        deviceType: "CDS"
    },
    {
        portNumber: 19,
        deviceType: "CDS"
    }, {
        portNumber: 20,
        deviceType: "CDS"
    },
    {
        portNumber: 21,
        deviceType: "CDS"
    }, 
    {
        portNumber: 22,
        deviceType: "CDS"
    },
    {
        portNumber: 23,
        deviceType: "CDS"
    },
    {
        portNumber: 24,
        deviceType: "CDS"
    }

    ]);
    
    const buttonClick = () => {
        setPortArray((portArray:any) => [...portArray, {
            portNumber: portArray.length+1,
            deviceType:"CDS"
        }]);
        portData()
    }

    const scroll = (scrollOffset :any) => {
        if(ref?.current){
            ref.current.scrollLeft += scrollOffset;
        }
      };

    useEffect(() => {
        if (portNumber == currentSelectedCdsPortNumber) {
            dispatch(fetchDevices());
        }
    }, [currentSelectedCdsEthernetDevice])

    useEffect(() => {
        // if (portNumber == currentSelectedCdsPortNumber) {
            dispatch(fetchDevices());
        // }
    }, [])


    const toggle1 = (port: any) => {
        setPortNumber(port.portNumber)
        if (cdsData && cdsData.deviceType != "") {
            if(cdsData && cdsData.children){
                let detail: any = cdsData.children.find((port: any) => port.portNumber === currentSelectedCdsPortNumber);
                if(detail && detail?.deviceType=="pdc")
                dispatch(updatePdcChildDeviceName("pdc-form"))
            }
            const data: any = {
                portNumber: port.portNumber,
                portName: port.deviceType
            };
            dispatch(updatePortName(data))
            const data1: any = {
                deviceName: port.deviceType
            };
            dispatch(updateDeviceName(data1))
        }
        else {
            const data: any = {
                portNumber: port.portNumber,
                portName: port.deviceType
            }
            dispatch(updatePortName(data))
        }
        // if (colorChange != port) {
            setColorChange(port?.portNumber)
        // } else {
            // setColorChange(null)
        // }
    }

    const toggle = (position: any) => {
        setPortNumber(position)
        const data: any = {
            portNumber: position,
            portName: "available"

        }
        dispatch(updatePortName(data))
        if (colorChange != position) {
            setColorChange(position)
        } else {
            setColorChange(0)
        }
    }

    const myColor = (position: any) => {
        if (colorChange == position) {
            return "#009688";
        }
    }

    const myColor2 = (position: any) => {
        if (colorChange == position) {
            return "#4FCD4C";
        }
    }

    const loader = () =>{
        return( <>
         <div style={{display:'flex',justifyContent:"center",alignItems:"center", height: '100vh', position: 'relative', top: '300px'}}><Grid style={{ textAlign:"center", height: '100vh'}}>Redirecting...<CircularProgress /></Grid></div>
         </>)
     }

    const portData = () => {
        for(let i =0; i < portArray.length; i++){
            portArray[i]={
                portNumber: i+1,
                deviceType: "CDS"
            }
        }
        if (cdsData && cdsData.children) {
            for (let i = 0; i < cdsData?.children?.length; i++) {
                let index= cdsData?.children[i]["portNumber"]  ;
                portArray[parseInt(index)-1] = cdsData.children[i]
            }
        }
        return portArray.map((j: any, i: any) => {
            return (
                <>
                {
                    <div onClick={() => {
                        toggle1(j)
                    }}>
                        <Port port={j} styleColor={myColor(i + 1)} styleColor2={myColor2(i + 1)} />
                    </div>
                }
                </>
            )
        })
    }

    useEffect(()=>{
        // portData()
        console.log(currentSelectedCdsPortName,"000")
        if(currentSelectedCdsPortNumber && currentSelectedCdsPortName != "CDS"){
            myColor(currentSelectedCdsPortNumber)
            setColorChange(currentSelectedCdsPortNumber)
        }
        else{
            const data: any = {
                portNumber: 0,
                portName: ''
            };
            dispatch(updatePortName(data))
            const data1: any = {
                deviceName: ""
            };
            dispatch(updateDeviceName(data1))
        }
    },[])

    // useEffect(() =>{
    //     if(deleteState.isSuccess == true){
    //         portArray[currentSelectedCdsPortNumber+1]={
    //             portNumber: currentSelectedCdsPortNumber,
    //             deviceType: "CDS"
    //         }
    //     }
    // },[deleteState])

    const ref = useRef<any>(null)
    
    return (
        <>
        
            <Grid container style={{marginBottom:'10px'}}>
                <Grid item xs={12} style={{ width: "100%"}}>
                    <Card style={{ padding: "14px 20px 14px 26px" }}>
                        <CardContent style={{ padding: "0px" }}>
                            <Typography className="cds">
                              <b> Central Data Switch</b> 
                            </Typography>
                            <Typography className="cdstxt">
                                Select one of the available ports from below to configure Data Controllers, Display boards and other devices.
                            </Typography>
                            <div style={{ display: "flex" }}>
                                <div onClick={() => scroll(-100)} className="backarrow"><ArrowBackIos className="backarrowicon" fontSize="small" /></div>
                                <div ref={ref} style={{ alignItems: "center", display: "flex", overflow: "auto" }} className="interfaceDiv">
                                    {(portArray && portArray.length > 0) ? portData() : <><Port /></>}
                                    <div onClick={buttonClick}>
                                        <Grid container style={{ margin: "0px 6px" }}>
                                            <Grid item xs={1} className="centralDataSwich">
                                                <Grid container justifyContent="center" style={{ display: 'grid' }}>
                                                    <Typography style={{ fontSize: "12px", lineHeight: "14px", fontWeight: 500, fontStyle: "normal", fontFamily: "Roboto", paddingBottom: "12px", textAlign: "center" }} >ADD<br />PORT</Typography>
                                                    <AddCircleOutlineIcon className="addicon" />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </div>
                                <div onClick={() => scroll(100)}className="forwardarrow"><ArrowBackIos className="backarrowicon" fontSize="small" /></div>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}