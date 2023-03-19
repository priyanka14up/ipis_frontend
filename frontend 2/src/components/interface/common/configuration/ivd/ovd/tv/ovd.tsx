import {
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { interfaceStateSelector } from "../../../../../../../redux/reducers/interface/interface";
import { DeleteDevices, fetchDevices, fetchDevicesDetails, IvdOvdTvPost, updateDeviceName, updatePortName } from "../../../../../../../redux/actions/interface/interface";
import Swal from "sweetalert2";
import { Messages } from "../../../../../../../constants/messages";
import { authuserStateSelector } from "../../../../../../../redux/reducers/authUser/authUser";

export const OVD = (props: any) => {
  const { platformNumbers } = props;
  const dispatch = useDispatch();
  const { appUser } = useSelector(authuserStateSelector)
  const { currentSelectedCdsEthernetDevice, currentSelectedCdsPortNumber, cdsData, ovdState, ovdMessage, deleteState, formState } = useSelector(interfaceStateSelector)
  const [interfaceInput, setInterfaceInput] = useState({
    id: 0,
    portNumber: "",
    deviceName: "",
    deviceType: "",
    ipAddress1: "192",
    ipAddress2: "168",
    ipAddress3: "0",
    ipAddress4: "",
    noOfLines: 2,
    messageLine: "",
    enableMsgLine: [1, 2],
  });
  const [submit, setSubmit] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [noOfLinesArray, setNoOfLinesArray] = useState<any>([])
  const [linesCheck, setLinesCheck] = useState<boolean>(false)

  useEffect(() => {
    if (cdsData && cdsData.children) {
      let detail: any = cdsData.children.find((port: any) => port.portNumber === currentSelectedCdsPortNumber);
      if (detail && detail.id) {
        dispatch(fetchDevicesDetails(detail.id))
      }
    }
  }, [currentSelectedCdsPortNumber])


  useEffect(() => {
    if (formState.isSuccess == true) {
      if (cdsData && cdsData.children) {
        let detail: any = cdsData.children.find((port: any) => port.portNumber === currentSelectedCdsPortNumber);
        if (detail && detail.deviceType === "ovd" && detail.detail && currentSelectedCdsPortNumber === detail.detail.portNumber) {
          console.log(detail, "detail")
          let ipAddress = detail.detail.ipAddress.split(".");
          setInterfaceInput({
            id: detail.id,
            portNumber: detail.portNumber,
            deviceName: detail.detail.deviceName,
            deviceType: detail.deviceType,
            ipAddress1: ipAddress[0],
            ipAddress2: ipAddress[1],
            ipAddress3: ipAddress[2],
            ipAddress4: ipAddress[3],
            noOfLines: detail.detail.noOfLines,
            messageLine: detail.detail.messageLine,
            enableMsgLine: detail.detail.enableMsgLine,
          })
        }
      }
    }
  }, [formState, currentSelectedCdsPortNumber])

  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        let data: any = {
          id: interfaceInput.id,
        };
        dispatch(DeleteDevices(data))
        setDeleted(true)
      }
    })
  }

  useEffect(() => {
    if (deleteState.isSuccess == true && deleted == true) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Port Data Deleted Successfully',
        showConfirmButton: false,
        allowOutsideClick: false,
        showCloseButton: false,
        timer: 2000
      })
        .then(() => {
          let data: any = {
            portNumber: currentSelectedCdsPortNumber,
            portName: "CDS"
          };
          dispatch(updatePortName(data))
          const data1: any = {
            deviceName: "CDS"
          };
          dispatch(updateDeviceName(data1))
        })
        .then(() => {
          dispatch(fetchDevices())
          setInterfaceInput({
            id: 0,
            portNumber: "",
            deviceName: "",
            deviceType: "",
            ipAddress1: "192",
            ipAddress2: "168",
            ipAddress3: "0",
            ipAddress4: "",
            noOfLines: 2,
            messageLine: "",
            enableMsgLine: [1, 2],
          })

        })
    }
  }, [deleteState, deleted])

  const handleChange = (e: any) => {
    var { name, value } = e.target;
    if (name == "noOfLines") {
      setInterfaceInput({ ...interfaceInput, [name]: parseInt(value) })
      setLinesCheck(true)
    }
    else if (name == "ipAddress4" && value.match(/^[\d]{0,3}$/i)) {
      setInterfaceInput({ ...interfaceInput, [name]: value})
      setLinesCheck(true)
    }
    else if (name != "ipAddress4") {
      setInterfaceInput({ ...interfaceInput, [name]: value })
    }
  };
  const handleChecked = (e: any, index: any) => {
    var { name, value, checked } = e.target;
    let msgLineArray = [];
    if (!checked) {
      noOfLinesArray[index] = false;
    }
    else {
      noOfLinesArray[index] = true;
    }
    for (let i = 0; i < noOfLinesArray.length; i++) {
      if (noOfLinesArray[i] == true) {
        msgLineArray.push(i + 1)
      }
    }
    setInterfaceInput({ ...interfaceInput, [name]: msgLineArray });
  }

  const handleSubmit = () => {
    let inter: any = {
      id: interfaceInput.id,
      portNumber: `${currentSelectedCdsPortNumber}`,
      deviceType: "ovd",
      deviceName: interfaceInput.deviceName,
      ipAddress: `${interfaceInput.ipAddress1}.${interfaceInput.ipAddress2}.${interfaceInput.ipAddress3}.${interfaceInput.ipAddress4}`,
      noOfLines: interfaceInput?.noOfLines,
      messageLine: interfaceInput.messageLine,
      enableMsgLine: interfaceInput.enableMsgLine
    };
    dispatch(IvdOvdTvPost(inter))
    setSubmit(true)
  };

  useEffect(() => {
    if (linesCheck == true) {
      let array: any = new Array(interfaceInput?.noOfLines);
      let enableArray: any = [];
      for (let i = 0; i < array?.length; i++) {
        array[i] = true;
        enableArray.push(i + 1);
      }
      setNoOfLinesArray(array)
      setInterfaceInput({ ...interfaceInput, ["enableMsgLine"]: enableArray });
      setLinesCheck(false);
    } else {
      let checkArray: any = new Array(interfaceInput?.noOfLines).fill(false);
      for (let i = 0; i < checkArray?.length; i++) {
        for (let j = 0; j < interfaceInput.enableMsgLine?.length; j++) {
          if (i + 1 == interfaceInput.enableMsgLine[j]) {
            checkArray[i] = true;
            break;
          }
        }
      }
      setNoOfLinesArray(checkArray);
    }
  }, [interfaceInput?.noOfLines])

  useEffect(() => {
    if (ovdState.isSuccess === true && submit === true) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${Messages.FORM_SUBMITTED_SUCESSFULLY}`,
        showConfirmButton: false,
        allowOutsideClick: false,
        timer: 3000,
      }).then(() => {
        dispatch(fetchDevices());
        // const data: any = {
        //   portNumber: interfaceInput.portNumber,
        //   portName: interfaceInput.deviceType
        // };
        // dispatch(updatePortName(data))
        // const data1: any = {
        //   deviceName: interfaceInput.deviceType
        // };
        // dispatch(updateDeviceName(data1))
        // setSubmit(false);
      });
    }
  }, [ovdState])

  const handleCancel = () => {
    setInterfaceInput({
      id: 0,
      portNumber: "",
      deviceName: "",
      deviceType: "",
      ipAddress1: "192",
      ipAddress2: "168",
      ipAddress3: "0",
      ipAddress4: "",
      noOfLines: 0,
      messageLine: "",
      enableMsgLine: [1, 2],
    })
  }


  // useEffect(() => {
  //   setenableSubmit(true);
  // }, [interfaceInput]);

  // return (
  //   <>
  //     <Grid container>
  //       <Grid item xs={12}>
  //         <Card style={{ padding: "20px 5.535%", height: "90%"}}  className={appUser.userRole == "ROLE_STATION MASTER" ? "overlapBackground ivdCard":"ivdCard"}>

  //         {/* {appUser.userRole == "ROLE_STATION MASTER" ?
  //             <Grid style={{ color: "red", display: "flex", justifyContent: "center", fontSize: "22px" }}>*view only</Grid>
  //             : <></>
  //           } */}
  //          {  
  //           appUser.userRole == "ROLE_STATION MASTER" ? <Grid className="stationForm formFields">

  //         </Grid>: <></>
  //         }
  //           <Typography component="p" className="ivdHed">
  //           <b>Configuration Settings</b>
  //           </Typography>
  //           <Typography className="ivdSubHed">
  //             Select the OVD type and add IP address to configure
  //           </Typography>
  //           <Grid container style={{ paddingTop: "3.12%" }}>
  //             <Grid item xs={5} className="ivdSubItem">
  //               OVD IP Address<sup className="asterisk">*</sup>
  //             </Grid>
  //             <Grid item xs={7}>
  //               <Grid className="ivdGrid">
  //                 <TextField disabled className="disabled ivdBoxStyle mr-10" variant="outlined" name="ipAddress1" required={true} value={interfaceInput.ipAddress1} onChange={handleChange} />
  //                 <TextField disabled className="disabled ivdBoxStyle mr-10" variant="outlined" name="ipAddress2" required={true} value={interfaceInput.ipAddress2} onChange={handleChange} />
  //                 <TextField disabled className="disabled ivdBoxStyle mr-10" variant="outlined" name="ipAddress3" required={true} value={interfaceInput.ipAddress3} onChange={handleChange} />
  //                 <TextField className="ivdBoxStyle" variant="outlined" name="ipAddress4" required={true} value={interfaceInput.ipAddress4} onChange={handleChange} />
  //               </Grid>
  //             </Grid>
  //             <Grid item xs={5} className="ivdSubItem">
  //               OVD Name
  //             </Grid>
  //             <Grid item xs={7} className="ivdTextBox">
  //               <TextField size="small" className="ivdTextFieldValue" variant="outlined" name="deviceName" value={interfaceInput.deviceName} onChange={handleChange} />
  //             </Grid>
  //             <Grid item xs={5} className="ivdSubItem">
  //               No. of Lines
  //             </Grid>
  //             <Grid item xs={7} className="ivdTextBox">
  //               <select className="ivdTextFieldValue h-40" required={true} name="noOfLines" value={interfaceInput?.noOfLines} onChange={handleChange} >
  //               <option value="">Select</option>
  //               <option value={2}>2</option>
  //               <option value={3}>3</option>
  //               <option value={4}>4</option>
  //               <option value={5}>5</option>
  //               <option value={6}>6</option>
  //               <option value={7}>7</option>
  //               <option value={8}>8</option>
  //               <option value={9}>9</option>
  //               <option value={10}>10</option>
  //               </select>
  //             </Grid>
  //             <Grid item xs={5} className="ivdSubItem">
  //               Message Line
  //             </Grid>
  //             <Grid item xs={7} className="ivdTextBox">
  //               <select className="ivdTextFieldValue h-40" required={true} name="messageLine" value={interfaceInput.messageLine} onChange={handleChange} >
  //                 <option> Select </option>
  //                 <option value="none">None</option>
  //               </select>
  //             </Grid>
  //             <Grid item xs={5} className="ivdSubItem">
  //               Enable OVD Line
  //             </Grid>
  //             <Grid item xs={7} className="ivdTextBox">
  //               {
  //                 noOfLinesArray?.map((el: any, i: any) => {
  //                   return <FormControlLabel onChange={(e) => handleChecked(e, i)}
  //                     control={
  //                       <Checkbox key={el} className="pr-20"
  //                         name="enableMsgLine" required={true} value={i + 1}
  //                         size="small"
  //                         checked={noOfLinesArray[i]}
  //                         style={{ color: "#033733" }}
  //                       />
  //                     }
  //                     label={<span>{i + 1}</span>}
  //                   />
  //                 })
  //               }
  //             </Grid>
  //           </Grid>
  //           <Grid>
  //           <div>
  //               {(ovdState.isError === true && ovdMessage != "" && submit == true) ? <div style={{ color:"red", textAlign:"center" }}> {ovdMessage}</div> : <></>}
  //           </div>
  //           </Grid>
  //           {appUser.userRole == "ROLE_STATION MASTER" ? <></> :
  //           <div style={{ paddingTop: "2.06%", display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
  //             <Button onClick={handleSubmit} type="submit" className="ivdSaveBtn" variant="outlined">
  //               <DoneIcon className="SaveIcon" style={{ display: "inherit" }} />
  //               Save
  //             </Button>
  //             <Button type="reset" value="Reset" variant="outlined" className="ivdCancelBtn" onClick={handleCancel}>
  //               <ClearIcon className="clearIcon" />
  //               Cancel
  //             </Button>
  //             {interfaceInput.id !== 0 ? <><Button type="submit" onClick={handleDelete} variant="outlined" className="ivdDeleteBtn">
  //               <DeleteIcon className="deleteIcon" />
  //                 Delete
  //               </Button></>:
  //               <><Button disabled type="submit" onClick={handleDelete} variant="outlined" className="ivdDeleteBtn">
  //                 <DeleteIcon className="deleteIcon" />
  //                   Delete
  //               </Button></>}
  //           </div>}
  //         </Card>
  //       </Grid>
  //     </Grid>
  //   </>
  // )

  return (
    <>
      <Grid item xs={12} style={{height : "100%"}}>
        <Card style={{ padding: "30px", height: "100%" }} className={appUser.userRole == "ROLE_STATION MASTER" ? "overlapBackground ivdCard" : "ivdCard"}>
          {appUser.userRole == "ROLE_STATION MASTER" ? <Grid className="stationForm formFields">

          </Grid> : <></>
          }
          <Grid container>
            <Typography className="confHed">
              <strong>
                Configuration Settings
              </strong>
            </Typography>
          </Grid>
          <Grid container className="mb-17">
            <Typography className="confSubHed">
              Select the OVD type and add IP address to configure
            </Typography>
          </Grid>
          <Grid container style={{ paddingTop: "3.12%" }} className="mb-17">
            <Grid item xs={4} md={6} lg={6} xl={5} className="ivdSubItem">
              <Typography>
                OVD IP Address<span className="asterisk">*</span>
              </Typography>
            </Grid>
            <Grid item xs={3} md={5} lg={4} xl={3}>
              <Grid container>
                <Grid item xs={3}>
                  <TextField disabled className="disabled ivdBoxStyle mr-10" variant="outlined" name="ipAddress1" required={true} value={interfaceInput.ipAddress1} onChange={handleChange} />
                </Grid>
                <Grid item xs={3}>
                  <TextField disabled className="disabled ivdBoxStyle mr-10" variant="outlined" name="ipAddress2" required={true} value={interfaceInput.ipAddress2} onChange={handleChange} />
                </Grid>
                <Grid item xs={3}>
                  <TextField disabled className="disabled ivdBoxStyle mr-10" variant="outlined" name="ipAddress3" required={true} value={interfaceInput.ipAddress3} onChange={handleChange} />
                </Grid>
                <Grid item xs={3}>
                  <TextField className="ivdBoxStyle" variant="outlined" name="ipAddress4" required={true} value={interfaceInput.ipAddress4} onChange={handleChange} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container className="mb-17">
            <Grid item xs={4} md={6} lg={6} xl={5} className="ivdSubItem">
              <Typography>
                OVD Name
              </Typography>
            </Grid>
            <Grid item xs={3} md={5} lg={4} xl={3} className="ivdTextBox">
              <TextField size="small" className="ivdTextFieldValue" variant="outlined" name="deviceName" value={interfaceInput.deviceName} onChange={handleChange} />
            </Grid>
          </Grid>
          <Grid container className="mb-17">
            <Grid item xs={4} md={6} lg={6} xl={5} className="ivdSubItem">
              <Typography>
                Number of Lines
              </Typography>
            </Grid>
            <Grid item xs={3} md={5} lg={4} xl={3} className="ivdTextBox">
              <select className="ivdTextFieldValue h-40" required={true} name="noOfLines" value={interfaceInput?.noOfLines} onChange={handleChange} >
                <option value="">Select</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
              </select>
            </Grid>
          </Grid>
          <Grid container className="mb-17">
            <Grid item xs={4} md={6} lg={6} xl={5} className="ivdSubItem">
              <Typography>
                Message Line
              </Typography>
            </Grid>
            <Grid item xs={3} md={5} lg={4} xl={3} className="ivdTextBox">
              <select className="ivdTextFieldValue h-40" required={true} name="messageLine" value={interfaceInput.messageLine} onChange={handleChange} >
                <option> Select </option>
                <option value="none">None</option>
              </select>
            </Grid>
          </Grid>
          <Grid container className="mb-21">
            <Grid item xs={4} md={6} lg={6} xl={5} className="ivdSubItem">
              Enable OVD Line
            </Grid>
            <Grid item xs={3} md={5} lg={4} xl={3} className="ivdTextBox">
              {
                noOfLinesArray?.map((el: any, i: any) => {
                  return <FormControlLabel onChange={(e) => handleChecked(e, i)}
                    control={
                      <Checkbox key={el} className="pr-20"
                        name="enableMsgLine" required={true} value={i + 1}
                        size="small"
                        checked={noOfLinesArray[i]}
                        style={{ color: "#033733" }}
                      />
                    }
                    label={<span>{i + 1}</span>}
                  />
                })
              }
            </Grid>
            <Grid container style={{justifyContent:"center",marginTop:"20px"}}>
            <Grid item xs={2} md={3} lg={2} xl={2} ></Grid>
              <Grid item xs={4} md={6} lg={4} xl={4}>
              {(ovdState.isError === true && ovdMessage != "" && submit == true) ? <div style={{ color: "red", textAlign: "center" }}> {ovdMessage}</div> : <></>}
            </Grid>
            </Grid>
          </Grid>
          {appUser.userRole == "ROLE_STATION MASTER" ? <></> :
            <Grid container spacing={2} style={{ paddingTop: "2.06%", display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
              <Grid item xs={3} md={4} lg={3} xl={2}>
                <Button onClick={handleSubmit} type="submit" className="ivdSaveBtn" variant="outlined">
                  <DoneIcon className="SaveIcon" style={{ display: "inherit" }} />
                  Save
                </Button>
              </Grid>
              <Grid item xs={3} md={4} lg={3} xl={2}>
                <Button type="reset" value="Reset" variant="outlined" className="ivdCancelBtn" onClick={handleCancel}>
                  <ClearIcon className="clearIcon" />
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={3} md={4} lg={3} xl={2}>
                {interfaceInput.id !== 0 ? <><Button type="submit" onClick={handleDelete} variant="outlined" className="ivdDeleteBtn">
                  <DeleteIcon className="deleteIcon" />
                  Delete
                </Button></> :
                  <><Button disabled type="submit" onClick={handleDelete} variant="outlined" className="ivdDeleteBtn">
                    <DeleteIcon className="deleteIcon" />
                    Delete
                  </Button></>}
              </Grid>
            </Grid>}
        </Card>
      </Grid>
    </>
  )
}