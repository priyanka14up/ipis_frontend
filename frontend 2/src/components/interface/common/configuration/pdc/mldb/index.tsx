import { Grid, Card, CardContent, Typography, TextField, FormControlLabel, Checkbox, Button } from "@material-ui/core";
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { interfaceStateSelector } from "../../../../../../redux/reducers/interface/interface";
import { useEffect, useState } from "react";
import { mldbPost, DeleteDevices, fetchDevicesDetails, updateDeviceName, fetchDevices, updateSubPortName, updatePdcChildDeviceName } from "../../../../../../redux/actions/interface/interface";
import Swal from "sweetalert2";
import { Messages } from "../../../../../../constants/messages";
import { authuserStateSelector } from "../../../../../../redux/reducers/authUser/authUser";
import "./style.css";
export const Mldbpdc = (props: any) => {
  const dispatch = useDispatch();
  const { currentSelectedPdcEthernetDevice, currentSelectedPdcPortNumber, pdcData, mldbState, formState, deleteState, mldbMessage } = useSelector(interfaceStateSelector);


  const [interfaceInput, setInterfaceInput] = useState({
    id: 0,
    portNumber: "",
    deviceName: "",
    deviceType: "",
    ipAddress1: "192",
    ipAddress2: "168",
    ipAddress3: "",
    ipAddress4: "",
    boardType: "",
    noOfLines: 2,
    messageLine: "",
    enableMsgLine: [1, 2]

  })
  const { appUser } = useSelector(authuserStateSelector)
  const [deleted, setDeleted] = useState(false);
  const [enableSubmit, setenableSubmit] = useState(false);

  const [noOfLinesArray, setNoOfLinesArray] = useState<any>([])
  const [linesCheck, setLinesCheck] = useState<boolean>(false)
  const handleChange = (e: any) => {
    var { name, value } = e.target;
    if (name == "noOfLines") {
      setInterfaceInput({ ...interfaceInput, [name]: parseInt(value) })
      setLinesCheck(true) 
    }
    else if (name == "ipAddress4" && value.match(/^[\d]{0,3}$/i)) {
      setInterfaceInput({ ...interfaceInput, [name]: value })
      setLinesCheck(true)
    }
    else if(name!="ipAddress4"){
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

  useEffect(() => {
    if (linesCheck == true) {
      let array: any = new Array(interfaceInput.noOfLines);
      let enableArray: any = [];
      for (let i = 0; i < array?.length; i++) {
        array[i] = true;
        enableArray.push(i + 1);
      }
      setNoOfLinesArray(array)
      setInterfaceInput({ ...interfaceInput, ["enableMsgLine"]: enableArray });
      setLinesCheck(false);
    } else {
      let checkArray: any = new Array(interfaceInput.noOfLines).fill(false);
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
          portNumber: currentSelectedPdcPortNumber,
          portName: "CDS"
        };
        dispatch(updateSubPortName(data))
        const data1: any = {
          deviceName: "CDS"
        };
        dispatch(updatePdcChildDeviceName(data1))
      }).then(() => {
        dispatch(fetchDevicesDetails(pdcData?.id))
      })
    }
  }, [deleteState, deleted])

  const handleSubmit = () => {
    let inter: any = {
      id: interfaceInput.id,
      portNumber: currentSelectedPdcPortNumber,
      deviceType: currentSelectedPdcEthernetDevice,
      deviceName: interfaceInput.deviceName,
      ipAddress: `${interfaceInput.ipAddress1}.${interfaceInput.ipAddress2}.${interfaceInput.ipAddress3}.${interfaceInput.ipAddress4}`,
      boardType: interfaceInput.boardType,
      noOfLines: interfaceInput.noOfLines,
      messageLine: interfaceInput.messageLine,
      enableMsgLine: interfaceInput.enableMsgLine,
      platformNo: interfaceInput.ipAddress3
    };
    dispatch(mldbPost(inter))
    setenableSubmit(true)
  }


  useEffect(() => {
    if (pdcData.platformNo) {
      setInterfaceInput({ ...interfaceInput, ["ipAddress3"]: pdcData?.platformNo[0] })
    }
  }, [pdcData.platformNo])

  const handleCancel = () => {
    setInterfaceInput({
      id: 0,
      portNumber: "",
      deviceName: "",
      deviceType: "",
      ipAddress1: "",
      ipAddress2: "",
      ipAddress3: "",
      ipAddress4: "",
      boardType: "",
      noOfLines: 2,
      messageLine: "",
      enableMsgLine: [1, 2],
    })
  }
  useEffect(() => {
    if (pdcData && pdcData.children) {
      let detail: any = pdcData.children.find((port: any) => port.portNumber === currentSelectedPdcPortNumber);
      if (detail && detail.id) {
        dispatch(fetchDevicesDetails(detail.id))
      }
    }
  }, [currentSelectedPdcPortNumber]);

  useEffect(() => {
    if (formState.isSuccess === true) {
      if (pdcData && pdcData.children) {
        let detail: any = pdcData.children.find((port: any) => port.portNumber === currentSelectedPdcPortNumber);
        if (detail && detail.deviceType === "mldb" && detail.detail && currentSelectedPdcPortNumber === detail.detail.portNumber) {
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
            enableMsgLine: detail.detail.enableMsgLine
          })
        }
      }
    }
  }, [formState, currentSelectedPdcPortNumber]);

  useEffect(() => {
    if (mldbState.isSuccess === true && enableSubmit === true) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${Messages.FORM_SUBMITTED_SUCESSFULLY}`,
        showConfirmButton: false,
        allowOutsideClick: false,
        timer: 3000,
      }).then(() => {
        dispatch(fetchDevicesDetails(pdcData?.id));
      })
    }
  }, [mldbState])


  return (
    <>
      <Grid item xs={12} style={{ height: '100%' }}>
        <Card className="mldbCardPdc" style={{ height: '100%' }}>
          <CardContent className="p-0">
            {/* {appUser.userRole == "ROLE_STATION MASTER" ?
              <Grid style={{ color: "red", display: "flex", justifyContent: "center", fontSize: "22px" }}>*view only</Grid>
              : <></>
            } */}
            <Typography component="p" className="confHedPdc">
              <b>Configuration Settings</b>
            </Typography>
          </CardContent>
          <Grid container className={appUser.userRole == "ROLE_STATION MASTER" ? "overlapBackground" : ""}>
            {appUser.userRole == "ROLE_STATION MASTER" ? <Grid className="stationForm formFields">

            </Grid> : <></>
            }
            <Grid container className="mb-10">
              <Grid item xs={5} className="mldbSubHedpdc">
                MLDB IP Address<sup className="asterisk">*</sup>
              </Grid>
              <Grid item xs={5}>
                <Grid container className="mldbGridPdc" spacing={1}>
                  <Grid item xs={3}><TextField disabled className="mldbBoxStyle mr-10" variant="outlined" type="text" name="ipAddress1" required={true} value={interfaceInput.ipAddress1} onChange={handleChange} /></Grid>
                  <Grid item xs={3}><TextField disabled className="mldbBoxStyle mr-10" variant="outlined" type="text" name="ipAddress2" required={true} value={interfaceInput.ipAddress2} onChange={handleChange} /></Grid>
                  <Grid item xs={3}><TextField disabled className="mldbBoxStyle mr-10" variant="outlined" type="text" name="ipAddress3" required={true} value={interfaceInput.ipAddress3} onChange={handleChange} /></Grid>
                  <Grid item xs={3}><TextField className="mldbBoxStyle" variant="outlined" type="text" name="ipAddress4" required={true} value={interfaceInput.ipAddress4} onChange={handleChange} /></Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container className="mb-10">

              <Grid item xs={5} className="mldbSubHedpdc">
                MLDB Name
              </Grid>
              <Grid item xs={5} className="ivdTextBoxpdc">
                <TextField className="mldbNameValuePdc" variant="outlined" type="text" name="deviceName" required={true} value={interfaceInput.deviceName} onChange={handleChange} />
              </Grid>
            </Grid>
            <Grid container className="mb-10">

              <Grid item xs={5} className="mldbSubHedpdc">
                Board Type
              </Grid>
              <Grid item xs={5} className="ivdTextBoxpdc">

                <select className="mldbNameValuePdc h-40" name="boardType" required={true} value={interfaceInput.boardType} onChange={handleChange}>
                  <option>Select</option>
                  <option value="both">Both</option>
                </select>
              </Grid>
            </Grid>
            <Grid container className="mb-10">
              <Grid item xs={5} className="mldbSubHedpdc">
                No of Lines
              </Grid>
              <Grid item xs={5} className="ivdTextBoxpdc">
                <select className="mldbNameValuePdc h-40" name="noOfLines" required={true} value={interfaceInput.noOfLines} onChange={handleChange}>
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
            <Grid container className="mb-10">
              <Grid item xs={5} className="mldbSubHedpdc">
                Message Line
              </Grid>
              <Grid item xs={5} className="ivdTextBoxpdc">
                <select className="mldbNameValuePdc h-40" name="messageLine" required={true} value={interfaceInput.messageLine} onChange={handleChange}>
                  <option>Select</option>
                  <option value="none">None</option>
                </select>
              </Grid>
            </Grid>
            <Grid container className="mb-10">
              <Grid item xs={5} className="mldbSubHedpdc">
                Enable MLDB Line
              </Grid>
              <Grid item xs={7} className="ivdTextBoxpdc">
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
            </Grid>
            <Grid container style={{ width: '100%' }}>
              <Grid item xs={4}></Grid>
              <Grid item xs={6}>
                {(mldbState.isError === true && mldbMessage != "" && enableSubmit == true) ? <div style={{ color: "red", textAlign: "center" }}> {mldbMessage}</div> : <></>}
              </Grid>
            </Grid>
            {appUser.userRole == "ROLE_STATION MASTER" ? <></> :
              <Grid container spacing={2} style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                {interfaceInput.id === 0 ?
                  <Grid item xs={3}>
                    <Button onClick={handleSubmit} type="submit" className="mldbSaveBtn" variant="outlined">
                      <DoneIcon className="SaveIcon" style={{ display: "inherit" }} />
                      Save
                    </Button></Grid> : <Grid item xs={3}><Button onClick={handleSubmit} type="submit" className="mldbSaveBtn" variant="outlined">
                      <DoneIcon className="SaveIcon" style={{ display: "inherit" }} />
                      Save 
                    </Button></Grid>
                }
                <Grid item xs={3}> <Button type="reset" value="Reset" variant="outlined" className="mldbCancelBtn" onClick={handleCancel}>
                  <ClearIcon className="clearIcon" />
                  Cancel
                </Button></Grid>
                {interfaceInput.id !== 0 ? <><Grid item xs={3}> <Button type="submit" variant="outlined" className="mldbDeleteBtn" onClick={handleDelete}>
                  <DeleteIcon className="deleteIcon" />
                  Delete
                </Button></Grid></> : <><Grid item xs={3}> <Button disabled type="submit" variant="outlined" className="mldbDeleteBtn" onClick={handleDelete}>
                  <DeleteIcon className="deleteIcon" />
                  Delete
                </Button></Grid></>}
              </Grid>
            }
          </Grid>
        </Card>
      </Grid>
    </>
  )
}
