import React from 'react';
import axios from 'axios';
// import moment from 'moment';

import { Collapse, Button } from 'antd';
import BookingDetails from "../../components/bookings/BookingDetail";
// import BookingUpdateDeleteForm from "../../components/bookings/BookingUpdateDelete";
import BookingCreateUpdateForm from "../../components/bookings/BookingCreateUpdate";

class BookingDetailView extends React.Component {

  state = {
    booking: []
  }

  componentDidMount(){
    const bookingID = this.props.match.params.bookingID
    // axios.get(`http://127.0.0.1:8000/api/bookings/${bookingID}/`)
    axios.get(`/api/bookings/${bookingID}/`)
      .then(res => {
        // console.log(res);
        this.setState({
          booking: res.data
        })
      })
  }


  handleDelete = (e) => {
    // e.preventDefault();
    // console.log(this.props.match.params.bookingID);
    const bookingID = this.props.match.params.bookingID
    axios.delete(`/api/bookings/${bookingID}/`);
    this.props.history.push("/");
    this.forceUpdate()
      .then(res => console.log(res))
      .catch(error => console.error(error));
    this.props.historu.push("/bookings/");
  }



  render() {
    // console.log(this);
    return(
      <div>
        <BookingDetails data={this.state.booking}/>
        <br/>
        <h2>Edit Booking</h2>
        <Collapse>
          <Collapse.Panel header="Edit">
            <BookingCreateUpdateForm
            requestType="put"
            bookingID={this.props.match.params.bookingID}
            booking={this.state.booking}
            btnText="Update"

            resourceName = {this.state.booking.resource_name}
            titleDefaultValue  = {this.state.booking.title}
            descriptionDefaultValue = {this.state.booking.description}
            // startDefaultValue = {moment(this.state.booking.booking_start).format("YYYY-MM-DD")}
            startDefaultValue = {this.state.booking.booking_start}
            // endDefaultValue = {moment(this.state.booking.booking_end).format("YYYY-MM-DD")}
            endDefaultValue = {this.state.booking.booking_end}
            />
          
            <form onSubmit={this.handleDelete}>
              <Button 
              type="danger" 
              htmlType="submit">
                Delete
              </Button>
            </form>
          </Collapse.Panel>
        </Collapse>

      </div>
    )
  }
}

export default BookingDetailView;