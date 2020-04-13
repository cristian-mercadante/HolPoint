import React from "react";
import "../../assets/css/font.css";

const Title = props => {
  const titleStyle = {
    fontFamily: "'Rancho', cursive",
    fontSize: props.fontSize,
    textAlign: "center",
    marginTop: "-20px",
    marginBottom: "-20px",
  };

  const holStyle = {
    color: "var(--holpoint-blue)",
  };

  const pointStyle = {
    color: "var(--holpoint-red)",
  };

  return (
    <div style={titleStyle}>
      <span style={holStyle}>Hol</span>
      <span style={pointStyle}>Point</span>
    </div>
  );
};

export default Title;
