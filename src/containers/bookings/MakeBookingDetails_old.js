import React from 'react';
import { connect } from 'react-redux';
import { Empty, Skeleton, Collapse, Card } from 'antd';

import axios from 'axios';

import * as actions from "../../store/actions";
// import BookingCreateUpdateForm from "../../components/bookings/BookingCreateUpdate";
import MakeBookingForm from "./MakeBookingForm";

const { Panel } = Collapse;

class MakeBookingDetails extends React.Component {
  // state = {
  //   userId: null,
  //   orgUserId: null
  // }

  componentDidMount(){
    // console.log(this.props.userId)
    if (this.props.userId){
      this.props.getOrgUserDetails(this.props.userId);
    }
  }



  renderPanels(resources) {
    // console.log(resources);
    return(
      resources.map(resource => {
        return(
          <Collapse accordion key={resource.id}>
            <Panel key={resource.id} header={resource.name}>
              <MakeBookingForm resources={resources}/>
            </Panel>
          </Collapse>
        )
      })
    )
  }

  render() {
    // console.log(this);
    // console.log(this.props.orgUserDetails);

    if(!this.props.orgUserDetails){
      // console.log("empty");
      return(<Empty />)
    }

    return(
      this.props.orgUserDetails.map(details => {
        return(
          <Collapse accordion
          key={details.organisation.id}>
            <Panel 
            header={details.organisation.name} 
            key={details.organisation.id}>
              {this.renderPanels(details.organisation.resources)}
            </Panel>
          </Collapse>
        )
      })
    )

    // return(
    //   <div>
    //     <Card title={
    //       this.props.orgUserDetails[0]._user.first_name + 
    //       " " + 
    //       this.props.orgUserDetails[0]._user.last_name}>
    //     </Card>
        
    //   </div>
    // )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.token !== null,
    userId: state.userId,
    orgUserDetails: state.orgUserDetails
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFilteredBookings: (data) => dispatch (
      actions.getFilteredBookings(data)),
    getOrgUserDetails: (data) => dispatch(
      actions.getOrgUserDetails(data))
  }
}




export default connect (mapStateToProps, mapDispatchToProps) (MakeBookingDetails);