import React from 'react';
import { connect } from 'react-redux';
import { Empty, Collapse } from 'antd';

import * as actions from "../../store/actions";
import MakeBookingForm from "./MakeBookingForm";


const { Panel } = Collapse;

class MakeBooking extends React.Component {
  state = {
    userId: null,
    orgUserId: null,
    orgUserDetails: null
  }

  componentDidUpdate(prevProps){
    if(this.props.userId !== prevProps.userId){
      this.setState({
        userId: this.props.userId
      });
    }
    if(this.props.orgUserDetails !== prevProps.orgUserDetails){
      this.setState({
        orgUserDetails: this.props.orgUserDetails
      });
    }
  }

  componentDidMount(){
    if(this.props.userId){
      this.props.getOrgUserDetails(this.props.userId)}
  }

  // Render Resource headers
  renderPanels(resources) {
    return(
      resources.map(resource => {
        return(
          <Collapse accordion key={resource.id}>
            <Panel key={resource.id} header={resource.name}>
              <MakeBookingForm 
              resource={resource}
              filteredBookingList={this.props.filteredBookingList}
              getFilteredBookings={this.props.getFilteredBookings}
              userId={this.props.userId}/>
            </Panel>
          </Collapse>
        )
      })
    )
  }

  // Render Organisation details
  makeBookingOrgDetails = () => {
    if(!this.state.orgUserDetails){
      // console.log("empty");
      return(<Empty />)
    }

    return(
      this.state.orgUserDetails.map(details => {
        return(
          <div key={details.id}>
            <Collapse accordion
            key={details.organisation.id}>
              <Panel 
              header={details.organisation.name} 
              key={details.organisation.id}>
                {this.renderPanels(details.organisation.resources)}
              </Panel>
            </Collapse>
            <br/>
          </div>
        )
      })
    )
  }



  render() {
    if(!this.props.userId){
      return(
        <div>
          <Empty/>
        </div>
      )
    }

    return(
      <div>
        <h4>Create New Booking</h4>
        <br/>
        <div>
          <this.makeBookingOrgDetails 
          // userId={this.state.userId}
          userId={this.props.userId}
          orgUserDetails={this.props.orgUserDetails}/>
        </div>
        <br/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.token !== null,
    userId: state.userId,
    orgUserDetails: state.orgUserDetails,
    filteredBookingList: state.filteredBookingList
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




export default connect (mapStateToProps, mapDispatchToProps) (MakeBooking);