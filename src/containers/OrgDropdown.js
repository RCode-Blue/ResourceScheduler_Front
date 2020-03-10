import React, { Component } from 'react';
import axios from 'axios';

import { Select, Divider } from 'antd';

class OrgDropdown extends Component {
  state = {
    orgList: null
  }

  componentDidMount(){
    // axios.get("http://127.0.0.1:8000/api/org/")
    axios.get("/api/org/")
      .then(res => {
        // console.log(res);
        this.setState({
          orgList: res.data
        });
      });
  }


  render(){
    if(this.state.orgList === null){
      return(
        <div>Loading...</div>
      )
    }

    const { orgList } = this.state;
    return(
      <Select
        style={{ width: 480 }}
        type="organisation"
        placeholder="Organisation"
        onChange={this.props.handleDropdownChange}
        dropdownRender={menu => (
          <div>
            {menu}
            <Divider style={{ margin: '4px 0' }} />
            <div
              style={{ padding: '4px 8px', cursor: 'pointer' }}
              onMouseDown={e => e.preventDefault()}
            >
            </div>
          </div>
        )}>
      
        {orgList.map(org => (
          <Select.Option 
          key={org.id}
          value={org.id}
          >
            {org.name}
          </Select.Option>
        ))}
      </Select>
    )
  }
}

export default OrgDropdown;

