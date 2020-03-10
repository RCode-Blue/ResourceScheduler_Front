import React from 'react';
import { connect } from 'react-redux';
import { Collapse } from 'antd';

import * as actions from "../../store/actions";

import Organisations from "../../components/organisations/Organisation";
import OrgCreateUpdateForm from "../../components/organisations/OrganisationCreateUpdate";


class OrganisationList extends React.Component {
  componentDidMount() {
    this.props.getOrgs();
  }

  render() {
    const { Panel } = Collapse;
    
    if(this.props.orgList === null){
      return(
        <div>Loading...</div>
      )
    }

    return (
      <div>
        <Organisations data={this.props.orgList}/>
        <br />

        <h2>Create new organisation</h2>
        <Collapse>
          <Panel header="Create">
            <OrgCreateUpdateForm 
              requestType="post"
              organisationID={null}
              btnText="Create"/>
          </Panel>
        </Collapse>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orgList: state.orgList,
    userId:  state.userId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOrgs: () => dispatch(actions.getOrgs())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrganisationList);