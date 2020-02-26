import React from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';

import { Card, Descriptions, Skeleton } from 'antd';

import * as actions from "../../store/actions";
import UserUpdateForm from "../../components/users/UserCreateUpdateForm";

class UserDetail extends React.Component {
  componentDidMount(){
    const userID = this.props.match.params.userID
    // console.log(userID);
    this.props.getUserDetails(userID);
  }

  render(){
    // console.log(this)
    if(this.props.userDetails === null){
      return(
        <Skeleton />
      )
    }

    
    return(
      <div>
        <Card title={
          `${this.props.userDetails.first_name} 
          ${this.props.userDetails.last_name}`}>
          <Descriptions>
            <Descriptions.Item label="Middle Name">{this.props.userDetails.middle_name}</Descriptions.Item>
            <Descriptions.Item label="Preferred Name">{this.props.userDetails.preferred_name}</Descriptions.Item>
            <Descriptions.Item label="Username">{this.props.userDetails.username}</Descriptions.Item>
          </Descriptions>
          <p>{this.props.userDetails.job_title}</p>
          <p>{this.props.userDetails.department}</p>
        </Card>
        <br />
        <h2>Edit User Details</h2>
        <UserUpdateForm 
        requestType="put"
        userID={this.props.match.params.userID}
        userDetails={this.props.userDetails} 
        btnText="Update"/>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    getUserDetails: (id) => dispatch(actions.getUserDetails(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
