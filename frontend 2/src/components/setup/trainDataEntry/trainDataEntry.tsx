import {
  Button,
  Card,
  Grid,
  FormControlLabel,
  FormControl,
  Checkbox,
  Select,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Typography,
  TextField,
} from "@material-ui/core";
import { useState, useEffect, useRef } from "react";
import CloseIcon from "@material-ui/icons/Close";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import ArrowDown from "../../../assets/images/ArrowDown.svg";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowUp from "../../../assets/images/Vector.svg";
import SetupService from "../../service/setup/setup";
import Swal from "sweetalert2";
import TrainDataModel from "../../../model/setup/trainDataModel";
// import  TrainDataEntryLoginModal  from "./trainDataEntryLoginModal";
import { Messages } from "../../../constants/messages";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import WarnModal from "../../common/modal/warnModal"
import { authuserStateSelector } from "../../../redux/reducers/authUser/authUser";
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Autocomplete } from "@material-ui/lab";
import { ModalType } from "../../../constants/enum";
import WarnUnsavedChanges from "../../common/modal/warnUnsaveModal";
import { WarnUnSave, WarnUnsaveStateSelector } from "../../../redux/reducers/warnUnsaveReducer/warnUnsave";
import ArrowBackIosSharpIcon from '@material-ui/icons/ArrowBackIosSharp';
import Keyboard from "react-simple-keyboard";
import hindi from "simple-keyboard-layouts/build/layouts/hindi";
import Malayalam from "simple-keyboard-layouts/build/layouts/malayalam";
import punjabi from "../../common/languages/punjabi";
import tamil from "../../common/languages/tamil";
import oriya from "../../common/languages/oriya";
import telugu from "../../common/languages/telugu";
import gujarati from "../../common/languages/gujarati";
import bengali from "simple-keyboard-layouts/build/layouts/bengali";
import urdu from "simple-keyboard-layouts/build/layouts/urdu";
export const TrainDataEntry = (props: any) => {
  const { regionalLanguage, input, setInput, setIsEditable,
    trainDataUpdate, setTrainDataUpdate, trainCheck, setTrainCheck,
    frontSideEnd, backSideEnd, scheduleArrivalTime, scheduleDepartureTime, setScheduleArrivalTime, setScheduleDepartureTime
  } = props;
  const [allCoachNames, setAllCoachNames] = useState<any>([]);
  const [platformNumbers, setPlatformNumbers] = useState<[]>([]);
  const [trainError, setTrainError] = useState("");
  const [saveInit, setSaveInit] = useState(false)
  const [trainNo, setTrainNo] = useState<[]>([]);
  const [isWarnModalVisible, setIsWarnModalVisible] = useState(false)
  const [coachValueError, setCoachValueError] = useState("");
  const [detectFormChange, setDetectFormChange] = useState(true)
  const { isDirty } = useSelector(WarnUnsaveStateSelector)
  const [trainNoError, setTrainNoError] = React.useState<{ trainNo: string }>();
  const [allCoachValuesError, setAllCoachValuesError] =
    useState<boolean>(false);
  const setup = new SetupService();
  const { appUser } = useSelector(authuserStateSelector);
  const [stationCodesArray, setStationCodesArray] = useState<[]>([]);
  const [deleteCheck, setDeleteCheck] = useState<any>(false);
  const [timeError, setTimeError] = useState("");
  console.log(frontSideEnd, 63)
  const dispatch = useDispatch()
  const handleScheduleArrivaltime = (e: any) => {
    setScheduleArrivalTime("")
    setInput({ ...input, scheduleArrivalTime: e });
    console.log(e, "gggggggg")
  };



  const handleScheduleDepartureTime = (e: any) => {
    setScheduleDepartureTime("")
    setInput({ ...input, scheduleDepartureTime: e });
    console.log(e, ":timeeeee");
    if (input.scheduleArrivalTime > input.scheduleDepartureTime) {
      console.log("errrrror");
    }
    else {
      console.log("corrrrrrect");
    }
  };

  const [layout, setLayout] = useState("default");
  const [keyboardVisibility, setKeyboardVisibility] = useState(false);
  const [changeButtonText, setChangeButtonText] = useState(false);
  const [regionalKeyboardVisibility, setRegionalKeyboardVisibility] = useState(false);
  const [keyboardRegionalLanguage, setKeyboardRegionalLanguage] = useState<any>(null);
  const keyboardRef: any = useRef(null);


  const [isLoginModal, setIsLoginModal] = useState(true);
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

  const [disabled, setDisabled] = useState(true);


  useEffect(() => {
    if (Object.keys(input)?.length > 0) {
      dispatch(WarnUnSave(true))
    } else {
      dispatch(WarnUnSave(true))
    }
  }, [input])

  useEffect(() => {
    if (regionalLanguage == "Bengali") {
      setKeyboardRegionalLanguage(bengali)
    }
    else if (regionalLanguage == "Urdu") {
      setKeyboardRegionalLanguage(urdu)
    }
    else if (regionalLanguage == "Punjabi") {
      setKeyboardRegionalLanguage(punjabi)
    }
    else if (regionalLanguage == "Tamil") {
      setKeyboardRegionalLanguage(tamil)
    }
    else if (regionalLanguage == "Oriya") {
      setKeyboardRegionalLanguage(oriya)
    }
    else if (regionalLanguage == "Gujarati") {
      setKeyboardRegionalLanguage(gujarati)
    }
    else if (regionalLanguage == "Telugu") {
      setKeyboardRegionalLanguage(telugu)
    }
    else if (regionalLanguage == "Malayalam") {
      setKeyboardRegionalLanguage(Malayalam)
    }

  })

  useEffect(() => {
    function clickHandler(e: any) {
      if (
        !(e.target.nodeName === "INPUT") &&
        !e.target.classList.contains("hg-button") &&
        !e.target.classList.contains("hg-row") && !e.target.classList.contains("hg-rows")
      ) {
        setKeyboardVisibility(false);
        setRegionalKeyboardVisibility(false);
      }
    }

    window.addEventListener("click", clickHandler);
    return window.removeEventListener("click", clickHandler, true);
  }, []);

  const onKeyPress = (button: string) => {
    if (button === "{shift}" || button === "{lock}") {
      setLayout(layout == "default" ? "shift" : "default");
    }

  };


  const handleCancel = () => {
    setInput({
      trainNo: "",
      englishTrainName: "",
      hindiTrainName: "",
      regionalTrainName: "",
      scheduleArrivalTime: new Date(),
      scheduleDepartureTime: new Date(),
      maximumCoach: 0,
      runningDays: [],
      platformNo: 0,
      mergedTrains: false,
      mergedTrainNo: 0,
      frontSideEnd: props.frontSideEnd,
      backSideEnd: props.backSideEnd,
      coaches: [],
      sourceStation: "",
      destinationStation: "",
      trainDirection: "",
      viaStation: [],
      trainType: "",
      trainArrDepStatus: "",
    });
    setTrainError("");
    setTrainDataUpdate(false);
    setDeleteCheck(false);
    setChangeButtonText(false);
  };
  useEffect(() => {
    if(trainDataUpdate){
      setChangeButtonText(true);
    }
  }, [trainDataUpdate]);

  useEffect(() => {
    setup.getAllStationCodes().then((data) => {
      if (data?.data?.length != 0) {
        setStationCodesArray(data?.data);
      } else {
        setStationCodesArray([]);
      }
    });
  }, []);

  const handleCancelPass = () => {
    setIsWarnModalVisible(false)
  }

  const handleChange = (e: any) => {
    var { name, value } = e?.target;
    if (name === "runningDays") {
      const days = input?.runningDays;
      var { checked } = e.target;

      if (checked && value === "mon,tue,wed,thur,fri,sat,sun") {
        for (let i = 0; i < everyday?.length; i++) {
          days?.push(everyday[i]);
        }
      } else if (checked && value !== "mon,tue,wed,thur,fri,sat,sun") {
        days?.push(value);
      } else {
        days.splice(days.indexOf(value), 1);
      }
      setInput({ ...input, [name]: days });
    } else if (name === "maximumCoach") {
      const coach = parseInt(value);
      setInput({ ...input, [name]: coach });
    }
    else if (name === "trainNo") {
      if (value.match(/^[\d]{0,7}$/i)) {
        setInput({ ...input, [name]: value });
      }
    }
    else if (name === "englishTrainName" || name === "hindiTrainName" || name === "regionalTrainName") {
      if (value.match(/^[a-zA-Z ]{0,20}$/i)) {
        setInput({ ...input, [name]: value });
      }
      else{ 
        setInput({ ...input, [name]: value });
      }
    }
    else {
      setInput({ ...input, [name]: value });
    }

  };

  useEffect(()=>{
    return(()=>{
      setTrainDataUpdate(false);
      setChangeButtonText(false);
    })
  },[])

  useEffect(() => {
    if (trainDataUpdate == false) {
      console.log("inside use effect >>>>", trainDataUpdate)
      input.coaches = new Array(input?.maximumCoach);
      for (var i = 0; i < input?.maximumCoach; i++) {
        input.coaches[i] = "";
      }
    }
  }, [input?.maximumCoach]);

  const handleCoachChange = (e: any, index: any) => {
    const { name, value } = e.target;
    var coacheData = input.coaches;
    if (value !== "0") {
      coacheData[index] = value;
    } else {
      coacheData.splice(coacheData.indexOf(value));
    }
    for (var i = 0; i < coacheData?.length; i++) {
      if (coacheData[i] === "") {
        setAllCoachValuesError(true);
        break;
      } else {
        setAllCoachValuesError(false);
      }
    }
    setInput({ ...input, [name]: coacheData });
  };
  console.log(input, 232)



  const isAllSelected = stationCodesArray?.length > 0 && input.viaStation?.length === stationCodesArray?.length;

  const handleSelect = (event: any) => {
    const value = event.target?.value;
    if (value[value?.length - 1] === "all") {
      setInput({ ...input, ["viaStation"]: input.viaStation?.length === stationCodesArray?.length ? [] : stationCodesArray });
    }
    else {
      setInput({ ...input, ["viaStation"]: value });
    }
  };

  // schArrTime =`${input.scheduleArrivalTime?.getHours()}:${input?.scheduleArrivalTime?.getMinutes()<10?'0':'' + input?.scheduleArrivalTime?.getMinutes()}`;

  const handleSubmit = () => {

    let schArrTime;
    let schDepTime;
    if (scheduleArrivalTime == "") {
      schArrTime = `${input.scheduleArrivalTime?.getHours()}:${('0' + input?.scheduleArrivalTime?.getMinutes()).slice(-2)}`;
    } else {
      schArrTime = scheduleArrivalTime;
    }
    if (scheduleDepartureTime == "") {
      schDepTime = `${input.scheduleDepartureTime?.getHours()}:${('0' + input?.scheduleDepartureTime?.getMinutes()).slice(-2)}`;
    } else {
      schDepTime = scheduleDepartureTime;
    }
    console.log(schArrTime, schDepTime, "waaqttt");



    const trainData: any = {
      trainNo: input.trainNo,
      englishTrainName: input.englishTrainName,
      hindiTrainName: input.hindiTrainName,
      regionalTrainName: input.regionalTrainName,
      scheduleArrivalTime: schArrTime,
      scheduleDepartureTime: schDepTime,
      maximumCoach: input.maximumCoach,
      runningDays: [input.runningDays],
      platformNo: input.platformNo,
      mergedTrains: input.mergedTrains,
      mergedTrainNo: input.mergedTrainNo,
      frontSideEnd: props.frontSideEnd,
      backSideEnd: props.backSideEnd,
      coaches: input.coaches,
      sourceStation: input.sourceStation,
      destinationStation: input.destinationStation,
      trainDirection: input.trainDirection,
      viaStation: input.viaStation,
      trainType: input.trainType,
      trainArrDepStatus: input.trainArrDepStatus,
    };

    if (!trainDataUpdate) {
      setup.createTrainData(trainData).then((response) => {
        if (response && response?.status == 200) {
setChangeButtonText(false);
          setTrainDataUpdate(false);
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Train Data added successfully`,
            showConfirmButton: false,
            allowOutsideClick: false,
            timer: 3000,
          }).then(() => {
            setInput({
              trainNo: "",
              englishTrainName: "",
              hindiTrainName: "",
              regionalTrainName: "",
              scheduleArrivalTime: 0,
              scheduleDepartureTime: 0,
              maximumCoach: 0,
              runningDays: [],
              platformNo: 0,
              mergedTrains: false,
              mergedTrainNo: 0,
              frontSideEnd: props.frontSideEnd,
              backSideEnd: props.backSideEnd,
              coaches: [],
              sourceStation: "",
              destinationStation: "",
              trainDirection: "",
              viaStation: [],
              trainType: "",
              trainArrDepStatus: "",
            });
            setTrainError("");
            setCoachValueError("");
            setDeleteCheck(false)
            setChangeButtonText(false);
          });
        } else if (response && response?.errorMsg !== "") {
          setTrainError(response?.errorMsg);
        }
      });
    } else if (trainDataUpdate) {
      setup.upgradeTrainData(trainData).then((response) => {
        if (response && response?.status == 200) {
          setTrainDataUpdate(true);
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Train Data updated successfully`,
            showConfirmButton: false,
            allowOutsideClick: false,
            timer: 3000,
          }).then(() => {
            setInput({
              trainNo: "",
              englishTrainName: "",
              hindiTrainName: "",
              regionalTrainName: "",
              scheduleArrivalTime: 0,
              scheduleDepartureTime: 0,
              maximumCoach: 0,
              runningDays: [],
              platformNo: 0,
              mergedTrains: false,
              mergedTrainNo: 0,
              frontSideEnd: props.frontSideEnd,
              backSideEnd: props.backSideEnd,
              coaches: [],
              sourceStation: "",
              destinationStation: "",
              trainDirection: "",
              viaStation: [],
              trainType: "",
              trainArrDepStatus: "",
            });
            setTrainError("");
            setCoachValueError("");
            setTrainDataUpdate(false);
            setDeleteCheck(false)
            setChangeButtonText(false);
          });
        } else if (response && response?.errorMsg !== "") {
          setTrainError(response?.errorMsg);
        }
      });
    }
  };


  const rundays = () => {
    return (
      days?.map((el: any, i: any) => {
        return (
          <Grid item className="onlineTrainDataDetails daysName">
            <FormControlLabel
              onChange={handleChange}
              value={everyday[i]}
              control={
                <Checkbox
                  className="pr-10 onlineChckBoxs"
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
      })
    );
  };


  const handleDelete = (trainNo: any) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result?.isConfirmed) {
        setup.deleteTrainDataByTrainNo(trainNo).then((datas) => {
          if (datas && datas?.status === 200) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Train Data deleted successfully',
              showConfirmButton: false,
              allowOutsideClick: false,
              timer: 1500,
            }).then(() => {
              setDeleteCheck(false);
              getTrainNumbers();
              setInput({
                id: 0,
                trainNo: "",
                englishTrainName: "",
                hindiTrainName: "",
                regionalTrainName: "",
                scheduleArrivalTime: new Date(),
                scheduleDepartureTime: new Date(),
                maximumCoach: 0,
                runningDays: [],
                platformNo: 0,
                mergedTrains: false,
                mergedTrainNo: 0,
                frontSideEnd: props.frontSideEnd,
                backSideEnd: props.backSideEnd,
                coaches: [],
                sourceStation: "",
                destinationStation: "",
                trainDirection: "",
                viaStation: [],
                trainType: "",
                trainArrDepStatus: "",
              })
            })
          }
        })
      }
    })
  }

  const coacheView = () => {
    var coachlist = new Array(input.maximumCoach);
    // if(!input?.coaches?.length){
    for (var i = 0; i < input.maximumCoach; i++) {
      coachlist[i] = i;
    }
    // }
    console.log(coachlist, 471)
    return coachlist?.map((el: any, i: any) => {
      return (<>
        <div className="coachDetailBox">
          <div className="coachNameNo">
            <Typography className="coachNameNo">C{i + 1}</Typography>
          </div>
          <select
            name="coaches"
            value={input.coaches[i]}
            className="coachDetail"
            required={true}
            onChange={(e) => handleCoachChange(e, i)}

          >
            <option value="">Select</option>
            {allCoachNames?.map((coachNames: any, i: any) => {
              return (
                <>
                  <option value={coachNames} disabled={["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].some(species => coachNames.includes(species)) ? input?.coaches?.some((selectValue: any) => selectValue == coachNames) : false}>{coachNames}</option>
                </>
              );
            })}
          </select>
        </div>
        {/* <div className="coachDetailBox">
          {console.log(">>>>>>>> Render select", input.coaches, allCoachNames)}
          <div className="coachNameNo">C{i + 1}</div>
          <select
            name="coaches"
            value={input.coaches[i]}
            className="coachDetail"
            required={true}
            onChange={(e) => handleCoachChange(e, i)}

          >
            <option value="">Select</option>
            {allCoachNames?.map((coachNames: any, i: any) => {
              return (
                <>
                  <option value={coachNames} disabled={input?.coaches?.some((selectValue: any) => selectValue == coachNames)}>{coachNames}</option>
                </>
              );
            })}
          </select>
          {console.log(input.coaches[i], "494")}

        </div> */}
      </>);
    });
  };

  useEffect(() => {
    if (input.trainNo !== 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  });

  const handleChecked = (e: any) => {
    let { name, checked } = e.target;
    setInput({ ...input, [name]: checked });
  };
  const inputMax = { maxLength: 5 };

  const getAllCoachNames = () => {
    setup.getAllCoachNames().then((data) => {
      if (data?.status === 200) {
        setAllCoachNames(data?.data);
      }
    });
  };

  useEffect(() => {
    getAllCoachNames();
  }, []);

  const getPlatformNumbers = () => {
    setup.getPlatformNumbers().then((data) => {
      if (data?.status === 200) {
        setPlatformNumbers(data?.data);
      }
    });
  };

  useEffect(() => {
    getPlatformNumbers();
  }, []);

  const handleCoachValueError = () => {
    setCoachValueError(`${Messages?.ALL_COACH_VALUES_ERROR}`);
  };

  const warnModal = () => {
    setIsWarnModalVisible(true)
  }

  const getTrainNumbers = () => {
    let trainNumbers: any = [];
    setup.getTrainNumbers().then((response) => {
      if (response?.status === 200) {
        setTrainNo(response?.data);
      } else {
        setTrainNo([]);
      }
    });
  };

  console.log(input, 558)
  useEffect(() => {
    getTrainNumbers();
  }, []);

  const buttonText = "Add Train Data";
  const updateText = "Update Train Data";

  const handleAutocomplete = (value: any) => {
    setInput({ ...input, ["trainNo"]: value });
    setup.getTrainDataByTrainNo(value).then((data: any) => {
      if (data && data?.status == 200) {
        if (setTrainDataUpdate) {
          setTrainDataUpdate(true)
        }
        setChangeButtonText(true);
        setDeleteCheck(true);
        setScheduleArrivalTime(data?.data?.scheduleArrivalTime);
        setScheduleDepartureTime(data?.data?.scheduleDepartureTime)
        setInput({
          ...input,
          trainNo: data?.data?.trainNo,
          englishTrainName: data?.data?.englishTrainName,
          hindiTrainName: data?.data?.hindiTrainName,
          regionalTrainName: data?.data?.regionalTrainName,
          scheduleArrivalTime: `Tue Jul 19 2022 ${data?.data?.scheduleArrivalTime}:12 GMT+0530 (India Standard Time)`,
          scheduleDepartureTime: `Tue Jul 19 2022 ${data?.data?.scheduleDepartureTime}:12 GMT+0530 (India Standard Time)`,
          maximumCoach: data?.data?.maximumCoach,
          runningDays: data?.data?.runningDays,
          platformNo: data?.data?.platformNo,
          mergedTrains: data?.data?.mergedTrains,
          mergedTrainNo: data?.data?.mergedTrainNo,
          frontSideEnd: data?.data?.frontSideEnd,
          backSideEnd: data?.data?.backSideEnd,
          coaches: data?.data?.coaches,
          sourceStation: data?.data?.sourceStation,
          destinationStation: data?.data?.destinationStation,
          trainDirection: data?.data?.trainDirection,
          viaStation: data?.data?.viaStation,
          trainType: data?.data?.trainType,
          trainArrDepStatus: data?.data?.trainArrDepStatus,
        });
      }
    });
  };
  const openTable = () => {
    setIsEditable(true)
  }


  return (
    <>
      <Grid container>
        <Grid item xs={12} className="trainDataMainCard">
          {/* {appUser.userRole == "ROLE_STATION MASTER" ? (
            <Grid
              style={{
                color: "red",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                fontSize: "22px",
                paddingBottom: "10px",
              }}
            >
              *view only
            </Grid>
          ) : (
            <></>
          )} */}
          <Button
            type="submit"
            className="setUpTrainBack spacing"
            variant="outlined"
            onClick={openTable}
          ><ArrowBackIosSharpIcon className="setupBackicon" />Back to table</Button>
          <Card className="trainDataCard train-data-main-card1">
            {/* <Grid container>
              <Grid item xs={7} className="padStyle trainDataItem">
                <Grid container>
                  <Grid item xs={4} className="trainDataItem">
                    <Typography className="trainDataItemName">
                      Train No.<sup className="asterisk">*</sup>
                    </Typography>
                  </Grid>
                  <Grid item xs={8} style={{ width: "8%" }}>
                    <Autocomplete
                      className="trainNo_dataEntry"
                      freeSolo
                      key={trainDataUpdate}
                      onChange={(event, value) => handleAutocomplete(value)}
                      disableClearable
                      options={trainNo?.map((option: any) => option.toString())}
                      inputValue={String(input.trainNo)}
                      renderInput={(params: any) => (
                        <TextField

                          value={String(input.trainNo)}
                          {...params}
                          onChange={handleChange}
                          name="trainNo"
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={4} className="trainDataItem">
                    <Typography className="trainDataItemName">
                      Train Name (English)<sup className="asterisk">*</sup>
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      size="small"
                      name="englishTrainName"
                      onChange={handleChange}
                      className="trainDataItemValue"
                      variant="outlined"
                      value={input.englishTrainName}
                    />
                  </Grid>
                  <Grid item xs={4} className="trainDataItem">
                    <Typography className="trainDataItemName">
                      Train Name (Hindi)
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      size="small"
                      name="hindiTrainName"
                      onChange={handleChange}
                      className="trainDataItemValue"
                      variant="outlined"
                      value={input.hindiTrainName}
                      onFocus={() => {
                        setKeyboardVisibility(true);
                        setRegionalKeyboardVisibility(false);
                      }}
                    />
                  </Grid>
                  <Grid item xs={4} className="trainDataItem">
                    <Typography className="trainDataItemName">
                      Train Name ({regionalLanguage})
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      size="small"
                      name="regionalTrainName"
                      onChange={handleChange}
                      className="trainDataItemValue"
                      variant="outlined"
                      value={input.regionalTrainName}
                      onFocus={() => {
                        setKeyboardVisibility(false);
                        setRegionalKeyboardVisibility(true);
                      }}
                    />
                  </Grid>
                  <Grid item xs={4} className="trainDataItem">
                    <Typography className="trainDataItemName">
                      Source Station<sup className="asterisk">*</sup>
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Grid container>
                      <Grid item xs={3}>
                        <select
                          name="sourceStation"
                          className="trainDataDropDwn"
                          required={true}
                          onChange={handleChange}
                          value={input.sourceStation}
                        >
                          <option value="" selected>
                            Select
                          </option>
                          {stationCodesArray?.map((el: any, i: any) => (
                            <option value={el}>{el}</option>
                          ))}
                        </select>
                      </Grid>
                      <Grid item xs={7} className="trainDataItem">
                        <Typography className="trainDataCat">
                          Destination Station<sup className="asterisk">*</sup>
                        </Typography>
                        <select
                          name="destinationStation"
                          className="trainDataDropDwnRight"
                          required={true}
                          onChange={handleChange}
                          value={input.destinationStation}
                        >
                          <option value="" selected>
                            Select
                          </option>
                          {stationCodesArray?.map((el: any, i: any) => (
                            <option value={el}>{el}</option>
                          ))}
                        </select>
                      </Grid>
                      <Grid item xs={2}></Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={4} className="trainDataItem">
                    <Typography className="trainDataItemName">
                      Train Arrival/Departure<sup className="asterisk">*</sup>
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Grid container>
                      <Grid item xs={3}>
                        <select
                          name="trainArrDepStatus"
                          className="trainDataDropDwn"
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
                      <Grid item xs={7} className="trainDataItem">
                        <Typography className="trainDataCat">
                          Train Direction<sup className="asterisk">*</sup>
                        </Typography>
                        <select
                          name="trainDirection"
                          className="trainDataDropDwnRight"
                          required={true}
                          onChange={handleChange}
                          value={input.trainDirection}
                        >
                          <option value="0" selected>
                            Select
                          </option>
                          <option value="UP">UP</option>
                          <option value="DOWN">DOWN</option>
                        </select>
                      </Grid>
                      <Grid item xs={2}></Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={4} className="trainDataItem">
                    <Typography className="trainDataItemName"></Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Grid container>
                      <Grid item xs={3} className="trainDataItem">
                        <FormControlLabel
                          control={
                            <Checkbox
                              className="pr-10 onlineChckBoxs"
                              name="mergedTrains"
                              checked={input.mergedTrains}
                              size="small"
                              style={{ color: "#033733" }}
                              onClick={handleChecked}
                              defaultChecked={input.mergedTrains}
                            />
                          }
                          label={<span>Merged Trains</span>}
                        />
                      </Grid>
                      <Grid item xs={7} className="trainDataItem">
                        <Typography className="trainDataCat">
                          Merged Train No
                        </Typography>
                        {input.mergedTrains === true ? (
                          <select
                            name="mergedTrainNo"
                            className="trainDataDropDwnRight"
                            required={true}
                            onChange={handleChange}
                            value={input.mergedTrainNo}
                          >
                            <option value="" selected>
                              Select
                            </option>
                            {trainNo?.map((train: any, i: any) => {
                              return (
                                <option value={train}>{train}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select
                            disabled
                            name="mergedTrainNo"
                            className="trainDataDropDwnRight"
                            required={true}
                            onChange={handleChange}
                            value={input.mergedTrainNo}
                          >
                            <option value="" selected>
                              Select
                            </option>
                            {trainNo?.map((train: any, i: any) => {
                              return (
                                <option value={train}>{train}</option>
                              );
                            })}
                          </select>
                        )}
                      </Grid>
                      <Grid item xs={2}></Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={5}>
                <Grid container>
                  <Grid item xs={5} className="trainDataItem">
                    <Typography className="trainDataItemName">
                      Platform No.
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <select
                      name="platformNo"
                      className="trainDataDropDwnSubRight"
                      required={true}
                      onChange={handleChange}
                      value={input.platformNo}
                    >
                      <option value="" selected>
                        Select
                      </option>
                      {platformNumbers?.map((platformNo: any, i: any) => {
                        return (
                          <option value={platformNo}>
                            {platformNo}
                          </option>
                        );
                      })}
                    </select>
                  </Grid>
                  <Grid item xs={5} className="trainDataItem">
                    <Typography className="trainDataItemName">
                      Scheduled Arrival Time
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl variant="outlined" size="small" className="trainDataSche">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardTimePicker
                          ampm={false}
                          inputVariant="outlined"
                          name="scheduleArrivalTime"
                          value={input.scheduleArrivalTime}
                          onChange={handleScheduleArrivaltime}
                        />

                      </MuiPickersUtilsProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={5} className="trainDataItem">
                    <Typography className="trainDataItemName">
                      Scheduled Departure Time
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl variant="outlined" size="small" className="trainDataSche">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardTimePicker
                          ampm={false}
                          inputVariant="outlined"
                          name="scheduleDepartureTime"
                          onChange={handleScheduleDepartureTime}
                          value={input.scheduleDepartureTime}
                        />
                      </MuiPickersUtilsProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={5} className="trainDataItem">
                    <Typography className="trainDataItemName">
                      Maximum Coach
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <select
                      name="maximumCoach"
                      className="trainDataDropDwnSubRight"
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
                      <option value={29}>29</option>
                      <option value={30}>30</option>
                      <option value={31}>31</option>
                      <option value={32}>32</option>
                    </select>
                  </Grid>
                  <Grid item xs={5} className="trainDataItem">
                    <Typography className="trainDataItemName">
                      Train type<sup className="asterisk">*</sup>
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <select
                      name="trainType"
                      className="trainTypeDropDwnSubRight"
                      required={true}
                      onChange={handleChange}
                      value={input.trainType}
                    >
                      <option value="0" selected>
                        Select
                      </option>
                      <option value="ACExpress">AC Express</option>
                      <option value="AntyodayaExpress">Antyodaya Express</option>
                      <option value="DoubleDeckerExpress">Double Decker Express</option>
                      <option value="DurontoExpress">Duronto Express</option>
                      <option value="Express">Express</option>
                      <option value="GaribRathExpress">Garib Rath Express</option>
                      <option value="GatimanExpress">Gatiman Express</option>
                      <option value="HumsafarExpress">Humsafar Express</option>
                      <option value="IntercityExpress">Intercity Express</option>
                      <option value="JanSadharanExpress">Jan Sadharan Express</option>
                      <option value="JanShatabdiExpress">Jan Shatabdi Express</option>
                      <option value="KaviGuruExpress">Kavi Guru Express</option>
                      <option value="LuxuryTrains">Luxury Trains</option>
                      <option value="MahamanaExpress">Mahamana Express</option>
                      <option value="Mail">Mail</option>
                      <option value="MountainRailways">Mountain Railways</option>
                      <option value="Passenger">Passenger</option>
                      <option value="RajdhaniExpress">Rajdhani Express</option>
                      <option value="RajyaRaniExpress">Rajya Rani Express</option>
                      <option value="SamparkKrantiExpress">Sampark Kranti Express</option>
                      <option value="ShatabdiExpress">Shatabdi Express</option>
                      <option value="Suburban">Suburban</option>
                      <option value="SuperfastExpress">Superfast Express</option>
                      <option value="SuvidhaExpress">Suvidha Express</option>
                      <option value="TejasExpress">Tejas Express</option>
                      <option value="UDAYExpress">UDAY Express</option>
                      <option value="VandeBharatExpress">Vande Bharat Express</option>
                      <option value="VivekExpress">VivekExpress</option>
                      <option value="YuvaExpress">Yuva Express</option>
                      <option value="Others">Others</option>
                    </select>
                  </Grid>
                  <Grid item xs={5} className="trainDataItem">
                    <Typography className="trainDataItemName">
                      Intermediate Station
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <div className="intrStation">
                      <FormControl>
                        <Select
                        disabled={stationCodesArray?.length ? false : true}
                          className="intrStationDropDwnSubRight"
                          multiple
                          value={input.viaStation}
                          onChange={handleSelect}
                          renderValue={(selected: any) => selected.join(", ")}
                          variant="outlined"
                          name="viaStation"
                        >
                          <MenuItem
                            value="all"
                          >
                            <ListItemIcon>
                              <Checkbox
                                className="intrCheck"
                                checked={isAllSelected}
                                indeterminate={
                                  input.viaStation?.length > 0 && input.viaStation?.length < stationCodesArray?.length
                                }
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary="Select All"
                            />
                          </MenuItem>
                          {stationCodesArray?.map((option) => (
                            <MenuItem key={option} value={option}>
                              <ListItemIcon>
                                <Checkbox className="intrCheck" checked={input.viaStation.indexOf(option) > -1} />
                              </ListItemIcon>
                              <ListItemText primary={option} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <div style={{color:"red"}} >{stationCodesArray?.length ? "" : "No Intermediate station available"}</div>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} >
                <Grid container >
                  <Grid item xs={1}>
                  </Grid>
                  <Grid item xs={11} className="daysNameItem"  style={{marginLeft:"10%"}}>
                    <div className="daysNameHed">
                      Running Days
                    </div>
                    {rundays()}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
           */}
            <Grid container className="spacing">
              <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={6} md={6} lg={6} className="right-spacing trainDataItem">
                    <Typography className="trainDataItemName trainLabel">
                      Train No.<span className="asterisk">*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6} lg={6}>
                    <Autocomplete
                      style={{ height: "40px" }}
                      className="trainNo_dataEntry dropDwn wd-27 autoComplete train-data-autocomplete"
                      freeSolo
                      key={trainDataUpdate}
                      onChange={(event, value) => handleAutocomplete(value)}
                      disableClearable
                      options={trainNo?.map((option: any) => option.toString())}
                      inputValue={String(input.trainNo)}
                      renderInput={(params: any) => (
                        <TextField

                          value={String(input.trainNo)}
                          {...params}
                          onChange={handleChange}
                          name="trainNo"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={6} md={6} lg={6} className="right-spacing trainDataItem">
                    <Typography className="trainDataItemName  trainLabel">
                      Platform No.
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6} lg={6}>
                    <select
                      name="platformNo"
                      className="trainDataDropDwnSubRight dropDwn w-27"
                      required={true}
                      onChange={handleChange}
                      value={input.platformNo}
                    >
                      <option value="" selected>
                        Select
                      </option>
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
              </Grid>
            </Grid>
            <Grid container className="spacing">
              <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={6} md={6} lg={6} className="right-spacing trainDataItem">
                    <Typography className="trainDataItemName  trainLabel">
                      Train Name (English)<span className="asterisk">*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6} lg={6}>
                    <TextField
                      size="small"
                      name="englishTrainName"
                      onChange={handleChange}
                      className="trainDataItemValue text-field-border train-data-entry-textbox"
                      variant="outlined"
                      value={input.englishTrainName}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={6} md={6} lg={6} className="right-spacing trainDataItem">
                    <Typography className="trainDataItemName  trainLabel">
                      Scheduled Arrival Time
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6} lg={6}>
                    <FormControl variant="outlined" size="small" className="trainDataSche wd-27">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardTimePicker
                          ampm={false}
                          inputVariant="outlined"
                          name="scheduleArrivalTime"
                          value={input.scheduleArrivalTime}
                          onChange={handleScheduleArrivaltime}
                        />
                      </MuiPickersUtilsProvider>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container className="spacing">
              <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={6} md={6} lg={6} className="right-spacing trainDataItem">
                    <Typography className="trainDataItemName  trainLabel">
                      Train Name (Hindi)
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6} lg={6}>
                    <TextField
                      size="small"
                      name="hindiTrainName"
                      onChange={handleChange}
                      className="trainDataItemValue text-field-border train-data-entry-textbox"
                      variant="outlined"
                      value={input.hindiTrainName}
                      onFocus={() => {
                        setKeyboardVisibility(true);
                        setRegionalKeyboardVisibility(false);
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={6} md={6} lg={6} className="right-spacing trainDataItem">
                    <Typography className="trainDataItemName  trainLabel">
                      Scheduled Departure Time
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6} lg={6}>
                    <FormControl variant="outlined" size="small" className="trainDataSche wd-27">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardTimePicker
                          ampm={false}
                          inputVariant="outlined"
                          name="scheduleDepartureTime"
                          onChange={handleScheduleDepartureTime}
                          value={input.scheduleDepartureTime}
                        />
                      </MuiPickersUtilsProvider>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container className="spacing">
              <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={6} md={6} lg={6} className="right-spacing trainDataItem">
                    <Typography className="trainDataItemName  trainLabel">
                      Train Name ({regionalLanguage})
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6} lg={6}>
                    <TextField
                      size="small"
                      name="regionalTrainName"
                      onChange={handleChange}
                      className="trainDataItemValue text-field-border train-data-entry-textbox"
                      variant="outlined"
                      value={input.regionalTrainName}
                      onFocus={() => {
                        setKeyboardVisibility(false);
                        setRegionalKeyboardVisibility(true);
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={6} md={6} lg={6} className="right-spacing trainDataItem">
                    <Typography className="trainDataItemName  trainLabel">
                      Maximum Coach
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6} lg={6}>
                    <select
                      name="maximumCoach"
                      className="trainDataDropDwnSubRight dropDwn w-27"
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
                      <option value={29}>29</option>
                      <option value={30}>30</option>
                      <option value={31}>31</option>
                      <option value={32}>32</option>
                    </select>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container className="spacing">
              <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={6} md={12} lg={8} xl={8} className="dataMargin align-n">
                    <Grid container>
                      <Grid item xs={6} lg={9} xl={9} className="align-n right-spacing trainDataItem">
                        <Typography className="trainDataItemName  trainLabel">
                          Source Station<sup className="asterisk">*</sup>
                        </Typography>
                      </Grid>
                      <Grid item xs={6} lg={3} xl={3} style={{ display: "flex", justifyContent: "flex-start" }} className="align-n">
                        <select
                          name="sourceStation"
                          className="trainDataDropDwn dropDwn1"
                          required={true}
                          onChange={handleChange}
                          value={input.sourceStation}
                        >
                          <option value="" selected>
                            Select
                          </option>
                          {stationCodesArray?.map((el: any, i: any) => (
                            <option value={el}>{el}</option>
                          ))}
                        </select>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6} md={12} lg={4} xl={4}>
                    <Grid container>
                      <Grid item xs={6} lg={7} xl={7} className="align-n right-spacing trainDataItem">
                        <Typography className="trainDataCat trainLabel trainDataItemName">
                          Destination Station
                          {/* <span className="asterisk">*</span> */}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} lg={5} xl={5} className="align-n">
                        <select
                          name="destinationStation"
                          className="trainDataDropDwnRight dropDwn2"
                          required={true}
                          onChange={handleChange}
                          value={input.destinationStation}
                        >
                          <option value="" selected>
                            Select
                          </option>
                          {stationCodesArray?.map((el: any, i: any) => (
                            <option value={el}>{el}</option>
                          ))}
                        </select>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={6} className="right-spacing trainDataItem">
                    <Typography className="trainDataItemName  trainLabel">
                      Train type<sup className="asterisk">*</sup>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <select
                      name="trainType"
                      className="trainTypeDropDwnSubRight dropDwn train-data-entry-textbox"
                      required={true}
                      onChange={handleChange}
                      value={input.trainType}
                    >
                      <option value="0" selected>
                        Select
                      </option>
                      <option value="ACExpress">AC Express</option>
                      <option value="AntyodayaExpress">Antyodaya Express</option>
                      <option value="DoubleDeckerExpress">Double Decker Express</option>
                      <option value="DurontoExpress">Duronto Express</option>
                      <option value="Express">Express</option>
                      <option value="GaribRathExpress">Garib Rath Express</option>
                      <option value="GatimanExpress">Gatiman Express</option>
                      <option value="HumsafarExpress">Humsafar Express</option>
                      <option value="IntercityExpress">Intercity Express</option>
                      <option value="JanSadharanExpress">Jan Sadharan Express</option>
                      <option value="JanShatabdiExpress">Jan Shatabdi Express</option>
                      <option value="KaviGuruExpress">Kavi Guru Express</option>
                      <option value="LuxuryTrains">Luxury Trains</option>
                      <option value="MahamanaExpress">Mahamana Express</option>
                      <option value="Mail">Mail</option>
                      <option value="MountainRailways">Mountain Railways</option>
                      <option value="Passenger">Passenger</option>
                      <option value="RajdhaniExpress">Rajdhani Express</option>
                      <option value="RajyaRaniExpress">Rajya Rani Express</option>
                      <option value="SamparkKrantiExpress">Sampark Kranti Express</option>
                      <option value="ShatabdiExpress">Shatabdi Express</option>
                      <option value="Suburban">Suburban</option>
                      <option value="SuperfastExpress">Superfast Express</option>
                      <option value="SuvidhaExpress">Suvidha Express</option>
                      <option value="TejasExpress">Tejas Express</option>
                      <option value="UDAYExpress">UDAY Express</option>
                      <option value="VandeBharatExpress">Vande Bharat Express</option>
                      <option value="VivekExpress">VivekExpress</option>
                      <option value="YuvaExpress">Yuva Express</option>
                      <option value="Others">Others</option>
                    </select>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container className="spacing">
              <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={6} md={12} lg={8} xl={8} className="dataMargin">
                    <Grid container>
                      <Grid item xs={6} lg={9} xl={9} className="right-spacing trainDataItem">
                        <Typography className="trainDataItemName  trainLabel">
                          Train Arrival /Departure<span className="asterisk">*</span>
                        </Typography>
                      </Grid>
                      <Grid item xs={6} lg={3} xl={3} style={{ display: "flex", justifyContent: "flex-start" }}>
                        <select
                          name="trainArrDepStatus"
                          className="trainDataDropDwn dropDwn1"
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
                  <Grid item xs={6} md={12} lg={4} xl={4} style={{ paddingLeft: "2px" }}>
                    <Grid container>
                      <Grid item xs={6} lg={7} xl={7} className="right-spacing trainDataItem">
                        <Typography style = {{ justifyContent : "end" }} className="trainDataCat">
                          Train Direction<sup className="asterisk">*</sup>
                        </Typography>
                      </Grid>
                      <Grid item xs={6} lg={5} xl={5} style={{ display: "flex", justifyContent: "flex-end" }}>
                        <select
                          name="trainDirection"
                          className="trainDataDropDwnRight dropDwn2"
                          required={true}
                          onChange={handleChange}
                          value={input.trainDirection}
                        >
                          <option value="0" selected>
                            Select
                          </option>
                          <option value="UP">UP</option>
                          <option value="DOWN">DOWN</option>
                        </select>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={6} className="right-spacing trainDataItem">
                    <Typography className="trainDataItemName  trainLabel">
                      Intermediate Station
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl>
                      <Select
                        disabled={stationCodesArray?.length ? false : true}
                        className="intrStationDropDwnSubRight dropDwn train-data-entry-textbox"
                        multiple
                        value={input.viaStation}
                        onChange={handleSelect}
                        renderValue={(selected: any) => selected.join(", ")}
                        variant="outlined"
                        name="viaStation"
                      >
                        <MenuItem
                          value="all"
                        >
                          <ListItemIcon>
                            <Checkbox
                              className="intrCheck"
                              checked={isAllSelected}
                              indeterminate={
                                input.viaStation?.length > 0 && input.viaStation?.length < stationCodesArray?.length
                              }
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary="Select All"
                          />
                        </MenuItem>
                        {stationCodesArray?.map((option) => (
                          <MenuItem key={option} value={option}>
                            <ListItemIcon>
                              <Checkbox className="intrCheck" checked={input.viaStation.indexOf(option) > -1} />
                            </ListItemIcon>
                            <ListItemText primary={option} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <div style={{ color: "red" }} >{stationCodesArray?.length ? "" : "No Intermediate station available"}</div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container className="spacing">
              {/* <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={6}>
                    <Grid container>
                      <Grid item xs={6}></Grid>
                      <Grid item xs={6} style={{ display: 'flex', justifyContent: 'start' }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              className=" onlineChckBoxs"
                              name="mergedTrains"
                              checked={input.mergedTrains}
                              size="small"
                              style={{ color: "#033733" }}
                              onClick={handleChecked}
                              defaultChecked={input.mergedTrains}
                            />
                          }
                          label={<span>Merged Trains</span>}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography className="trainDataCat  trainLabel">
                          Merged Train No
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        {input.mergedTrains === true ? (
                          <select
                            name="mergedTrainNo"
                            className="trainDataDropDwnRight"
                            required={true}
                            onChange={handleChange}
                            value={input.mergedTrainNo}
                          >
                            <option value="" selected>
                              Select
                            </option>
                            {trainNo?.map((train: any, i: any) => {
                              return (
                                <option value={train}>{train}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select
                            disabled
                            name="mergedTrainNo"
                            className="trainDataDropDwnRight"
                            required={true}
                            onChange={handleChange}
                            value={input.mergedTrainNo}
                          >
                            <option value="" selected>
                              Select
                            </option>
                            {trainNo?.map((train: any, i: any) => {
                              return (
                                <option value={train}>{train}</option>
                              );
                            })}
                          </select>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid> */}
              <Grid item xs={4} style={{ alignSelf: "center" }}>
                <Grid container className="trainDataItem">
                  <FormControlLabel
                    control={
                      <Checkbox
                        className=" onlineChckBoxs"
                        name="mergedTrains"
                        checked={input.mergedTrains}
                        size="small"
                        style={{ color: "#033733" }}
                        onClick={handleChecked}
                        defaultChecked={input.mergedTrains}
                      />
                    }
                    label={<span>Merged Trains</span>}
                  />
                </Grid>
              </Grid>
              <Grid item xs={2}>
                <Grid container>
                  <Grid item xs={6} md={8} lg={6} xl={6} className="trainDataItem">
                    <Typography className="trainDataCat trainLabel">
                      Merged Train No
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={4} lg={6} xl={6} style={{ display: "flex", justifyContent: "flex-end" }}>
                    {input.mergedTrains === true ? (
                      <select
                        name="mergedTrainNo"
                        className="trainDataDropDwnRight dropDwn1"
                        required={true}
                        onChange={handleChange}
                        value={input.mergedTrainNo}
                      >
                        <option value="" selected>
                          Select
                        </option>
                        {trainNo?.map((train: any, i: any) => {
                          return (
                            <option value={train}>{train}</option>
                          );
                        })}
                      </select>
                    ) : (
                      <select
                        disabled
                        name="mergedTrainNo"
                        className="trainDataDropDwnRight dropDwn1"
                        required={true}
                        onChange={handleChange}
                        value={input.mergedTrainNo}
                      >
                        <option value="" selected>
                          Select
                        </option>
                        {trainNo?.map((train: any, i: any) => {
                          return (
                            <option value={train}>{train}</option>
                          );
                        })}
                      </select>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}></Grid>
              <Grid item xs={3}>
              {trainError != "" ? (
              <Grid container style={{ color: "red", textAlign: "center" }}>
                {" "}
                {trainError}
              </Grid>
            ) : (
              <></>
            )}


            {coachValueError != "" ? (
              <Grid container style={{ color: "red", textAlign: "center" }}>
                {coachValueError}
              </Grid>
            ) : (
              <></>
            )}
              </Grid>
            </Grid>
            <Grid container className="spacing">
              <Grid item xs={2} md={2} lg={2} xl={3} className="runningpadding right-spacing">
                <Typography className="daysNameHed trainLabel"> Running Days</Typography>
              </Grid>
              <Grid item xs={10} md={10} lg={10} xl={9}>
                <Grid container>
                  {rundays()}
                </Grid>
              </Grid>
            </Grid>
          </Card>
          <Card className="secondCard train-data-main-card1 spacing">
            <Grid container className="spacing">
              <Grid item xs={6} className="arrowup">
                <Typography className="northend">
                  <img style={{ paddingRight: "9px" }} src={ArrowUp} />
                  <TextField disabled size="small" name="frontSideEnd" placeholder="Front Side End" onChange={handleChange} value={input.frontSideEnd} className="frontBackEnd text-field-border train-data-entry-textbox" variant="outlined" />
                </Typography>
              </Grid>
              <Grid item xs={6} className="arrowdown">
                <Typography className="northend">
                  <TextField disabled size="small" name="backSideEnd" placeholder="Back Side End" onChange={handleChange} value={input.backSideEnd} className="frontBackEnd text-field-border train-data-entry-textbox" variant="outlined" />
                  <img style={{ paddingLeft: "9px" }} src={ArrowDown} />
                </Typography>
              </Grid>
            </Grid>
            <Grid container className="coachDataCard" style={{ maxHeight: '8vh', overflow: 'scroll' }}>
              <Grid item xs={12}>
                <Grid container className="daysNameItem">
                  {input.maximumCoach === 0 ? <Grid container className="mt-21 ml-10">Please select maximum Coach Number</Grid> : coacheView()}
                </Grid>
              </Grid>
            </Grid>
          </Card>
          <Grid container
            style={{
              paddingTop: "10px",
              display: "flex",
              justifyContent: 'center',
              alignItems: "center",
              paddingBottom: "10px",
            }}
            spacing={2}
            className="spacing"
          >
            {allCoachValuesError === false ? (
              <Grid item xs={4} style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="submit"
                  className="trainDataEntrySaveBtn"
                  variant="outlined"
                  onClick={handleSubmit}
                >
                  <AddOutlinedIcon
                    className="SaveIcon"
                    style={{ display: "inherit" }}
                  />
                  {!changeButtonText ? buttonText : updateText}
                </Button></Grid>
            ) : (
              <Grid item xs={4} style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="submit"
                  className="trainDataEntrySaveBtn button-styling"
                  variant="outlined"
                  onClick={handleCoachValueError}
                >
                  {console.log(trainDataUpdate, 1134)
                  }
                  <AddOutlinedIcon
                    className="SaveIcon"
                    style={{ display: "inherit" }}
                  />
                  {input.trainNo === "" ? buttonText : updateText}
                </Button></Grid>
            )}
            <Grid item xs={4}>
              <Button
                variant="outlined"
                className="trainDataEntryCancelBtn button-styling"
                onClick={handleCancel}
              >
                <CloseIcon className="clearIcon" />
                Cancel
              </Button></Grid>
            {
              deleteCheck ?
                <Grid item xs={2} xl={1}>  <Button
                  variant="outlined"
                  className="trainDataEntryCancelBtn"
                  onClick={() => handleDelete(input.trainNo)}
                >
                  <DeleteIcon className="clearIcon" />
                  Delete
                </Button></Grid> : <></>
            }

            {/* {trainError != "" ? (
              <Grid container style={{ color: "red", textAlign: "center" }}>
                {" "}
                {trainError}
              </Grid>
            ) : (
              <></>
            )}


            {coachValueError != "" ? (
              <Grid container style={{ color: "red", textAlign: "center" }}>
                {coachValueError}
              </Grid>
            ) : (
              <></>
            )} */}

          </Grid>
        </Grid>
      </Grid>

      {keyboardVisibility && (
        <Keyboard
          keyboardRef={(r: any) => (keyboardRef.current = r)}
          onChange={(e: any) => setInput({ ...input, "hindiTrainName": e })}
          onKeyPress={(button: any) => onKeyPress(button)}
          {...hindi}
          layoutName={layout == "default" ? "default" : "shift"}
        />)}

      {regionalKeyboardVisibility && (
        <Keyboard
          keyboardRef={(r: any) => (keyboardRef.current = r)}
          onChange={(e: any) => setInput({ ...input, "regionalTrainName": e })}
          onClick={(e: any) => e.stopPropagation()}
          onKeyPress={(button: any) => onKeyPress(button)}
          {...keyboardRegionalLanguage}
          layoutName={layout == "default" ? "default" : "shift"}
        />)}
      <WarnModal
        type={ModalType.WARN}
        isModalVisible={isWarnModalVisible}
        primaryText="hello"
        secondaryText="user"
        cancelButton="ok"
        confirmButton={null}
        cancelCallback={handleCancelPass}
      />
      <WarnUnsavedChanges
        ignorePrompt={saveInit}
        navigateOnCancel={true}
        title="Are you sure ?"
        content="You want to exit this page !"
        cancelBtnText="Cancel"
        confirmBtnText="confirm"
        isDirty={isDirty}
      />
    </>
  );
};