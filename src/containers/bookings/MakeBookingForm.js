import React from 'react';
import { connect } from 'react-redux';
import { Skeleton, DatePicker, Button, Form, Input, Icon } from 'antd';
import axios from 'axios';
import * as actions from "../../store/actions";
import moment from 'moment';
// import {reformatBookings, anotherfunction} from "../../customScripts/bookings/bookings"
import {reformatBookings} from "../../customScripts/bookings/bookings"
// import { changeConfirmLocale } from 'antd/lib/modal/locale';

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
      // console.log("WE Have Bookings!!!");
      let currentBookings = reformatBookings(this.props.filteredBookingList);
      // console.log(currentBookings.fulldays);
      this.setState({
        fulldays: currentBookings.fulldays,
        partialdays: currentBookings.partialdays
      })
    }
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    // console.log("Submitted");
    // console.log(e.target.elements);
    // console.log("----------");
    // console.log(`title:         ${e.target.elements.title.value}`)
    // console.log(`description:   ${e.target.elements.description.value}`)
    // console.log(`resource:      ${this.props.resource.id}`)
    // console.log(`booking_start: ${e.target.elements[2].value}`)
    // console.log(`booking_end:   ${e.target.elements[3].value}`)

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
    // console.log(date[0], dateString[0]);
    // console.log(date[1], dateString[1]);

    // console.log(moment(date[0]).format("HH:mm"));


    // let dayDataStart = JSON.parse(JSON.stringify(initialDayData));
    // let dayDataEnd   = JSON.parse(JSON.stringify(initialDayData));

    // const _dates = (date) => {
      const _dates = [...this.state.partialdays]

      const foundDate_start = _dates.find(
        element => (
          element["date"] === moment(date[0]).format("YYYY-MM-DD")
        )
      )
      if(foundDate_start){
        // console.log(foundDate_start);
        this.dayDataStart = JSON.parse(JSON.stringify(foundDate_start));
        // console.log(this.dayDataStart)
      }


      const foundDate_end = _dates.find(
        element => (
          element["date"] === moment(date[1]).format("YYYY-MM-DD")
        )
      )
      if(foundDate_end){
        // console.log(foundDate_end);
        this.dayDataEnd = JSON.parse(JSON.stringify(foundDate_end));
        // console.log(this.dayDataEnd)
      }
    // }
  }


  onOk = (val) => {
    // console.log(val);
    // console.log(val[0]);
    // console.log(val[1]);

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
      // console.log(`Matched: ${foundDate}`)
      return true;
    }
    return false;
    // #region
    // const date1 = "2020-02-20";
    // const date2 = "2020-02-24";
    // const date3 = "2020-02-26";

    // let momentVal = moment(current).format("YYYY-MM-DD")
    // console.log(momentVal);
    // console.log(typeof(momentVal));

    // return current && current.valueOf() === moment("2020-02-18");
    // if (moment(current).format("YYYY-MM-DD") == moment(date1)){
    // if (moment(current).format("YYYY-MM-DD") == date1){
    //   console.log(
    //     `Match: ${date1} = ${moment(current).format("YYYY-MM-DD")}`);
    //   return true;
    // }

    // if (moment(current).format("YYYY-MM-DD") == date2){
    //   console.log(
    //     `Match: ${date2} = ${moment(current).format("YYYY-MM-DD")}`);
    //   return true;
    // }

    // if (moment(current).format("YYYY-MM-DD") == date3){
    //   console.log(
    //     `Match: ${date3} = ${moment(current).format("YYYY-MM-DD")}`);
    //   return true;
    // }
    // else{
    //   return false;
    // }
    // #endregion
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