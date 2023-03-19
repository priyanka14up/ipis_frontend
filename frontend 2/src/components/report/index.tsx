import {
  Button,
  Card,
  CardContent,
  FormControl,
  CircularProgress,
  Typography,
  TextField,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React, { useEffect } from "react";
import { ReportTable } from "./reportTable";
import DoneIcon from "@material-ui/icons/Done";
import PrintIcon from "@material-ui/icons/Print";
import { AppHeader } from "../common/app-header";
import "./index.css";
import { KeyboardDatePicker, MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ReportService from "../service/report/reportService";
import ReportModel from "../../model/report/reportModel";
import { useState } from "react";
import moment from "moment";
import exportFromJSON from 'export-from-json';
import { CSVLink, CSVDownload } from "react-csv";
import { splitDate, splitTime } from "../../common/helperMethods";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { authuserStateSelector } from "../../redux/reducers/authUser/authUser";
import { Messages } from "../../constants/messages";


enum ReportType {
  LinkCheck = "linkCheck",
  TrainTransmission = "trainTransmission",
  CgdbTransmission = "cgdbtransmission",
  AnnouncementTransmission = "announcement",
  LoginReport = "login",
}

const data1 = [
  { Date: "man", Time: "singh", UserId: "52", Description: "sdfhgsafjkddjs" },
  { Date: "jhsd", Time: "lk", UserId: "4", Description: "sdfhgsafjkddjs" },
  { Date: "sad", Time: "gfh", UserId: "96", Description: "sdfhgsafjkddjs" },
  { Date: "mazxcn", Time: "fh", UserId: "52", Description: "sdfhgsafjkddjs" },
  { Date: "m2rran", Time: "dhf", UserId: "14", Description: "sdfhgsafjkddjs" },
  { Date: "rrrr", Time: "singdfhh", UserId: "7", Description: "sdfhgsafjkddjs" },
  { Date: "wwff", Time: "sinxcvbgh", UserId: "5", Description: "sdfhgsafjkddjs" },

];

const headers = [
  { label: 'S.No', key: 'SNo' },
  { label: 'Date', key: 'Date' },
  { label: 'Time', key: 'Time' },
  { label: 'UserId', key: 'UserId' },
  { label: 'Description', key: 'Description' }
];

export const Report = () => {

  const [reportType, setReportType] = useState("");
  // const [reportError, setReportError] = React.useState<{ password: String }>();
  const [reportError, setReportError] = useState("");
  // const [userId , setUserId] = useState("");
  const [reportData, setReportData] = useState<any[]>([]);

  const [reportData1, setData1] = useState([{}]);
  const [generate, setGenerate] = useState(false);
  const [userMandatoryError, setUserMandatoryError] = useState("");
  const { appUser } = useSelector(authuserStateSelector)

  var obj = {
    report: { reportData },
    reportType: { reportType },
  }

  const reportService = new ReportService();

  const [selectedFromDay, setSelectedFromDay] = React.useState<Date | null>(
    new Date()
  );

  const [selectedFromMonth, setSelectedFromMonth] = React.useState<Date | null>(
    new Date()
  );
  const [selectedFromYear, setSelectedFromYear] = React.useState<Date | null>(
    new Date()
  );
  console.log(selectedFromYear)
  const [selectedToDay, setSelectedToDay] = React.useState<Date | null>(
    new Date()
  );
  const [selectedToMonth, setSelectedToMonth] = React.useState<Date | null>(
    new Date()
  );
  const [selectedToYear, setSelectedToYear] = React.useState<Date | null>(
    new Date()
  );

  const [array, setArray] = useState<[]>([])

  const [valueState, setValueState] = useState("");

  const handleChange = (e: any) => {
    var { name, value } = e.target;
    setValueState(value);
  }

  console.log(typeof (reportData1));

  const time = function (value: any) {
    return value;
  }
  let fromDay = ("0" + (time(selectedFromDay)).getDate()).slice(-2);
  let fromMonth = ("0" + (time(selectedFromMonth).getMonth() + 1)).slice(-2);
  let fromYear = (time(selectedFromYear)).getFullYear();
  let startDate = `${fromYear}-${fromMonth}-${fromDay}`;

  let toDay = ("0" + (time(selectedToDay)).getDate()).slice(-2);
  let toMonth = ("0" + (time(selectedToMonth).getMonth() + 1)).slice(-2);
  let toYear = (time(selectedToYear)).getFullYear();
  let endDate = `${toYear}-${toMonth}-${toDay}`;
  const data = { "startDate": `${startDate}`, "endDate": `${endDate}`, "userId": `${valueState}` };

  const handleGenerate = async () => {
    if (valueState == "") {
      setUserMandatoryError(Messages.USER_MANDATORY);
      setReportError("");
    } else if (valueState != "") {
      if (reportType == "") {
        setUserMandatoryError(Messages.REPORT_MANDATORY);
      }
      else {
        if (reportType == "login") {
          reportService.getLoginReportData(data).then(
            result => {
              setUserMandatoryError("");
              setReportData(result)
              setGenerate(true)
              setReportError("")
            }).catch(error => {
              // setReportError('${Messages.REPORT_ERROR_MSG}')
              setReportError("No Login report available for this user")
              setUserMandatoryError("");
            });
        }
        else if (reportType == "announcement") {
          reportService.getAnnouncementData(data).then(
            result => {
              setUserMandatoryError("");
              setReportData(result)
              setGenerate(true)
              setReportError("")
            }).catch(error => {
              setReportError("No  announcement report available for this user")
              setUserMandatoryError("");
            });
        }
        else if (reportType == "cgdbTransmission") {
          reportService.getCgdbTransmissionData(data).then(
            result => {
              setUserMandatoryError("");
              setReportData(result)
              setGenerate(true)
              setReportError("")

            }).catch(error => {
              setReportError("No  CGDB Transmission report available for this user")
              setUserMandatoryError("");
            });
        }
        else if (reportType == "linkCheck") {
          reportService.getLinkCheckData(data).then(
            result => {
              setUserMandatoryError("");
              setReportData(result)
              setGenerate(true)
              setReportError("")

            }

          ).catch(error => {
            setReportError("No Linkcheck report available for this user")
            setUserMandatoryError("");
          });
        }
        else if (reportType == "trainTransmission") {
          reportService.getTrainTransmissionData(data).then(
            result => {
              setUserMandatoryError("");
              setReportData(result)
              setGenerate(true)
              setReportError("")
            }
          ).catch(error => {
            setReportError("No Train Transmission report available for this user")
            setUserMandatoryError("");
          });
        }
      }
    }

  }

  const print = () => {
    var printContents = str;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  }


  // const handleDataFetch = async() => {
  //   // const response = await fetch('https://localhost:5000/results');
  //   const respJSON = await reportData1.json();
  //   // setFileData(respJSON)
  // };

  // useEffect(()=>{
  //   handleDataFetch();
  // }, [reportData1])

  const exportData = () => {


    // for (let i = 0; i < reportData.length; i++) {
    //   reportData1[i] = {
    //     SNo: "",
    //     Date: "",
    //     Time: "",
    //     UserId: "",
    //     Description: ""
    //   };
    // }

    if (reportType === ReportType.AnnouncementTransmission) {
      // reportData.forEach((el:any,i:any)=>{
      for (let i = 0; i < reportData.length; i++) {
        reportData1[i] = {
          SNo: `${i + 1}`,
          Date: `${splitDate(reportData[i].loginDateTime)}`,
          Time: `${splitTime(reportData[i].loginDateTime)}`,
          UserId: `${reportData[i].firstName} ${reportData[i].lastName}`,
          Description: `${reportData[i].role}-${reportData[i].logoutDateTime}`
        };
      }
    }
    else if (reportType === ReportType.LoginReport) {
      for (let i = 0; i < reportData.length; i++) {
        reportData1[i] = {
          SNo: `${i + 1}`,
          Date: `${splitDate(reportData[i].loginDateTime)}`,
          Time: `${splitTime(reportData[i].loginDateTime)}`,
          UserId: `${reportData[i].firstname} ${reportData[i].lastname}`,
          Description: `${reportData[i].firstName} ${reportData[i].lastName}-${reportData[i].role}-LoggedOut:${splitDate(reportData[i].logoutDateTime)} ${splitTime(reportData[i].logoutDateTime)}`
        };
      }
    }
    else if (reportType === ReportType.CgdbTransmission) {
      for (let i = 0; i < reportData.length; i++) {
        reportData1[i] = {
          SNo: `${i + 1}`,
          Date: `${splitDate(reportData[i].localDateTime)}`,
          Time: `${splitTime(reportData[i].localDateTime)}`,
          UserId: `${reportData[i].firstname} ${reportData[i].lastname}`,
          Description: `${reportData[i].pdcPort}-${reportData[i].trainNo}-${reportData[i].trainName}-Coach Data`
        };
      }
    }
    else if (reportType === ReportType.LinkCheck) {
      for (let i = 0; i < reportData.length; i++) {
        reportData1[i] = {
          SNo: `${i + 1}`,
          Date: `${splitDate(reportData[i].localDateTime)}`,
          Time: `${splitTime(reportData[i].localDateTime)}`,
          UserId: `${reportData[i].firstname} ${reportData[i].lastname}`,
          Description: ` Device Name:${reportData[i].deviceName}-IP Address:${reportData[i].ipAddress}-Device Type:${reportData[i].deviceType}-Status:${reportData[i].status}-Port No: ${reportData[i].port}-Link Time:${reportData[i].linkTime}-Response Time:${reportData[i].responseTime}s`
        };
      }
    }
    else if (reportType === ReportType.TrainTransmission) {
      for (let i = 0; i < reportData.length; i++) {
        reportData1[i] = {
          SNo: `${i + 1}`,
          Date: `${splitDate(reportData[i].localDateTime)}`,
          Time: `${splitTime(reportData[i].localDateTime)}`,
          UserId: `${reportData[i].firstname} ${reportData[i].lastname}`,
          Description: `${reportData[i].trainNo}-${reportData[i].trainName}-${reportData[i].trainNameRegional}-SAT:${reportData[i].scheuduledArrival}-SAD:${reportData[i].scheuduledDeparture}
           {${reportData[i].late} == "On Time" ? {} : (${reportData[i].late}-Actual Arrival Time:${reportData[i].actualArrival}-Actual Deaparture Time:${reportData[i].actualDeparture} )}
          Train Status-${reportData[i].trainStatus}`
        };
      }
    }
  }


  const typeOfData = () => {
    if (reportType == "login") {
      return (
        reportData.map((data: any, i: number) => {
          return `<tr><td>${i + 1}</td><td>${splitDate(data.loginDateTime)}</td><td>${splitTime(data.loginDateTime)}</td><td>${(data.firstName)} ${(data.lastName)}</td><td>${data.firstName} ${data.lastName}-${data.role}-LoggedOut:${splitDate(data.logoutDateTime)} ${splitTime(data.logoutDateTime)}</td> </tr>`
        }));
    }
    else if (reportType == "announcement") {
      return (
        reportData.map((data: any, i: number) => {
          return `<tr><td>${i + 1}</td><td>${splitDate(data.announcementTime)}</td><td>${splitTime(data.announcementTime)}</td><td>${(data.firstname)} ${(data.lastname)}</td><td>${data.announcementType}-${data.announcementMessage}</td> </tr>`
        }));
    }
    else if (reportType == "cgdbTransmission") {
      return (
        reportData.map((data: any, i: number) => {
          return `<tr><td>${i + 1}</td><td>${splitDate(data.localDateTime)}</td><td>${splitTime(data.localDateTime)}</td><td>${(data.firstname)} ${(data.lastname)}</td><td>${data.pdcPort}-${data.trainNo}-${data.trainName}-Coach Data</td> </tr>`
        }));
    }
    else if (reportType == "linkCheck") {
      return (
        reportData.map((data: any, i: number) => {
          return `<tr><td>${i + 1}</td><td>${splitDate(data.localDateTime)}</td><td>${splitTime(data.localDateTime)}</td><td>${(data.firstname)} ${(data.lastname)}</td><td>Device Name:${data.deviceName}-IP Address:${data.ipAddress}-Device Type:${data.deviceType}-Status:${data.status}-Port No: ${data.port}-Link Time:${data.linkTime}-Response Time:${data.responseTime}s</td> </tr>`
        }));
    }
    else if (reportType == "trainTransmission") {
      return (
        reportData.map((data: any, i: number) => {
          return `<tr><td>${i + 1}</td><td>${splitDate(data.localDateTime)}</td><td>${splitTime(data.localDateTime)}</td><td>${(data.firstname)} ${(data.lastname)}</td><td>${data.trainNo}-${data.trainName}-${data.trainNameRegional}-SAT:${data.scheuduledArrival}-SAD:${data.scheuduledDeparture}Train Status-${data.trainStatus}</td> </tr>`
        }));
    }
  }

  const str = `
   <div>
      <h1> Integrated Passengers Information Systems </h1>
      <h3>${reportType} Report</h3>
      <h3>${startDate} to ${endDate}</h3>
      <table>
        <tr>
          <th>SrNo</th>
          <th>Date</th>
          <th>Time</th>
          <th>UserId</th>
          <th>Description</th>
        </tr>
        ${typeOfData()}
      </table>
    </div>
   `;

  useEffect(() => {
    exportData();
  }, [reportData])

  const csvReport = {
    filename: `${reportType}.csv`,
    headers: headers,
    data: reportData1
  }

  useEffect(() => {
    reportService.getUserList().then((data) => {
      setArray(data.data)
    })
  }, [])

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


  const user = () => {
    return (
      <select className="reportDropdown" name="user" value={valueState} onChange={handleChange}>
        <option value="">Select</option>
        {array.map((el: any, i: any) => {
          return (
            <option value={el.id} >{el.firstname} {el.lastname}</option>
          )
        })}
      </select>
    )
  }

  // return (
  //   <>
  //     {appUser.userRole == "ROLE_OPERATOR" ? <></> :

  //       <Grid container  className="reportMainGrid">
  //         <Grid item lg={4} xs={3}>
  //           <Card  className={appUser.userRole == "ROLE_STATION MASTER" ? "overlapBackground selectionCard":"selectionCard"}>
  //           {  
  //           appUser.userRole == "ROLE_STATION MASTER" ? <Grid className="stationForm formFields">

  //         </Grid>: <></>
  //         }
  //             <CardContent className="selectionCardContent">
  //               <Typography variant="h6" component="p" className="reporttsx">
  //                 Report
  //               </Typography>
  //               <Typography className="context">
  //                 To generate new report data range and type of report.
  //               </Typography>
  //               <br></br>
  //               <Grid container>
  //                 <Grid item  xs={3} className="reporttext2">
  //                   From
  //                 </Grid>
  //                 <Grid container xs={9}>
  //                   <Grid item xs={3} className="day" >
  //                     <FormControl className="trainDataScheRep" variant="outlined" size="medium">
  //                       <MuiPickersUtilsProvider utils={DateFnsUtils}>
  //                         <KeyboardDatePicker
  //                           className="datepickerStyle"
  //                           inputVariant="outlined"
  //                           disableToolbar
  //                           format="dd"
  //                           views={["date"]}
  //                           label="Day"
  //                           name="selectedFromDay"
  //                           value={selectedFromDay}
  //                           onChange={date => setSelectedFromDay(date)}
  //                         />
  //                       </MuiPickersUtilsProvider>
  //                     </FormControl>
  //                   </Grid>
  //                   <Grid item xs={5} className="month">
  //                     <FormControl  className="trainDataScheRep" variant="outlined" size="small">
  //                       <MuiPickersUtilsProvider utils={DateFnsUtils}>
  //                         <KeyboardDatePicker
  //                         className="datepickerStyle"
  //                           disableToolbar
  //                           inputVariant="outlined"
  //                           format="MMMM"
  //                           views={["month"]}
  //                           label="Month"
  //                           name="selectedFromMonth"
  //                           value={selectedFromMonth}
  //                           onChange={date => setSelectedFromMonth(date)}
  //                         />
  //                       </MuiPickersUtilsProvider>
  //                     </FormControl>
  //                   </Grid>
  //                   <Grid item xs={4} className="month">
  //                     <FormControl  className="trainDataScheRep" variant="outlined" size="small">
  //                       <MuiPickersUtilsProvider utils={DateFnsUtils}>
  //                         <KeyboardDatePicker
  //                         className="datepickerStyle"
  //                           format="yyyy"
  //                           views={["year"]}
  //                           inputVariant="outlined"
  //                           disableToolbar
  //                           label="Year"
  //                           value={selectedFromYear}
  //                           name="selectedFromYear"
  //                           onChange={date => setSelectedFromYear(date)}
  //                         />
  //                       </MuiPickersUtilsProvider>
  //                     </FormControl>
  //                   </Grid>
  //                 </Grid>
  //               </Grid>
  //               <br></br>
  //               <Grid container>
  //                 <Grid item xs={3} className="reporttext2">
  //                   To
  //                 </Grid>
  //                 <Grid container xs={9}>
  //                   <Grid item xs={3} className="day" >
  //                     <FormControl  className="trainDataScheRep" variant="outlined" size="small">
  //                       <MuiPickersUtilsProvider utils={DateFnsUtils}>
  //                         <KeyboardDatePicker
  //                         className="datepickerStyle"
  //                           disableToolbar
  //                           inputVariant="outlined"
  //                           format="dd"
  //                           views={["date"]}
  //                           label="Day"
  //                           value={selectedToDay}
  //                           name="selectedToDay"
  //                           onChange={date => setSelectedToDay(date)}
  //                         />
  //                       </MuiPickersUtilsProvider>
  //                     </FormControl>
  //                   </Grid>
  //                   <Grid item xs={5} className="month">
  //                     <FormControl  className="trainDataScheRep" variant="outlined" size="small">
  //                       <MuiPickersUtilsProvider utils={DateFnsUtils}>
  //                         <KeyboardDatePicker
  //                         className="datepickerStyle"
  //                           views={["month"]}
  //                           format="MMMM"
  //                           inputVariant="outlined"
  //                           disableToolbar
  //                           label="Month"
  //                           name="selectedToMonth"
  //                           value={selectedToMonth}
  //                           onChange={date => setSelectedToMonth(date)}
  //                         />
  //                       </MuiPickersUtilsProvider>
  //                     </FormControl>
  //                   </Grid>
  //                   <Grid item xs={4} className="month">
  //                     <FormControl  className="trainDataScheRep" variant="outlined" size="small">
  //                       <MuiPickersUtilsProvider utils={DateFnsUtils}>

  //                         <KeyboardDatePicker
  //                         className="datepickerStyle"
  //                           views={["year"]}
  //                           format="yyyy"
  //                           inputVariant="outlined"
  //                           disableToolbar
  //                           label="Year"
  //                           name="selectedToYear"
  //                           value={selectedToYear}
  //                           onChange={date => setSelectedToYear(date)}
  //                         />
  //                       </MuiPickersUtilsProvider>
  //                     </FormControl>
  //                   </Grid>
  //                 </Grid>
  //               </Grid>
  //               <br></br>
  //               <Grid container className="reportTypeGrid">
  //                 <Grid item xs={3} className="reporttext2">
  //                   Report Type
  //                 </Grid>
  //                 <Grid container xs={9} spacing={1} >
  //                   <Grid item>
  //                     <select className="reportDropdown" name="reportType" value={reportType} onChange={event => { setReportType(event.target.value); setGenerate(false) }}>
  //                       <option>Select</option>
  //                       <option value="login">Login Details</option>
  //                       <option value="announcement">Announcement</option>
  //                       <option value="cgdbTransmission">CGDB Transmission</option>
  //                       <option value="linkCheck">Link Check</option>
  //                       <option value="trainTransmission">Train Transmission</option>
  //                     </select>
  //                   </Grid>
  //                 </Grid>
  //               </Grid>
  //               <Grid container>
  //                 <Grid item xs={3} className="reporttext2">
  //                   User
  //                 </Grid>
  //                 <Grid container xs={9} spacing={1} >
  //                   <Grid item >
  //                     {user()}
  //                   </Grid>
  //                 </Grid>
  //               </Grid>
  //               <br></br>
  //               <Grid container className="generateButtonCss">
  //                 <Grid item>
  //                   <Button variant="contained" size="large" onClick={handleGenerate} className="generate" color="primary" >
  //                     Generate
  //                   </Button>

  //                 </Grid>
  //               </Grid>
  //             </CardContent>
  //           </Card>
  //         </Grid>
  //         <Grid item lg={8} xs={9}>
  //           <Card className="reportCard">
  //             {generate == true ?
  //               <CardContent className="reportTableCard">
  //                 <div className="tbody-overFlow">
  //                 {reportData.length == 0 ? <Grid className="reportTableCardGridCss" >Generating... <CircularProgress /></Grid> :
  //                   <ReportTable obj={obj} />}
  //                 </div>
  //                 <br></br>
  //                 <Grid>
  //                   <Button
  //                     disabled={
  //                       !selectedFromDay ||
  //                       !selectedFromMonth ||
  //                       !selectedFromYear ||
  //                       !selectedToDay ||
  //                       !selectedToMonth ||
  //                       !selectedToYear ||
  //                       !reportType ||
  //                       !valueState
  //                     }
  //                     type="submit"
  //                     className="savebttn"
  //                     variant="outlined">
  //                     <CSVLink className="linkColor" {...csvReport}>download</CSVLink>
  //                   </Button>
  //                   <Button onClick={print} variant="outlined" className="printbtn">
  //                     <PrintIcon className="printIcon" />
  //                     Print
  //                   </Button>
  //                 </Grid>
  //               </CardContent> : <Grid className="reportIndexEndCss">  {reportError}</Grid>}

  //           </Card>
  //         </Grid>
  //       </Grid>
  //     }
  //   </>
  // );


  return (
    <>
      {appUser.userRole == "ROLE_OPERATOR" ? <></> :
        <Card style={{ padding: "10px", height: "100%", borderRadius: "10px" }}>
          <Grid container>
            <Grid item xs={4} md={5} lg={4} xl={3}>
              <Card style={{ padding: "30px", borderRadius: "10px" }}>
                <Grid container className="report-label">
                  <Typography>
                    <strong>Report</strong>
                  </Typography>
                </Grid>
                <Grid container className="new-report-label">
                  <Typography>
                    To generate new report data range and type of report.
                  </Typography>
                </Grid>
                <Grid container spacing={2} className="duration-1">
                  <Grid item xs={3} md={4} lg={3} xl={3} style={{ alignSelf: "center" }}>
                    <Typography className="label-alignn">
                      From
                    </Typography>
                  </Grid>
                  <Grid item xs={3} md={2} lg={2} xl={2}>
                    <FormControl className="trainDataScheRep" variant="outlined" size="medium">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          className="datepickerStyle field-style"
                          inputVariant="outlined"
                          disableToolbar
                          format="dd"
                          views={["date"]}
                          label="Day"
                          name="selectedFromDay"
                          value={selectedFromDay}
                          onChange={date => setSelectedFromDay(date)}
                        />
                      </MuiPickersUtilsProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3} md={4} lg={4} xl={4}>
                    <FormControl className="trainDataScheRep" variant="outlined" size="small">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          className="datepickerStyle field-style"
                          disableToolbar
                          inputVariant="outlined"
                          format="MMMM"
                          views={["month"]}
                          label="Month"
                          name="selectedFromMonth"
                          value={selectedFromMonth}
                          onChange={date => setSelectedFromMonth(date)}
                        />
                      </MuiPickersUtilsProvider>
                    </FormControl>

                  </Grid>
                  <Grid item xs={3} md={2} lg={2} xl={2}>
                    <FormControl className="trainDataScheRep" variant="outlined" size="small">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          className="datepickerStyle field-style"
                          format="yyyy"
                          views={["year"]}
                          inputVariant="outlined"
                          disableToolbar
                          label="Year"
                          value={selectedFromYear}
                          name="selectedFromYear"
                          onChange={date => setSelectedFromYear(date)}
                        />
                      </MuiPickersUtilsProvider>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={2} className="duration-2">
                  <Grid item xs={3} md={4} lg={3} xl={3} style={{ alignSelf: "center" }}>
                    <Typography className="label-alignn">
                      To
                    </Typography>
                  </Grid>
                  <Grid item xs={3} md={2} xl={2}>
                    <FormControl className="trainDataScheRep" variant="outlined" size="small">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          className="datepickerStyle field-style"
                          disableToolbar
                          inputVariant="outlined"
                          format="dd"
                          views={["date"]}
                          label="Day"
                          value={selectedToDay}
                          name="selectedToDay"
                          onChange={date => setSelectedToDay(date)}
                        />
                      </MuiPickersUtilsProvider>
                    </FormControl>

                  </Grid>
                  <Grid item xs={3} md={4} lg={4} xl={4}>
                    <FormControl className="trainDataScheRep" variant="outlined" size="small">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          className="datepickerStyle field-style"
                          views={["month"]}
                          format="MMMM"
                          inputVariant="outlined"
                          disableToolbar
                          label="Month"
                          name="selectedToMonth"
                          value={selectedToMonth}
                          onChange={date => setSelectedToMonth(date)}
                        />
                      </MuiPickersUtilsProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3} md={2} xl={2}>
                    <FormControl className="trainDataScheRep" variant="outlined" size="small">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          className="datepickerStyle field-style"
                          views={["year"]}
                          format="yyyy"
                          inputVariant="outlined"
                          disableToolbar
                          label="Year"
                          name="selectedToYear"
                          value={selectedToYear}
                          onChange={date => setSelectedToYear(date)}
                        />
                      </MuiPickersUtilsProvider>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={2} className="report-type">
                  <Grid item xs={4} lg={3} xl={3} style={{ alignSelf: "center" }}>
                    <Typography className="label-alignn">
                      Report Type
                    </Typography>
                  </Grid>
                  <Grid item xs={8} lg={8} xl={9}>
                    <select className="reportDropdown" name="reportType" value={reportType} onChange={event => { setReportType(event.target.value); setGenerate(false) }}>
                      <option value="">Select</option>
                      <option value="login">Login Details</option>
                      <option value="announcement">Announcement</option>
                      <option value="cgdbTransmission">CGDB Transmission</option>
                      <option value="linkCheck">Link Check</option>
                      <option value="trainTransmission">Train Transmission</option>
                    </select>
                  </Grid>
                </Grid>
                <Grid container spacing={2} className="useR">
                  <Grid item xs={4} lg={3} xl={3} style={{ alignSelf: "center" }}>
                    <Typography className="label-alignn">
                      User
                    </Typography>
                  </Grid>
                  <Grid item xs={8} lg={8} xl={9}>
                    {user()}
                  </Grid>
                </Grid>
                {userMandatoryError != "" ? <Grid container style={{ color: "red", textAlign: "center", display: "flex", justifyContent: "center", marginBottom: "5%" }}>{userMandatoryError}</Grid> : <></>}
                <Grid container spacing={2} className="generate-button">
                  <Button variant="contained" size="large" onClick={handleGenerate} className="generate" color="primary" >
                    <span className="btn-span">Generate</span>
                  </Button>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={8} md={7} lg={8} xl={9} className="details">
              <Card className="rCard">
                {generate == true ? <>
                  <Grid container className="tbody-overFlow">
                    {reportData.length == 0 ? <Grid className="reportTableCardGridCss" >Generating... <CircularProgress /></Grid> :
                      <ReportTable obj={obj} />}
                  </Grid>
                  <Grid container className="butttons mt-24" spacing={3}>
                    <Grid item xs={3} md={3} lg={2} className="download">
                      <Button
                        disabled={
                          !selectedFromDay ||
                          !selectedFromMonth ||
                          !selectedFromYear ||
                          !selectedToDay ||
                          !selectedToMonth ||
                          !selectedToYear ||
                          !reportType ||
                          !valueState
                        }
                        type="submit"
                        className="saveBtttn"
                        variant="outlined">
                        <CSVLink className="linkColor btn-span" {...csvReport}>Download</CSVLink>
                      </Button>

                    </Grid>
                    <Grid item xs={3} md={3} className="print">
                      <Button onClick={print} variant="outlined" className="printbtn">
                        <PrintIcon className="printIcon" />
                        <span className="btn-span">Print</span>
                      </Button>

                    </Grid>
                  </Grid></>
                  : <Grid className="reportIndexEndCss">{reportError}</Grid>
                }
              </Card>
            </Grid>
          </Grid>
        </Card>
      }
    </>

  )
}

