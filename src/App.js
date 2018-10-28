import React, { Component } from 'react';
import { Jumbotron } from "react-bootstrap";
import { connect } from 'react-redux';

import './App.css';
import Main from  './components/Main';
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
      // User is signed in, show the app
    return <Main/>
    } else {
      // No user, show the splash page for login/registration
      return ( 
        <Jumbotron className="vertical-center">
          <Splash/>
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
