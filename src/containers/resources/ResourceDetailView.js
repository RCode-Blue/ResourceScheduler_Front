import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { Button, Card, Skeleton, Collapse } from 'antd';

import * as actions from "../../store/actions/orgTaskActions"
import ResourceCreateUpdateForm from "../../components/resources/ResourceCreateUpdate";

const { Panel } = Collapse;

class ResourceDetail extends React.Component {
  state = {
    resource: {}
  }

  componentDidMount() {
    const resourceID = this.props.match.params.resourceID;
    // console.log(resourceID);
    this.props.getResourceDetails(resourceID);
    this.props.getOrgs();

    axios.get(`/api/resources/${resourceID}/`)
      .then(res => {
        this.setState({
          resource: res.data
        });
        // console.log(res.data)
      })
  }

  handleDelete = (e) => {
    const resourceID = this.props.match.params.resourceID;
    axios.delete(`/api/resources/${resourceID}/`);
    this.props.history.push("/resources/");
    this.forceUpdate();
  }

  render() {
    console.log(this);

    if(!this.props.resourceDetails && !this.props.orgList){
      return(
        <Skeleton/>
      )
    }

    return(
      <div>
        <Card title={this.props.resourceDetails.name}>
          <p>{this.props.resourceDetails.description}</p>
          <p>{this.props.resourceDetails.org_name}</p>
        </Card>
        <h2>Edit this resource</h2>
        <Collapse>
          <Panel header="Edit">
            <ResourceCreateUpdateForm
              requestType="put"
              resourceID={this.props.match.params.resourceID}
              resourceDetails = {this.props.resourceDetails}
              orgList = {this.props.orgList}
              btnText="Update"/>
          </Panel>
        </Collapse>
        <br/>
        <form onSubmit={this.handleDelete}>
          <Button type="danger" htmlType="submit">Delete</Button>
        </form>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    resourceDetails: state.resourceDetails,
    orgList: state.orgList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getResourceDetails: (id) => dispatch(actions.getResourceDetails(id)),
    getOrgs: () => dispatch(actions.getOrgs())
  }
}


export default connect(mapStateToProps, mapDispatchToProps) (ResourceDetail);