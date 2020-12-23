import React, { Component } from 'react'

export default class CalcResult extends Component {
    render() {
        return (
            <div id="result">
                {this.props.result}
            </div>
        )
    }
}
