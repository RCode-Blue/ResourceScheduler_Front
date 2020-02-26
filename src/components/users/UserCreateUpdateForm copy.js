import React from 'react';
import { Form, Input, Button } from 'antd';




class UserCreateUpdateForm extends React.Component {
  handleFormSubmit = (e, type, userID) => {
    e.preventDefault();
    // console.log(e.target.elements);
  
    const email = e.target.elements.email.value;
    const job_title = e.target.elements.jobtitle.value;
    const department = e.target.elements.department.value;
  
    // console.log("email:      " + email);
    // console.log("job_title:  " + job_title);
    // console.log("department: " + department);
  }


  render(){
    // const { getFieldDecorator } = this.props.form;
    return(
      <div>
        <Form
        onSubmit={(e) => this.handleFormSubmit(
          e,
          this.props.requestType,
          this.props.userID)}>



          
          <Form.Item label="email">
            <Input name="email"
            placeholder="Email"/>
          </Form.Item>

          <Form.Item label="Position">
            <Input name="jobtitle"
            placeholder="Job Title"/>
          </Form.Item>
          <Form.Item label="Department">
            <Input name="department"
            placeholder="Department Name"/>
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
}

export default UserCreateUpdateForm;