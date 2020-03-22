import React, { Component } from "react";
import { Form, FormControl, Popover, OverlayTrigger, Spinner } from "react-bootstrap";
import axios from "axios";
import { searchAPI } from "../../server";
import { connect } from "react-redux";
import * as alertActions from "../../actions/alerts";
import { SearchResult } from ".";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      loading: false
    };
    this.timeout = 0;
  }

  doSearch = e => {
    this.setState({ loading: true });
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.getUsers();
    }, 300);
  };

  isEmptyOrSpaces = str => {
    return str === null || str.match(/^ *$/) !== null;
  };

  getUsers = () => {
    const username = document.getElementById("search-text-field").value;
    if (this.isEmptyOrSpaces(username)) {
      this.setState({ loading: false });
      return;
    }
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    };
    return axios
      .get(`${searchAPI}${username}`, headers)
      .then(res => this.setState({ results: res.data, loading: false }))
      .catch(error => {
        this.props.error(error);
      });
  };

  renderResults = () => {
    let buffer = [];
    const { results } = this.state;
    if (results) {
      results.forEach(user => buffer.push(<SearchResult key={user.id} {...user} />));
    }
    return buffer;
  };

  render() {
    const popover = (
      <Popover style={{ minWidth: "200px" }}>
        <Popover.Title as="h3">
          Risultati {this.state.loading && <Spinner className="float-right" size="sm" animation="border" />}
        </Popover.Title>
        {this.state.results.length !== 0 && (
          <Popover.Content>
            <div>{this.renderResults()}</div>
          </Popover.Content>
        )}
      </Popover>
    );

    return (
      <Form inline autoComplete="off">
        <OverlayTrigger trigger="focus" placement="bottom" overlay={popover}>
          <FormControl
            id="search-text-field"
            type="text"
            placeholder="Cerca username"
            className="mr-sm-2"
            onChange={this.doSearch}
          />
        </OverlayTrigger>
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    error: error => dispatch(alertActions.error(error))
  };
};

export default connect(null, mapDispatchToProps)(SearchBar);
