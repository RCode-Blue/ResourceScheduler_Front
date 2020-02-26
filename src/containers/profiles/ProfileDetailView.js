import React from 'react';
import { connect } from 'react-redux';

import { Empty, Skeleton, Card, Descriptions } from 'antd';

import * as actions from "../../store/actions";
import ProfileDetails from "../../components/profiles/Profile";

class ProfileDetail extends React.Component {

  componentDidMount(){
    // const request = {
    //   "userid": this.props.userid
    // };
    this.props.getOrgUserDetails(this.props.userid);
  }


  render() {
    console.log(this);
    // console.log(this.props.orgUserDetails);
    // console.log(this.props.userid);
    // if(this.props.orgUserDetails){console.log(this.props.orgUserDetails[0])}
    // if(this.props.orgUserDetails){console.log(this.props.orgUserDetails[0]._user)}

    if(!this.props.token){
      return(
        <Empty/>
      )
    }

    if(!this.props.orgUserDetails){
    return(
      <Skeleton />
    )}

    // const fullname = {this.props.orgUserDetails[0]._user.first_name} + " " + {this.props.orgUserDetails[0]._user.last_name}

    return(
      <div>
        
        <Card title={this.props.orgUserDetails[0]._user.first_name + " " + this.props.orgUserDetails[0]._user.last_name}>
          <Descriptions>
            <Descriptions.Item label="Preferred">
              {this.props.orgUserDetails[0]._user.preferred_name}
            </Descriptions.Item>
            <Descriptions.Item label="Username">
              {this.props.orgUserDetails[0]._user.username}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {this.props.orgUserDetails[0]._user.email}
            </Descriptions.Item>
          </Descriptions>
        </Card>
        <br/>
        <ProfileDetails data={this.props.orgUserDetails}/>
        
      </div>
    )

  }
}


const mapStateToProps = (state) => {
  return {
    token: state.token,
    userid: state.userId,
    username: state.username,
    orgUserDetails: state.orgUserDetails
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOrgUserDetails: (request) => dispatch(actions.getOrgUserDetails(request))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetail);