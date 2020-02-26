import React from 'react';
import { Form, Button, Input, DatePicker, Select } from 'antd';
import axios from 'axios';

const { Option } = Select;

class BookingCreateUpdateForm extends React.Component {
  // console.log(this.props);
  // const dateFormat = 'YYYY/MM/DD';
  state=({
    resources: [],
    // resourceName: null,
    // titleDefaultValue: null,
    // descriptionDefaultValue: null,
    // startDefaultValue: null,
    // endDefaultValue: null
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
    // console.log(e.target.elements);
    // console.log ("Type:        " + type);
    // console.log ("bookingID:   " + bookingID);
    // console.log ("Title:       " + e.target.elements.title.value);
    // console.log ("Description: " + e.target.elements.description.value);
    // console.log ("Resource:    " + this.props.booking.resource.id)
    // console.log ("Start:       " + e.target.elements.startDateTime.value);
    // console.log ("End:         " + e.target.elements.endDateTime.value);


    // switch(this.props.requestType){
    //   case "post":
    //     return axios.post("http://127.0.0.1:8000/api/resources/")
    //     .then(res => {
    //       this.setState({
    //         resources: res.data
    //       });
    //     });

    //   case "put":
    //     // edit
    //     return axios.put(`http://127.0.0.1:8000/api/resources/${bookingID}/`,{
    //       title:e.target.elements.title.value,
    //       description:e.target.elements.description.value,
    //       resource:this.props.booking.resource.id,
    //       booking_start:e.target.elements.startDateTime.value,
    //       booking_end:e.target.elements.endDateTime.value
    //     })
    //     // console.log("edit");
    //     // return this.setState({
    //     //   resourceName:this.props.booking.resource_name
    //     // })

    //   default:
    //     return null;
    // }

  }


  renderResource = () => {
    switch(this.props.requestType){
      case "post":
        // create new
        return(
          <Select 
          style = {{width: 240}} 
          placeholder="Resource (post)"
            // value={this.props.booking.resource_name}
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
            // value={this.props.booking.resource_name}
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
    // console.log(this);
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
            />
          </Form.Item>

          <Form.Item label="End">
            <DatePicker 
            showTime
            name="endDateTime"
            placeholder="Choose booking end"
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