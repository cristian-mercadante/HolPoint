import React, { Component } from "react";
import { View, Button } from "react-native";
import IdeaCard from "./IdeaCard";
import H1 from "../misc/H1";
import { FlatList } from "react-native-gesture-handler";
import { connect } from "react-redux";
import IdeaAddModal from "./IdeaAddModal";
import { BLUE } from "../../colors";

class IdeaCardManager extends Component {
  state = {
    modalVisible: false
  };

  setModalVisible = () => this.setState({ modalVisible: !this.state.modalVisible });

  render() {
    const { ideas, currentUserId } = this.props;
    const { modalVisible } = this.state;
    return (
      <>
        <IdeaAddModal modalVisible={modalVisible} setModalVisible={this.setModalVisible} />
        <H1 text="Idee" />
        {ideas.length !== 0 && currentUserId === ideas[0].creator.id && (
          <Button title="Crea idea" onPress={this.setModalVisible} color={BLUE} />
        )}
        <FlatList
          data={ideas}
          renderItem={({ item }) => <IdeaCard idea={item} />}
          keyExtractor={item => `${item.id}`}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUserId: state.currentUser.id
  };
};

export default connect(mapStateToProps)(IdeaCardManager);
