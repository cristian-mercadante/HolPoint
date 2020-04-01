import React, { Component } from "react";
import { View, StyleSheet, TextInput, Button } from "react-native";
import Title from "../components/misc/Title";
import { connect } from "react-redux";
import * as colors from "../colors";
import * as authActions from "../actions/auth";
import SubTitle from "../components/misc/SubTitle";
import Spinner from "../components/misc/Spinner";

class SignupScreen extends Component {
  state = {
    username: "",
    email: "",
    password1: "",
    password2: ""
  };

  onChangeUsername = text => this.setState({ username: text });
  onChangeEmail = text => this.setState({ email: text });
  onChangePassword1 = text => this.setState({ password1: text });
  onChangePassword2 = text => this.setState({ password2: text });

  handleSubmit = () => {
    const { username, email, password1, password2 } = this.state;
    this.props.onAuth(username, email, password1, password2).then(err => {
      alert(err);
    });
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
                value={this.state.email}
                onChangeText={text => this.onChangeEmail(text)}
                placeholder="Email"
              />
              <TextInput
                style={styles.formField}
                value={this.state.password1}
                secureTextEntry={true}
                password={true}
                onChangeText={text => this.onChangePassword1(text)}
                placeholder="Password"
              />
              <TextInput
                style={styles.formField}
                value={this.state.password2}
                secureTextEntry={true}
                password={true}
                onChangeText={text => this.onChangePassword2(text)}
                placeholder="Conferma password"
              />
            </>
          )}
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Button title="Sign Up" onPress={this.handleSubmit} color={colors.BLUE} />
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
    textAlign: "center"
  }
});

const mapStateToProps = state => {
  return {
    isLoading: state.auth.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, email, password1, password2) =>
      dispatch(authActions.authSignup(username, email, password1, password2))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);
