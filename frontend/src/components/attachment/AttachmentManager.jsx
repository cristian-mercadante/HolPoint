import React, { Component, Fragment } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { attachmentCreateAPI } from "../../server";
import { connect } from "react-redux";
import * as alertActions from "../../actions/alerts";
import AttachmentCard from "./AttachmentCard";

class AttachmentManager extends Component {
  state = { file: null };

  handleFileChange = e => {
    this.setState({ file: e.target.files[0] });
  };

  handleSubmit = e => {
    e.preventDefault();
    const file = this.state.file;
    if (file) {
      let form_data = new FormData();
      form_data.append("file", file, file.name);
      const token = localStorage.getItem("token");
      const headers = {
        headers: {
          "Content-Type": "multiplart/form-data",
          Authorization: `Token ${token}`
        }
      };

      return axios
        .post(`${attachmentCreateAPI}${this.props.group.id}`, form_data, headers)
        .then(res => {
          this.props.addAttToState(res.data);
        })
        .catch(error => {
          this.props.error(error);
        });
    }
  };

  renderCards = () => {
    let buffer = [];
    this.props.group.attachments.forEach(att =>
      buffer.push(
        <AttachmentCard
          key={att.id}
          {...att}
          addAttToState={this.addAttToState}
          removeAttFromState={this.props.removeAttFromState}
        />
      )
    );
    return <div style={{ display: "flex", flexWrap: "wrap", margin: "20px" }}>{buffer}</div>;
  };

  render() {
    return (
      <Fragment>
        {this.renderCards()}
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="file">
            <Form.Label>Carica file</Form.Label>
            <Form.Control type="file" onChange={this.handleFileChange} />
          </Form.Group>
          <Button type="submit">Aggiungi</Button>
        </Form>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    error: error => dispatch(alertActions.error(error))
  };
};

export default connect(null, mapDispatchToProps)(AttachmentManager);
