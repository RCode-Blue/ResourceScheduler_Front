import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Select } from 'antd';

// const Option = Select.Option;


class OrgDropdown extends Component{
  constructor(props){
    super(props);
    this.state= {
      orgList: null
    }
  }

  async componentDidMount(){
    this.setState({
      orgList: this.props.orgList
    })
  }



  renderOrgItem(orgItem){
    // console.log(`ID: ${orgItem.id}`);
    // console.log(`Name: ${orgItem.name}`);
    return(
      <Select.Option value={orgItem.id}>{orgItem.name}</Select.Option>
    )
  }
  


  renderOrgList(orglist){
    // console.log(this);
    orglist.map((org) => {
      // console.log(org);
      return(
        <div>
          <Select.Option value={org.id}>{org.name}</Select.Option>
        </div>
      );
    })
  }


  render(){
    console.log(this)
    if(!this.props.orgList){
      // console.log("null");
      return(
        <Select placeholder="Select an organisation">
        </Select>
      );
    }
    // console.log("no null");
    return(
      <Select placeholder="Select an organisation!">
        {this.renderOrgList(this.props.orgList)}
      </Select>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    orgList: state.orgList
  }
}


// export default (OrgDropdown);
export default connect(mapStateToProps)(OrgDropdown);