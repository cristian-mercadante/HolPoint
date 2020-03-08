import React, { Component, Fragment } from "react";
import { Button } from "react-bootstrap";
import CardModal from "../../containers/CardModal";
import IdeaCreateForm from "./IdeaCreateForm";

export default class IdeaCreateButton extends Component {
  state = {
    showCreate: false
  };

  showCreate = () => {
    this.setState({ showCreate: !this.state.showCreate });
  };

  render() {
    return this.props.currentUsername === this.props.username ? (
      <Fragment>
        <Button variant="info" onClick={this.showCreate}>
          Crea
        </Button>
        <CardModal
          show={this.state.showCreate}
          onHide={this.showCreate}
          type="idea-modal"
          header="Crea idea"
          body={<IdeaCreateForm onHide={this.showCreate} />}
          editable="false"
        />
      </Fragment>
    ) : (
      ""
    );
  }
}
