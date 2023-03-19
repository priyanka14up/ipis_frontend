import {
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  FormControlLabel,
  FormControl,
  Checkbox,
  InputLabel,
  Select,
  ListItemIcon,
  ListItemText,
  MenuItem,
  TableRow,
  Typography,
  TextField,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import CloseIcon from "@material-ui/icons/Close";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import ArrowDown from "../../assets/images/ArrowDown.svg";
import ArrowUp from "../../assets/images/Vector.svg";
import SetupService from "../service/setup/setup";
import Swal from "sweetalert2";
import TrainDataModel from "../../model/setup/trainDataModel";
import OnlineTrainService from "../../components/service/onlineTrain/onlineTrain";
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export const OnlineTrainDataEntry = (props: any) => {
  const { handleCancel, handleRefresh } = props;
  const onlineTrainSvc = new OnlineTrainService();

  const [allCoachNames, setAllCoachNames] = useState<any>([]);

  const [trainNumberArray, setTrainNumberArray] = useState<any>([]);
  const [input, setInput] = useState<TrainDataModel | any>({
    id: 0,
    trainNo: 0,
    englishTrainName: "",
    hindiTrainName: "",
    regionalTrainName: "",
    scheduleArrivalTime: "",
    scheduleDepartureTime: "",
    maximumCoach: 0,
    runningDays: [],
    platformNo: 0,
    mergedTrains: false,
    mergedTrainNo: 0,
    frontSideEnd: "",
    backSideEnd: "",
    coaches: [],
    sourceStation: "",
    destinationStation: "",
    trainDirection: "",
    viaStation: [],
    trainType: "",
    trainArrDepStatus: "",
  });

  const everyday = new Array("sun", "mon", "tue", "wed", "thur", "fri", "sat");
  const days = new Array(
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  );
  console.log(everyday);

  const [disabled, setDisabled] = useState(true);

  const handleTrainNumber = (e: any) => {
    var { name, value } = e.target;
    if (value !== "0") {
      onlineTrainSvc.getTrainDataByTrainNo(value).then((data: any) => {
        setInput({
          trainNo: data?.trainNo,
          englishTrainName: data?.englishTrainName,
          hindiTrainName: data?.hindiTrainName,
          regionalTrainName: data?.regionalTrainName,
          //   scheduleArrivalTime: data.scheduleArrivalTime,
          scheduleArrivalTime: data?.scheduleArrivalTime,
          scheduleDepartureTime: data?.scheduleDepartureTime,
          //   scheduleDepartureTime: data.scheduleDepartureTime,
          maximumCoach: data?.maximumCoach,
          runningDays: data?.runningDays,
          platformNo: data?.platformNo,
          mergedTrains: data?.mergedTrains,
          mergedTrainNo: data?.mergedTrainNo,
          frontSideEnd: data?.frontSideEnd,
          backSideEnd: data?.backSideEnd,
          coaches: data?.coaches,
          sourceStation: data?.sourceStation,
          destinationStation: data?.destinationStation,
          trainDirection: data?.trainDirection,
          viaStation: data?.viaStation,
          trainType: data?.trainType,
          trainArrDepStatus: data?.trainArrDepStatus,
        });
      });
    }
  };
  const handleChange = (e: any) => {
    var { name, value } = e.target;
    // var days = input.runningDays;
    // if( name==="runningDaysAll"){
    //     var{checked} = e.target
    //     if(checked){
    //         days.push(value)
    //     }
    //     else{
    //         days.splice(days.indexOf(value))
    //     }
    // }
    if (name === "runningDays") {
      const days = input.runningDays;
      var { checked } = e.target;
      if (checked && value === "mon,tue,wed,thur,fri,sat,sun") {
        for (let i = 0; i < everyday.length; i++) {
          days.push(everyday[i]);
        }
      } else if (checked && value !== "mon,tue,wed,thur,fri,sat,sun") {
        days.push(value);
      } else {
        days.splice(days.indexOf(value));
      }
      setInput({ ...input, [name]: days });
    } else if (name === "maximumCoach") {
      const coach = parseInt(value);
      setInput({ ...input, [name]: coach });
    } else if (name === "coaches") {
      var coacheData = input.coaches;
      if (value !== "0") {
        coacheData.push(value);
      } else {
        coacheData.splice(coacheData.indexOf(value));
      }
      setInput({ ...input, [name]: coacheData });
    } else {
      setInput({ ...input, [name]: value });
    }

    console.log({ ...input, [name]: value });
  };

  const handleCoachChange = (e: any, i: any) => {
    const { name, value } = e.target;
    var coacheData = input.coaches;
    if (value !== "0") {
      coacheData[i] = value;
    } else {
      coacheData.splice(coacheData.indexOf(value));
    }
    setInput({ ...input, [name]: coacheData });
  };

  const options = [
    "GZB",
    "LKO",
    "MDB",
    "NDLS",
    "DLI",
    "STP",
    "GD",
    "BE",
    "ANVT",
    "KNP",
  ];
  const [selected, setSelected] = useState<any>([]);
  const isAllSelected =
    options.length > 0 && selected.length === options.length;

  const handleSelect = (event: any) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelected(selected.length === options.length ? [] : options);
      return;
    }
    setSelected(value);
  };

  const handleSubmit = () => {
    let data = {
      trainNumber: input?.trainNo,
      trainName: input?.englishTrainName,
      arrDep: input?.trainArrDepStatus,
      trainStatus: input?.trainArrDepStatus,
      late: null,
      platformNo: input?.platformNo,
      announcement: false,
      frontEnd: input?.frontSideEnd,
      backEnd: input?.backSideEnd,
      coaches: input?.coaches,
      sta: input?.scheduleArrivalTime,
      eta: input?.scheduleArrivalTime,
      std: input?.scheduleDepartureTime,
      etd: input?.scheduleDepartureTime,
      cgdb: false,
      td: false,
    };
    onlineTrainSvc.addtoGrid(data).then((res: any) => {
      if (res.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          customClass: {
            container: "my-swal",
          },
          title: `Data Added Successfully`,
          showConfirmButton: false,
          allowOutsideClick: false,
          timer: 3000,
        }).then(() => {
          handleRefresh();
          handleCancel();
        });
      }
    });
  };

  const rundays = () => {
    return days.map((el: any, i: any) => {
      return (
        <Grid item className="daysName onlineTrainDataDetails">
          <FormControlLabel
            onChange={handleChange}
            control={
              <Checkbox
                disabled
                className="pr-10 "
                checked={input?.runningDays?.some(
                  (day: any) => day == everyday[i]
                )}
                name="runningDays"
                required={true}
                value={everyday[i]}
                size="small"
                style={{ color: "#033733" }}
              />
            }
            label={<span>{el}</span>}
          />
        </Grid>
      );
    });
  };

  const coacheView = () => {
    var coachlist = new Array(input.maximumCoach);
    for (var i = 0; i < input.maximumCoach; i++) {
      coachlist[i] = i;
    }
    return coachlist.map(
      (el: any, i: any) => {
        // for (var i=0; i< input.maximumCoach; i++){
        return (
          <div className="coachDetailBox">
            <div className="coachNameNo">C{i + 1}</div>
            <select
              disabled
              name="coaches"
              value={input.coaches[i]}
              className="coachDetail"
              required={true}
              onChange={(e) => handleCoachChange(e, i)}
            >
              <option value="">Select</option>
              {allCoachNames.map((coachNames: any, i: any) => {
                return (
                  <>
                    <option value={allCoachNames[i]}>{allCoachNames[i]}</option>
                  </>
                );
              })}
              {/* <option value="0" selected>
                                Select 
                            </option>
                            <option value="ENG">ENG</option>
                            <option value="PC">PC</option> */}
              {/* <option value="AC">AC</option> */}
            </select>
          </div>
        );
      }
      //         }
    );
  };

  useEffect(() => {
    if (input.trainNo !== 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  });

  useEffect(() => {
    onlineTrainSvc.getTrainNumbers().then((data: any) => {
      if (data.status == 200) {
        setTrainNumberArray(data.data);
      } else if (data.status == 404) {
        Swal.fire({
          position: "center",
          icon: "warning",
          customClass: {
            container: "my-swal",
          },
          title: `${data.message}`,
          showConfirmButton: false,
          allowOutsideClick: false,
          timer: 1500,
        });
      }
    });
  }, []);

  const getAllCoachNames = () => {
    onlineTrainSvc.getAllCoachNames().then((data) => {
      if (data.status === 200) {
        setAllCoachNames(data.data);
      } else {
        setAllCoachNames("Please Select Coach Names");
      }
    });
  };
  useEffect(() => {
    getAllCoachNames();
  }, []);
  return (
    <>
      <Card className="trainDataCard train-data-main-card">
        <Grid container className="spacing">
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={6} md={6} lg={6} className="trainDataItem right-spacing">
                <Typography className="trainDataItemNamem">
                  Train No.
                </Typography>
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <select
                  name="trainNo"
                  className="dropDwn drpDwnClr trainDataDropDwnSubRight w-1 trainNoStyle"
                  required={true}
                  onChange={handleTrainNumber}
                  value={input.trainNo}
                >
                  <option value="0" selected>
                    Select
                  </option>
                  {trainNumberArray.map((trainNum: any) => (
                    <option value={trainNum}>{trainNum}</option>
                  ))}
                </select>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={6} md={6} lg={6} className="trainDataItem right-spacing">
                <Typography className="trainDataItemName">
                  Platform No.
                </Typography>
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <select
                  disabled
                  name="platformNo"
                  className="trainDataDropDwnSubRight onlineTrainDataDetails dropDwn drpDwnClr w-1"
                  required={true}
                  onChange={handleChange}
                  value={input.platformNo}
                >
                  <option value={0} selected>
                    Select
                  </option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className="spacing">
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={6} md={6} lg={6} xl={6} className="trainDataItem right-spacing">
                <Typography className="trainDataItemName">
                  Train Name (English)
                </Typography>
              </Grid>
              <Grid item xs={6} md={6} lg={6} xl={6} className="onlineTrainDataDetails">
                <TextField
                  disabled
                  size="small"
                  name="englishTrainName"
                  onChange={handleChange}
                  className="trainDataItemValue text-field-border text-field-height"
                  variant="outlined"
                  value={input.englishTrainName}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={6} md={6} lg={6} className="trainDataItem right-spacing">
                <Typography className="trainDataItemName">
                  Scheduled Arrival Time
                </Typography>
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <FormControl variant="outlined" size="small">
                  <TextField
                    disabled
                    className="onlineTrainDataDetails txtBox w-1 text-field-border text-field-height"
                    variant="outlined"
                    name="scheduleArrivalTime"
                    value={input.scheduleArrivalTime}
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className="spacing">
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={6} md={6} lg={6} className="trainDataItem right-spacing">
                <Typography className="trainDataItemName">
                  Train Name (Hindi)
                </Typography>
              </Grid>
              <Grid item xs={6} md={6} lg={6} className="onlineTrainDataDetails">
                <TextField
                  disabled
                  size="small"
                  name="hindiTrainName"
                  onChange={handleChange}
                  className="trainDataItemValue text-field-border text-field-height"
                  variant="outlined"
                  value={input.hindiTrainName}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={6} md={6} lg={6} className="trainDataItem right-spacing">
                <Typography className="trainDataItemName">
                  Scheduled Departure Time
                </Typography>
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <FormControl variant="outlined" size="small">
                  <TextField
                    className="onlineTrainDataDetails txtBox w-1 text-field-border text-field-height"
                    disabled
                    variant="outlined"
                    name="scheduleDepartureTime"
                    onChange={handleChange}
                    value={input.scheduleDepartureTime}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className="spacing">
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={6} md={6} lg={6} className="trainDataItem right-spacing">
                <Typography className="trainDataItemName">
                  Train Name (Regional)
                </Typography>
              </Grid>
              <Grid item xs={6} md={6} lg={6} className="onlineTrainDataDetails">
                <TextField
                  disabled
                  size="small"
                  name="regionalTrainName"
                  onChange={handleChange}
                  className="trainDataItemValue text-field-border text-field-height"
                  variant="outlined"
                  value={input.regionalTrainName}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={6} md={6} lg={6} className="trainDataItem right-spacing">
                <Typography className="trainDataItemName">
                  Maximum Coach
                </Typography>
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <select
                  disabled
                  name="maximumCoach"
                  className="trainDataDropDwnSubRight onlineTrainDataDetails dropDwn drpDwnClr w-1"
                  required={true}
                  onChange={handleChange}
                  value={input.maximumCoach}
                >
                  <option value={0} selected>
                    Select
                  </option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                  <option value={10}>10</option>
                  <option value={12}>12</option>
                  <option value={13}>13</option>
                  <option value={14}>14</option>
                  <option value={15}>15</option>
                  <option value={16}>16</option>
                  <option value={17}>17</option>
                  <option value={18}>18</option>
                  <option value={19}>19</option>
                  <option value={20}>20</option>
                  <option value={21}>21</option>
                  <option value={22}>22</option>
                  <option value={23}>23</option>
                  <option value={24}>24</option>
                  <option value={25}>25</option>
                  <option value={26}>26</option>
                  <option value={27}>27</option>
                  <option value={28}>28</option>
                </select>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className="spacing">
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={6} md={12} lg={8} xl={8} className="align-n">
                <Grid container className="spacing">
                  <Grid item xs={6} lg={9} xl={9} className="trainDataItem right-spacing align-n">
                    <Typography className="trainDataItemName">
                      Source Station
                    </Typography>
                  </Grid>
                  <Grid item xs={6} lg={3} xl={3} style={{ display: "flex", justifyContent: "flex-start" }} className="pl-2 align-n">
                    <select
                      disabled
                      name="sourceStation"
                      className="trainDataDropDwn onlineTrainDataDetails drpDwnClr"
                      required={true}
                      onChange={handleChange}
                      value={input.sourceStation}
                    >
                      <option value="0" selected>
                        Select
                      </option>
                      <option value="HWH">HWH</option>
                      <option value="DLI">DLI</option>
                      <option value="NDLS">NDLS</option>
                    </select>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6} md={12} lg={4} xl={4}>
                <Grid container>
                  <Grid item xs={6} lg={7} xl={7} className="trainDataItem right-spacing align-n">
                    <Typography className="trainDataItemName">
                      Destination Station
                    </Typography>
                  </Grid>
                  <Grid item xs={6} lg={5} xl={5} className="pl-2 align-n">
                    <select
                      disabled
                      name="destinationStation"
                      className="trainDataDropDwnRight onlineTrainDataDetails drpDwnClr"
                      required={true}
                      onChange={handleChange}
                      value={input.destinationStation}
                    >
                      <option value="0" selected>
                        Select
                      </option>
                      <option value="LKO">LKO</option>
                      <option value="LMP">LMP</option>
                      <option value="NDLS">NDLS</option>
                    </select>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={6} lg={6} className="trainDataItem right-spacing">
                <Typography className="trainDataItemName">
                  Train Type
                </Typography>
              </Grid>
              <Grid item xs={6} lg={6}>
                <select
                  disabled
                  name="trainType"
                  className="trainTypeDropDwnSubRight onlineTrainDataDetails dropDwn drpDwnClr"
                  required={true}
                  onChange={handleChange}
                  value={input.trainType}
                >
                  <option value="0" selected>
                    Select
                  </option>
                  <option value="Special/Express">Special Express</option>
                  <option value="Special">Special</option>
                  <option value="Express">Express</option>
                </select>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className="spacing">
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={6} md={12} lg={8} xl={8} className="ml-6">
                <Grid container className="spacing">
                  <Grid item xs={6} lg={9} xl={9} className="trainDataItem right-spacing">
                    <Typography className="trainDataItemName">
                      Train Arrival/Departure
                    </Typography>
                  </Grid>
                  <Grid item xs={6} lg={3} xl={3} className="pl-2">
                    <select
                      disabled
                      name="trainArrDepStatus"
                      className="trainDataDropDwn onlineTrainDataDetails drpDwnClr"
                      required={true}
                      onChange={handleChange}
                      value={input.trainArrDepStatus}
                    >
                      <option value="0" selected>
                        Select
                      </option>
                      <option value="A">Arrival</option>
                      <option value="D">Departure</option>
                    </select>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6} md={12} lg={4} xl={4}>
                <Grid container className="spacing">
                  <Grid item xs={6} lg={7} xl={7} className="trainDataItem right-spacing">
                    <Typography className="trainDataItemName">
                      Train Direction
                    </Typography>
                  </Grid>
                  <Grid item xs={6} lg={5} xl={5} style={{ display: "flex", justifyContent: "flex-end" }} className="pl-2">
                    <select
                      disabled
                      name="trainDirection"
                      className="trainDataDropDwnRight onlineTrainDataDetails drpDwnClr"
                      required={true}
                      onChange={handleChange}
                      value={input.trainDirection}
                    >
                      <option value="0" selected>
                        Select
                      </option>
                      <option value="UP">UP</option>
                      <option value="DOWN">DOWN</option>
                      {/* <option value="3">12409</option> */}
                    </select>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={6} lg={6} className="trainDataItem right-spacing">
                <Typography className="trainDataItemName">
                  Intermediate Station
                </Typography>
              </Grid>
              <Grid item xs={6} lg={6} className="intrStation">
                <FormControl>
                  <Select
                    disabled
                    className="intrStationDropDwnSubRight onlineTrainDataDetails dropDwn drpDwnClr text-field-height intermediateStationBorder"
                    multiple
                    value={input.viaStation}
                    onChange={handleSelect}
                    renderValue={(selected: any) => selected.join(", ")}
                    variant="outlined"
                    name="viaStation"
                  // MenuProps={MenuProps}
                  >
                    <MenuItem
                      value="all"
                    >
                      <ListItemIcon>
                        <Checkbox
                          // classes={{ indeterminate: classes.indeterminateColor }}
                          checked={isAllSelected}
                          indeterminate={
                            selected.length > 0 &&
                            selected.length < options.length
                          }
                        />
                      </ListItemIcon>
                      <ListItemText
                        // classes={{ primary: classes.selectAllText }}
                        primary="Select All"
                      />
                    </MenuItem>
                    {options.map((option) => (
                      <MenuItem key={option} value={option}>
                        <ListItemIcon>
                          <Checkbox
                            checked={selected.indexOf(option) > -1}
                          />
                        </ListItemIcon>
                        <ListItemText primary={option} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className="spacing">
          <Grid item xs={3} lg={4} xl={4} style={{ alignSelf: "center" }}>
            <Grid container className="trainDataItem" >
              <FormControlLabel
                onChange={handleChange}
                control={
                  <Checkbox
                    disabled
                    className="pr-10 onlineTrainDataDetails"
                    name="mergedTrains"
                    value={true}
                    size="small"
                    style={{ color: "#033733" }}
                    checked={input.mergedTrains}
                  />
                }
                label={<span>Merged Trains</span>}
              />
            </Grid>
          </Grid>
          <Grid item xs={3} lg={2} xl={2}>
            <Grid container style={{ display: "flex", justifyContent: "flex-end" }}>
              <Grid item xs={6} md={7} lg={6} xl={6} className="trainDataItem">
                <Typography className="trainDataCat">
                  Merged Train No
                </Typography>
              </Grid>
              <Grid item xs={6} md={5} lg={6} xl={6} className="trainDataItem">
                {input.mergedTrains === true ? (
                  <select
                    disabled
                    name="mergedTrainNo"
                    className="trainDataDropDwnRight2 onlineTrainDataDetails drpDwnClr"
                    required={true}
                    onChange={handleChange}
                    value={input.mergedTrainNo}
                  >
                    <option value="0" selected>
                      Select
                    </option>
                    <option value="12309">12309</option>
                    <option value="12308">12308</option>
                    <option value="12409">12409</option>
                  </select>
                ) : (
                  <select
                    disabled
                    name="mergedTrainNo"
                    className="trainDataDropDwnRight2 onlineTrainDataDetails"
                    required={true}
                    onChange={handleChange}
                    value={input.mergedTrainNo}
                  >
                    <option value="0" selected>
                      Select
                    </option>
                    <option value="12309">12309</option>
                    <option value="12308">12308</option>
                    <option value="12409">12409</option>
                  </select>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className="spacing">
          <Grid item xs={2} xl={3} className="daysNameItem2">
            <Typography className="daysNameHed">Running Days</Typography>
          </Grid>
          <Grid item xs={9} className="daysNameItem">
            <Grid container>
              {rundays()}
            </Grid>
          </Grid>
        </Grid>
      </Card>
      <Card className="trainDataCard train-data-main-card secondCard">
        <Grid container className="spacing">
          <Grid item xs={6} className="arrowup">
            <Typography className="northend">
              <img style={{ paddingRight: "9px" }} src={ArrowUp} />
              <TextField
                disabled
                size="small"
                name="frontSideEnd"
                placeholder="Front Side End"
                onChange={handleChange}
                value={input.frontSideEnd}
                className="frontBackEnd onlineTrainDataDetails text-field-border text-field-height"
                variant="outlined"
              />
            </Typography>
          </Grid>
          <Grid item xs={6} className="arrowdown">
            <Typography className="northend">
              <TextField
                disabled
                size="small"
                name="backSideEnd"
                placeholder="Back Side End"
                onChange={handleChange}
                value={input.backSideEnd}
                className="frontBackEnd onlineTrainDataDetails text-field-border text-field-height"
                variant="outlined"
              />
              <img style={{ paddingLeft: "9px" }} src={ArrowDown} />
            </Typography>
          </Grid>
        </Grid>
        <Grid container className="mt-21 ml-10">
          {input.maximumCoach === 0 ? (
            <Typography>
              Please select Maximum Coach Number
            </Typography>
          ) : (
            coacheView()
          )}
        </Grid>
      </Card>
      <Grid container style={{
        paddingTop: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "10px",
      }} className="spacing">
        <Grid item xs={6} lg={4} xl={4} className="buttonSave">
          <Button
            type="submit"
            className="trainDataEntrySaveBtn button-styling"
            variant="outlined"
            onClick={handleSubmit}
            disabled={!input.trainNo}
          >
            <AddOutlinedIcon
              className="SaveIcon"
              style={{ display: "inherit" }}
            />
            Add New Train Data
          </Button>
        </Grid>
        <Grid item xs={6} lg={4} xl={4} className="buttonCancel">
          <Button
            variant="outlined"
            className="trainDataEntryCancelBtn button-styling"
            onClick={handleCancel}
          >
            <CloseIcon className="clearIcon" />
            Cancel
          </Button>
        </Grid>
      </Grid>
    </>
  )

};
