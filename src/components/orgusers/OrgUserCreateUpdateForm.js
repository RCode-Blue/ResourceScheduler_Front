import React from 'react';

import { Form, Input, Button, Icon, Select, Checkbox } from 'antd';

import axios from 'axios';

const { Option } = Select;


class OrgUserCreateUpdateForm extends React.Component {
  state = {
    local_UserList: [],
    localOrgUserList: [],
    localOrgList: [],
    working_UserList: [],
    working_OrgList: [],
    selection_userId: null,
    selection_orgId: null
  }


  handleFormSubmit = (e) => {
    e.preventDefault();
    const request = {
      "_user":this.state.selection_userId,
      "organisation":this.state.selection_orgId,
      "is_admin":e.target.elements.is_admin.checked,
      "is_employee":e.target.elements.is_employee.checked,
      "job_title":e.target.elements.job_title.value,
      "department":e.target.elements.department.value
    }
    return axios.post("/api/orgusers/", request)
    .then(res => console.log(res))
    .catch(err => console.error(err));
  }

  
  modifyLists = () => {
    // userlist
    let temp_UserList = [];
    this.props.userList.map(
      user=>{
        let userData={
          "id":user.id,
          "username":user.username,
          "first_name":user.first_name,
          "last_name":user.last_name
        }
        temp_UserList.push(userData);
        return null;
      }
    )

    // orgUserList
    let tempOrgUserList = [];
    this.props.orgUserList.map(
      orgUser=>{
        let orgUserData={
          "id":orgUser.id,
          "_userid":orgUser._user.id,
          "orgid":orgUser.organisation.id,
          "first_name":orgUser.first_name,
          "last_name":orgUser.last_name,
          "is_admin":orgUser.is_admin,
          "is_employee":orgUser.is_employee
        }
        tempOrgUserList.push(orgUserData);
        return null;
      }
    )

    // orgList
    let tempOrgList = [];
    this.props.orgList.map(
      org=>{
        let orgData={
          "id":org.id,
          "name":org.name
        }
        tempOrgList.push(orgData);
        return null;
      }
    )


    this.setState({
      local_UserList: temp_UserList,
      localOrgUserList: tempOrgUserList,
      localOrgList: tempOrgList,
      working_UserList: temp_UserList,
      working_OrgList: tempOrgList,
    })
  }

  
  componentDidMount(){
    this.modifyLists()
  }

  handle_userChange = (val) => {
    console.log(`_user: ${val}`)

    // Make temp copy of localOrgList
    let tempOrgList = [...this.state.localOrgList];

    // Find Organisations in localOrgUserList that the _user belongs to
    let orgUserMatches = [];
    this.state.localOrgUserList.map(
      localOrgUser => {
        if(localOrgUser._userid === val){
          orgUserMatches.push(localOrgUser)
        }
        return null;
      }
    )

    // Take out the matched organisations from the temp copy
    let orgMatchingIndexes = []
    orgUserMatches.map(
      orgUserMatch => {
        let matchingIndex = tempOrgList.findIndex(
          tempOrg => tempOrg.id === orgUserMatch.orgid);
        orgMatchingIndexes.push(matchingIndex);
      
        return null;
      }
    )

    let i = 0;
    orgMatchingIndexes.map(
      index => {
        // console.log(index-i);
        tempOrgList.splice(index-i, 1)
        i++;
      
        return null;
      }
    )

    this.setState({
      working_OrgList: tempOrgList,
      selection_userId: val
    })
  }

  handleOrgChange = (val) => {
    // Make temp copy of local_UserList
    let temp_UserList = [...this.state.local_UserList];

    // Find _Users in localOrgUserList that belong to this organisation
    let orgUserMatches = [];
    this.state.localOrgUserList.map(
      localOrgUser => {
        if(localOrgUser.orgid === val){
          orgUserMatches.push(localOrgUser)
        }
      
        return null;
      }
    )
    
    // Take out the matched _User from the temp copy
    let _userMatchingIndexes = []
    orgUserMatches.map(
      orgUserMatch => {
        let matchingIndex = temp_UserList.findIndex(
          temp_User => temp_User.id === orgUserMatch._userid);
        _userMatchingIndexes.push(matchingIndex);
      
        return null;
      }
    )

    let i = 0;
    _userMatchingIndexes.map(
      index => {
        temp_UserList.splice(index-i, 1)
        i++;
        
        return null;
      }
    )

    this.setState({
      working_UserList: temp_UserList,
      selection_orgId: val
    })

  }


  renderUserDropdown=()=>{
    if(!this.state.working_UserList){
      return(<Icon type="loading" />)
    }
    return(
      <Select
      style={{width: 240}}
      onChange={this.handle_userChange}
      placeholder="User"
      name="_user">
        {this.state.working_UserList.map(user => (
          <Option 
          key={user.id}
          value={user.id}>
            {user.first_name} {user.last_name}
          </Option>
        ))}
      </Select>
    )
  }

  renderOrgDropdown=()=>{
    if(!this.state.working_OrgList){
      return(<Icon type="loading" />)
    }
    return(
      <Select
      style={{width: 240}}
      onChange={this.handleOrgChange}
      placeholder="Organisation"
      name="organisation">
        {this.state.working_OrgList.map(org => (
          <Option
          key={org.id}
          value={org.id}>
            {org.name}
          </Option>
        ))}
      </Select>
    )
  }

  render= () => {
    // console.log(this);
    return(
      <div>
        <Form
        onSubmit={(e) => this.handleFormSubmit(e)}>
          <Form.Item label="User">
            <this.renderUserDropdown />
          </Form.Item>

          <Form.Item label="Organisation">
            <this.renderOrgDropdown />
          </Form.Item>
            
          <Form.Item label="Administrator Access">
            <Checkbox name="is_admin">
              Allow Administrator Access
            </Checkbox>
          </Form.Item>
            
          <Form.Item label="Employee Access">
            <Checkbox name="is_employee">
              Employee Access
            </Checkbox>
          </Form.Item>

          <Form.Item label="Job Title">
            <Input name="job_title"
              placeholder="Job Title Description"
            />
          </Form.Item>

          <Form.Item label="Department">
            <Input name="department"
              placeholder="Department"
            />
          </Form.Item>

          <Form.Item>
            <Button
            type="primary"
            htmlType="submit">
              Submit
            </Button>
          </Form.Item>

        </Form>
      </div>
    )
  }


}

export default OrgUserCreateUpdateForm;