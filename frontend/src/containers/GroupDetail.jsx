import React, { Component } from "react";
import { Button, ProgressBar, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Panel from "./Panel";

import { connect } from "react-redux";
import * as groupActions from "../actions/group";

class GroupDetail extends Component {
  state = {
    name: "empty"
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getGroup(id);
    // LASCIARE (x.id == id) ANZICHÈ (x.id === id)
    // eslint-disable-next-line
    const group = this.props.group.groups.find(x => x.id == id);
    this.setState({ ...group });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.group.groups !== this.props.group.groups) {
      const id = this.props.match.params.id;
      // LASCIARE (x.id == id) ANZICHÈ (x.id === id)
      // eslint-disable-next-line
      const group = this.props.group.groups.find(x => x.id == id);
      this.setState({ ...group });
    }
  }

  render() {
    return (
      <Container>
        {this.props.group.loading ? (
          <ProgressBar striped variant="success" now={100} animated />
        ) : (
          <Panel
            title={this.state.name}
            badge={
              <LinkContainer to={`/group/${this.state.id}/edit`}>
                <Button variant="warning">Modifica</Button>
              </LinkContainer>
            }
          />
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    group: state.group
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getGroup: id => dispatch(groupActions.getGroup(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetail);
