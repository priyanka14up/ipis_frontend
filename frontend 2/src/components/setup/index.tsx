import { CircularProgress, Grid, Card } from "@material-ui/core";
import "./style.css";
import { AppHeader } from "../common/app-header";
import { WebConfig } from "../setup/webConfig";
import { SideBar } from "./sideBar";
import { SetupMain } from "./setupMain";
import { EnableDisable } from "./enableDisable";
import { CoachDataEntry } from "./coachDataEntry";
import { StationCodeEntry } from "./stationCodeEntry";
import { StationDetails } from "./station";
import { DefaultMessage } from "./DefaultMessage";
import { TrainStatusEntry } from "./TrainStatusEntry";
import { DisplayIntensitySetting } from "./displayIntensitySetting";
import { DisplayBoardSetting } from "./displayBoardSetting";
// import {TrainDataEntryTable} from "./trainDataEntryTable"
import { TrainDataEntry } from "./trainDataEntry/trainDataEntry";
import { useEffect, useState } from "react";
import { TrainDataEntryLoginModal } from "./trainDataEntry/trainDataEntryLoginModal";
import { useSelector } from "react-redux";
import { authuserStateSelector } from "../../redux/reducers/authUser/authUser";
import Swal from "sweetalert2";
import { Helps } from "../help";
import { useHistory } from "react-router-dom";
import SetupService from "../service/setup/setup";
import { StationData } from "./station/stationData";
import TrainDataEntryTable from "./trainDataEntry/trainDataEntryTable";
import TrainDataEntrySetup from "./trainDataEntry";
import TrainStatusCode from "./TrainStatusColorCode";
import { ImportExport } from "./importExport";
export enum SetupPages {
  SETUP_MAIN = "setupMain",
  STATION_DETAILS = "station",
  TRAIN_DATA_ENTRY_LOGIN_MODAL = "trainDataEntryLoginModal",
  TRAIN_DATA_ENTRY_TABLE = "trainDataEntryTable",
  TRAIN_DATA_ENTRY_SETUP = "trainDataEntrySetup",
  TRAIN_DATA_ENTRY = "trainDataEntry",
  COACH_DATA_ENTRY = "coachDataEntry",
  STATION_CODE_ENTRY = "stationCodeEntry",
  TRAIN_STATUS_ENTRY = "TrainStatusEntry",
  DISPLAY_INTENSITY_SETTINGS = "displayIntensitySetting",
  DISPLAY_BOARD_SETTINGS = "displayBoardSetting",
  ENABLE_DISABLE_BOARDS = "enableDisable",
  DEFAULT_MESSAGES = "DefaultMessage",
  WEB_CONFIGURATION = "webConfig",
  TRAIN_STATUS_CODE = "trainstatuscode",
  IMPORT_EXPORT = "importExport"
}

