import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

export default class ConfirmModal extends Component {
  render() {
    return (
      <Modal className="confirm-modal" show={this.props.show} onHide={this.props.onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sei sicuro?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="danger" onClick={this.props.onClick}>
            Sicurissimo!
          </Button>
        </Modal.Body>
      </Modal>
    );
  }
}
