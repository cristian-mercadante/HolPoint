import React, { Component, Fragment } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import CommentSection from "../comment/CommentSection";
import { IdeaForm } from "../idea";

class IdeaContent extends Component {
  isCurrentUser = () => {
    return this.props.currentUsername === this.props.username;
  };

  render() {
    return (
      <Fragment>
        {this.isCurrentUser() ? (
          <ButtonGroup className="float-right">
            <Button variant="success" onClick={this.props.showEditFormInModal}>
              {this.props.editing ? "Annulla" : "Modifica"}
            </Button>
          </ButtonGroup>
        ) : (
          ""
        )}
        {this.props.editing ? (
          <IdeaForm
            onSubmit={this.props.update}
            defaulttitle={this.props.title}
            defaultdescription={this.props.description}
          />
        ) : (
          <Fragment>
            <h3>Descrizione</h3>
            <div className="text-with-newline">{this.props.description}</div>
          </Fragment>
        )}

        <div style={{ marginTop: "10px" }}>
          <CommentSection {...this.props} />
        </div>
      </Fragment>
    );
  }
}

export default IdeaContent;
