import Table from "@material-ui/core/Table";
import "./style.css";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";
import { withStyles } from "@material-ui/core";
import { createStyles, Theme } from "@material-ui/core";
import { CoachDataEntry } from "../setup/coachDataEntry";

enum ReportType {
  LinkCheck = "linkCheck",
  TrainTransmission = "trainTransmission",
  CgdbTransmission = "cgdbTransmission",
  AnnouncementTransmission = "announcement",
  LoginReport = "login",
}

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

export const ReportTable = (props: any) => {

  const reports = [props.obj.report.reportData];
  const [reportType, setReportType] = useState(ReportType.LoginReport);
  const [coachData, setCoachData] = useState([]);
    const splitDate= (dateObj: string): string => {
    var loginDate= new Date(dateObj);
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    var date = month[loginDate.getMonth()]+' '+loginDate.getDate()+','+loginDate.getFullYear();
    return date;
  }
  const splitTime= (timeObj: string): string => {
    var timesplit= new Date(timeObj);
    var time = timesplit.getHours()+':'+timesplit.getMinutes()+':'+timesplit.getSeconds();
    return time;
  }

  useEffect(() => {
    setReportType(props.obj.reportType.reportType);
  });
  
  return (
    <>
      <Table className="th backCol" stickyHeader>
        <TableHead>
          <TableRow className="thead">
            <TableCell className="date" >Date</TableCell>
            <TableCell className="th" >Time</TableCell>
            <TableCell className="th">User Id</TableCell>
            <TableCell className="desc"> Description </TableCell>
          </TableRow>
        </TableHead>

        {reportType === ReportType.LoginReport ? (
          <TableBody>
            {
              reports[0].map((el: any, i: any) =>
                <StyledTableRow >
                  <TableCell className="alt1">{splitDate(el.loginDateTime)}</TableCell>
                  <TableCell className="alt1">{splitTime(el.loginDateTime)}</TableCell>
                  <TableCell className="alt1">{el.firstName} {el.lastName}</TableCell>
                  <TableCell className="alt1">
                    {el.firstName} {el.lastName}-{el.role}-LoggedOut:{splitDate(el.logoutDateTime)} {splitTime(el.logoutDateTime)}
                  </TableCell>
                </StyledTableRow>
              )
            }
          </TableBody>
        ) : <> </>
        }
        {reportType === ReportType.LinkCheck ? (
          <TableBody >
            {
              reports[0].map((el: any, i: any) =>
                <StyledTableRow >
                  <TableCell className="alt1">{splitDate(el.localDateTime)}</TableCell>
                  <TableCell className="alt1">{splitTime(el.localDateTime)}</TableCell>
                  <TableCell className="alt1">{el.firstname} {el.lastname}</TableCell>
                  <TableCell className="alt1">
                    Device Name:{el.deviceName}-IP Address:{el.ipAddress}-Device Type:{el.deviceType}-Status:{el.status}-Port No: {el.port}-Link Time:{el.linkTime}-Response Time:{el.responseTime}s
                  </TableCell>
                </StyledTableRow>
              )}
          </TableBody>
        ) : <></>
        }
        {reportType === ReportType.TrainTransmission ? (
          <TableBody>
            {
              reports[0].map((el: any, i: any) =>
                <StyledTableRow >
                  <TableCell className="alt1">{splitDate(el.localDateTime)}</TableCell>
                  <TableCell className="alt1">{splitTime(el.localDateTime)}</TableCell>
                  <TableCell className="alt1">{el.firstname}  {el.lastname}</TableCell>
                  <TableCell className="alt1">
                    {el.trainNo}-{el.trainName}-{el.trainNameRegional}-SAT:{el.scheuduledArrival}-SAD:{el.scheuduledDeparture}
                    {el.late}-Actual Arrival Time:{el.actualArrival}-Actual Deaparture Time:{el.actualDeparture}
                    Train Status-{el.trainStatus}
                  </TableCell>
                </StyledTableRow>
              )}
          </TableBody>
        ) : <></>
        }
        {reportType === ReportType.CgdbTransmission ? (
          <TableBody>
            {
              reports[0].map((el: any, i: any) =>
                <StyledTableRow >
                  <TableCell className="alt1">{splitDate(el.localDateTime)}</TableCell>
                  <TableCell className="alt1">{splitTime(el.localDateTime)}</TableCell>
                  <TableCell className="alt1">{el.firstname} {el.lastname}</TableCell>
                  <TableCell className="alt1">
                    PDC Port No{el.pdcPort}-Train Number{el.trainNo}-Train Name{el.trainName}-Coach Data
                  </TableCell>
                </StyledTableRow>
              )}
          </TableBody>
        ) : <></>
        }
        {reportType === ReportType.AnnouncementTransmission ? (
          <TableBody>
            {
              reports[0].map((el: any, i: any) =>
                <StyledTableRow >
                  <TableCell className="alt1">{splitDate(el.announcementTime)}</TableCell>
                  <TableCell className="alt1">{splitTime(el.announcementTime)}</TableCell>
                  <TableCell className="alt1">{el.firstname} {el.lastname}</TableCell>
                  <TableCell className="alt1">
                    {el.announcementType}-{el.announcementMessage}
                  </TableCell>
                </StyledTableRow>
              )}
          </TableBody>
        ) : <></>
        }
      </Table>
    </>
  );
};
