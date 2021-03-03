import React from 'react';
import DataListInput from 'react-datalist-input'
import "./InterestQuiz.css";

export default class DataList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <DataListInput
            inputClassName="drop-down-button"
            placeholder={this.props.placeholder}
            items={this.props.items}
            onSelect={this.props.onSelect}
            />
        )
    }
}