import React, { Component, Fragment } from "react";
import { Button } from "react-bootstrap";
import CardModal from "../../containers/CardModal";
import { IdeaListForm } from ".";
import { connect } from "react-redux";
import * as alertActions from "../../actions/alerts";

class IdeaAddToGroupButton extends Component {
  state = {
    showCreate: false,
    ideas: []
  };

  addIdeaToListNoDuplicates = () => {
    // Show checkbox ony for ideas that are not already in group
    if (!this.props.currentUser.loading) {
      const groupIdeas = this.props.groupIdeas.map(idea => idea.id);
      let userIdeas = this.props.currentUser.profile.ideas;
      userIdeas = userIdeas.filter(idea => !groupIdeas.includes(idea.id));
      this.setState({ ideas: userIdeas });
    }
  };

  componentDidMount() {
    this.addIdeaToListNoDuplicates();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentUser.id !== this.props.currentUser.id || prevProps.groupIdeas !== this.props.groupIdeas) {
      this.addIdeaToListNoDuplicates();
    }
  }

  showCreate = () => {
    this.setState({ showCreate: !this.state.showCreate });
  };

  handleSubmit = e => {
    e.preventDefault();
    let checkedIdeas = [...document.querySelectorAll("input[name=ideas]:checked")].map(idea => parseInt(idea.id));
    if (checkedIdeas.length !== 0) {
      this.props.addIdeaToState(checkedIdeas).then(() => {
        this.showCreate();
        this.props.removeAllAlerts();
      });
    } else {
      this.props.addAlert("Nessuna idea selezionata", "warning");
    }
  };

  render() {
    return (
      <Fragment>
        <Button variant="info" onClick={this.showCreate}>
          Aggiungi
        </Button>
        <CardModal
          show={this.state.showCreate}
          type="idea-modal"
          header="Aggiungi idea"
          onHide={this.showCreate}
          body={<IdeaListForm onSubmit={this.handleSubmit} ideas={this.state.ideas} type="checkbox" />}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addAlert: (text, style) => dispatch(alertActions.addAlert(text, style)),
    removeAllAlerts: () => dispatch(alertActions.removeAllAlerts())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IdeaAddToGroupButton);
