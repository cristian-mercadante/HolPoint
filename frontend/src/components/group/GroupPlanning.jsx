import React, { Component, Fragment } from "react";
import { ActivityManagerDND } from "../activity";
//import Panel from "../../containers/Panel";
//import { GroupPreview } from ".";

export default class GroupPlanning extends Component {
  render() {
    return (
      <Fragment>
        {/* <Panel
          title={this.props.group.name}
          component={
            <GroupPreview
              creator={this.props.group.creator}
              profiles={this.props.group.profiles}
              dateStart={this.props.dateStart}
              dateFinish={this.props.dateFinish}
              prefered_idea={this.props.group.prefered_idea}
            />
          }
        /> */}
        {this.props.dateStart && this.props.dateFinish ? (
          <div>
            <ActivityManagerDND
              group={this.props.group}
              dateStart={this.props.dateStart}
              dateFinish={this.props.dateFinish}
            />
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
