import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { Skeleton } from 'antd';

import * as actions from "../../store/actions";
// import Schedules from "../../components/schedules/schedule";
import Bookings from "../../components/bookings/Booking";

class ScheduleList extends React.Component {
  state = {
    workingBookingList: []
  }


  onPanelChange = (value, mode) => {
    // console.log(value);
    // console.log(mode);
  }

  onSelect = (value) => {
    // console.log(value);
  }


  makeFilteredBookingList = (bookingList, id) => {
    let tempBookingList = []
    bookingList.map(booking => {
      if(booking.organizer === id 
        &&
        moment(booking.booking_end).isAfter(moment())){
        // console.log(booking);
        tempBookingList.push(booking);
      }

      return null;
    })
    this.setState({
      workingBookingList: tempBookingList
    })
  }



  componentDidMount(){
    this.props.getBookings();
  }

  componentDidUpdate(prevProps){
    if(this.props.bookingList !== prevProps.bookingList){
      this.makeFilteredBookingList(this.props.bookingList, this.props.userid);
    }
  }
  render() {
    // console.log(this);
    if(!this.state.workingBookingList){
      return(
        <Skeleton />
      )
    }
    return(
      <div>
        
        <Bookings data={this.state.workingBookingList}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    bookingList: state.bookingList,
    userid: state.userId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBookings: () => dispatch(actions.getBookings())
  }
}


export default connect (mapStateToProps, mapDispatchToProps) (ScheduleList);
