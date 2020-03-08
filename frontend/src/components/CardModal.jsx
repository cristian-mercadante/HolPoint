import React, { Fragment } from "react";
import { Button, Modal, Card } from "react-bootstrap";
import AlertComponent from "../components/alerts/AlertComponent";
import AlertsOverlayComponent from "../components/alerts/AlertsOverlayComponent";
import { connect } from "react-redux";

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
        <Modal as={Card} className="card-modal" {...this.props} size="xl" centered>
          <Card.Header closeButton>
            <Modal.Title>{this.props.header}</Modal.Title>
          </Card.Header>
          <Card.Body>
            <AlertsOverlayComponent alerts={this.props.alerts}>
              <AlertComponent />
            </AlertsOverlayComponent>
            {this.props.body}
          </Card.Body>
          <Card.Footer>
            <Button onClick={this.props.onHide} variant="warning">
              Close
            </Button>
          </Card.Footer>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    alerts: state.alerts
  };
};

export default connect(mapStateToProps)(CardModal);
