import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../../utils/history';

export default function(ComposedComponent) {
  class Authentication extends Component {

    componentWillMount() {
      // push user to the landing page if not authenticated (signed in)
      if (!this.props.authenticated) {
        history.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      // push user to the landing page if not authenticated (signed in)
      if (!nextProps.authenticated) {
        history.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}