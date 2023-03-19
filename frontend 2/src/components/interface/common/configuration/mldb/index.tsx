import { Grid, Card, CardContent, Typography, TextField, FormControlLabel, Checkbox, Button } from "@material-ui/core";
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { interfaceStateSelector } from "../../../../../redux/reducers/interface/interface";
import { useEffect, useState } from "react";
import { mldbPost, DeleteDevices, fetchDevicesDetails, updateDeviceName, updatePortName, fetchDevices } from "../../../../../redux/actions/interface/interface";
import Swal from "sweetalert2";
import { Messages } from "../../../../../constants/messages";
import { authuserStateSelector } from "../../../../../redux/reducers/authUser/authUser";

export const Mldb = () => {

  const dispatch = useDispatch();
  const { currentSelectedCdsEthernetDevice, currentSelectedCdsPortNumber, cdsData, mldbState, formState, deleteState, mldbMessage } = useSelector(interfaceStateSelector)

  const [interfaceInput, setInterfaceInput] = useState({
    id: 0,
    portNumber: "",
    deviceName: "",
    deviceType: "",
    ipAddress1: "192",
    ipAddress2: "168",
    ipAddress3: "0",
    ipAddress4: "",
    boardType: "",
    noOfLines: 2,
    messageLine: "",
    enableMsgLine: [1, 2],
  })
  const { appUser } = useSelector(authuserStateSelector)
  const [deleted, setDeleted] = useState(false);
  const [enableSubmit, setenableSubmit] = useState(false);
  const [noOfLinesArray, setNoOfLinesArray] = useState<any>([])
  const [linesCheck, setLinesCheck] = useState<boolean>(false)
  const handleChange = (e: any) => {
    var { name, value, checked } = e.target;
    if (name == "noOfLines") {
      setInterfaceInput({ ...interfaceInput, [name]: parseInt(value) })
      setLinesCheck(true)
    }
    else if (name == "ipAddress4" && value.match(/^[\d]{0,3}$/i)) {
      setInterfaceInput({ ...interfaceInput, [name]: value })
      setLinesCheck(true)
    }
    else if (name != "ipAddress4") {
      setInterfaceInput({ ...interfaceInput, [name]: value })
    }
  }

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
    // .then(() => {
    //   if (deleteState.isSuccess === true && deleted === true) {
    //     Swal.fire({
    //       position: 'center',
    //       icon: 'warning',
    //       title: 'Not deleted!',
    //       showConfirmButton: false,
    //       allowOutsideClick: false,
    //       showCloseButton: true
    //     })
    //   }
    //   setInterfaceInput({
    //     id: 0,
    //     portNumber: "",
    //     deviceName: "",
    //     deviceType: "",
    //     ipAddress1: "",
    //     ipAddress2: "",
    //     ipAddress3: "",
    //     ipAddress4: "",
    //     boardType: "",
    //     noOfLines: 0,
    //     messageLine: "",
    //     enableMsgLine1: "",
    //     enableMsgLine2: "",
    //     enableMsgLine3: "",
    //   })
    //   const data: any = {
    //     portNumber: 0,

    //   };
    //   dispatch(updatePortName(data))
    //   const data1: any = {
    //     deviceName: ""
    //   };
    //   dispatch(updateDeviceName(data1))
    // })
  };


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
      }).then(() => {
        const data: any = {
          portNumber: interfaceInput.portNumber,
          portName: "CDS"
        };
        dispatch(updatePortName(data))
        const data1: any = {
          deviceName: "CDS"
        };
        dispatch(updateDeviceName(data1))
      }).then(() => {
        dispatch(fetchDevices())
      })
    }
  }, [deleteState, deleted])

  const handleSubmit = () => {
    let inter: any = {
      id: interfaceInput.id,
      portNumber: currentSelectedCdsPortNumber,
      deviceType: currentSelectedCdsEthernetDevice,
      deviceName: interfaceInput.deviceName,
      ipAddress: `${interfaceInput.ipAddress1}.${interfaceInput.ipAddress2}.${interfaceInput.ipAddress3}.${interfaceInput.ipAddress4}`,
      boardType: interfaceInput.boardType,
      noOfLines: interfaceInput.noOfLines,
      messageLine: interfaceInput.messageLine,
      enableMsgLine: interfaceInput.enableMsgLine,
      platformNumber:interfaceInput.ipAddress3,
    };
    dispatch(mldbPost(inter))
    setenableSubmit(true)
  }
  useEffect(() => {
    if (linesCheck == true) {
      let array = new Array(interfaceInput.noOfLines);
      let enableArray: any = [];
      for (let i = 0; i < array?.length; i++) {
        array[i] = true;
        enableArray.push(i + 1);
      }
      setNoOfLinesArray(array)
      setInterfaceInput({ ...interfaceInput, ["enableMsgLine"]: enableArray });
      setLinesCheck(false);
    } else {
      let checkArray = new Array(interfaceInput.noOfLines).fill(false);
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
  }, [interfaceInput.noOfLines])

  useEffect(() => {
    if (mldbState.isSuccess == true && enableSubmit == true) {
      dispatch(fetchDevices());
      setenableSubmit(false);
    }
  }, [mldbState, enableSubmit])

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
      boardType: "",
      noOfLines: 2,
      messageLine: "",
      enableMsgLine: [1, 2]
    })
  }
  useEffect(() => {
    if (cdsData && cdsData.children) {
      let detail: any = cdsData.children.find((port: any) => port.portNumber === currentSelectedCdsPortNumber);
      if (detail && detail.id) {
        dispatch(fetchDevicesDetails(detail.id))
      }
    }
  }, [currentSelectedCdsPortNumber]);

  useEffect(() => {
    if (formState.isSuccess === true) {
      if (cdsData && cdsData.children) {
        let detail: any = cdsData.children.find((port: any) => port.portNumber === currentSelectedCdsPortNumber);
        if (detail && detail.deviceType === "mldb" && detail.detail && currentSelectedCdsPortNumber === detail.detail.portNumber) {
          let ipAddress = detail.detail.ipAddress.split(".");
          setInterfaceInput({
            id: detail.id,
            portNumber: detail.portNumber,
            deviceType: detail.deviceType,
            deviceName: detail.detail.deviceName,
            ipAddress1: ipAddress[0],
            ipAddress2: ipAddress[1],
            ipAddress3: ipAddress[2],
            ipAddress4: ipAddress[3],
            boardType: detail.detail.boardType,
            noOfLines: detail.detail.noOfLines,
            messageLine: detail.detail.messageLine,
            enableMsgLine: detail.detail.enableMsgLine,
          })
        }
      }
    }
  }, [formState, currentSelectedCdsPortNumber]);

  useEffect(() => {
    if (mldbState.isSuccess === true && enableSubmit === true) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${Messages.FORM_SUBMITTED_SUCESSFULLY}`,
        showConfirmButton: false,
        allowOutsideClick: false,
        timer: 3000,
      })
    }
  }, [mldbState])

  useEffect(() => {
    setenableSubmit(true);
  }, [interfaceInput]);

  // return (
  //   <>
  //     <Grid item xs={12}>
  //       <Card style={{ height: "590px" }} className="mldbCard">
  //         <CardContent className="p-0">
  //           {/* {appUser.userRole == "ROLE_STATION MASTER" ?
  //             <Grid style={{ color: "red", display: "flex", justifyContent: "center", fontSize: "22px" }}>*view only</Grid>
  //             : <></>
  //           } */}
  //           <Typography component="p" className="confHed">

  //           </Typography>
  //           <Typography className="portHedstyle">
  //                                      <b>Configuration Settings</b>
  //           </Typography>
  //           <Typography className="confSubHed">
  //             Select the MLDB type and add IP address to configure
  //           </Typography>
  //         </CardContent>
  //         <Grid container style={{ padding: "0.445% 0px 0px 0px" }} className={appUser.userRole == "ROLE_STATION MASTER" ? "overlapBackground":""}>
  //         {   appUser.userRole == "ROLE_STATION MASTER" ? <Grid className="stationForm formFields">

  //         </Grid>: <></>
  //        }
  //           <Grid item xs={5} className="mldbSubHed">
  //             MLDB IP Address<sup className="asterisk">*</sup>
  //           </Grid>
  //           <Grid item xs={7}>
  //             <Grid className="mldbGrid">
  //               <TextField disabled className="disabled mldbBoxStyle mr-10" variant="outlined" type="text" name="ipAddress1" required={true} value={interfaceInput.ipAddress1} onChange={handleChange} />
  //               <TextField disabled className="disabled mldbBoxStyle mr-10" variant="outlined" type="text" name="ipAddress2" required={true} value={interfaceInput.ipAddress2} onChange={handleChange} />
  //               <TextField disabled className="disabled mldbBoxStyle mr-10" variant="outlined" type="text" name="ipAddress3" required={true} value={interfaceInput.ipAddress3} onChange={handleChange} />
  //               <TextField className="mldbBoxStyle" variant="outlined" type="text" name="ipAddress4" required={true} value={interfaceInput.ipAddress4} onChange={handleChange} />
  //             </Grid>
  //           </Grid>

  //           <Grid item xs={5} className="mldbSubHed">
  //             MLDB Name
  //           </Grid>
  //           <Grid item xs={7} className="mldbTextBox">
  //             <TextField className="mldbNameValue" variant="outlined" type="text" name="deviceName" required={true} value={interfaceInput.deviceName} onChange={handleChange} />
  //           </Grid>

  //           <Grid item xs={5} className="mldbSubHed">
  //             Board Type
  //           </Grid>
  //           <Grid item xs={7} className="mldbTextBox">

  //             <select className="mldbNameValue h-40" name="boardType" required={true} value={interfaceInput.boardType} onChange={handleChange}>
  //               <option value="">Select</option>
  //               <option value="single">Single</option>
  //               <option value="double">Double</option>
  //             </select>
  //           </Grid>

  //           <Grid item xs={5} className="mldbSubHed">
  //             No of Lines
  //           </Grid>
  //           <Grid item xs={7} className="mldbTextBox">
  //             <select className="mldbNameValue h-40" name="noOfLines" required={true} value={interfaceInput.noOfLines} onChange={handleChange}>
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
  //             </select>
  //           </Grid>

  //           <Grid item xs={5} className="mldbSubHed">
  //             Message Line
  //           </Grid>
  //           <Grid item xs={7} className="mldbTextBox">
  //             <select className="mldbNameValue h-40" name="messageLine" required={true} value={interfaceInput.messageLine} onChange={handleChange}>
  //               <option>Select</option>
  //               <option value="none">None</option>
  //             </select>
  //           </Grid>

  //           <Grid item xs={5} className="mldbSubHed">
  //             Enable MLDB Line
  //           </Grid>
  //           <Grid item xs={7} className="mldbTextBox">
  //             {
  //               noOfLinesArray?.map((el: any, i: any) => {
  //                 return <FormControlLabel onChange={(e)=>handleChecked(e,i)}
  //                   control={
  //                     <Checkbox key={el} className="pr-20 margineBottum"
  //                       name="enableMsgLine" required={true} value={i + 1}
  //                       size="small"
  //                       checked={noOfLinesArray[i]}
  //                       style={{ color: "#033733"}}
  //                     />
  //                   }
  //                   label={<span>{i + 1}</span>}
  //                 />
  //               })
  //             }
  //           </Grid> 
  //           <Grid style={{paddingLeft:"42%"}}>
  //             <div>
  //               {(mldbState.isError === true && mldbMessage != "" && enableSubmit == true) ? <div style={{ color: "red", textAlign: "center" }}> {mldbMessage}</div> : <></>}
  //             </div>
  //           </Grid>
  //           {appUser.userRole == "ROLE_STATION MASTER" ? <></> :
  //             <div style={{ paddingTop: "1%", display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
  //               {interfaceInput.id === 0 ?
  //                 <Button onClick={handleSubmit} type="submit" className="mldbSaveBtn" variant="outlined">
  //                   <DoneIcon className="SaveIcon" style={{ display: "inherit" }} />
  //                   Save
  //                 </Button> : <Button onClick={handleSubmit} type="submit" className="mldbSaveBtn" variant="outlined" style={{ width: "20%" }}>
  //                   <DoneIcon className="SaveIcon" style={{ display: "inherit" }} />
  //                   Save Changes
  //                 </Button>
  //               }
  //               <Button type="reset" value="Reset" variant="outlined" className="mldbCancelBtn" onClick={handleCancel}>
  //                 <ClearIcon className="clearIcon" />
  //                 Cancel
  //               </Button>
  //               {interfaceInput.id !== 0 ? <> <Button type="submit" variant="outlined" className="mldbDeleteBtn" onClick={handleDelete}>
  //                 <DeleteIcon className="deleteIcon" />
  //                 Delete
  //               </Button></> : <> <Button disabled type="submit" variant="outlined" className="mldbDeleteBtn" onClick={handleDelete}>
  //                 <DeleteIcon className="deleteIcon" />
  //                 Delete
  //               </Button></>}
  //             </div>
  //           }
  //         </Grid>
  //       </Card>
  //     </Grid>
  //   </>
  // )

  return (
    <>
      <Grid item xs={12} style={{ height: "100%" }}>
        <Card style={{ height: "100%" }} className="mldbCard">
          <Grid container>
            <Typography className="portHedstyle">
              <strong>
                Configuration Settings
              </strong>
            </Typography>
          </Grid>
          <Grid container className="mb-21">
            <Typography className="confSubHed">
              Select the MLDB type and add IP address to configure
            </Typography>
          </Grid>
          <Grid container style={{ padding: "0.445% 0px 0px 0px" }} className={appUser.userRole == "ROLE_STATION MASTER" ? "overlapBackground" : ""}>
            {appUser.userRole == "ROLE_STATION MASTER" ? <Grid className="stationForm formFields">

            </Grid> : <></>
            }
            <Grid container className="mb-21">
              <Grid item xs={5} md={5} lg={5} xl={5} className="mldbSubHed">
                <Typography>
                  MLDB IP Address<span className="asterisk">*</span>
                </Typography>
              </Grid>
              <Grid item xs={2} md={3} lg={2} xl={2}>
                <Grid container className="mldbGrid">
                  <Grid item xs={3}>
                    <TextField disabled className="disabled mldbBoxStyle mr-10" variant="outlined" type="text" name="ipAddress1" required={true} value={interfaceInput.ipAddress1} onChange={handleChange} />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField disabled className="disabled mldbBoxStyle mr-10" variant="outlined" type="text" name="ipAddress2" required={true} value={interfaceInput.ipAddress2} onChange={handleChange} />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField disabled className="disabled mldbBoxStyle mr-10" variant="outlined" type="text" name="ipAddress3" required={true} value={interfaceInput.ipAddress3} onChange={handleChange} />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField className="mldbBoxStyle" variant="outlined" type="text" name="ipAddress4" required={true} value={interfaceInput.ipAddress4} onChange={handleChange} />
                  </Grid>
                </Grid>

              </Grid>
            </Grid>
            <Grid container className="mb-21">
              <Grid item xs={5} md={5} lg={5} xl={5} className="mldbSubHed">
                <Typography>
                  MLDB Name
                </Typography>
              </Grid>
              <Grid item xs={2} md={3} lg={2} xl={2} className="mldbTextBox">
                <TextField className="mldbNameValue h-1" variant="outlined" type="text" name="deviceName" required={true} value={interfaceInput.deviceName} onChange={handleChange} />
              </Grid>
            </Grid>
            <Grid container className="mb-21">
              <Grid item xs={5} md={5} lg={5} xl={5} className="mldbSubHed">
                <Typography>
                  Board Type
                </Typography>
              </Grid>
              <Grid item xs={2} md={3} lg={2} xl={2} className="mldbTextBox">
                <select className="mldbNameValue h-40" name="boardType" required={true} value={interfaceInput.boardType} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="single">Single</option>
                  <option value="double">Double</option>
                </select>
              </Grid>
            </Grid>
            <Grid container className="mb-21">
              <Grid item xs={5} md={5} lg={5} xl={5} className="mldbSubHed">
                <Typography>
                  Number of Lines
                </Typography>
              </Grid>
              <Grid item xs={2} md={3} lg={2} xl={2} className="mldbTextBox">
                <select className="mldbNameValue h-40" name="noOfLines" required={true} value={interfaceInput.noOfLines} onChange={handleChange}>
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
            <Grid container className="mb-21">
              <Grid item xs={5} md={5} lg={5} xl={5} className="mldbSubHed">
                <Typography>
                  Message Line
                </Typography>
              </Grid>
              <Grid item xs={2} md={3} lg={2} xl={2} className="mldbTextBox">
                <select className="mldbNameValue h-40" name="messageLine" required={true} value={interfaceInput.messageLine} onChange={handleChange}>
                  <option>Select</option>
                  <option value="none">None</option>
                </select>
              </Grid>
            </Grid>
            <Grid container className="mb-25">
              <Grid item xs={5} md={5} lg={5} xl={5} className="mldbSubHed">
                <Typography>
                  Enable MLDB Line
                </Typography>
              </Grid>
              <Grid item xs={2} md={3} lg={2} xl={2} className="mldbTextBox">
                {
                  noOfLinesArray?.map((el: any, i: any) => {
                    return (
                      <FormControlLabel onChange={(e) => handleChecked(e, i)}
                        control={
                          <Checkbox key={el} className="pr-20 margineBottum"
                            name="enableMsgLine" required={true} value={i + 1}
                            size="small"
                            checked={noOfLinesArray[i]}
                            style={{ color: "#033733" }}
                          />
                        }
                        label={<span>{i + 1}</span>}
                      />
                    )
                  })
                }
              </Grid>
            </Grid>
            <Grid container style={{ paddingLeft: "42%" }}>
            <Grid item xs={2} md={3} lg={2} xl={2} ></Grid>
              <Grid item xs={4} md={6} lg={4} xl={4}>
              {(mldbState.isError === true && mldbMessage != "" && enableSubmit == true) ? <div style={{ color: "red", textAlign: "center", marginBottom: "20px" }}> {mldbMessage}</div> : <></>}
            </Grid>
            </Grid>
            {appUser.userRole == "ROLE_STATION MASTER" ? <></> :
              <Grid container spacing={2} className="mldbbtn">
                <Grid item xs={2} md={3} lg={2} xl={2}>
                  {interfaceInput.id === 0 ?
                    <Button onClick={handleSubmit} type="submit" className="mldbSaveBtn w-mldb" variant="outlined">
                      <DoneIcon className="SaveIcon" style={{ display: "inherit" }} />
                      Save
                    </Button> : <Button onClick={handleSubmit} type="submit" className="mldbSaveBtn w-mldb" variant="outlined" style={{ width: "100%", fontSize:"9px" }}>
                      <DoneIcon className="SaveIcon" style={{ display: "inherit" }} />
                      Save Changes
                    </Button>
                  }
                </Grid>
                <Grid item xs={2} md={3} lg={2} xl={2}>
                  <Button type="reset" value="Reset" variant="outlined" className="mldbCancelBtn w-mldb" onClick={handleCancel}>
                    <ClearIcon className="clearIcon" />
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={2} md={3} lg={2} xl={2}>
                  {interfaceInput.id !== 0 ? <> <Button type="submit" variant="outlined" className="mldbDeleteBtn w-mldb" onClick={handleDelete}>
                    <DeleteIcon className="deleteIcon" />
                    Delete
                  </Button></> : <> <Button disabled type="submit" variant="outlined" className="mldbDeleteBtn w-mldb" onClick={handleDelete}>
                    <DeleteIcon className="deleteIcon" />
                    Delete
                  </Button></>}
                </Grid>
              </Grid>
            }
          </Grid>
        </Card>
      </Grid>
    </>
  )


}
