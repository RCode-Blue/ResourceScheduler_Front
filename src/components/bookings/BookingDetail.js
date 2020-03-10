import React from 'react';
import { Card } from 'antd';
import moment from 'moment';

const BookingDetails = (props) => {
  return(
    <div>
      <Card title={props.data.title}>
        <h4>{props.data.description}</h4>
        <table cellPadding="8">
          <tbody>
            <tr>
              <td>Resource:</td><td>{props.data.resource_name}</td>
            </tr>

            <tr>
              <td>Start:</td><td>{moment(props.data.booking_start).format("LLLL")}</td>
            </tr>

            <tr>
              <td>End:</td><td>{moment(props.data.booking_end).format("LLLL")}</td>
            </tr>
          </tbody>
        </table>

      </Card>
    </div>
  )
}

export default BookingDetails;


