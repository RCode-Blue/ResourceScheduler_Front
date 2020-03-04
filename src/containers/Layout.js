import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import * as actions from "../store/actions/authActions";
import * as actions from "../store/actions";

const { Header, Content, Footer } = Layout;

// const CustomLayout = (props) => {
class CustomLayout extends React.Component {
  render() {
    // console.log(this);
    // console.log(this.props.children);
    return(
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >

          {
            this.props.isAuthenticated ?

            <Menu.Item key="6" onClick={this.props.logout}>
              Logout
            </Menu.Item>
            :
            <Menu.Item key="6">
              <Link to="/login">Login</Link>
            </Menu.Item>
          }

            <Menu.Item key="5">
              <Link to="/org/">
                Organisations
              </Link>
            </Menu.Item>

            <Menu.Item key="4">
              <Link to="/resources/">
                Resources
              </Link>
            </Menu.Item>

            <Menu.Item key="3">
              <Link to="/bookings/">
                Bookings
              </Link>
            </Menu.Item>

            <Menu.Item key="2">
              <Link to="/orgusers/">
                Employees
              </Link>
            </Menu.Item>

            <Menu.Item key="1">
              <Link to="/users/">
                Users
              </Link>
            </Menu.Item>


          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to={`/profile/${this.props.userId}`}>Profile</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to={`/schedule/`}>Schedule</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to={`/makebooking/`}>Booking</Link></Breadcrumb.Item>
          </Breadcrumb>
          
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              {this.props.children}
            </div>
        
          </Content>
        <Footer style={{ textAlign: 'center' }}></Footer>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  // console.log(state.token);
  return {
    isAuthenticated: state.token !== null,
    // userId: state.auth.userId
    userId: state.userId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(
      actions.logout())
  };
};

// export default connect(null, mapDispatchToProps)(CustomLayout);
export default withRouter(
  connect(mapStateToProps,  mapDispatchToProps)(CustomLayout)
);

