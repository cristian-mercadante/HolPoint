import React, { Component } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Title from "../components/misc/Title";
import OpenURLButton from "../components/misc/OpenURLButton";
import SubTitle from "../components/misc/SubTitle";
import { connect } from "react-redux";
import * as colors from "../colors";
import * as authActions from "../actions/auth";
import Spinner from "../components/misc/Spinner";
import RoundedButton from "../components/misc/RoundedButton";
import { resetPassword } from "../server";

class LoginScreen extends Component {
  state = {
    username: "",
    password: "",
  };

  onChangeUsername = text => this.setState({ username: text });
  onChangePassword = text => this.setState({ password: text });

  handleSubmit = () => {
    const { username, password } = this.state;
    this.props.onAuth(username, password);
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", flexDirection: "column", justifyContent: "space-around" }}>
        <View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
          <Title />
          <SubTitle />
        </View>
        <View style={{ flex: 2, width: "80%", justifyContent: "center" }}>
          {this.props.isLoading ? (
            <Spinner color={colors.BLUE} />
          ) : (
            <>
              <TextInput
                style={styles.formField}
                value={this.state.username}
                onChangeText={text => this.onChangeUsername(text)}
                placeholder="Username"
              />
              <TextInput
                style={styles.formField}
                value={this.state.password}
                secureTextEntry={true}
                password={true}
                onChangeText={text => this.onChangePassword(text)}
                placeholder="Password"
              />
            </>
          )}
        </View>
        <View style={{ flex: 1, justifyContent: "center", width: "100%" }}>
          <RoundedButton title="Log In" backgroundColor={colors.YELLOW} color="#000" onPress={this.handleSubmit} />
          <OpenURLButton url={resetPassword} color={colors.BLUE}>
            Password dimenticata?
          </OpenURLButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formField: {
    margin: 10,
    height: 40,
    borderColor: colors.BLUE,
    borderBottomWidth: 1,
    textAlign: "center",
  },
});

const mapStateToProps = state => {
  return {
    isLoading: state.auth.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password) => dispatch(authActions.authLogin(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
