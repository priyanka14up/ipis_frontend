import { Button, Card } from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import TrainDataModel from "../../../model/setup/trainDataModel";
import { authuserStateSelector } from "../../../redux/reducers/authUser/authUser";
import { TrainDataEntry } from "./trainDataEntry";
import { TrainDataEntryLoginModal } from "./trainDataEntryLoginModal";
import TrainDataEntryTable from "./trainDataEntryTable";

const TrainDataEntrySetup = (props:any)=>{
    const {frontSideEnd, backSideEnd, trainCheck,setTrainCheck,regionalLanguage} = props
    const { appUser } = useSelector(authuserStateSelector);
    const [isLoginModal, setIsLoginModal] = useState(false);
    const [addTrainData, setAddTrainData] = useState(false)
    const [isEditable , setIsEditable] = useState(true)
    const [trainDataUpdate, setTrainDataUpdate] = useState(false);
    const [update ,setUpdate] = useState(false)
    const [loginModal, setLoginModal] = useState(false)
    const [scheduleArrivalTime, setScheduleArrivalTime] = useState<any>("");
  const [scheduleDepartureTime, setScheduleDepartureTime] = useState<any>("");
    const buttonText = "Add Train Data";
  const updateText = "Update Train Data";

      const [input, setInput] = useState<TrainDataModel | any>({
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
        frontSideEnd: frontSideEnd,
        backSideEnd: backSideEnd,
        coaches: [],
        sourceStation: "",
        destinationStation: "",
        trainDirection: "",
        viaStation: [],
        trainType: "",
        trainArrDepStatus: "",
      });
      
 

      const openForm = ()=>{
        setIsEditable(false)
      }

      const openTable = ()=>{
          setIsEditable(true)
      }
      useEffect(() => {
        if (props?.stationData) {
          return;
        } else {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "Please Enter Station Details",
            showConfirmButton: false,
            allowOutsideClick: false,
            timer: 3000,
          }).then(() => {
            props?.updateSelectedSideBarMenu("setupMain");
          });
        }
      }, []);

      useEffect(()=>{
if(appUser.userRole == "ROLE_SUPER ADMIN" || appUser.userRole=="ROLE_ADMIN"){
    console.log(update,"333")
    
    setIsLoginModal(true)
}
      },[appUser.userRole])
     
//       useEffect(()=>{
// if(appUser.userRole=="ROLE_SUPER ADMIN")
// setLoginModal(true)
//       },[appUser.userRole])

return(
    <>
    {isEditable ==true?

<>
    <TrainDataEntryTable input = {input} setInput = {setInput} setIsEditable={setIsEditable}
    trainDataUpdate = {trainDataUpdate} setTrainDataUpdate={setTrainDataUpdate}
    frontSideEnd = {frontSideEnd}
    backSideEnd = {backSideEnd}
    scheduleArrivalTime={scheduleArrivalTime}
     setScheduleArrivalTime={setScheduleArrivalTime}
     scheduleDepartureTime={scheduleDepartureTime}
     setScheduleDepartureTime={setScheduleDepartureTime}/></>:
   <>
    <TrainDataEntry input={input} setInput={setInput}
    frontSideEnd = {frontSideEnd}
    backSideEnd = {backSideEnd}
    trainCheck = {trainCheck}
    setTrainCheck = {setTrainCheck}
     trainDataUpdate={trainDataUpdate}
     scheduleArrivalTime={scheduleArrivalTime}
     setScheduleArrivalTime={setScheduleArrivalTime}
     scheduleDepartureTime={scheduleDepartureTime}
     setScheduleDepartureTime={setScheduleDepartureTime}
      setTrainDataUpdate={setTrainDataUpdate}
      setIsEditable={setIsEditable}
      regionalLanguage={regionalLanguage}
      
      /></>
}

<TrainDataEntryLoginModal
 updateSelectedSideBarMenu={props.updateSelectedSideBarMenu}
 stationData={props?.stationData}          
   trainCheck={trainCheck}
   isLoginModal={isLoginModal}
   setTrainCheck={setTrainCheck}
     loginModal = {loginModal}
     
     setIsLoginModal={setIsLoginModal}
  setLoginModal = {setLoginModal} />

    </>
)
}
export default TrainDataEntrySetup;