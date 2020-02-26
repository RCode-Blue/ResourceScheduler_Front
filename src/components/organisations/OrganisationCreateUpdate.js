import React from 'react';
import { Form, Input, Button, Icon, Skeleton } from 'antd';

import axios from 'axios';

class OrgCreateUpdateForm extends React.Component {

  handleFormSubmit = (e, type, organisationID) => {
    e.preventDefault();

    // console.log(e.target.elements);

    const requestData = {
      "name": e.target.elements.orgName.value,
      "description": e.target.elements.orgDescription.value,
	    "address_line1": e.target.elements.orgAddressLine1.value,
      "address_line2": e.target.elements.orgAddressLine2.value,
      "suburb": e.target.elements.orgSuburb.value,
      "state": e.target.elements.orgState.value,
      "postcode": e.target.elements.orgPostcode.value,
      "country": e.target.elements.orgCountry.value
    }

    // console.log(requestData);

    // #region
    // const orgName = e.target.elements.orgName.value;
    // const orgDescription = e.target.elements.orgDesc.value;

    switch(type){
      case 'post':
        // console.log("post");
      // return axios.post("http://127.0.0.1:8000/api/org/", requestData)
      return axios.post("/api/org/", requestData)
        .then(res => console.log(res))
        .catch(error => console.error(error));

      case 'put':
        // console.log("put");
        // return axios.put(`http://127.0.0.1:8000/api/org/${organisationID}/`, requestData)
        return axios.put(`/api/org/${organisationID}/`, requestData)
          .then(res => console.log(res))
          .catch(error => console.error(error));

      default:
        return null;
    }
    // #endregion
  }

    renderPost = () => {
      return(
        <div>
          <Form onSubmit={(e) => this.handleFormSubmit(
            e,
            this.props.requestType,
            this.props.organisationID )}>
              <Form.Item label="Name">
                <Input name="orgName" 
                placeholder="organisation name" />
              </Form.Item>

              <Form.Item label="Description">
                <Input name="orgDescription" 
                placeholder="description of your organisation" />
              </Form.Item>

              <Form.Item label="Address Line 1">
                <Input name="orgAddressLine1" 
                placeholder="Address (Line 1)" />
              </Form.Item>
              
              <Form.Item label="Address Line 2">
                <Input name="orgAddressLine2" 
                placeholder="Address (Line 2)" />
              </Form.Item>

              <Form.Item label="Suburb">
                <Input name="orgSuburb" 
                placeholder="Suburb" />
              </Form.Item>

              <Form.Item label="State">
                <Input name="orgState" 
                placeholder="State" />
              </Form.Item>

              <Form.Item label="Postcode">
                <Input name="orgPostcode" 
                placeholder="Postcode" />
              </Form.Item>

              <Form.Item label="Country">
                <Input name="orgCountry" 
                placeholder="Country" />
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
      )
    }

    renderPut = () => {
      const { getFieldDecorator } = this.props.form;
      return (
        <div>
          <Form onSubmit={(e) => this.handleFormSubmit(
            e,
            this.props.requestType,
            this.props.organisationID )}>
            
            {/* Organisation Name Field */}
            <Form.Item label="Name">
              {getFieldDecorator(
                'orgName',{
                  rules: [{
                    required: true,
                    message: "Organisation name"
                  }],
                initialValue:[this.props.orgDetails.name]
              })(
              <Input 
              prefix={
                <Icon 
                type="home"
                style={
                  { color: 'rgba(0,0,0,.25)' }
                }/>
              }
              name="orgName" 
              placeholder="organisation name" 
              />
              )}
            </Form.Item>
            
            
            {/* Description Field */}
            <Form.Item label="Description">
              {getFieldDecorator('orgDescription',{
                rules: [{
                  required: false,
                  message: "Description"
                }],
                initialValue:[this.props.orgDetails.description]
              })(
              <Input 
              prefix={
                <Icon 
                type="align-left"
                style={
                  { color: 'rgba(0,0,0,.25)' }
                }/>
              }
              name="orgDescription" 
              placeholder="organisation description" 
              />
              )}
            </Form.Item>


            {/* Address (line 1) Field */}
            <Form.Item label="Address Line 1">
              {getFieldDecorator('orgAddressLine1',{
                rules: [{
                  required: false,
                  message: "Address Line 1"
                }],
                initialValue:[this.props.orgDetails.address_line1]
              })(
              <Input 
              prefix={
                <Icon 
                type="profile"
                style={
                  { color: 'rgba(0,0,0,.25)' }
                }/>
              }
              name="orgAddressLine1" 
              placeholder="organisation address line 1" 
              />
              )}
            </Form.Item>


            {/* Address (line 2) Field */}
            <Form.Item label="Address Line 2">
              {getFieldDecorator('orgAddressLine2',{
                rules: [{
                  required: false,
                  message: "Address Line 2"
                }],
                initialValue:[this.props.orgDetails.address_line2]
              })(
              <Input 
              prefix={
                <Icon 
                type="profile"
                style={
                  { color: 'rgba(0,0,0,.25)' }
                }/>
              }
              name="orgAddressLine2" 
              placeholder="organisation address line 2" 
              />
              )}
            </Form.Item>


            {/* Address (Suburb) Field */}
            <Form.Item label="Suburb">
              {getFieldDecorator('orgSuburb',{
                rules: [{
                  required: false,
                  message: "Suburb"
                }],
                initialValue:[this.props.orgDetails.suburb]
              })(
              <Input 
              prefix={
                <Icon 
                type="profile"
                style={
                  { color: 'rgba(0,0,0,.25)' }
                }/>
              }
              name="orgSuburb" 
              placeholder="Suburb" 
              />
              )}
            </Form.Item>


            {/* Address (State) Field */}
            <Form.Item label="State">
              {getFieldDecorator('orgState',{
                rules: [{
                  required: false,
                  message: "State"
                }],
                initialValue:[this.props.orgDetails.state]
              })(
              <Input 
              prefix={
                <Icon 
                type="profile"
                style={
                  { color: 'rgba(0,0,0,.25)' }
                }/>
              }
              name="orgState" 
              placeholder="State" 
              />
              )}
            </Form.Item>


            {/* Address (Postcode) Field */}
            <Form.Item label="Postcode">
              {getFieldDecorator('orgPostcode',{
                rules: [{
                  required: false,
                  message: "Postcode"
                }],
                initialValue:[this.props.orgDetails.postcode]
              })(
              <Input 
              prefix={
                <Icon 
                type="profile"
                style={
                  { color: 'rgba(0,0,0,.25)' }
                }/>
              }
              name="orgPostcode" 
              placeholder="Postcode" 
              />
              )}
            </Form.Item>


            {/* Address (Country) Field */}
            <Form.Item label="Country">
              {getFieldDecorator('orgCountry',{
                rules: [{
                  required: false,
                  message: "Country"
                }],
                initialValue:[this.props.orgDetails.country]
              })(
              <Input 
              prefix={
                <Icon 
                type="profile"
                style={
                  { color: 'rgba(0,0,0,.25)' }
                }/>
              }
              name="orgCountry" 
              placeholder="Country" 
              />
              )}
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
    // const { getFieldDecorator } = this.props.form;

    if(this.props.requestType === "put"){
      return(
        <this.renderPut/>
      )
    }

    if(this.props.requestType === "post"){
      return(
        <this.renderPost />
      )
    }

    return (
      <div>
        <Skeleton />
      </div>
    );
  }
}


const WrappedOrgCreateUpdateForm = Form.create({
  name: "orgCreateUpdate"
})(OrgCreateUpdateForm)

export default WrappedOrgCreateUpdateForm;
