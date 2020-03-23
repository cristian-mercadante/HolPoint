import React, { Component, Fragment } from "react";
import { ActivityManagerDND } from "../activity";
import Panel from "../../containers/Panel";
import AttachmentManager from "../attachment/AttachmentManager";

export default class GroupPlanning extends Component {
  render() {
    return (
      <Fragment>
        {this.props.dateStart && this.props.dateFinish ? (
          <div>
            <Panel
              title="Allegati"
              component={
                <AttachmentManager
                  group={this.props.group}
                  addAttToState={this.props.addAttToState}
                  removeAttFromState={this.props.removeAttFromState}
                />
              }
            />
            <div>
              <ActivityManagerDND
                group={this.props.group}
                dateStart={this.props.dateStart}
                dateFinish={this.props.dateFinish}
              />
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center", color: "#777", fontSize: "20px" }}>
            È necessario definire la data di partenza e la data di arrivo per pianificare le attività
          </div>
        )}
      </Fragment>
    );
  }
}
