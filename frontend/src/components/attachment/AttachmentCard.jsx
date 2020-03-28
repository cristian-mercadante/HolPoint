import React, { Component, Fragment } from "react";
import { Button } from "react-bootstrap";
import { attachmentGetAPI, attachmentRemoveAPI } from "../../server";
import "./style.css";
import { FaFileWord, FaFileExcel, FaFilePowerpoint, FaFilePdf, FaImage, FaFile, FaTimes } from "react-icons/fa";
import ConfirmModal from "../../containers/ConfirmModal";
import axios from "axios";
import { connect } from "react-redux";
import * as alertActions from "../../actions/alerts";

const getIcon = name => {
  const re = /(?:\.([^.]+))?$/;
  const ext = re.exec(name)[1];

  if (["doc", "docx"].indexOf(ext) >= 0) return <FaFileWord />;
  if (["xls", "xlsx"].indexOf(ext) >= 0) return <FaFileExcel />;
  if (["ppt", "pptx"].indexOf(ext) >= 0) return <FaFilePowerpoint />;
  if (["jpeg", "jpg", "png"].indexOf(ext) >= 0) return <FaImage />;
  if (ext === "pdf") return <FaFilePdf />;

  return <FaFile />;
};

class AttachmentCard extends Component {
  colProps = { xs: "12", sm: "12", md: "6", lg: "4", xl: "3" };

  state = { showModalDelete: false };
  showModalDelete = () => {
    this.setState({ showModalDelete: !this.state.showModalDelete });
  };

  handleDelete = () => {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    };
    return axios
      .delete(`${attachmentRemoveAPI}${this.props.id}`, headers)
      .then(res => {
        this.props.removeAttFromState(this.props.id);
      })
      .catch(error => this.props.error(error));
  };

  doesCurrentUserOwnThisAttachment = () => {
    return this.props.currentUser.id === this.props.owner;
  };

  download = () => {
    // thanks to https://gist.github.com/javilobo8/097c30a233786be52070986d8cdb1743
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    };
    axios({
      url: `${attachmentGetAPI}${this.props.id}`,
      ...headers,
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', this.props.name);
      document.body.appendChild(link);
      link.click();
    }).catch(error => this.props.error(error));
  }

  render() {
    return (
      <Fragment>
        <div className="attachment-card">
          <span onClick={this.download}>
            <span className="mr-2">{getIcon(this.props.name)}</span>
            {this.props.name}
          </span>
          {this.doesCurrentUserOwnThisAttachment() && (
            <Button className="ml-2" variant="plain" onClick={this.showModalDelete}>
              <FaTimes />
            </Button>
          )}
        </div>
        <ConfirmModal show={this.state.showModalDelete} onHide={this.showModalDelete} onClick={this.handleDelete} />
      </Fragment >
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
    error: error => dispatch(alertActions.error(error))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AttachmentCard);
