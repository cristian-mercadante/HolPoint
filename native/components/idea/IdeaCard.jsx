import React, { PureComponent } from "react";
import Card from "../misc/Card";
import { TouchableOpacity } from "react-native-gesture-handler";
import IdeaDetailModal from "./IdeaDetailModal";
import { BLUE, DARK_BLUE } from "../../colors";

export default class IdeaCard extends PureComponent {
  state = {
    modalVisible: false
  };
  setModalVisible = () => this.setState({ modalVisible: !this.state.modalVisible });

  render() {
    const { idea } = this.props;
    return (
      <>
        <IdeaDetailModal modalVisible={this.state.modalVisible} setModalVisible={this.setModalVisible} idea={idea} />
        <TouchableOpacity onPress={this.setModalVisible}>
          <Card
            color={BLUE}
            darkColor={DARK_BLUE}
            textColor="#fff"
            header={idea.title}
            body={idea.description}
            footer={idea.date_creation}
          />
        </TouchableOpacity>
      </>
    );
  }
}
