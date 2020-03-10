import React from 'react';
// import { connect } from 'react-redux';
import axios from 'axios';

// import * as actions from "../../store/actions/index";

import { Form, Input, Button, Icon, Select, Spin, Skeleton } from 'antd';
const { Option } = Select;



class ResourceCreateUpdateForm extends React.Component {
  state={
    dropdownChoice: this.props.resourceDetails? this.props.resourceDetails.organisation : null
  }

  handleDropdownChange = (val) => {
    this.setState({
      dropdownChoice: val
    })
  }

  handleFormSubmit = (e, type, resourceID) => {
    e.preventDefault();

    const requestData = {
      "name":e.target.elements.name.value,
      "description":e.target.elements.description.value,
      "organisation":this.state.dropdownChoice
    }

    switch(type){
      case 'post':
        // return axios.post("http://127.0.0.1:8000/api/resources/", requestData)
        return axios.post("/api/resources/", requestData)
        .then(res => console.log(res))
        .catch(error => console.error(error));
      
      case 'put':
        // return axios.put(`http://127.0.0.1:8000/api/resources/${resourceID}/`, requestData)
        return axios.put(`/api/resources/${resourceID}/`, requestData)
        .then(res => console.log(res))
        .catch(error => console.error(error));
      
      default:
        return("");
    }
  }

  renderOrgs = () => {
    if(!this.props.orgList){
      return(
        <Spin />
      )
    }
    return(
      <Select
      style={{width: 480}}
      placeholder="Organisation"
      name="org"
      onChange={this.handleDropdownChange}
      >
        {this.props.orgList.map(org => (
          <Option
          key={org.id}
          value={org.id}>
          {org.name}
          </Option>
        ))}
      </Select>
    )
  }

  renderOrgsPut = () => {
    if(!this.props.orgList){
      return(
        <Spin />
      )
    }
    return(
      <Select
      defaultValue={this.props.resourceDetails.organisation}
      style={{width: 480}}
      placeholder="Organisation"
      name="org"
      onChange={this.handleDropdownChange}
      >
        {this.props.orgList.map(org => (
          <Option
          key={org.id}
          value={org.id}>
          {org.name}
          </Option>
        ))}
      </Select>
    )
  }

  renderPost = () => {
    return (
      <div>
        <Form onSubmit={(e) => this.handleFormSubmit(
          e, 
          this.props.requestType,
          this.props.resourceID)}>

          <Form.Item label="Name">
            <Input 
            prefix={
              <Icon
              type="edit"
              style={
                { color: 'rgba(0,0,0,0.25)'}
              }/>
            }
            name="name" 
            placeholder="Resource name" />
          </Form.Item>

          <Form.Item label="Description">
            <Input 
            prefix={
              <Icon
              type="edit"
              style={
                { color: 'rgba(0,0,0,0.25)'}
              }/>
            }
            name="description" 
            placeholder="Resource description" />
          </Form.Item>

          <Form.Item label="Organisation">
            <this.renderOrgs />
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


  renderPut = () => {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form onSubmit={(e) => this.handleFormSubmit(
          e, 
          this.props.requestType,
          this.props.resourceID)}>

          {/* Reource Name Field */}
          <Form.Item label="Name">
            {getFieldDecorator(
              'name',{
                rules: [{
                  required: true,
                  message: "Resource name"
                }],
                initialValue:[this.props.resourceDetails.name]
              })
              (
              <Input name="name" placeholder="Resource name" />
              )}
            </Form.Item>

          {/* Resource Description Field */}
          <Form.Item label="Description">
            {getFieldDecorator(
              'description',{
                rules: [{
                  message: "Resource description"
                }],
                initialValue:[this.props.resourceDetails.description]
              }
            )(<Input 
              name="description" 
              placeholder="Resource description" />
            )}
          </Form.Item>

          <Form.Item label="Organisation">
            <this.renderOrgsPut />
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

  
  render() {
    // console.log(this);
    if(this.props.requestType === "put"){
      return(
        <this.renderPut/>
      );
    }

    if(this.props.requestType === "post"){
      return(
        <this.renderPost/>
      )
    }
    return(
      <Skeleton/>
    )

  }
}



const WrappedResourceCreateUpdateForm = Form.create({
  name: "resourceCreateUpdate"
})(ResourceCreateUpdateForm)

export default (WrappedResourceCreateUpdateForm);