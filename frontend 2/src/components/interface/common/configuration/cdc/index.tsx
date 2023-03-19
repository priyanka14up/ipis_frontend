import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControlLabel,
} from "@material-ui/core";
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from "@material-ui/icons/Delete";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cdcPost, fetchDevicesDetails, fetchDevices } from "../../../../../redux/actions/interface/interface";
import { interfaceStateSelector } from "../../../../../redux/reducers/interface/interface";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { Messages } from "../../../../../constants/messages"
import { authuserStateSelector } from "../../../../../redux/reducers/authUser/authUser";

export const Cdc = (props: any) => {
  const { setCheckMaster } = props;
  const dispatch = useDispatch();
  const { cdcMessage, cdsData, currentSelectedCdsEthernetDevice, currentSelectedCdsPortNumber, formState, cdcState } = useSelector(interfaceStateSelector);
  const { appUser } = useSelector(authuserStateSelector)
  const [interfaceInput, setInterfaceInput] = useState({
    id: 0,
    portNumber: "",
    deviceName: "",
    ipAddress1: "",
    ipAddress2: "",
    ipAddress3: "",
    ipAddress4: "",
  })
  const [submit, setSubmit] = useState(false)

  const handleChange = (e: any) => {
    var { name, value } = e.target;
    // setInterfaceInput({ ...interfaceInput, [name]: value })
    if (value == "cdcMaster") {
      setInterfaceInput({
        ...interfaceInput,
        // id: interfaceInput.id,
        // portNumber: interfaceInput.portNumber,
        deviceName: "cdcMaster",
        ipAddress1: "192",
        ipAddress2: "168",
        ipAddress3: "0",
        ipAddress4: "253",
      })
    }
    else if (value == "cdcSlave") {
      setInterfaceInput({
        ...interfaceInput,
        // id: interfaceInput.id,
        // portNumber: interfaceInput.portNumber,
        deviceName: "cdcSlave",
        ipAddress1: "192",
        ipAddress2: "168",
        ipAddress3: "0",
        ipAddress4: "254",
      })
    }
    console.log(interfaceInput)
  }

  const handleSubmit = () => {
    let inte: any = {
      id: interfaceInput.id,
      portNumber: currentSelectedCdsPortNumber,
      deviceType: interfaceInput.deviceName,
      ipAddress: `${interfaceInput.ipAddress1}.${interfaceInput.ipAddress2}.${interfaceInput.ipAddress3}.${interfaceInput.ipAddress4}`
    };
    dispatch(cdcPost(inte))
    setSubmit(true)
  }

  useEffect(() => {
    if (cdcState.isSuccess == true && submit == true) {
      dispatch(fetchDevices());
      setSubmit(false);
    }
  }, [cdcState, submit])

  const handleCancel = () => {
    setInterfaceInput({
      id: 0,
      portNumber: "",
      deviceName: "",
      ipAddress1: "",
      ipAddress2: "",
      ipAddress3: "",
      ipAddress4: "",
    })
  }

  useEffect(() => {
    if (formState.isSuccess == true)
      if (cdsData && cdsData.children) {
        let detail: any = cdsData.children.find((port: any) => port.portNumber === currentSelectedCdsPortNumber);
        if (detail && (detail.deviceType === "cdcMaster" || detail.deviceType === "cdcSlave") && detail.detail) {
          if (detail.deviceType == "cdcMaster") {
            setCheckMaster(true);
          }
          else {
            setCheckMaster(false);
          }
          console.log(detail, "detail")
          setSubmit(true);
          let ipAddress = detail.detail.ipAddress.split(".");
          setInterfaceInput({
            id: detail.id,
            portNumber: detail.portNumber,
            deviceName: detail.deviceType,
            ipAddress1: ipAddress[0],
            ipAddress2: ipAddress[1],
            ipAddress3: ipAddress[2],
            ipAddress4: ipAddress[3],
          })
        }
      }
  }, [formState, currentSelectedCdsPortNumber])

  useEffect(() => {
    if (cdsData && cdsData.children) {
      let detail: any = cdsData.children.find((port: any) => port.portNumber === currentSelectedCdsPortNumber);
      if (detail && detail.id) {
        dispatch(fetchDevicesDetails(detail.id))
      }
    }
  }, [currentSelectedCdsPortNumber]);

  useEffect(() => {
    if (cdcState.isSuccess === true && submit === true) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${Messages.FORM_SUBMITTED_SUCESSFULLY}`,
        showConfirmButton: false,
        allowOutsideClick: false,
        timer: 3000,
      })
    }
  }, [cdcState])

  // useEffect(() => {
  //   setenableSubmit(true);
  // }, [interfaceInput]);

  // return (
  //   <>
  //     <Grid item style={{ height: "100%" }}>
  //       <Card style={{ height: "92%" }} className={appUser.userRole == "ROLE_STATION MASTER" ? "overlapBackground configSetting":"configSetting"}>

  //         <CardContent style={{ padding: "0px" }} >
  //           <Typography component="p" className="confHed">
  //             <b>Configuration Settings</b>
  //           </Typography>
  //           <Typography className="confSubHed">
  //             Select the CDC type and add IP address to configure
  //           </Typography>
  //         </CardContent>
  //         {/* {appUser.userRole == "ROLE_STATION MASTER" ?
  //           <Grid style={{ color: "red", display: "flex", justifyContent: "center", fontSize: "22px", paddingBottom: "5px" }}>*view only</Grid>
  //           : <></>
  //         } */}
  //         {  
  //           appUser.userRole == "ROLE_STATION MASTER" ? <Grid className="stationForm formFields">

  //         </Grid>: <></>
  //         }

  //         <CardContent style={{ padding: "2.72% 0px 0px 0px", display: "flex", justifyContent: "center" }}>
  //           <Grid container justify='center' alignItems='center' item xs={9}>


  //           <Grid className="config">
  //             <Grid container spacing={4} style={{ display: "flex", alignItems: "center" }}>
  //               <Grid item xs={4} className="selCdcType">
  //                 Select CDC Type 
  //               </Grid>
  //               <Grid item xs={8}>
  //                 <select className="cdcType" name="deviceName" required={true} value={interfaceInput.deviceName} onChange={handleChange}>
  //                   <option>Select</option>
  //                   <option value="cdcMaster">CDC Master</option>
  //                   <option value="cdcSlave">CDC Slave</option>
  //                 </select>
  //               </Grid>
  //             </Grid>
  //             <Grid container spacing={4} style={{ display: "flex", alignItems: "center", paddingTop: "19px" }}>
  //               <Grid item xs={4} className="selCdcType">
  //                 CDC IP Address
  //               </Grid>
  //               <Grid item xs={8} style={{ display: "flex", position: "relative", justifyContent: "flex-start" }}>
  //                 <TextField disabled className="disabled ipAddressoctates mr-10" style={{ width: "67px" }} variant="outlined" name="ipAddress1" required={true} value={interfaceInput.ipAddress1} onChange={handleChange} />
  //                 <TextField disabled className="disabled ipAddressoctates mr-10" style={{ width: "67px" }} variant="outlined" name="ipAddress2" required={true} value={interfaceInput.ipAddress2} onChange={handleChange} />
  //                 <TextField disabled className="disabled ipAddressoctates mr-10" style={{ width: "67px" }} variant="outlined" name="ipAddress3" required={true} value={interfaceInput.ipAddress3} onChange={handleChange} />
  //                 <TextField disabled className="disabled ipAddressoctates" style={{ width: "67px" }} variant="outlined" name="ipAddress4" required={true} value={interfaceInput.ipAddress4} onChange={handleChange} />
  //               </Grid>
  //             </Grid>
  //             {appUser.userRole == "ROLE_STATION MASTER" ? <></>
  //               :
  //               <Grid container style={{ paddingTop: "10.25%" ,textAlign:'end' }} justifyContent="center">
  //                 <Grid item sm={4} md={5} lg={5} xl={4}>
  //                 <Button type="submit" className="saveBtn" variant="outlined" onClick={handleSubmit}>
  //                   <DoneIcon
  //                     className="SaveIcon"
  //                     style={{ display: "inherit" }}
  //                   />
  //                   Save
  //                 </Button>
  //                 </Grid>
  //                 <Grid item sm={4} md={5} lg={5} xl={4}>
  //                 <Button variant="outlined" className="printBtn" onClick={handleCancel}>
  //                   <ClearIcon className="clearIcon" />
  //                   Cancel
  //                 </Button>
  //                 </Grid>
  //               </Grid>
  //             }
  //             <br />
  //             {(cdcState.isError === true && cdcMessage != "" && submit === true) ? (
  //               <div style={{ textAlign: "center", color: "red" }}>
  //                 {cdcMessage}
  //               </div>
  //             ) : (
  //               <></>
  //             )}
  //           </Grid>
  //           </Grid>
  //         </CardContent>
  //       </Card>
  //     </Grid>
  //   </>
  // );


  return (
    <Grid item style={{ height: "100%" }}>
      <Card style={{ height: "100%" }} className={appUser.userRole == "ROLE_STATION MASTER" ? "overlapBackground configSetting" : "configSetting"}>
        <Grid container>
          <Typography className="confHed">
            <strong>Configuration Settings</strong>
          </Typography>
        </Grid>
        <Grid container className="margin-N">
          <Typography className="confSubHed">
            Select the CDC type and add IP address to configure
          </Typography>
        </Grid>
        <Card className="inner-card config innerCard">
          <Grid container spacing={4} style={{ display: "flex", alignItems: "center" }} >
            <Grid item xs={4} md={5} lg={5} xl={5} className="selCdcType">
              <Typography>
                Select CDC Type
              </Typography>
            </Grid>
            <Grid item xs={4} md={5} lg={4} xl={3}>
              <select className="cdcType" name="deviceName" required={true} value={interfaceInput.deviceName} onChange={handleChange}>
                <option>Select</option>
                <option value="cdcMaster">CDC Master</option>
                <option value="cdcSlave">CDC Slave</option>
              </select>
            </Grid>
          </Grid>
          <Grid container spacing={4} style={{ display: "flex", alignItems: "center", paddingTop: "19px" }}>
            <Grid item xs={4} md={5} lg={5} xl={5} className="selCdcType">
              <Typography>
                CDC IP Address
              </Typography>
            </Grid>
            <Grid item xs={4} md={5} lg={4} xl={3}>
              <Grid container spacing={1}>
                <Grid item xs={3}>
                  <TextField disabled className="disabled ipAddressoctates mr-10" style={{ width: "67px" }} variant="outlined" name="ipAddress1" required={true} value={interfaceInput.ipAddress1} onChange={handleChange} />
                </Grid>
                <Grid item xs={3}>
                  <TextField disabled className="disabled ipAddressoctates mr-10" style={{ width: "67px" }} variant="outlined" name="ipAddress2" required={true} value={interfaceInput.ipAddress2} onChange={handleChange} />
                </Grid>
                <Grid item xs={3}>
                  <TextField disabled className="disabled ipAddressoctates mr-10" style={{ width: "67px" }} variant="outlined" name="ipAddress3" required={true} value={interfaceInput.ipAddress3} onChange={handleChange} />
                </Grid>
                <Grid item xs={3}>
                  <TextField disabled className="disabled ipAddressoctates" style={{ width: "67px" }} variant="outlined" name="ipAddress4" required={true} value={interfaceInput.ipAddress4} onChange={handleChange} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {appUser.userRole == "ROLE_STATION MASTER" ? <></>
            :
            <Grid container style={{ paddingTop: "61px", textAlign: 'center' }} className="cdc-btns">
              <Grid item xs={3} md={4} lg={3} xl={2}>
                <Button type="submit" className="saveBtn w-90-g" variant="outlined" onClick={handleSubmit}>
                  <DoneIcon
                    className="SaveIcon"
                    style={{ display: "inherit" }}
                  />
                  Save
                </Button>
              </Grid>
              <Grid item xs={3} md={4} lg={3} xl={2}>
                <Button variant="outlined" className="printBtn w-90-g" onClick={handleCancel}>
                  <ClearIcon className="clearIcon" />
                  Cancel
                </Button>
              </Grid>
            </Grid>
          }
           {(cdcState.isError === true && cdcMessage != "" && submit === true) ? (
            <div style={{ textAlign: "center", color: "red", marginTop:"20px" }}>
              {cdcMessage}
            </div>
          ) : (
            <></>
          )}
         
        </Card>
      </Card>
    </Grid>
  )


}