export const Setup = (props: any) => {
  const { regionalLanguage, setRegionalLanguage } = props
  const setup = new SetupService();
  const [selectedSideBarMenu, setSelectedSideBarMenu] = useState(SetupPages.SETUP_MAIN);
  const { appUser } = useSelector(authuserStateSelector)
  const [trainCheck, setTrainCheck] = useState(false)

  const [stationData, setStationData] = useState<boolean>(false);
  const [frontSideEnd, setFrontSideEnd] = useState<any>("");
  const [backSideEnd, setBackSideEnd] = useState<any>("");
  const updateSelectedSideBarMenu = (menu: SetupPages) => {
    setSelectedSideBarMenu(menu);
  }
  let history = useHistory();
  useEffect(() => {
    if (appUser.userRole == "ROLE_OPERATOR") {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Operation not allowed please contact admin",
        showConfirmButton: false,
        allowOutsideClick: false,
        timer: 3000
      }).then(() => {
        history.push("/help")
      })
    }
  }, [appUser.userRole])

  useEffect(() => {
    setup.getStationDetails().then((response) => {
      if (response && response?.status === 200) {
        if (response && response?.data) {
          if (response?.data?.length != 0) {
            setStationData(true);
            setFrontSideEnd(response?.data[0]?.northEastEnd);
            setBackSideEnd(response?.data[0]?.southWestEnd);
            if (response?.data[0]?.languages[2] != "") {
              setRegionalLanguage(response?.data[0]?.languages[2])
            }
            else {
              setRegionalLanguage("Regional")
            }
          }
          else {
            setStationData(false);
          }
        }
      }
    })
  }, [])

  return (
    <>
      {appUser.userRole == "ROLE_OPERATOR" ? <></> :
          <Card>
            <Grid container style={{ paddingTop: "10px" }}>
              <Grid item xs={2} style={{ paddingRight: '6px', paddingLeft: '6px' }}>
                <SideBar trainCheck={trainCheck} setTrainCheck={setTrainCheck} selectedSideBarMenu={selectedSideBarMenu} updateSelectedSideBarMenu={updateSelectedSideBarMenu} />
              </Grid>
              <Grid item xs={10} style={{ paddingLeft: "10px", paddingRight: "10px", textAlign: "center" }}>
                {(selectedSideBarMenu === SetupPages.SETUP_MAIN) ? (
                  <SetupMain />
                ) : <></>
                }
                {(selectedSideBarMenu === SetupPages.STATION_DETAILS) ? (
                  <StationDetails setRegionalLanguage={setRegionalLanguage} setStationData={setStationData} />
                ) : <></>
                }
                {/* {(selectedSideBarMenu === SetupPages.TRAIN_DATA_ENTRY) ? (
              <TrainDataEntry
               regionalLanguage={regionalLanguage} trainCheck={trainCheck} setTrainCheck={setTrainCheck} frontSideEnd={frontSideEnd} backSideEnd={backSideEnd} stationData={stationData} updateSelectedSideBarMenu={updateSelectedSideBarMenu}/>
            ) : <></>s
            } */}
                {(selectedSideBarMenu === SetupPages.TRAIN_DATA_ENTRY_SETUP) ? (
                  <TrainDataEntrySetup
                    regionalLanguage={regionalLanguage} trainCheck={trainCheck} setTrainCheck={setTrainCheck} frontSideEnd={frontSideEnd} backSideEnd={backSideEnd} stationData={stationData} updateSelectedSideBarMenu={updateSelectedSideBarMenu} />
                ) : <></>}
                {(selectedSideBarMenu === SetupPages.COACH_DATA_ENTRY) ? (
                  <CoachDataEntry stationData={stationData} updateSelectedSideBarMenu={updateSelectedSideBarMenu} />
                ) : <></>
                }
                {(selectedSideBarMenu === SetupPages.STATION_CODE_ENTRY) ? (
                  <StationCodeEntry regionalLanguage={regionalLanguage} stationData={stationData} updateSelectedSideBarMenu={updateSelectedSideBarMenu} />
                ) : <></>
                }
                {(selectedSideBarMenu === SetupPages.TRAIN_STATUS_ENTRY) ? (
                  <TrainStatusEntry regionalLanguage={regionalLanguage} stationData={stationData} updateSelectedSideBarMenu={updateSelectedSideBarMenu} />
                ) : <></>
                }
                {(selectedSideBarMenu === SetupPages.DISPLAY_INTENSITY_SETTINGS) ? (
                  <DisplayIntensitySetting stationData={stationData} updateSelectedSideBarMenu={updateSelectedSideBarMenu} />
                ) : <></>
                }
                {(selectedSideBarMenu === SetupPages.DISPLAY_BOARD_SETTINGS) ? (
                  <DisplayBoardSetting stationData={stationData} updateSelectedSideBarMenu={updateSelectedSideBarMenu} />
                ) : <></>
                }
                {(selectedSideBarMenu === SetupPages.ENABLE_DISABLE_BOARDS) ? (
                  <EnableDisable stationData={stationData} updateSelectedSideBarMenu={updateSelectedSideBarMenu} />
                ) : <></>
                }
                {(selectedSideBarMenu === SetupPages.DEFAULT_MESSAGES) ? (
                  <DefaultMessage regionalLanguage={regionalLanguage} stationData={stationData} updateSelectedSideBarMenu={updateSelectedSideBarMenu} />
                ) : <></>
                }
                {(selectedSideBarMenu === SetupPages.WEB_CONFIGURATION) ? (
                  <WebConfig stationData={stationData} updateSelectedSideBarMenu={updateSelectedSideBarMenu} />
                ) : <></>
                }
                {(selectedSideBarMenu === SetupPages.TRAIN_STATUS_CODE) ? (
                  <TrainStatusCode/>
                ) : <></>
                }
                {(selectedSideBarMenu === SetupPages.IMPORT_EXPORT) ? (
                  <ImportExport stationData={stationData} updateSelectedSideBarMenu={updateSelectedSideBarMenu} />
                ) : <></>
                }
              </Grid>
            </Grid>
          </Card>
      }
    </>
  );
};
