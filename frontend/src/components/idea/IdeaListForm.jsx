import React, { Component, Fragment } from "react";
import { Form, Button } from "react-bootstrap";

export default class IdeaListForm extends Component {
  renderCheckBoxes = () => {
    let buffer = [];
    this.props.ideas.forEach(idea => {
      buffer.push(
        <Form.Check
          custom
          style={{ fontSize: "20px" }}
          type={this.props.type}
          key={idea.id}
          id={idea.id}
          label={idea.title}
          name="ideas"
        />
      );
    });
    return buffer;
  };

  render() {
    return (
      <Fragment>
        {this.props.ideas.length !== 0 ? (
          <Form onSubmit={this.props.onSubmit}>
            {this.renderCheckBoxes()}
            <Button type="submit" variant="warning">
              Invia!
            </Button>
          </Form>
        ) : (
          <div style={{ textAlign: "center", fontSize: "30px" }}>Non ci sono altre idee da aggiungere :/</div>
        )}
      </Fragment>
    );
  }
}
