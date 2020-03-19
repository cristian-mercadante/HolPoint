import React, { Component, Fragment } from "react";
import { IdeaCardManagerVote, IdeaCreateButton, IdeaAddToGroupButton } from "../idea";
import { GroupContent } from ".";
import Panel from "../../containers/Panel";
import { ButtonGroup } from "react-bootstrap";

export default class GroupDesign extends Component {
  render() {
    return (
      <Fragment>
        <Panel
          title={this.props.group.name}
          component={
            <GroupContent
              {...this.props.group}
              selectFriend={this.props.selectFriend}
              selectedFriends={this.props.selectedFriends}
              putGroup={this.props.putGroup}
              deleteGroup={this.props.deleteGroup}
              dateStart={this.props.dateStart}
              dateFinish={this.props.dateFinish}
              setDateStart={this.props.setDateStart}
              setDateFinish={this.props.setDateFinish}
              putFavIdea={this.props.putFavIdea}
            />
          }
        />
        <Panel
          title="Idee proposte"
          component={
            <IdeaCardManagerVote
              ideas={this.props.group.ideas}
              deleteIdea={this.props.removeIdeaFromGroup}
              updateIdeaInState={this.props.updateIdeaInState}
              group_to_idea={this.props.group.group_to_idea}
            />
          }
          badge={
            <ButtonGroup>
              <IdeaCreateButton addIdeaToState={this.props.addIdeaToState} />
              <IdeaAddToGroupButton
                addIdeaToState={this.props.addIdeaIdsListForPutGroup}
                groupIdeas={this.props.group.ideas}
              />
            </ButtonGroup>
          }
        />
      </Fragment>
    );
  }
}
