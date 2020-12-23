import React, { Component } from 'react';
import Button from './Button';
import CalcInput from './CalcInput';
import CalcResult from './CalcResult';

export default class Calculator extends Component {

    state = {
        inputValue: 0
    }

    clearInput = () =>{
        this.setState({
            inputValue: 0
        })
    }

    updateInputValue = (val) => {
        switch (val) {
            case '+/-':
                break;

            default:
                let input = val;
                this.setState({
                    inputValue: this.state.inputValue === 0 ? input
                        : `${this.state.inputValue}${input}`
                })

        }

    }

    getResult = () => {
        const result = Function(` "use strict"; return  ${this.state.inputValue}`)();
        console.log(result);
        this.setState({
            result: result,
            inputValue: 0
        })
    }

    render() {

        const inputs = [7, 8, 9, 4, 5, 6, 1, 2, 3, '+/-', 0, '.'];
        const inputComps = inputs.map(i => <Button val={i} callback={this.updateInputValue} />)

        return (

            <>
                <CalcInput val={this.state.inputValue} />
                <div id="buttons">

                    <Button val={'Clear'} callback={this.clearInput} />
                    <div id="nums">
                        {inputComps}
                    </div>

                    <div id="operators">
                        <Button val={'+'} callback={this.updateInputValue} />
                        <Button val={'-'} callback={this.updateInputValue} />
                        <Button val={'/'} callback={this.updateInputValue} />
                        <Button val={'*'} callback={this.updateInputValue} />
                        <Button val={'='} callback={this.getResult} />
                    </div>
                </div>
                <CalcResult result={this.state.result} />
            </>
        )
    }
}