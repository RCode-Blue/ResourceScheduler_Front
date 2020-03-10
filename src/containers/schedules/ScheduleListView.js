import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { Skeleton } from 'antd';

import * as actions from "../../store/actions";
import Bookings from "../../components/bookings/Booking";

class ScheduleList extends React.Component {
  state = {
    workingBookingList: []
  }


  makeFilteredBookingList = (bookingList, id) => {
    let tempBookingList = []
    bookingList.map(booking => {
      if(booking.organizer === id 
        &&
        moment(booking.booking_end).isAfter(moment())){
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
