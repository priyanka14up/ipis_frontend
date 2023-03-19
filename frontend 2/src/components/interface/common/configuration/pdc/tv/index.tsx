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
import { useDispatch, useSelector } from "react-redux";
import { DeleteDevices, fetchDevices, fetchDevicesDetails, fetchPdcDetails, IvdOvdTvPost, updateDeviceName, updatePdcChildDeviceName, updatePortName, updateSubPortName } from "../../../../../../redux/actions/interface/interface";
import { interfaceStateSelector } from "../../../../../../redux/reducers/interface/interface";
import Swal from "sweetalert2";
import { Messages } from "../../../../../../constants/messages";
import { authuserStateSelector } from "../../../../../../redux/reducers/authUser/authUser";

export const TVpdc = (props: any) => {
  const { platformNumbers } = props;
  const dispatch = useDispatch();
  const { appUser } = useSelector(authuserStateSelector)
  const { currentSelectedPdcEthernetDevice, currentSelectedPdcPortNumber, pdcData, tvState, tvMessage, deleteState, formState } = useSelector(interfaceStateSelector)

  const [interfaceInput, setInterfaceInput] = useState({
    id: 0,
    portNumber: "",
    deviceName: "",
    deviceType: "",
    ipAddress1: "192",
    ipAddress2: "168",
    ipAddress3: "",
    ipAddress4: "",
    type: "",
    noOfLines: 2,
    messageLine: "",
    enableMsgLine: [1, 2],
    platformNo: "",
  });

  const [submit, setSubmit] = useState(false);

  const [enableSubmit, setenableSubmit] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [currentSelectedDevice, setCurrentSelectedDevice] = useState("");
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
      })
        .then(() => {
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
          dispatch(fetchDevicesDetails(pdcData?.id));
          setDeleted(false);
        })
    }
  }, [deleteState, deleted])

  useEffect(() => {
    if (pdcData.platformNo) {
      setInterfaceInput({ ...interfaceInput, ["ipAddress3"]: pdcData?.platformNo[0], ["platformNo"]: pdcData?.platformNo[0] })
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
      type: "",
      noOfLines: 2,
      messageLine: "",
      enableMsgLine: [1, 2],
      platformNo: "",
    })
  }

  const handleSubmit = () => {

    let inter: any = {
      id: interfaceInput.id,
      portNumber: `${currentSelectedPdcPortNumber}`,
      deviceType: "tvDisplay",
      deviceName: interfaceInput.deviceName,
      ipAddress: `${interfaceInput.ipAddress1}.${interfaceInput.ipAddress2}.${interfaceInput.ipAddress3}.${interfaceInput.ipAddress4}`,
      noOfLines: interfaceInput.noOfLines,
      type: interfaceInput.type,
      messageLine: interfaceInput.messageLine,
      platformNo: [interfaceInput.platformNo],
      enableMsgLine: interfaceInput.enableMsgLine
    };
    dispatch(IvdOvdTvPost(inter))
    setSubmit(true)
  };

  useEffect(() => {
    if (pdcData && pdcData.children) {
      let detail: any = pdcData.children.find((port: any) => port.portNumber === currentSelectedPdcPortNumber);
      if (detail && detail.id) {
        dispatch(fetchPdcDetails(detail.id))
      }
    }
  }, [currentSelectedPdcPortNumber])

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

  useEffect(() => {
    if (formState.isSuccess == true) {
      if (pdcData && pdcData.children) {
        let detail: any = pdcData.children.find((port: any) => port.portNumber === currentSelectedPdcPortNumber);
        if (detail && detail.deviceType === "tvDisplay" && detail.detail && currentSelectedPdcPortNumber === detail.detail.portNumber) {
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
            type: "",
            noOfLines: detail.detail.noOfLines,
            messageLine: detail.detail.messageLine,
            enableMsgLine: detail.detail.enableMsgLine,
            platformNo: detail.detail.platformNo,
          })
        }
      }
    }
  }, [formState, currentSelectedPdcPortNumber])

  useEffect(() => {
    if (tvState && tvState.isSuccess === true && submit === true) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${Messages.FORM_SUBMITTED_SUCESSFULLY}`,
        showConfirmButton: false,
        allowOutsideClick: false,
        timer: 3000,
      }).then(() => {
        dispatch(fetchDevicesDetails(pdcData?.id))
      })
    }
  }, [tvState])



  return (
    <>


      <Card style={{ padding: "20px", border: "1px solid rgb(221, 221, 221)", height: '100%' }} className={appUser.userRole == "ROLE_STATION MASTER" ? "overlapBackground ivdCard" : "ivdCard"}>

        {/* {appUser.userRole == "ROLE_STATION MASTER" ?
                <Grid style={{ color: "red", display: "flex", justifyContent: "center", fontSize: "22px" }}>*view only</Grid>
                : <></>
              } */}
        {
          appUser.userRole == "ROLE_STATION MASTER" ? <Grid className="stationForm formFields">

          </Grid> : <></>
        }
        <Grid container>
          <Typography component="p" className="confHedPdc">
            <b>Configuration Settings</b>
          </Typography>
        </Grid>
        <Grid container className="mb-10">
          <Grid item xs={5} className="ivdSubItem">
            TV IP Address<sup className="asterisk">*</sup>
          </Grid>
          <Grid item xs={5} className="ivdGrid">
            <Grid container spacing={1}>
              <Grid item xs={3}><TextField disabled className="ivdBoxStyle mr-10" variant="outlined" name="ipAddress1" required={true} value={interfaceInput.ipAddress1} onChange={handleChange} /></Grid>
              <Grid item xs={3}><TextField disabled className="ivdBoxStyle mr-10" variant="outlined" name="ipAddress2" required={true} value={interfaceInput.ipAddress2} onChange={handleChange} /></Grid>
              <Grid item xs={3}><TextField disabled className="ivdBoxStyle mr-10" variant="outlined" name="ipAddress3" required={true} value={interfaceInput.ipAddress3} onChange={handleChange} /></Grid>
              <Grid item xs={3}><TextField className="ivdBoxStyle" variant="outlined" name="ipAddress4" required={true} value={interfaceInput.ipAddress4} onChange={handleChange} /></Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className="mb-10">
          <Grid item xs={5} className="ivdSubItem">
            TV Name
          </Grid>
          <Grid item xs={5} className="ivdTextBoxpdc">
            <TextField size="small" className="ivdTextFieldValue" variant="outlined" name="deviceName" value={interfaceInput.deviceName} onChange={handleChange} />
          </Grid>
        </Grid>
        <Grid container className="mb-10">
          <Grid item xs={5} className="ivdSubItem">
            Select Platform
          </Grid>
          <Grid item xs={5} className="ivdTextBoxpdc">
            <select disabled name="platformNo" className="ivdTextFieldValue h-40" required={true} value={interfaceInput.platformNo} onChange={handleChange} >
              <option>Select</option>
              {platformNumbers?.map((platformNo: any, i: any) => {
                return (
                  <option value={platformNo}>
                    {platformNo}
                  </option>
                );
              })}
            </select>
          </Grid>
        </Grid>
        <Grid container className="mb-10">
          <Grid item xs={5} className="ivdSubItem">
            No. of Lines
          </Grid>
          <Grid item xs={5} className="ivdTextBoxpdc">
            <select className="ivdTextFieldValue h-40" required={true} name="noOfLines" value={interfaceInput.noOfLines} onChange={handleChange} >
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
          <Grid item xs={5} className="ivdSubItem">
            Message Line
          </Grid>
          <Grid item xs={5} className="ivdTextBoxpdc">
            <select className="ivdTextFieldValue h-40" required={true} name="messageLine" value={interfaceInput.messageLine} onChange={handleChange} >
              <option> Select </option>
              <option value="none">None</option>
            </select>
          </Grid>
        </Grid>
        <Grid container className="mb-10">
          <Grid item xs={5} className="ivdSubItem">
            Enable TV Line
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

        <Grid container>

          {(tvState && tvState.isError === true && tvMessage != "" && submit == true) ? <div style={{ color: "red", textAlign: "center" }}> {tvMessage}</div> : <></>}

        </Grid>
        {appUser.userRole == "ROLE_STATION MASTER" ? <></> :
          <Grid container spacing={2} style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
            <Grid item xs={3}>
              <Button onClick={handleSubmit} type="submit" className="ivdSaveBtn" variant="outlined">
                <DoneIcon className="SaveIcon" style={{ display: "inherit" }} />
                Save
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button type="reset" value="Reset" variant="outlined" className="ivdCancelBtn" onClick={handleCancel}>
                <ClearIcon className="clearIcon" />
                Cancel
              </Button>
            </Grid>
            {interfaceInput.id !== 0 ? <><Grid item xs={3}><Button onClick={handleDelete} variant="outlined" className="ivdDeleteBtn">
              <DeleteIcon className="deleteIcon" />
              Delete
            </Button></Grid></> : <><Grid item xs={3}><Button disabled type="submit" onClick={handleDelete} variant="outlined" className="ivdDeleteBtn">
              <DeleteIcon className="deleteIcon" />
              Delete
            </Button></Grid></>}
          </Grid>}
      </Card>

    </>
  )
}