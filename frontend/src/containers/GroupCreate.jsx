import React, { Component } from "react";
import Panel from "./Panel";

import { Container } from "react-bootstrap";
import GroupCreateForm from "../components/GroupCreateForm";

class GroupCreate extends Component {
  render() {
    return (
      <Container>
        <Panel title="Crea Gruppo" component={<GroupCreateForm />} />
      </Container>
    );
  }
}

export default GroupCreate;
