import React, { Fragment } from "react";
import { Modal, Card, ButtonGroup, Button } from "react-bootstrap";
import { AlertComponent, AlertsOverlayComponent } from "../components/alerts";
import { connect } from "react-redux";

import "./Modal.css";

class CardModal extends React.Component {
  render() {
    return (
      <Fragment>
        <Modal as={Card} className={this.props.type} {...this.props} size="xl" centered>
          <Card.Header>
            <Modal.Title>
              {this.props.header}
              <ButtonGroup className="float-right">
                <Button variant="warning" onClick={() => this.props.onHide()}>
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
          {this.props.footer ? <Card.Footer>{this.props.footer}</Card.Footer> : ""}
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
