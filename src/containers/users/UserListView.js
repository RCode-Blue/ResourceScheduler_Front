import React from 'react';
import { connect } from 'react-redux';
import Users from "../../components/users/User";

import * as actions from "../../store/actions";

class UserList extends React.Component{
  componentDidMount() {
    this.props.getUsers();
  }

  render(){
    // console.log(this);

    if(this.props.userList === null){
      return(
        <div>
          Loading...
        </div>
      )
    }

    return(
      <div>
        <Users data={this.props.userList}/>
      </div>
      
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userList: state.userList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => dispatch(actions.getUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);