export function formatDate(dateObj: string) {
    var loginDate = new Date(dateObj);
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
    var date = month[loginDate.getMonth()] + ' ' + loginDate.getDate() + ',' + loginDate.getFullYear();
    return date;
}

export function formatTime(timeObj: string) {
    var timesplit = new Date(timeObj);
    var time = timesplit.getHours() + ':' + timesplit.getMinutes() + ':' + timesplit.getSeconds();
    return time;
}

export function formatTimeMinutes(timeObj: string) {
    var timesplit = new Date(timeObj);
    var time = timesplit.getHours() + ':' + timesplit.getMinutes();
    return time;
}

export const splitDate= (dateObj: string): string => {
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
export  const splitTime= (timeObj: string): string => {
    var timesplit= new Date(timeObj);
    var time = timesplit.getHours()+':'+timesplit.getMinutes()+':'+timesplit.getSeconds();
    return time;
  }


// }