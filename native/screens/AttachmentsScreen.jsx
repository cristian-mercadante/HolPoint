import React, { Component } from "react";
import { RED, GREEN } from "../colors";
import { FlatList } from "react-native-gesture-handler";
import H1WithButton from "../components/misc/H1WithButton";
import RoundedButton from "../components/misc/RoundedButton";
import AttachmentCard from "../components/attachment/AttachmentCard";
import * as DocumentPicker from "expo-document-picker";
import { connect } from "react-redux";
import * as alertActions from "../actions/alerts";
import axios from "axios";
import { attachmentCreateAPI, attachmentRemoveAPI } from "../server";
import { View, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

class AttachmentsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      attachments: props.route.params.attachments,
    };
  }

  openDocumentPickerAsync = async () => {
    let pickerResult = await DocumentPicker.getDocumentAsync();
    if (pickerResult.type === "success") {
      this.setState({ file: pickerResult });
    }
  };

  uploadAttachment = () => {
    const file = this.state.file;
    if (file) {
      const uri = file.uri;
      const uriParts = uri.split(".");
      const fileType = uriParts[uriParts.length - 1];
      const payloadKey = "file";
      const form_data = new FormData();
      const baseType = ["jpeg", "jpg", "png"].indexOf(String(fileType).toLowerCase()) >= 0 ? "image" : "application";
      form_data.append(payloadKey, {
        uri,
        name: file.name,
        type: `${baseType}/${fileType}`,
      });
      const headers = {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${this.props.token}`,
        },
      };

      const groupId = this.props.route.params.groupId;
      return axios
        .post(`${attachmentCreateAPI}${groupId}`, form_data, headers)
        .then(res => {
          let attachments = this.state.attachments;
          attachments.push(res.data);
          this.setState({ file: null, attachments });
        })
        .catch(error => this.props.error(error));
    }
  };

  deleteAttachment = attId => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.token}`,
      },
    };
    return axios
      .delete(`${attachmentRemoveAPI}${attId}`, headers)
      .then(res => {
        let attachments = this.state.attachments;
        attachments = attachments.filter(a => a.id !== attId);
        this.setState({ attachments });
        this.props.navigation.navigate("GroupDetail", { deletedAttId: attId });
      })
      .catch(error => this.props.error(error));
  };

  render() {
    return (
      <FlatList
        ListHeaderComponent={
          <>
            <H1WithButton
              text="Allegati"
              button={
                <RoundedButton
                  icon="folder-open"
                  iconSize={20}
                  color="#fff"
                  backgroundColor={RED}
                  onPress={this.openDocumentPickerAsync}
                />
              }
            />
            {this.state.file && (
              <View
                style={{
                  alignItems: "center",
                  borderColor: "#ccc",
                  borderWidth: 2,
                  marginHorizontal: 20,
                  marginVertical: 10,
                  padding: 10,
                  borderRadius: 20,
                }}
              >
                <Text style={{ textAlign: "center" }}>{this.state.file.name}</Text>
                <RoundedButton title="Allega" backgroundColor={GREEN} color="#fff" onPress={this.uploadAttachment} />
              </View>
            )}
          </>
        }
        data={this.state.attachments}
        renderItem={({ item }) => <AttachmentCard {...item} {...this.props} deleteAttachment={this.deleteAttachment} />}
        keyExtractor={item => String(item.id)}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    currentUserId: state.currentUser.id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    error: error => dispatch(alertActions.error(error)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AttachmentsScreen);
