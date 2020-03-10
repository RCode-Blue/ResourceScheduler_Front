import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Collapse } from 'antd';

import * as actions from "../../store/actions/orgTaskActions";
import Resources from "../../components/resources/Resource";
import ResourceCreateUpdateForm from "../../components/resources/ResourceCreateUpdate";


class ResourceList extends React.Component {
  state = {
    resources: []
  }

  componentDidMount() {
    this.props.getOrgs();

    // axios.get("http://127.0.0.1:8000/api/resources/")
    axios.get("/api/resources/")
      .then(res => {
        this.setState({
          resources: res.data
        });
      })
  }

  render() {
    const { Panel } = Collapse;
    return(
      <div>
        <Resources data={this.state.resources}/>
        <br />
        <h2>Create a resource</h2>
        <br/>
        <Collapse>
          <Panel header="Create">
            <ResourceCreateUpdateForm
              requestType="post"
              resourceID={null}
              btnText="Create"
              orgList={this.props.orgList}/>
          </Panel>
        </Collapse>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orgList: state.orgList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOrgs: () => dispatch(actions.getOrgs())
  }
}


export default connect(mapStateToProps, mapDispatchToProps) (ResourceList);