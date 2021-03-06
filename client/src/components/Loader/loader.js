import React from "react";
import "./loader.css";

export default class Loader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="loader-wrapper">
        <div id="loader"></div>
      </div>
    );
  }
}