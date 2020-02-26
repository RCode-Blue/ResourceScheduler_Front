import React from 'react';
import { List, Avatar } from 'antd';

// const IconText = ({ type, text }) => (
//   <span>
//     <Icon type={type} style={{ marginRight: 8 }} />
//     {text}
//   </span>
// );

const OrgUsers = (props) => {
  // console.log(props);
  return(
  <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: page => {
        // console.log(page);
      },
      pageSize: 4,
    }}
    dataSource={props.data}
    footer={
      <div>
        
      </div>
    }
    renderItem={item => (
      <List.Item
        key={item.id}
      >
        <List.Item.Meta
          avatar={
            <Avatar 
            shape="square" 
            size="large" 
            icon="user" 
            style={{
              color: '#f56a00',
              backgroundColor: '#fde3cf'}}
            />}
          // title={<a href={`/orgusers/${item.id}/`}>{item._user.first_name} {item._user.last_name}</a>}
          title= {item._user.first_name + " " + item._user.last_name}
          
          description={item.organisation["name"]}
        />
        {item.content}
      </List.Item>
    )}
  />

  )
}

export default OrgUsers