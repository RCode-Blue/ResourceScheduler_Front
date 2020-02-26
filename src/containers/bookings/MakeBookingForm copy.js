import React from 'react';
// import { connect } from 'react-redux';
import { Skeleton, DatePicker } from 'antd';
// import axios from 'axios';
// import * as actions from "../../store/actions";
import moment from 'moment';

const { MonthPicker, RangePicker } = DatePicker;



class MakeBookingForm extends React.Component {

  // Format:
  // {
  //   "day":"",
  //   "hour-start":"",
  //   "hour-end":"",
  //   "minute-start":"",
  //   "minute-end":""
  // }


  componentDidMount() {
    this.props.getFilteredBookings(this.props.resource.id);
  }



  enumDates = (t1, t2) =>{
    // console.log("---enum---")
    // console.log(`start: ${t1}`);
    // console.log(`end:   ${t2}`);

    let t1m = moment(t1);
    let t2m = moment(t2);
    
    let daysdiff=t2m.diff(t1m, 'days');
    // console.log(`Days difference: ${daysdiff}`)

    // console.log("start: " + moment(t1m).format("MM, D"));
    // console.log("start: " + moment(t1m).format("DD-MM-YYYY HH:mm"));
    // console.log("end:   " + moment(t2m).format("DD-MM-YYYY HH:mm"));


    // console.log("START & END DAYS:");
    let startDay = t1m.format("DD-MM-YY");
    let startHour = t1m.format("HH");
    let startMin = t1m.format("mm");

    // console.log("First Day");
    // console.log(`Start: ${startDay} ${startHour} ${startMin}`)


    // console.log("FULL DAYS:");
    // let enumDays = [];
    for(let n=0; n<daysdiff; n++){
      let newDate = moment(t1m).add(n, 'days');
      // console.log(moment(newDate).format("DD-MM-YYYY"));

    }

    // console.log("");
    // console.log("");
  }


  renderDateTimePicker = () => {
    return(
      <div>
        <DatePicker
        format="YYYY-MM-DD HH:mm:ss"
        />
      </div>
    );
  }


  renderTestData = (booking) => {
    return(
      <div key={booking.id}>
        ID:          {booking.booking.id}<br/>
        Title:       {booking.booking.title}<br/>
        Description: {booking.booking.description}<br/>
        Start:       {booking.booking.booking_start}<br/>
        End:         {booking.booking.booking_end}<br/><br/>
      </div>  
    )
  }


  renderBookingForm = (booking) => {
    // console.log(booking);
    this.enumDates(booking.booking.booking_start, booking.booking.booking_end);
    return(
      // <this.renderTestData booking={booking.booking}/>
      <DatePicker />
    );
  }




  render(){
    // console.log(this);
    if(!this.props.filteredBookingList){
      return(
        <Skeleton />
      )
    }

    return(
      this.props.filteredBookingList.map((booking) => {
        return(
          <div key={booking.id}>
            <this.renderBookingForm booking={booking}/>
          </div>  
        )
      })

    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     filteredBookingList: state.filteredBookingList
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getFilteredBookings: (id) => dispatch(actions.getFilteredBookings(id))
//   }
// }


export default (MakeBookingForm)