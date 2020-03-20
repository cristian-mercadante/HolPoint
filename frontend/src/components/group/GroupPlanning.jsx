import React, { Component, Fragment } from "react";
import Panel from "../../containers/Panel";
import { GroupPreview } from ".";
//import { ActivityManager } from "../activity";
import { ActivityManagerDND } from "../activity";

export default class GroupPlanning extends Component {
  render() {
    return (
      <Fragment>
        <Panel
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
        />
        <Panel
          title="Attività"
          component={
            this.props.dateStart && this.props.dateFinish ? (
              <div>
                {/* <ActivityManager dateStart={this.props.dateStart} dateFinish={this.props.dateFinish} /> */}
                <ActivityManagerDND />
              </div>
            ) : (
              <div style={{ textAlign: "center", color: "#777", fontSize: "20px" }}>
                È necessario definire la data di partenza e la data di arrivo per pianificare le attività
              </div>
            )
          }
        />
      </Fragment>
    );
  }
}
