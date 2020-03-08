import React, { Fragment } from "react";
import { Modal, Card, ButtonGroup, Button } from "react-bootstrap";
// import AlertComponent from "../components/alerts/AlertComponent";
// import AlertsOverlayComponent from "../components/alerts/AlertsOverlayComponent";
import { AlertComponent, AlertsOverlayComponent } from "../components/alerts";
import { connect } from "react-redux";

import "./CardModal.css";

class CardModal extends React.Component {
  render() {
    // const modalStyle = {
    //   backgroundColor: this.props.backgroundColor,
    //   color: this.props.textColor
    // };

    return (
      <Fragment>
        <Modal as={Card} className={this.props.type} {...this.props} size="xl" centered>
          <Card.Header>
            <Modal.Title>
              {this.props.header}
              <ButtonGroup className="float-right">
                {this.props.editable === "true" ? (
                  <Fragment>
                    <Button variant="warning">{"Modifica"}</Button>
                    <Button variant="danger">{"Elimina"}</Button>
                  </Fragment>
                ) : (
                  ""
                )}
                <Button variant="success" onClick={() => this.props.onHide()}>
                  {"Chiudi"}
                </Button>
              </ButtonGroup>
            </Modal.Title>
          </Card.Header>
          <Card.Body>
            <AlertsOverlayComponent alerts={this.props.alerts}>
              <AlertComponent />
            </AlertsOverlayComponent>
            {this.props.body}
          </Card.Body>
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
