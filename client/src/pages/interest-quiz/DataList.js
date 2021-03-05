import React from "react";
import DataListInput from "react-datalist-input";
import "./InterestQuiz.css";

export default class DataList extends React.Component {

  constructor(props) {
    super(props);
  }
  match = (currentInput, item) =>
    item.label.toLowerCase().includes(currentInput.toLowerCase());

  render() {
    return (
      <DataListInput
        match={this.match}
        inputClassName="datalist-input"
        placeholder={this.props.placeholder}
        items={this.props.items}
        onSelect={this.props.onSelect}
      />
    );
  }
}