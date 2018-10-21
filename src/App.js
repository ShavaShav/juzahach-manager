import React, { Component } from 'react';
import { Jumbotron } from "react-bootstrap";
import { connect } from 'react-redux';

import './App.css';
import Splash from  './components/Splash';

import { fetchCurrentUser } from './actions';

class App extends Component {

  // Fetch user if token is in storage
  componentWillMount() {
    if (localStorage.getItem('token') !== null) {
      this.props.fetchCurrentUser();
    }
  }

  render() {
    if (this.props.currentUser) {
      // User is signed in, show the app (TODO)
      return <h2>Logged in as {this.props.currentUser.username}!</h2>
    } else {
      // No user, show the splash page for login/registration
      return ( 
        <Jumbotron className="vertical-center">
          <Splash currentUser={this.props.currentUser}/>
        </Jumbotron>
      )
    }
  }
}

// Global State
const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
  }
};

const mapDispatchToProps = {
  fetchCurrentUser
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
