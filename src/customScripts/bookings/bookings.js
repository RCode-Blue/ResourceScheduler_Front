import moment from 'moment';

let initialDayData = {
  "date":        null, 
  "timeStartHH": null, 
  "timeEndHH":   null, 
  "timeStartMM": null, 
  "timeEndMM":   null, 
  "timeStartss": null, 
  "timeEndss":   null
}


const processBookingDates = (t1m, t2m) => {
  // console.log(`t1m: ${moment(t1m).format("YYYY-MM-DD")}`);
  // console.log(`t2m: ${moment(t2m).format("YYYY-MM-DD")}`);

  const daysDiff = t2m.diff(t1m, "days");

  const hoursDiff = t2m.diff(t1m, "hours");
  // console.log(`-----${hoursDiff}-----`);
  if((hoursDiff<48 && hoursDiff>24) 
    ||
    (moment(t1m).format("YYYY-MM-DD") !== moment(t2m).format("YYYY-MM-DD"))){
    return daysDiff+1;
  }

  return daysDiff
}

const enumPartialDayStart = (t1m) => {
  // console.log("Start Day:");
  // console.log(`Day:     ${moment(t1m).format("DD")}`);
  // console.log(`Minutes: ${moment(t1m).format("mm")}`);
  // console.log(`Seconds: ${moment(t1m).format("ss")}`);

  let dayData = JSON.parse(JSON.stringify(initialDayData));
  dayData["date"]        = moment(t1m).format("YYYY-MM-DD")
  dayData["timeStartHH"] = moment(t1m).format("HH");
  dayData["timeEndHH"]   = "24";
  dayData["timeStartMM"] = moment(t1m).format("MM");
  dayData["timeEndMM"]   = "60";
  dayData["timeStartss"] = moment(t1m).format("ss");
  dayData["timeEndss"]   = "60";

  return dayData;
}


const enumPartialDayEnd = (t2m) => {
  let dayData = JSON.parse(JSON.stringify(initialDayData));
  // console.log("End day");
  // console.log(`Day:     ${moment(t2m).format("DD")}`);
  // console.log(`Minutes: ${moment(t2m).format("mm")}`);
  // console.log(`Seconds: ${moment(t2m).format("ss")}`);

  dayData["date"]        = moment(t2m).format("YYYY-MM-DD")
  dayData["timeStartHH"] = "00";
  dayData["timeEndHH"]   = moment(t2m).format("HH");
  dayData["timeStartMM"] = "00";
  dayData["timeEndMM"]   = moment(t2m).format("MM");
  dayData["timeStartss"] = "00";
  dayData["timeEndss"]   = moment(t2m).format("ss");
  return dayData;
}


const enumSameDay = (t1m, t2m) => {
  let dayData = JSON.parse(JSON.stringify(initialDayData));

  dayData["date"]        = moment(t1m).format("YYYY-MM-DD")
  dayData["timeStartHH"] = moment(t1m).format("HH");
  dayData["timeEndHH"]   = moment(t2m).format("HH");
  dayData["timeStartMM"] = moment(t1m).format("MM");
  dayData["timeEndMM"]   = moment(t2m).format("MM");
  dayData["timeStartss"] = moment(t1m).format("ss");
  dayData["timeEndss"]   = moment(t2m).format("ss");
  return dayData;
}

const enumFullDays = (t1m, daysDiff) => {
  let fulldays = [];
  // console.log("enumFullDays");

    for(let n=1; n<daysDiff; n++){
      // console.log(n);
      let dayData = JSON.parse(JSON.stringify(initialDayData));
      let newDate = moment(t1m).add(n, 'days');
      dayData["date"] = moment(newDate).format("YYYY-MM-DD");
      fulldays.push(dayData);
    }
  return fulldays;

}

export const reformatBookings = (bookings) => {
    // console.log(bookings);
    let bookingFullDays = [];
    let bookingPartialDays = [];
    
    bookings.map(
      booking => {
        // console.log("");
        // let bookingData = {};

        let t1m = moment(booking["booking_start"]);
        let t2m = moment(booking["booking_end"]);
        
        let daysDiff = processBookingDates(t1m, t2m);
        // console.log(`${booking.id}: ${daysDiff} days difference`)

        if(daysDiff > 1){
          // console.log(`${booking.id}: 2 or more days`);
          let fulldays = enumFullDays(t1m, daysDiff);
          fulldays.map(fullday=>bookingFullDays.push(fullday));
          

          let partialDayStart = enumPartialDayStart(t1m);
          bookingPartialDays.push(partialDayStart);

          // enumPartialDayEnd(t2m);
          let partialDayEnd = enumPartialDayEnd(t2m);
          bookingPartialDays.push(partialDayEnd);
        }

        else if(daysDiff === 1){
          // console.log(`${booking.id}: One day`);
          // console.log(moment(t1m).format("YYYY-MM-DD : hh:ss"));
          // console.log(moment(t2m).format("YYYY-MM-DD : hh:ss"));
          if(
            (moment(t1m).format("HH"))==="00" 
            && 
            (moment(t2m).format("HH"))==="00"){
            // console.log(`${booking.id}: Match!!`);
            let allDay = enumFullDays(t1m, daysDiff);
            // console.log(allDay);
            bookingFullDays.push(allDay[0]);
            return null;
          }
          
          let partialDayStart = enumPartialDayStart(t1m);
          let partialDayEnd   = enumPartialDayEnd(t2m);
          bookingPartialDays.push(partialDayStart);
          bookingPartialDays.push(partialDayEnd);

        }

        else if(daysDiff === 0){
          // console.log(`${booking.id}: Same day`);
          let partialDay = enumSameDay(t1m,t2m);
          bookingPartialDays.push(partialDay);
        }
      return null;
      }
    )




    // console.log(bookingFullDays);
    // console.log(bookingPartialDays);

    return({
      "fulldays":    bookingFullDays,
      "partialdays": bookingPartialDays
    });
  }




// export const anotherfunction = (val) => {
//   console.log(val)
// }

// export default (reformatBookings, anotherfunction);
// export default reformatBookings;