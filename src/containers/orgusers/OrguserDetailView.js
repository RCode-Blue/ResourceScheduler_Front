import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import * as actions from "../../store/actions";

import OrgUserDetails from "../../components/orgusers/OrgUserDetail";


class OrguserDetail extends React.Component {
  state = {
    orguser: []
  }

  componentDidMount(){
    const orguserID = this.props.match.params.orguserID;
    const orguserIdInt = parseInt(orguserID);

    this.props.getOrgUserDetails(orguserIdInt);
    // axios.get(`http://127.0.0.1:8000/api/orgusers/${orguserIdInt}/`)
    axios.get(`/api/orgusers/${orguserIdInt}/`)
      .then(res => {
        // console.log(res);
        this.setState({
          orguser:res.data
        }
        );
      });
  }

  render() {
    if(this.props.orgUserDetails === null){
      return(
        <div>
          Loading...
        </div>
      )
    }
    return(
      <OrgUserDetails data={this.props.orgUserDetails}/>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    orgUserDetails: state.orgUserDetails
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getOrgUserDetails: (orguserID) => dispatch(actions.getOrgUserDetails(orguserID))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(OrguserDetail);