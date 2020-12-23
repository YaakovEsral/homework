import React, { Component } from 'react'

export default class CalcInput extends Component {
    render() {
        return (
            <div>
                <input defaultValue={0} value={this.props.val}></input>
            </div>
        )
    }
}
