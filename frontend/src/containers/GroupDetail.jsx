import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Panel from "./Panel";
import IdeaManager from "../components/IdeaManager";
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
      <div>
        {this.props.group.loading ? (
          ""
        ) : (
          <Panel
            title={this.state.name}
            badge={
              <LinkContainer to={`/group/${this.state.id}/edit`}>
                <Button variant="warning">Modifica</Button>
              </LinkContainer>
            }
            component={<IdeaManager />}
          />
        )}
      </div>
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
