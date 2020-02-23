import React, { Component } from "react";
import { connect } from "react-redux";
import * as alertActions from "./actions/alerts";

// See https://youtu.be/q5OmQvh4R3s

export default function(ComposedComponent) {
  class Authenticate extends Component {
    componentWillMount() {
      if (!isAuthenticated()) {
        console.log(isAuthenticated());
        this.props.addAlert("È necessario effettuare l'accesso per accedere a questa pagina.", "danger");
        this.props.history.push("/login");
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    if (token === undefined) {
      return false;
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        return false;
      } else {
        return true;
      }
    }
  };

  const mapDispatchToProps = dispatch => {
    return {
      addAlert: (text, style) => dispatch(alertActions.addAlert(text, style))
    };
  };

  return connect(null, mapDispatchToProps)(Authenticate);
}
