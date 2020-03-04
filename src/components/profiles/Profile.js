import React from 'react'

import { Descriptions, Card } from 'antd';


const ProfileDetails = (props) => {
  // console.log(props);
  // props.data.map((x) => console.log(x.user_name));
  return(
    props.data.map(profile => {
      // console.log(profile);
      return(
        <Card title={profile.organisation.name} key={profile.organisation.id}>
          <Descriptions title="User Profile" key={profile.id}>
            <Descriptions.Item label="Name">
              {profile._user.first_name} {profile._user.middle_name} {profile._user.last_name}
            </Descriptions.Item>
            <br/><br/>



            <Descriptions.Item label="Job Title">
              {profile.job_title}
            </Descriptions.Item>
            <Descriptions.Item label="Department">
              {profile.department}
            </Descriptions.Item>

          </Descriptions>
        </Card>
        
      )
    })

    
  )
}

export default ProfileDetails;