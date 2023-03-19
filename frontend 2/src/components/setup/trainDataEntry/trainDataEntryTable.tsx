import { Button, Card, Checkbox, CircularProgress, createStyles, Grid, IconButton, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Theme, withStyles } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from "@material-ui/icons/Edit";
import SetupService from "../../service/setup/setup";
import DeleteIcon from '@material-ui/icons/Delete';
import Swal from "sweetalert2";
import { TrainDataEntry } from "./trainDataEntry";
import { useSelector } from "react-redux";
import { AnyIfEmpty } from "react-redux";
import { authuserStateSelector } from "../../../redux/reducers/authUser/authUser";
import addTrainDataBtn from "../../../assets/images/control_point.svg";
import SearchIcon from '@material-ui/icons/Search';
// import deleteIcon from "../../../assets/images/delete"

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);


const TrainDataEntryTable=(props : any)=>{
    const {setInput, input, setIsEditable ,setTrainDataUpdate,
      scheduleArrivalTime,scheduleDepartureTime,
      frontSideEnd,backSideEnd,setScheduleArrivalTime,setScheduleDepartureTime, trainDataUpdate , trainCheck, setTrainCheck} = props
    const setup = new SetupService();
    const {appUser} =useSelector(authuserStateSelector); 
    const [trainDataArray, setTrainDataArray] = useState<any>([])
    const [editForm , setEditForm]= useState(true)  
    const [searchedArray,setSearchedArray] =useState<any>([])
    const [loading, setLoading] = useState(false);



  const everyday = ["sun", "mon", "tue", "wed", "thur", "fri", "sat"]
  useEffect(() => {
    trainTable()
  }, [trainDataArray])


  useEffect(() => {
    setLoading(true);
    setup.getTrainTableData().then(data => {
      if (data && data?.data) {
        setTrainDataArray(data?.data)
        setSearchedArray(data?.data)
        setLoading(false);
      }
    })
  }, [])

  console.log(trainDataArray, 34);

  const handleEdit = (trainInfo: any) => {
    setIsEditable(false)
    setup.getTrainDataByTrainNo(trainInfo?.trainNo).then((data: any) => {
      if (data && data?.status == 200) {
        setTrainDataUpdate(true)
        props.setScheduleArrivalTime(data?.data?.scheduleArrivalTime);
        props.setScheduleDepartureTime(data?.data?.scheduleDepartureTime)
        setInput({
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
  }


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
              setup.getTrainTableData().then(data => {
                if (data && data?.data) {
                  setTrainDataArray(data?.data)
                }
              })
            })

          }
        })
      }
    })
  }

  const trainTable = () => {
    if (searchedArray?.length != 0) {
      return (
        searchedArray?.map((trainInfo: any, i: any) => {
          return (
            <StyledTableRow className="onlineTrainTable">
              <TableCell className="alt1 alternate4" id="trainIndexID">
                {trainInfo.trainNo}
              </TableCell>
              <TableCell className="alt1 alternate4" id="trainNumber">
                {trainInfo.englishTrainName}
              </TableCell>
              <TableCell className="alt1 alternate4" id="trainName">
                {trainInfo.sourceStation}
              </TableCell>
  
              <TableCell className="alt1 alternate4" id="sta">
                {trainInfo.scheduleArrivalTime}
              </TableCell>
              <TableCell className="alt1 alternate4" id="std">
                {trainInfo.scheduleDepartureTime}
              </TableCell>
  
              <TableCell className="alt1 alternate4" id="eta">
                {trainInfo.platformNo}
              </TableCell>
              <TableCell className="alt1 alternate4" id="etd">
                {trainInfo.trainDirection}
              </TableCell>
              <TableCell>
                <Table>
                <TableRow className="runningEntry">
                  
                {everyday.map((days: any) => {
                  return (
                    <>
                      {trainInfo?.runningDays?.some((runnungDay: any) => runnungDay == days) ?
                        <TableCell colSpan={1}>
  
                          <DoneIcon style={{ color: "green", padding: "1px" }}></DoneIcon>
                        </TableCell> :
                        <TableCell colSpan={1}>
                          {console.log((trainInfo?.runningDays), "inside")}
                          <CloseIcon style={{ color: "red", padding: "1px" }}></CloseIcon>
                        </TableCell>}
  
                    </>
                  );
                })}
  
  
  
              </TableRow>
                </Table>
              
              </TableCell>
             
  
              {appUser.userRole == "ROLE_SUPER ADMIN" ||
                appUser.userRole == "ROLE_ADMIN" ? (
                <>
                  {" "}
                  <TableCell className="alt1">
                    <IconButton
                      aria-label="edit"
                      style={{ padding: "1px" }}
                      onClick={() => handleEdit(trainInfo)}
  
                    >
                      <EditIcon style={{ color: "grey" }} />
                    </IconButton>
                  </TableCell>
                  <TableCell className="alt1">
                    <IconButton
                      aria-label="edit"
                      style={{ fontSize: "24px", paddingLeft: "10px" }}
                      onClick={() => handleDelete(trainInfo.trainNo)}
                    >
                      <DeleteIcon
                        style={{ color: "grey", padding: "1px"}}
                      />
                    </IconButton>
                  </TableCell>
                </>
              ) : (
                <></>
              )}
              {/* <TableRow>
                           {everyday.map((days: any) => {
                             return ( 
                               <>
                               {trainInfo?.runningDays?.some((runnungDay:any)=>runnungDay == days) ?
                              <TableCell>
                                
                                <DoneIcon  style={{ color: "green", padding: "1px" }}></DoneIcon>
                              </TableCell> :
                              <TableCell>
                                {console.log((trainInfo?.runningDays), "inside")}
                                <CloseIcon  style={{ color: "red", padding: "1px" }}></CloseIcon>
                              </TableCell>  }
                             
                               </>
                             );
                           })}
  
                       
  
                       </TableRow> */}
            </StyledTableRow>
          );
        })
  
      )
    }
    else {
      return (
        <TableRow>
          <TableCell colSpan={10} style={{ borderBottom: '0px' }}><span className="cdsNoTable">No Data Available</span></TableCell>
        </TableRow>)
    }
  }
  const handleOpen = () => {
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
      frontSideEnd: frontSideEnd,
      backSideEnd: backSideEnd,
      coaches: [],
      sourceStation: "",
      destinationStation: "",
      trainDirection: "",
      viaStation: [],
      trainType: "",
      trainArrDepStatus: "",
    })
    setIsEditable(false)
  }

  const handleSearch = (e: any) => {
    const { value } = e.target;
    if (value != "") {
      let array: any = trainDataArray.filter((item: any) => {
        if(item.trainNo.toString()?.includes(value) || item.englishTrainName.toLowerCase()?.includes(value.toLowerCase()) || item.sourceStation.toLowerCase()?.includes(value.toLowerCase())){
          return true;
        }else{
          return false;
        }
      })
      setSearchedArray(array)
    } else {
      setSearchedArray(trainDataArray)
    }
  }

  return (

    <Card style={{height:'100%'}}>

      <Grid container className="p-15">
        <Grid item xs={12}>
        <Grid>
        <TextField onChange={handleSearch} style={{width: '35%',float: 'right',marginRight: '10px', marginBottom: '5px'}} placeholder="Enter Train Number or Train Name....." variant="outlined" InputProps={{endAdornment:<InputAdornment position="start"><SearchIcon className="searchTableIcon"/></InputAdornment>}}/>
      </Grid>
          <TableContainer className="bgTrainTable" style={{ maxHeight: "50vh" }}>
            <Table stickyHeader aria-label="sticky table" className="tableHeadData cardBoxShadow">
              <TableHead>
                <TableRow className="thead">
                  <TableCell className=" rowStyle tableHeadData w-90">Train No.</TableCell>
                  <TableCell className=" rowStyle tableHeadData w-220">Train Name</TableCell>
                  <TableCell className=" rowStyle tableHeadData w7">Source Station</TableCell>
                  <TableCell className=" rowStyle tableHeadData w6">Arrival Time</TableCell>
                  <TableCell className=" rowStyle tableHeadData w8">Departure Time</TableCell>
                  <TableCell className=" rowStyle tableHeadData w-80"> Pf.No. </TableCell>
                  <TableCell className=" rowStyle tableHeadData w-80"> TD </TableCell>
                  <TableCell className="runninghead">
                  <Table stickyHeader aria-label="sticky table" >

<TableRow className="running">
  <TableCell colSpan={7} className=" rowStyle tableHeadData w-80">Running Status</TableCell>
</TableRow>

<TableRow >
  <Table stickyHeader aria-label="sticky table">
    <TableRow >
      <TableCell colSpan={1} className=" rowStyle tableHeadData w-80">Sun</TableCell>
      <TableCell colSpan={1} className=" rowStyle tableHeadData w-80">Mon</TableCell>
      <TableCell colSpan={1} className=" rowStyle tableHeadData w-80">Tue</TableCell>
      <TableCell colSpan={1} className=" rowStyle tableHeadData w-80">Wed</TableCell>
      <TableCell colSpan={1} className=" rowStyle tableHeadData w-80">Thu</TableCell>
      <TableCell colSpan={1} className=" rowStyle tableHeadData w-80">Fri</TableCell>
      <TableCell colSpan={1} className=" rowStyle tableHeadData w-80">Sat</TableCell>
    </TableRow>
  </Table>

</TableRow>
</Table>
                  </TableCell>
                  
                  {/* <TableCell className=" rowStyle tableHeadData w-160">Merged Train Number</TableCell> */}
                  {appUser.userRole == "ROLE_SUPER ADMIN" || appUser.userRole == "ROLE_ADMIN" ?

                    <><TableCell className=" rowStyle tableHeadData w-80">Edit</TableCell>
                      <TableCell className=" rowStyle tableHeadDataLastChild w-80 ">Delete</TableCell></> : <></>}
                  {/* <TableRow>
                    <TableCell colSpan={7} className=" rowStyle tableHeadData w-80">Running Status</TableCell>
                    </TableRow>

                    <TableRow>
                    <TableCell className=" rowStyle tableHeadData w-80">S</TableCell>
                    <TableCell className=" rowStyle tableHeadData w-80">M</TableCell>
                    <TableCell className=" rowStyle tableHeadData w-80">T</TableCell>
                    <TableCell className=" rowStyle tableHeadData w-80">W</TableCell>
                    <TableCell className=" rowStyle tableHeadData w-80">T</TableCell>
                    <TableCell className=" rowStyle tableHeadData w-80">F</TableCell>
                    <TableCell className=" rowStyle tableHeadData w-80">S</TableCell>



                    </TableRow> */}
                </TableRow>
              </TableHead>
              {
                 loading ?
                    <TableRow>
                      <TableCell colSpan={10}>
                        <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", height: '20vh' }}><Grid style={{color:"black", textAlign: "center" }}><CircularProgress size={30} /><br />Loading...</Grid></div>

                      </TableCell>
                    </TableRow>
                    :
                    <TableBody className="tblbdy">
                      {trainTable()}
                    </TableBody>
                }
            </Table>
          </TableContainer>
{appUser.userRole == "ROLE_SUPER ADMIN" || appUser.userRole == "ROLE_ADMIN"?
          <Table>
            <TableHead>

              <TableRow className="tableBottom cardBoxShadow">
                <TableCell className="bottomHed linkHover" onClick={handleOpen}><div className="displayContent"> <img src={addTrainDataBtn} className="pr-22" /> Click to Add new Train Data</div></TableCell>
                
              </TableRow>  </TableHead> </Table>: <></>}
          <Grid>

          </Grid>
        </Grid>

      </Grid>

    </Card>




  )
}
export default TrainDataEntryTable;

