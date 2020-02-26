import React from 'react';
import { Route } from 'react-router-dom';


import BookingList from "./containers/bookings/BookingListView";
import BookingDetail      from "./containers/bookings/BookingDetailView";
import MakeBooking        from "./containers/bookings/MakeBooking";
import OrganisationList   from "./containers/organisations/OrganisationListView";
import OrganisationDetail from "./containers/organisations/OrganisationDetailView";
import OrgUserList        from "./containers/orgusers/OrguserListView";
import OrgUserDetail      from "./containers/orgusers/OrguserDetailView";
import ResourceList       from "./containers/resources/ResourceListView";
import ResourceDetail     from "./containers/resources/ResourceDetailView";
import ProfileDetail      from "./containers/profiles/ProfileDetailView";
import UserList           from "./containers/users/UserListView";
import UserDetail         from "./containers/users/UserDetailView";
import ScheduleList          from "./containers/schedules/ScheduleListView";


import Login from "./containers/Login";
import Signup from "./containers/Signup";

const BaseRouter = () => (
  <div>
    <Route exact path="/bookings/" component={BookingList} />
    <Route exact path="/bookings/:bookingID" component={BookingDetail} />
    <Route exact path="/makebooking/" component={MakeBooking} />
    <Route exact path="/org/" component={OrganisationList} />
    <Route exact path="/org/:organisationID/" component={OrganisationDetail} />
    <Route exact path="/orgusers/" component={OrgUserList} />
    <Route exact path="/orgusers/:orguserID/" component={OrgUserDetail} />
    <Route exact path="/resources/" component={ResourceList} />
    <Route exact path="/resources/:resourceID" component={ResourceDetail} />
    <Route exact path="/users/" component={UserList} />
    <Route exact path="/users/:userID" component={UserDetail} />
    <Route exact path="/profile/:profileID" component={ProfileDetail} />

    <Route exact path="/login/"    component={Login} />
    <Route exact path="/signup/"   component={Signup} />
    <Route exact path="/schedule/" component={ScheduleList} />
  </div>
);

export default BaseRouter;