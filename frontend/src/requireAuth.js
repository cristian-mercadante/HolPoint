// DEPRECATED

import React, { Component } from "react";
import { connect } from "react-redux";
import * as alertActions from "./actions/alerts";
import { isAuthenticated } from "./routes";

// See https://youtu.be/q5OmQvh4R3s

export default function(ComposedComponent) {
  class Authenticate extends Component {
    // Perchè funziona lo stesso con compoenentDidMount ??
    // prima era componentWillMount
    componentDidMount() {
      if (!isAuthenticated()) {
        this.props.addAlert("È necessario effettuare l'accesso per accedere a questa pagina.", "danger");
        this.props.history.push("/login");
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      addAlert: (text, style) => dispatch(alertActions.addAlert(text, style))
    };
  };

  return connect(null, mapDispatchToProps)(Authenticate);
}
