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
        this.props.error("È necessario effettuare l'accesso per accedere a questa pagina.");
        this.props.history.push("/login");
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      error: error => dispatch(alertActions.error(error))
    };
  };

  return connect(null, mapDispatchToProps)(Authenticate);
}
