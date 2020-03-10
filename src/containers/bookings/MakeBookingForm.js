import React from 'react';
import { connect } from 'react-redux';
import { Skeleton, DatePicker, Button, Form, Input, Icon } from 'antd';
import axios from 'axios';
import * as actions from "../../store/actions";
import moment from 'moment';
import {reformatBookings} from "../../customScripts/bookings/bookings"

const { RangePicker } = DatePicker;



class MakeBookingForm extends React.Component {
  state = {
    fulldays: null,
    partialdays: null,
    bookingTimes: null
  }

  dayDataStart = {}
  dayDataEnd   = {}

  componentDidMount = () => {
    this.props.getFilteredBookings(this.props.resource.id)
  }
  
  componentDidUpdate(prevProps){
    if(this.props.filteredBookingList !== prevProps.filteredBookingList){
      let currentBookings = reformatBookings(this.props.filteredBookingList);
      this.setState({
        fulldays: currentBookings.fulldays,
        partialdays: currentBookings.partialdays
      })
    }
  }

  handleFormSubmit = (e) => {
    // e.preventDefault();

    const data = {
      "title": e.target.elements.title.value,
      "description":e.target.elements.description.value,
      "resource":this.props.resource.id,
      "booking_start":e.target.elements[2].value,
      "booking_end":e.target.elements[3].value,
      "organizer":this.props.userId
    }
    // axios.post('http://127.0.0.1:8000/api/bookings/', data)
    axios.post('/api/bookings/', data)
    .then(res => console.log(res))
    .catch(error => console.error(error));
  }

  onDateChange = (date, dateString) => {
      const _dates = [...this.state.partialdays]

      const foundDate_start = _dates.find(
        element => (
          element["date"] === moment(date[0]).format("YYYY-MM-DD")
        )
      )
      if(foundDate_start){
        this.dayDataStart = JSON.parse(JSON.stringify(foundDate_start));
      }


      const foundDate_end = _dates.find(
        element => (
          element["date"] === moment(date[1]).format("YYYY-MM-DD")
        )
      )
      if(foundDate_end){
        this.dayDataEnd = JSON.parse(JSON.stringify(foundDate_end));
      }
    // }
  }


  onOk = (val) => {
    this.setState({
      bookingTimes: val
    })

  }


   disabledDates = (current) => {
    const _dates = [...this.state.fulldays]

    const foundDate = _dates.find(
      element => (
        (
          element["date"] === moment(current).format("YYYY-MM-DD")
          &&
          !element["timeStartHH"]
        )
        ||
        (
          current && current < moment().endOf('day')
        )
      )
    )

    if(foundDate){
      return true;
    }
    return false;
  }


  range = (start,end) => {
    const result = [];
    for (let i = start; i < end; i++){
      result.push(i)
    }
    return result;
  }

  disabledRangeTime = (_, type) => {
    if(this.dayDataStart){
      if(type === "start"){
        return {
          disabledHours: () => 
          this.range(0,60).splice(this.dayDataStart["timeStartHH"], 
          this.dayDataStart["timeEndHH"]),
          disabledMinutes: () => 
          this.range(0,60).splice(this.dayDataStart["timeStartMM"],
          this.dayDataStart["timeEndMM"])
        }
      }
    }
    if(this.dayDataEnd){
      if(type === "end"){
        return {
          disabledHours: () => 
          this.range(0,60).splice(this.dayDataEnd["timeStartHH"],
          this.dayDataEnd["timeEndHH"]),
          disabledMinutes: () =>
          this.range(0,60).splice(this.dayDataEnd["timeStartMM"],
          this.dayDataEnd["timeEndMM"])
        }
      }
    }
  }


  render(){
    console.log(this);
    if(!this.props.filteredBookingList){
      return(
        <Skeleton />
      )
    }

    return(
      <div>
        <Form onSubmit = {this.handleFormSubmit}>

          <Form.Item label="Title">
            <Input
            prefix={
              <Icon
              type="file"
              style={
                { color: 'rgba(0,0,0,.25)' }
              }
              />
            }
            name="title"
            placeholder="Title"
            />
          </Form.Item>

          <Form.Item label="Description">
            <Input 
            prefix={
              <Icon
              type="file-text"
              style={
                {color: 'rgba(0,0,0,.25'}
              }
              />
            }
            name="description"
            placeholder="Description"
            />
          </Form.Item>

          <Form.Item label="Dates & Times">
            <RangePicker 
            onChange={this.onDateChange}
            format="YYYY-MM-DD HH:mm"
            showTime  = {{
              format: "HH:mm",
              minuteStep: 15
            }}
            name="bookingtimes"
            placeholder={["Booking Start", "Booking End"]}
            onOk={this.onOk}
            disabledDate = {this.disabledDates}
            disabledTime = {this.disabledRangeTime}
            />
          </Form.Item>

          <br/><br/>
        
          <Form.Item>
            <Button 
            type="primary" 
            htmlType="submit"
            size="default">
              Create
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filteredBookingList: state.filteredBookingList
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getFilteredBookings: (resourceid) => dispatch(
      actions.getFilteredBookings(resourceid))
  }
}


export default connect(mapStateToProps, mapDispatchToProps) (MakeBookingForm);