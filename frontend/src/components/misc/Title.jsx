import React from "react";
import "../../assets/css/font.css";
import * as colors from "../../colors";

const Title = props => {
  const titleStyle = {
    fontFamily: "'Rancho', cursive",
    fontSize: props.fontSize,
    textAlign: "center",
    marginTop: "-20px",
    marginBottom: "-20px"
  };

  const holStyle = {
    color: colors.BLUE
  };

  const pointStyle = {
    color: colors.RED
  };

  return (
    <div style={titleStyle}>
      <span style={holStyle}>Hol</span>
      <span style={pointStyle}>Point</span>
    </div>
  );
};

export default Title;
