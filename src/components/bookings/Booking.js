import React from 'react';
import { List, Avatar } from 'antd';
import { blue } from '@ant-design/colors';
import moment from 'moment';

// const IconText = ({ type, text }) => (
//   <span>
//     <Icon type={type} style={{ marginRight: 8 }} />
//     {text}
//   </span>
// );


const Bookings = (props) => {
  // console.log(props)
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
          icon="paper-clip" 
          style={{
            // color: grey[1],
            backgroundColor: blue[5]}}
          />
          }
          title={<a href={`/bookings/${item.id}/`}>{item.title}</a>}
          description={item.description}
        />
        <i><font size="2">
        <table cellPadding="5">
          <tbody>
            <tr>
              <td>Start:</td>
              <td>{moment(item.booking_start).format("ddd DD MMMM YYYY hh:mm A")}</td>
            </tr>
            <tr>
              <td>End:</td>
              <td>{moment(item.booking_end).format("ddd DD MMMM YYYY hh:mm A")}</td>
            </tr>
          </tbody>
        </table>
        </font></i>
      </List.Item>
    )}
  />
  )
}


export default Bookings;