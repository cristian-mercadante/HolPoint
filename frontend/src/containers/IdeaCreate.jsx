import React, { Component } from "react";
import Panel from "./Panel";

import { Container } from "react-bootstrap";
import IdeaCreateForm from "../components/IdeaCreateForm";

export default class IdeaCreate extends Component {
  render() {
    return (
      <Container>
        <Panel title="Crea Idea" component={<IdeaCreateForm />} />
      </Container>
    );
  }
}
