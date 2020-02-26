import React from 'react';
import { connect } from 'react-redux';
import { Select, Skeleton } from 'antd';

import * as actions from "../../store/actions"

import Bookings from "../../components/bookings/Booking";
// import BookingCreateUpdateForm from "../../components/bookings/BookingCreateUpdate";

const { Option } = Select;

class BookingList extends React.Component {
  componentDidMount(){
    this.props.getOrgs();
    this.props.getResources();
    this.props.getBookings();
  }


  renderDropdown = () => {
    const { resources } = this.state;
    return(
      <Select
      style={{ width: 240 }}>
        {resources.map(resource =>(
          <Option key={resource.id}>{resource.name}</Option>
        ))}
      </Select>
    )
  }


  render() {
    // console.log(this);
    if(this.props.bookingList===null){
      return(
        <Skeleton/>
      )
    }

    return(
      <div>
        <Bookings data={this.props.bookingList}/>
        
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    orgList:      state.orgList,
    bookingList:  state.bookingList,
    resourceList: state.resourceList,
    userId:       state.userId
  }
}


const mapDispatchToProps = dispatch => {
  return {
    getOrgs:      () => dispatch(actions.getOrgs()),
    getBookings:  () => dispatch(actions.getBookings()),
    getResources: () => dispatch(actions.getResources())
  }
}


// export default BookingList;

export default connect(mapStateToProps, mapDispatchToProps)(BookingList);