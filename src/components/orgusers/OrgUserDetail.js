import React from 'react';
import { Card } from 'antd';

const OrgUserDetails = (props) => {
  const adminStatus = props.data.is_admin? "Yes" : "No";
  const employeeStatus = props.data.is_employee? "Yes" : "No";

  return(
    <div>
      <Card title={props.user_name}>
        <p>Organisation: {props.data.org_name}</p>
        <p>Job Title: {props.data.user_jobtitle}</p>
        <p>Department: {props.data.user_department}</p>
        <p>Admin: {adminStatus}</p>
        <p>Employee: {employeeStatus}</p>
      </Card>
    </div>
  )
}

export default OrgUserDetails;