import React from 'react';
import { List } from 'antd';


const Resources = (props) => {
  return(
  <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: page => {
        // console.log(page);
      },
      pageSize: 3,
    }}
    dataSource={props.data}
    footer={
      <div>
        
      </div>
    }
    renderItem={item => (
      <List.Item
        key={item.name}
      >
        <List.Item.Meta
          title={<a href={`/resources/${item.id}/`}>{item.name}</a>}
          description={<div><p>{item.description}</p><p>{item.org_name}</p></div>}
        />
        {item.content}
      </List.Item>
    )}
  />

  )
}

export default Resources;