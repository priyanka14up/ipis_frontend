import { Grid, Typography } from "@material-ui/core"
import { ArrowBackIos } from "@material-ui/icons"
import { useEffect, useRef, useState } from "react"
import { Port } from "../../port"
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useDispatch, useSelector } from "react-redux"
import { fetchDevices, fetchPdcDetails, updateDeviceName, updatePdcChildDeviceName, updateSubPortName } from "../../../../../redux/actions/interface/interface"
import { clearState } from "../../../../../redux/reducers/user-profile/userProfile"
import { interfaceStateSelector } from "../../../../../redux/reducers/interface/interface"
import { authuserStateSelector } from "../../../../../redux/reducers/authUser/authUser";
import "./pfdb/style.css";
import "./cgdb/style.css";

export const SubPort = () => {
  const dispatch = useDispatch();
  const { appUser } = useSelector(authuserStateSelector);
  const { currentSelectedCdsPortNumber,currentSelectedPdcPortName, currentSelectedPdcPortNumber, pdcData, currentSelectedPdcEthernetDevice,deleteState } = useSelector(interfaceStateSelector);
  const [colorChange, setColorChange] = useState(0);
  const [portArray, setPortArray] = useState([{
    portNumber: "Z1",
    deviceType: "CDS"
  }, {
    portNumber: "Z2",
    deviceType: "CDS"
  }, {
    portNumber: "Z3",
    deviceType: "CDS"
  }, {
    portNumber: "Z4",
    deviceType: "CDS"
  }, {
    portNumber: "Z5",
    deviceType: "CDS"
  }, {
    portNumber: "Z6",
    deviceType: "CDS"
  }, {
    portNumber: "Z7",
    deviceType: "CDS"
  }, {
    portNumber: "Z8",
    deviceType: "CDS"
  }, {
    portNumber: "Z9",
    deviceType: "CDS"
  }, {
    portNumber: "Z10",
    deviceType: "CDS"
  }, {
    portNumber: "Z11",
    deviceType: "CDS"
  },
  {
    portNumber: "Z12",
    deviceType: "CDS"
  },
  {
    portNumber: "Z13",
    deviceType: "CDS"
  },
  {
    portNumber: "Z14",
    deviceType: "CDS"
  },
  {
    portNumber: "Z15",
    deviceType: "CDS"
  },
  {
    portNumber: "Z16",
    deviceType: "CDS"
  },
  {
    portNumber: "Z17",
    deviceType: "CDS"
  },
  {
    portNumber: "Z18",
    deviceType: "CDS"
  },
  {
    portNumber: "Z19",
    deviceType: "CDS"
  }, {
    portNumber: "Z20",
    deviceType: "CDS"
  },
  {
    portNumber: "Z21",
    deviceType: "CDS"
  },
  {
    portNumber: "Z22",
    deviceType: "CDS"
  },
  {
    portNumber: "Z23",
    deviceType: "CDS"
  }

  ]);

  const portData = () => {
    for(let i =0; i < portArray.length; i++){
      portArray[i]={
          portNumber: "Z" + `${i+1}`,
          deviceType: "CDS"
      }
  }
    if (pdcData && pdcData.children) {
      for (let i = 0; i < pdcData.children.length; i++) {
        let index = pdcData.children[i]["portNumber"].slice(1);
          portArray[parseInt(index)-1] = pdcData.children[i]
          
      }
    }
    return portArray.map((j: any, i: any) => {
      return (<div onClick={() => {
        toggle1(j)
      }}>
        <Port port={j} styleColor={myColor(j)} styleColor2={myColor2(j)} />
      </div>)
    })
  }

  const toggle1 = (port: any) => {
    console.log(port, "sub port ")
    if (pdcData && pdcData.deviceType !== "") {
      const data: any = {
        portNumber: port.portNumber,
        portName: port.deviceType
      };
      dispatch(updateSubPortName(data))
      const data1: any = {
        deviceName: port.deviceType
      };
      dispatch(updatePdcChildDeviceName(data1))
    }
    else {
      const data: any = {
        portNumber: port.portNumber,
        portName: port.deviceType
      }
      dispatch(updateSubPortName(data))
    }

    if(port.id != null){
      const iddevice: any = port.id
      dispatch(fetchPdcDetails(iddevice))
    }
    if (colorChange != port) {
      setColorChange(port.portNumber)
    } else {
      setColorChange(0)
    }
  }

  const myColor = (port: any) => {
    if (colorChange === port.portNumber) {
      return "#009688";
    }
  }

  const myColor2 = (port: any) => {

    if (colorChange === port.portNumber) {
      return "#4FCD4C";
    }
  }

  const buttonClick = () => {
    setPortArray(portArray => [...portArray, {
      portNumber: `Z${portArray.length + 1}`,
      deviceType: "CDS"
    }]);
    portData()

  }

  useEffect(()=>{
        const data: any = {
            portNumber: 0,
            portName: ''
        };
        dispatch(updateSubPortName(data))
},[])


  const ref = useRef<any>(null)
  const scroll = (scrollOffset :any) => {
      if(ref?.current){
          ref.current.scrollLeft += scrollOffset;
      }
    };

  return (
    <>
      <Grid container style={{ padding: "0px" }}>
        <Grid style={{ width: "100%" }}>
          {/* {appUser.userRole == "ROLE_STATION MASTER" ?
            <Grid style={{ color: "red", display: "flex", justifyContent: "center", fontSize: "22px" }}>*view only</Grid>
            : <></>
          } */}
          <Typography className="text1">
            <b>Select a Sub Port</b>
          </Typography>
          <Typography className="txt2">
            Select the PDC type and add IP address to configure
          </Typography>
        </Grid>
        <div style={{ display: "flex", width: "100%" }}>
          <div onClick={() => scroll(-100)} className="backArrowPdc"><ArrowBackIos className="backArrowiconPdc" fontSize="small" /></div>
          <div ref={ref} className="scrollStyle" style={{ alignItems: "center", display: "flex", paddingLeft: "1%", overflow: "auto" }}>
            {(portArray && portArray.length > 0) ? portData() : <><Port /></>}
            <div onClick={buttonClick}>
              <Grid container style={{ margin: "0px 6px" }}>
                <Grid item xs={1} className="centralDataSwich">
                  <Grid container justifyContent="center" style={{ display: 'grid' }}>
                    <Typography style={{ fontSize: "12px", lineHeight: "14px", fontWeight: 500, fontStyle: "normal", fontFamily: "Roboto", paddingBottom: "12px", textAlign: "center" }} >ADD<br />PORT</Typography>
                    <AddCircleOutlineIcon className="addiconStyle" />
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </div>
          <div onClick={() => scroll(100)} className="forwardArrowPdc">
            <ArrowBackIos className="backArrowiconPdc" fontSize="small" />
          </div>
        </div>
      </Grid>
    </>
  )
}

