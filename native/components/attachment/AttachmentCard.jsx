import React, { Component } from "react";
import { View, Text, Alert } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RED } from "../../colors";
import { attachmentGetAPI } from "../../server";
import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";
import * as MediaLibrary from "expo-media-library";

const getIconName = filename => {
  const re = /(?:\.([^.]+))?$/;
  const ext = re.exec(filename)[1];

  if (["doc", "docx"].indexOf(ext) >= 0) return "file-word";
  if (["xls", "xlsx"].indexOf(ext) >= 0) return "file-excel";
  if (["ppt", "pptx"].indexOf(ext) >= 0) return "file-powerpoint";
  if (["jpeg", "jpg", "png"].indexOf(ext) >= 0) return "image";
  if (ext === "pdf") return "file-pdf";

  return "file";
};

class AttachmentCard extends Component {
  download = () => {
    const headers = {
      headers: { "Content-Type": "application/json", Authorization: `Token ${this.props.token}` },
    };
    const uri_ = `${attachmentGetAPI}${this.props.id}`;
    FileSystem.downloadAsync(uri_, FileSystem.documentDirectory + this.props.name, headers)
      .then(async ({ uri }) => {
        let permissionResult = await MediaLibrary.requestPermissionsAsync();

        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
        const asset = await MediaLibrary.createAssetAsync(uri);
        const album = await MediaLibrary.createAlbumAsync("HolPoint", asset, false);
        FileSystem.getContentUriAsync(uri).then(cUri => {
          IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
            data: cUri.uri,
            flags: 1,
          });
        });
      })
      .catch(error => this.props.error(error));
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#ccc",
          marginHorizontal: 20,
          marginVertical: 10,
          padding: 10,
          borderRadius: 20,
        }}
      >
        {this.props.currentUserId === this.props.owner && (
          <View style={{}}>
            <TouchableOpacity
              onPress={() =>
                Alert.alert("Sicuro di voler eliminare questo allegato?", "Non potrà più essere ripristinato", [
                  { text: "No" },
                  { text: "Sì", onPress: () => this.props.deleteAttachment(this.props.id) },
                ])
              }
            >
              <FontAwesome5 name="times" size={20} color={RED} />
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity onPress={this.download}>
          <Text style={{ fontSize: 20, textAlign: "center" }}>
            <FontAwesome5 name={getIconName(this.props.name)} size={20} color="#000" /> {this.props.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default AttachmentCard;
