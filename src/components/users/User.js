import React from 'react';
import { List, Avatar } from 'antd';


const Users = (props) => {
  return(
    <List
    itemLayout="horizontal"
    pagination={{
      onChange: page => {
        // console.log(page);
      },
      pageSize: 8,
    }}
    dataSource={props.data}
    renderItem={item => (
      <List.Item
        key={item.username}

      >
        <List.Item.Meta
          avatar={
            <Avatar 
            shape="round" 
            size="large" 
            icon="user" 
            style={{backgroundColor: '#87d068'}}
            />}
          title={<a href={`/users/${item.id}/`}>{item.username}</a>}
          description={`${item.first_name} ${item.last_name}`}
          
        />
        {item.content}
      </List.Item>
    )}
  />
  )
}

export default Users;