import React, { Component, Fragment } from "react";
import { Button } from "react-bootstrap";
import CardModal from "../../containers/CardModal";
import GroupCreateForm from "./GroupCreateForm";

export default class GroupCreateButton extends Component {
  state = {
    showCreate: false
  };

  showCreate = () => {
    this.setState({ showCreate: !this.state.showCreate });
  };

  render() {
    return (
      <Fragment>
        <Button variant="danger" onClick={this.showCreate}>
          Crea
        </Button>
        <CardModal
          show={this.state.showCreate}
          onHide={this.showCreate}
          type="group-modal"
          header="Crea gruppo"
          body={<GroupCreateForm onHide={this.showCreate} addGroup={this.props.addGroup} />}
        />
      </Fragment>
    );
  }
}
