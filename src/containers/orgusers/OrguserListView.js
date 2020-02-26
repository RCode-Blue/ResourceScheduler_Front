import React from 'react';
import { connect } from 'react-redux';
import { Collapse, Skeleton } from 'antd';

import * as actions from "../../store/actions";

import OrgUsers from "../../components/orgusers/OrgUser";
import OrgUserCreateUpdateForm from "../../components/orgusers/OrgUserCreateUpdateForm";

const { Panel } = Collapse;

class OrgUserList extends React.Component {

  componentDidMount(){
    this.props.getOrgUsers();
    this.props.getOrgs();
    this.props.getUsers()
  }

  render() {
    // console.log(this);
    if(!this.props.orgUserList || !this.props.orgList || !this.props.userList){
      return(
        <Skeleton />
      )
    }
    return(
      <div>
        <OrgUsers data={this.props.orgUserList}/>
        <br />
        <h2>Create new Employee</h2>
        <Collapse>
          <Panel header="Assign">
            <OrgUserCreateUpdateForm 
            orgList={this.props.orgList}
            orgUserList={this.props.orgUserList}
            userList={this.props.userList}/>
          </Panel>
        </Collapse>

      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    orgUserList: state.orgUserList,
    orgList: state.orgList,
    userList: state.userList
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getOrgUsers: () => dispatch(actions.getOrgUsers()),
    getOrgs: () => dispatch(actions.getOrgs()),
    getUsers: () => dispatch(actions.getUsers())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(OrgUserList);