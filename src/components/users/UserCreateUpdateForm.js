import React from 'react';
import { Form, Input, Button, Icon, Empty } from 'antd';




class UserUpdateForm extends React.Component {
  handleFormSubmit = (e, type, userID) => {
    e.preventDefault();
    // console.log(e.target.elements);
  
    // const firstName     = e.target.elements.firstName.value;
    // const middleName    = e.target.elements.middleName.value;
    // const lastName      = e.target.elements.lastName.value;
    // const preferredName = e.target.elements.preferredName.value;
  
    // console.log("First Name:     " + firstName);
    // console.log("Middle Name:    " + middleName);
    // console.log("Last Name:      " + lastName);
    // console.log("Preferred Name: " + preferredName);
  }



  renderUpdateForm = () => {
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
        <Form
        onSubmit={(e) => this.handleFormSubmit(
          e,
          this.props.requestType,
          this.props.userID)}>
          
          {/* First Name Field */}
          <Form.Item label="First Name">
            {getFieldDecorator(
              "first_name",
              {
                rules:[{
                  message: "First Name"
                }],
                initialValue:[this.props.userDetails.first_name]
              }
            )(
              <Input name="firstName"
              prefix={
                <Icon type="edit"
                style={{color:"rgba(0,0,0,.25"}}
                />
              }
              placeholder="First Name"
              />
            )}
          </Form.Item>
          
          
          {/* Middle Name Field */}
          <Form.Item label="Middle Name">
            {getFieldDecorator(
              "middle_name",
              {
                rules:[{
                  message: "Middle Name"
                }],
                initialValue:[this.props.userDetails.middle_name]
              }
            )(
              <Input name="middleName"
              prefix={
                <Icon type="edit"
                defaultValue=""
                style={{color:"rgba(0,0,0,.25"}}
                />
              }
              placeholder="Middle Name"
              />
            )}
          </Form.Item>


          {/* Last Name Field */}
          <Form.Item label="Last Name">
            {getFieldDecorator(
              "last_name",
              {
                rules:[{
                  message: "Last Name"
                }],
                initialValue:[this.props.userDetails.last_name]
              }
            )(
              <Input name="lastName"
              prefix={
                <Icon type="edit"
                style={{color:"rgba(0,0,0,.25"}}
                />
              }
              placeholder="Last Name"
              />
            )}
          </Form.Item>


          {/* Preferred Name Field */}
          <Form.Item label="Preferred Name">
            {getFieldDecorator(
              "preferred_name",
              {
                rules:[{
                  message: "Preferred Name"
                }],
                initialValue:[this.props.userDetails.preferred_name]
              }
            )(
              <Input name="preferredName"
              prefix={
                <Icon type="edit"
                style={{color:"rgba(0,0,0,.25"}}
                />
              }
              placeholder="Preferred Name"
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

  renderCreateForm = () => {
    return(
      <div>
        <Form
        onSubmit={(e) => this.handleFormSubmit(
          e,
          this.props.requestType,
          this.props.userID)}>
          
          {/* First Name Field */}
          <Form.Item label="First Name">
            <Input name="firstName"
            placeholder="First Name"/>
          </Form.Item>
          
          
          {/* Middle Name Field */}
          <Form.Item label="Middle Name">
            <Input name="middleName"
            placeholder="Middle Name"/>
          </Form.Item>


          {/* Last Name Field */}
          <Form.Item label="Last Name">
            <Input name="lastName"
            placeholder="Last Name"/>
          </Form.Item>

          {/* Preferred Name Field */}
          <Form.Item label="Preferred Name">
            <Input name="preferredName"
            placeholder="Preferred Name"/>
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

  render(){
    // console.log(this);
    // const { getFieldDecorator } = this.props.form;
    if(this.props.requestType === "put"){
      return(
        <this.renderUpdateForm />
      );
    }

    else if(this.props.requestType === "post"){
      return(
        <this.renderCreateForm />
      );
    }

    return(
      <Empty />
    );

  }
}

const WrappedUserUpdateForm = Form.create({
  name: "userCreateUpdate"
})(UserUpdateForm)

// export default UserCreateUpdateForm;
export default WrappedUserUpdateForm;