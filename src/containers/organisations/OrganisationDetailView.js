import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { Card, Button, Skeleton, Collapse, Descriptions } from 'antd';

import * as actions from "../../store/actions";
import OrgCreateUpdateForm from "../../components/organisations/OrganisationCreateUpdate";

class OrganisationDetail extends React.Component {
  componentDidMount() {
    const organisationID = this.props.match.params.organisationID;
    this.props.getOrgDetails(organisationID);
  }

  handleDelete = (e) => {
    // e.preventDefault();
    const organisationID = this.props.match.params.organisationID;
    axios.delete(`/api/org/${organisationID}/`);
    this.props.history.push("/");
    this.forceUpdate();
  }

  render() {
    // console.log(this);
    const { Panel } = Collapse;
    if(this.props.orgDetails === null){
      return(
        <Skeleton/>
      )
    }

    return (
      <div>
        <Card title={this.props.orgDetails.name}>
          <p>{this.props.orgDetails.description}</p>
          <br/>
          <Descriptions
          layout="vertical">
            <Descriptions.Item label="Address">
              {this.props.orgDetails.address_line1} {this.props.orgDetails.address_line2}
              <br/>
              {this.props.orgDetails.suburb}, {this.props.orgDetails.state}
              <br/>
              {this.props.orgDetails.postcode}
              <br/>
              {this.props.orgDetails.country}
              <br/>
            </Descriptions.Item>
          </Descriptions>
        </Card>
        <br />
        <h2>Edit organisation</h2>
        <Collapse>
          <Panel header="Edit">
            <OrgCreateUpdateForm 
              requestType="put"
              organisationID={this.props.match.params.organisationID}
              orgDetails={this.props.orgDetails}
              btnText="Update" />
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
    orgDetails: state.orgDetails
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOrgDetails: (id) => dispatch(actions.getOrgDetails(id))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(OrganisationDetail);