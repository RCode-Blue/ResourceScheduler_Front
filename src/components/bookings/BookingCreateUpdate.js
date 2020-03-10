import React from 'react';
import { Form, Button, Input, DatePicker, Select } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Option } = Select;

class BookingCreateUpdateForm extends React.Component {
  state=({
    resources: [],
  })

  componentDidMount(){
    // axios.get("http://127.0.0.1:8000/api/resources/")
    axios.get("/api/resources/")
    .then(res => {
      // console.log(res);
      this.setState({
        resources: res.data,
        });
    })
  }


  handleFormSubmit = (e, type, bookingID) => {
    e.preventDefault();

    switch(type){
      case "post":
        // return axios.post("http://127.0.0.1:8000/api/bookings/")
        return axios.post("/api/bookings/")
        .then(res => {
          this.setState({
            resources: res.data
          });
        });

      case "put":
        // edit
        const request = {
          "title":e.target.elements.title.value,
          "description":e.target.elements.description.value,
          "resource":this.props.booking.resource,
          "booking_start":e.target.elements.startDateTime.value,
          "booking_end":e.target.elements.endDateTime.value
        }
        // return axios.put(`http://127.0.0.1:8000/api/bookings/${bookingID}/`,request);
        return axios.put(`/api/bookings/${bookingID}/`,request);
      default:
        return null;
    }
  }


  renderResource = () => {
    switch(this.props.requestType){
      case "post":
        // create new
        return(
          <Select 
          style = {{width: 240}} 
          placeholder="Resource (post)"
          name="resource"  
          >
            {this.state.resources.map(resource => (
              <Option 
              key={resource.id} 
              value={resource.id}>
                {resource.name}
              </Option>
            ))}
          </Select>
        )

      case "put":
        // edit
        return(
          <Input
            name="resource"  
            placeholder="Resource (put)"
            value={this.props.booking.resource_name}
          />
        )
      default:
        return null;
    }
  }

  render(){
    const titleDefaultValue=this.props.titleDefaultValue;

    return(
      <div>
        <Form onSubmit={(e) => this.handleFormSubmit(
          e, 
          this.props.requestType, 
          this.props.bookingID)}>

          <Form.Item label="Title">
            <Input name="title"
              placeholder="Booking title"
              defaultValue={titleDefaultValue}
            />
          </Form.Item>
          
          <Form.Item label="Description">
            <Input name="description"
              placeholder="Booking Description"
              defaultValue={this.props.descriptionDefaultValue}
            />
          </Form.Item>
          
          <Form.Item label="Resource">
            <this.renderResource/>
          </Form.Item>

          <Form.Item label="Start">
            <DatePicker 
            showTime
            name="startDateTime"
            placeholder="Choose booking start"
            defaultValue={moment(this.props.startDefaultValue)}
            />
          </Form.Item>

          <Form.Item label="End">
            <DatePicker 
            showTime
            name="endDateTime"
            placeholder="Choose booking end"
            defaultValue={moment(this.props.endDefaultValue)}
            />
          </Form.Item>

          <Form.Item>
            <Button 
            type="primary"
            htmlType="submit">
              {this.props.btnText}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default BookingCreateUpdateForm;