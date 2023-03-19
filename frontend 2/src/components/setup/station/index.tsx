import {
  Card,
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
} from "@material-ui/core";
import { AutoTrainUpdate } from "./autoTrainUpdate";
import { DeviceSystem } from "./deviceSystem";
import { StationData } from "./stationData";
import "./style.css";
import { ThirdPartyIntegration } from "./thirdPartyIntegration";
import { LanguageCard } from "./language";
import { AnnouncementPrefer } from "./announcementPrefer";
import { DetailsNTES } from "./DetailsNTES";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import SetupService from "../../service/setup/setup";
import { useEffect, useState } from "react";
import StationDetailsModel from "../../../model/setup/stationDetailsModel";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { authuserStateSelector } from "../../../redux/reducers/authUser/authUser";

const setupService = new SetupService();
export const StationDetails = (props: any) => {
  const { setRegionalLanguage } = props;
  const { appUser } = useSelector(authuserStateSelector);
  const [stationError, setStationError] = useState("");
  const [platformError, setPlatformError] = useState("");
  const [stationDetails, setStationDetails] = useState<
    StationDetailsModel | any
  >({
    id: 0,
    stationName: "",
    divisionName: "",
    regionName: "",
    stationCode: "",
    divisionCode: "",
    regionCode: "",
    northEastEnd: "",
    southWestEnd: "",
    autoLoadTrain: false,
    autoDelete: false,
    autoSend: false,
    autoLoadTrainEveryMin: 0,
    autoDeleteTrainEveryMin: 0,
    autoSendDataTimeInterval: 0,
    availablePlatforms: 0,
    listOfPlatforms: [],
    enableIntegration: false,
    typeOfIntegration: null,
    fileLocation: "",
    languages: ["", "", ""],
    announcementPreference: ["", "", ""],
    ntesUpdateEnable: false,
    ntesUpdateTimeInMin: 0,
    ntesPortType: "",
    portNo: 0,
  });

  const [regionalLang, setRegionalLang] = useState("");
  const [thirdLanguage, setThirdLanguage] = useState("");

  const handleRegionalLanguage = (dataRegionalLang: any) => {
    setRegionalLang(dataRegionalLang);
  };

  // useEffect(()=>{
  //         // setThirdLanguage(regionalLang);
  // }, [regionalLang])

  // useEffect(() => {
  //     console.log('>>>>>>>>> ', stationDetails?.languages)
  //     setStationDetails({
  //         ...stationDetails, announcementPreference: stationDetails.announcementPreference.map((x: any, index: number) => {
  //             console.log('>>>>>>>>> ', index, x, stationDetails?.languages[2])
  //             if (index == 2) {
  //                 return x = stationDetails?.languages[2]
  //             } else {
  //                 return x
  //             }
  //         })
  //     })

  // }, [stationDetails?.languages[2]])

  const getStationData = (stationData: any) => {
    let name = Object.keys(stationData)[0];
    let value = stationData[name];
    setStationDetails(() => ({
      ...stationDetails,
      [name]: value,
    }));
  };

  var obj = {
    stationDetails,
    getStationData,
  };

  useEffect(() => {
    let platformArray = stationDetails?.listOfPlatforms;
    for (let i = 0; i < platformArray.length; i++) {
      if (platformArray[i] == null && stationDetails.availablePlatforms > 0) {
        setPlatformError("Please Configure the platform");

        break;
      } else {
        setPlatformError("");
      }
    }
  }, [stationDetails?.listOfPlatforms]);

  const handleSubmit = () => {
    let status: any;
    let platformArray = stationDetails?.listOfPlatforms;

    if (platformError == "") {
      if (stationDetails?.ntesUpdateEnable === true) {
        const data: any = {
          stationName: stationDetails.stationName,
          divisionName: stationDetails.divisionName,
          regionName: stationDetails.regionName,
          stationCode: stationDetails.stationCode,
          divisionCode: stationDetails.divisionCode,
          regionCode: stationDetails.regionCode,
          northEastEnd: stationDetails.northEastEnd,
          southWestEnd: stationDetails.southWestEnd,
          autoLoadTrain: stationDetails.autoLoadTrain,
          autoDelete: stationDetails.autoDelete,
          autoLoadTrainEveryMin: stationDetails.autoLoadTrainEveryMin,
          autoDeleteTrainEveryMin: stationDetails.autoDeleteTrainEveryMin,
          autoSendDataTimeInterval: stationDetails.autoSendDataTimeInterval,
          availablePlatforms: stationDetails.availablePlatforms,
          listOfPlatforms: stationDetails.listOfPlatforms,
          enableIntegration: stationDetails.enableIntegration,
          typeOfIntegration: stationDetails.typeOfIntegration,
          fileLocation: stationDetails.fileLocation,
          languages: stationDetails.languages,
          announcementPreference: stationDetails.announcementPreference,
          ntesUpdateEnable: stationDetails.ntesUpdateEnable,
          ntesUpdateTimeInMin: stationDetails.ntesUpdateTimeInMin,
          ntesPortType: stationDetails.ntesPortType,
          portNo: stationDetails.portNo,
        };
        setupService.createStationDetails(data).then((response) => {
          if (response && response?.status === 200) {
            response?.status === 200
              ? setPlatformError("")
              : setPlatformError("Please Configure The Platform");

            Swal.fire({
              position: "center",
              icon: "success",
              title: `Station Details Added Sucessfully`,
              showConfirmButton: false,
              allowOutsideClick: false,
              timer: 3000,
            });
            setStationError("");
            setPlatformError("");
            props.setStationData(true);
            if (response?.data[0]?.languages[2] != "") {
              setRegionalLanguage(response?.data?.languages[2]);
            } else {
              setRegionalLanguage("Regional");
            }
          } else {
            setStationError(response?.errorMsg);
          }
        });
        console.log(stationDetails);
      } else {
        const data: any = {
          stationName: stationDetails.stationName,
          divisionName: stationDetails.divisionName,
          regionName: stationDetails.regionName,
          stationCode: stationDetails.stationCode,
          divisionCode: stationDetails.divisionCode,
          regionCode: stationDetails.regionCode,
          northEastEnd: stationDetails.northEastEnd,
          southWestEnd: stationDetails.southWestEnd,
          autoLoadTrain: stationDetails.autoLoadTrain,
          autoDelete: stationDetails.autoDelete,
          autoLoadTrainEveryMin: stationDetails.autoLoadTrainEveryMin,
          autoDeleteTrainEveryMin: stationDetails.autoDeleteTrainEveryMin,
          manuallyGetTrainForNextHours:
            stationDetails.manuallyGetTrainForNextHours,
          autoSendDataTimeInterval: stationDetails.autoSendDataTimeInterval,
          autoDeleteTrainTimeInterval:
            stationDetails.autoDeleteTrainTimeInterval,
          availablePlatforms: stationDetails.availablePlatforms,
          listOfPlatforms: stationDetails.listOfPlatforms,
          enableIntegration: stationDetails.enableIntegration,
          typeOfIntegration: stationDetails.typeOfIntegration,
          fileLocation: stationDetails.fileLocation,
          languages: stationDetails.languages,
          announcementPreference: stationDetails.announcementPreference,
        };
        setStationError("");
        setPlatformError("");
        setupService.createStationDetails(data).then((response) => {
          if (response && response?.status === 200) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: `Station Details Added Successfully`,
              showConfirmButton: false,
              allowOutsideClick: false,
              timer: 3000,
            }).then(() => {
              if (response?.data[0]?.languages[2] != "") {
                setRegionalLanguage(response?.data?.languages[2]);
                setStationError("");
                setPlatformError("");
              } else {
                setRegionalLanguage("Regional");
                setStationError("");
                setPlatformError("");
              }
            });
          } else {
            setStationError(response?.errorMsg);
          }
        });
      }
    }
  };

  const handleCancel = () => {
    setStationDetails({
      stationName: "",
      divisionName: "",
      regionName: "",
      stationCode: "",
      divisionCode: "",
      regionCode: "",
      northEastEnd: "",
      southWestEnd: "",
      autoLoadTrain: false,
      autoDelete: false,
      autoSend: false,
      autoLoadTrainEveryMin: 0,
      autoDeleteTrainEveryMin: 0,
      manuallyGetTrainForNextHours: 0,
      autoSendDataTimeInterval: 0,
      autoDeleteTrainTimeInterval: 0,
      availablePlatforms: 0,
      listOfPlatforms: [],
      enableIntegration: false,
      typeOfIntegration: null,
      fileLocation: "",
      languages: [],
      announcementPreference: [],
      ntesUpdateEnable: false,
      ntesUpdateTimeInMin: 0,
      ntesPortType: "",
      portNo: 0,
    });
    setStationError("");
  };
  useEffect(() => {
    setupService.getStationDetails().then((response) => {
      if (response && response?.status === 200) {
        if (response && response.data && response.data[0]) {
          setStationDetails({
            id: response.data[0]?.id,
            stationName: response.data[0]?.stationName,
            divisionName: response.data[0]?.divisionName,
            regionName: response.data[0]?.regionName,
            stationCode: response.data[0]?.stationCode,
            divisionCode: response.data[0]?.divisionCode,
            regionCode: response.data[0]?.regionCode,
            northEastEnd: response.data[0]?.northEastEnd,
            southWestEnd: response.data[0]?.southWestEnd,
            autoLoadTrain: response.data[0]?.autoLoadTrain,
            autoDelete: response.data[0]?.autoDelete,
            autoLoadTrainEveryMin: response.data[0]?.autoLoadTrainEveryMin,
            autoDeleteTrainEveryMin: response.data[0]?.autoDeleteTrainEveryMin,
            manuallyGetTrainForNextHours:
              response.data[0]?.manuallyGetTrainForNextHours,
            autoSendDataTimeInterval:
              response.data[0]?.autoSendDataTimeInterval,
            autoDeleteTrainTimeInterval:
              response.data[0]?.autoDeleteTrainTimeInterval,
            availablePlatforms: response.data[0]?.availablePlatforms,
            listOfPlatforms: response.data[0]?.listOfPlatforms,
            enableIntegration: response.data[0]?.enableIntegration,
            typeOfIntegration: response.data[0]?.typeOfIntegration,
            fileLocation: response.data[0]?.fileLocation,
            languages: response.data[0]?.languages,
            announcementPreference: response.data[0]?.announcementPreference,
            ntesUpdateEnable: response.data[0]?.ntesUpdateEnable,
            ntesUpdateTimeInMin: response.data[0]?.ntesUpdateTimeInMin,
            ntesPortType: response.data[0]?.ntesPortType,
            portNo: response.data[0]?.portNo,
          });
        }
      }
    });
  }, []);

  return (
    <>
      {/* <Grid container>
        <Grid item xs={12} className="gridStyle"> */}
      {/* {appUser.userRole == "ROLE_STATION MASTER" ?
                        <Grid style={{ color: "red", display: "flex", justifyContent: "flex-end", fontSize: "22px", paddingBottom: "5px", paddingRight: "10px" }}>*view only</Grid>
                        : <></>
                    } */}

      {/* <Grid
            container
            className={
              appUser.userRole == "ROLE_STATION MASTER"
                ? "overlapBackground"
                : ""
            }
          >
            {appUser.userRole == "ROLE_STATION MASTER" ? (
              <Grid className="stationForm formFields"></Grid>
            ) : (
              <></>
            )}

            <Grid item xs={9}>
              <Grid className="stationstyle ">
                <StationData getStationData={obj} />
              </Grid>
              <Grid container>
                <Grid item xs={6} className="stationstyle2">
                  <Grid style={{ marginTop: "7px" }}>
                    <ThirdPartyIntegration getThirdPartyIntegration={obj} />
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid style={{ marginTop: "7px", marginLeft: "7px" }}>
                    <AutoTrainUpdate
                      getAutoTrainUpdate={obj}
                      platformError={platformError}
                      setPlatformError={setPlatformError}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Grid style={{ marginLeft: "10px" }}>
                <LanguageCard
                  getLanguageCard={obj}
                  callback={handleRegionalLanguage}
                />
              </Grid>
              <Grid style={{ marginLeft: "10px", marginTop: "12px" }}>
                <AnnouncementPrefer
                  getAnnouncementPrefer={obj}
                  thirdLang={thirdLanguage}
                />
              </Grid>
              <Grid style={{ marginLeft: "10px", marginTop: "10px" }}>
                <DetailsNTES getDetailsNTES={obj} />
              </Grid>
            </Grid>
          </Grid>
          <Grid>
            {stationError !== "" ? (
              <div
                style={{
                  color: "red",
                  textAlign: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                }}
              >
                {" "}
                {stationError}
              </div>
            ) : (
              <></>
            )}
            {platformError !== "" ? (
              <div
                style={{
                  color: "red",
                  textAlign: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                }}
              >
                {" "}
                {platformError}
              </div>
            ) : (
              <></>
            )}

            {appUser.userRole == "ROLE_STATION MASTER" ? (
              <Grid></Grid>
            ) : (
              <Grid container spacing={2} className="Sec-saveStation" style = {{ marginTop : "25px"}}>
                <Grid item xs={2} xl={2} style = {{ display : "flex", justifyContent : "flex-end"}}>
                <Button
                    type="reset"
                    value="Reset"
                    onClick={handleCancel}
                    variant="outlined"
                    className="stationCancel"
                  >
                    <CloseIcon className="clearIcon" />
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={2} xl={2} style = {{ display : "flex" , justifyContent : "flex-start"}}>
                  <Button
                    type="submit"
                    className="StationSave"
                    variant="outlined"
                    onClick={handleSubmit}
                  >
                    <DoneIcon
                      className="SaveIcon"
                      style={{ display: "inherit" }}
                    />
                    Save
                  </Button>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid> */}



      <Grid container>
        <Grid item xs={12} className="gridStyle">
          {/* {appUser.userRole == "ROLE_STATION MASTER" ?
                        <Grid style={{ color: "red", display: "flex", justifyContent: "flex-end", fontSize: "22px", paddingBottom: "5px", paddingRight: "10px" }}>*view only</Grid>
                        : <></>
                    } */}

          <Grid
            container
            className={
              appUser.userRole == "ROLE_STATION MASTER"
                ? "overlapBackground"
                : ""
            }
          >
            {appUser.userRole == "ROLE_STATION MASTER" ? (
              <Grid className="stationForm formFields"></Grid>
            ) : (
              <></>
            )}

            <Grid container>
              <Grid item xs={12} lg={12}>
               
                  <Grid container>
                    <Grid item xs={9} lg={9}>
                      <StationData getStationData={obj} />
                    </Grid>
                    <Grid item xs={3} lg={3}>
                      <LanguageCard
                        getLanguageCard={obj}
                        callback={handleRegionalLanguage}
                      />
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={4}>
                      <ThirdPartyIntegration getThirdPartyIntegration={obj} />
                    </Grid>
                    <Grid item xs={5}>
                      <AutoTrainUpdate
                        getAutoTrainUpdate={obj}
                        platformError={platformError}
                        setPlatformError={setPlatformError}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Grid container>
                        <Grid item xs={12}>
                          <AnnouncementPrefer
                            getAnnouncementPrefer={obj}
                            thirdLang={thirdLanguage}
                          />
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={12}>
                          <DetailsNTES getDetailsNTES={obj} />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  {stationError !== "" ? (
                    <div
                      style={{
                        color: "red",
                        textAlign: "center",
                        justifyContent: "center",
                        fontSize: "18px",
                      }}
                    >
                      {" "}
                      {stationError}
                    </div>
                  ) : (
                    <></>
                  )}
                  {platformError !== "" ? (
                    <div
                      style={{
                        color: "red",
                        textAlign: "center",
                        justifyContent: "center",
                        fontSize: "18px",
                        paddingTop:"1%",
                      }}
                    >
                      {" "}
                      {platformError}
                    </div>
                  ) : (
                    <></>
                  )}

                  {appUser.userRole == "ROLE_STATION MASTER" ? (
                    <Grid></Grid>
                  ) : (
                    <Grid container spacing={10} className="Sec-saveStation">
                      <Grid item xs={2} xl={2} className="cancelinsd" >
                        <Button
                          type="reset"
                          value="Reset"
                          onClick={handleCancel}
                          variant="outlined"
                          className="stationCancel"
                        >
                          <CloseIcon className="clearIcon" />
                          Cancel
                        </Button>
                      </Grid>
                      <Grid item xs={2} xl={2} className="saveinsd" >
                        <Button
                          type="submit"
                          className="StationSave"
                          variant="outlined"
                          onClick={handleSubmit}
                        >
                          <DoneIcon
                            className="SaveIcon"
                            style={{ display: "inherit" }}
                          />
                          Save
                        </Button>
                      </Grid>
                    </Grid>
                  )}                
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
