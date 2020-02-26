import React from 'react';
import { List } from 'antd';


// const IconText = ({ type, text }) => (
//   <span>
//     <Icon type={type} style={{ marginRight: 8 }} />
//     {text}
//   </span>
// );

const Resources = (props) => {
  // console.log(props);
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

        // extra={
        //   <img
        //     width={272}
        //     alt="logo"
            // src={process.env.PUBLIC_URL + '/generic-company-logo.png'}
            // src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
        //   />
        // }
      >
        <List.Item.Meta
          // avatar={<Avatar src={item.avatar} />}
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