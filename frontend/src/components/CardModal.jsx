import React, { Fragment } from "react";
import { Button, Modal } from "react-bootstrap";

class CardModal extends React.Component {
  render() {
    // const modalStyle = {
    //   backgroundColor: this.props.backgroundColor,
    //   color: this.props.textColor
    // };

    return (
      <Fragment>
        <style type="text/css">
          {`
            .card-modal .modal-content{
              background-color: ${this.props.backgroundColor};
              color: ${this.props.textColor};
            }
            .modal-dialog,
            .modal-content {
              height: 90%;
            }
            .modal-body{
              max-height: calc(100% - 120px);
              overflow-y: auto;
            }
            .modal-body::-webkit-scrollbar {
              width: 0.25rem;
            }
            .modal-body::-webkit-scrollbar-track {
              background: ${this.props.darkColor};
            }
            .modal-body::-webkit-scrollbar-thumb {
              background: ${this.props.textColor};
            }
            `}
        </style>
        <Modal className="card-modal" {...this.props} size="xl" centered>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.header}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.props.body}</Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide} variant="warning">
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Fragment>
    );
  }
}

export default CardModal;
