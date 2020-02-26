import React from 'react';
// import axios from 'axios';

import { Form, Input, Icon, Button } from 'antd';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import * as actions from '../store/actions/authActions';
import * as actions from '../store/actions';

// import OrgDropdown from './OrgDropdown';
// import OrgCreateUpdateForm from '../components/organisations/OrganisationCreateUpdate';

// const { Option } = Select;

class RegistrationForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      orgList: null,
      orgDropdownVal: null
  };}


  

  handleSubmit = (e) => {
    // console.log(this);
    // console.log(e);
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onAuth(
          values.username, 
          values.email, 
          values.password,
          values.confirm,
          values.first_name,
          values.middle_name,
          values.last_name,
          values.preferred_name
          )
        // console.log('Received values of form: ', values);
        // console.log(this);
      }
      this.props.history.push("/org");
    });
  };

  handleConfirmBlur = (e) => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };
  
  // #region
  // handleDropdownChange = (value) => {
  //   console.log(value);
  //   this.setState({
  //     orgDropdownVal: value
  //   })
  // }
  
  // componentDidMount(){
    // axios.get("http://127.0.0.1:8000/api/org/")
    //   .then(res => {
    //     console.log(res);
    //     this.setState({
    //       orgList: res.data
    //     });
    //   });
  // }

// #endregion

  render() {
    console.log(this);
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>
        {/* User Name Field */}
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [
              { 
                required: true, 
                // message: 'Please input your username!' 
              }
            ],
          })(
            <Input prefix={
                <Icon type="user" 
                style={{ color: 'rgba(0,0,0,.25)' }} 
                />
              }
              placeholder="Username"
            />,
          )}
        </Form.Item>
        
        {/* First Name Field */}
        <Form.Item>
          {getFieldDecorator('first_name', {
            rules: [
              {
                required: false,
                message: 'First Name',
              },
            ]
          })(
            <Input name="firstName"
            prefix={
              <Icon type="edit"
              style={{color:"rgba(0,0,0,.25"}}
              />
            }
            type="firstName"
            placeholder="First Name"
            />
          )}
        </Form.Item>

        {/* Middle Name Field */}
        <Form.Item>
          {getFieldDecorator('middle_name', {
            rules: [
              {
                required: true,
                message: 'Middle name',
              },
            ]
          })(
            <Input name="middleName"
            prefix=
            {
              <Icon type="lock" 
                style={{ color: 'rgba(0,0,0,.25)' }} />
            } 
              type="middleName" 
              placeholder="Middle Name" 
              onBlur={this.handleConfirmBlur} />
            )}
        </Form.Item>

        {/* Last Name Field */}
        <Form.Item>
          {getFieldDecorator('last_name', {
            rules: [
              {
                required: true,
                message: 'Last name',
              },
            ]
          })(
            <Input name="lastName"
            prefix=
            {
              <Icon type="lock" 
                style={{ color: 'rgba(0,0,0,.25)' }} />
            } 
              type="lastName" 
              placeholder="Last Name" 
              onBlur={this.handleConfirmBlur} />
            )}
        </Form.Item>

        {/* Preferred Name Field */}
        <Form.Item>
          {getFieldDecorator('preferred_name', {
            rules: [
              {
                required: true,
                message: 'Preferred name',
              },
            ]
          })(
            <Input name="preferredName"
            prefix=
            {
              <Icon type="lock" 
                style={{ color: 'rgba(0,0,0,.25)' }} />
            } 
              type="preferredName" 
              placeholder="Preferred Name" 
              onBlur={this.handleConfirmBlur} />
            )}
        </Form.Item>

        {/* Email Field */}
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                // message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail',
              },
            ],
          })(
            <Input prefix={
                <Icon type="mail" 
                style={{ color: 'rgba(0,0,0,.25)' }} 
                />
              }
              placeholder="Email"
            />,
          )}
        </Form.Item>

        {/* Password 1 Field */}
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input prefix={
            <Icon type="lock" 
            style={{ color: 'rgba(0,0,0,.25)' }} 
            />
          }
          type="password"
          placeholder="Password"
        />,)}
        </Form.Item>

        {/* Password 2 Field */}
        <Form.Item>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              }
            ],
          })(
            <Input prefix=
            {
              <Icon type="lock" 
                style={{ color: 'rgba(0,0,0,.25)' }} />
            } 
              type="password" 
              placeholder="Confirm password" 
              onBlur={this.handleConfirmBlur} />
            )}
        </Form.Item>


        {/* Button */}
        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            style={{marginRight: '10px'}}>
            Signup
          </Button>
          Or 
          <NavLink 
            style={{marginRight: '10px'}} 
            to='/login/'> login
          </NavLink>
        </Form.Item>

      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({ 
  name: 'register' 
})(RegistrationForm);

const mapStateToProps = (state) => {
  return {
      loading: state.loading,
      error: state.error//,
      // orgList: state.orgList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, email, password1, password2, jobtitle, department) => dispatch(
      actions.authSignup(username, email, password1, password2, jobtitle, department))
    
    // getOrgs: () => dispatch(
    //   actions.getOrgs()
    // )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedRegistrationForm);