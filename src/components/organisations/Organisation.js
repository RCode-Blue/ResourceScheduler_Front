import React from 'react';
import { List } from 'antd';

// const IconText = ({ type, text }) => (
//   <span>
//     <Icon type={type} style={{ marginRight: 8 }} />
//     {text}
//   </span>
// );

const Organisations = (props) => {
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

    renderItem={item => (
      <List.Item
        key={item.name}
        // actions={[
        //   <IconText type="star-o" text="156" key="list-vertical-star-o" />,
        //   <IconText type="like-o" text="156" key="list-vertical-like-o" />,
        //   <IconText type="message" text="2" key="list-vertical-message" />,
        // ]}
        extra={
          <img
            width={272}
            alt="logo"
            src={process.env.PUBLIC_URL + '/generic-company-logo.png'}
            // src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        }
      >
        <List.Item.Meta
          // avatar={<Avatar src={item.avatar} />}
          title={<a href={`/org/${item.id}/`}>{item.name}</a>}
          description={item.description}
        />
        {item.content}
      </List.Item>
    )}
  />
  )
}

export default Organisations;