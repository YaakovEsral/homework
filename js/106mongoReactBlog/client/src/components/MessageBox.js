import React, { Component } from 'react'

export default class MessageBox extends Component {

    // constructor(props){
    //     super(props);
    //     this.state = {currentDisplay: null}
    // }

    // modal = <div>
    //     <div className="modalOverlay">
    //         <div className="modalContent" id="createAccountBox">
    //             <span className="x-icon" onClick={() => this.props.hide()}>&#10006;</span>
    //         </div>
    //     </div>
    // </div>;



    // showModal() {
    //     console.log('inside show modal');
    //     this.setState({currentDisplay: this.modal});
    // }

    // hideModal = () => {
    //     this.setState({currentDisplay: null});
    // }

    render() {
        return (
            // this.state.currentDisplay
            <div>
                <div className="modalOverlay">
                    <div className="modalContent" id="createAccountBox">
                        <span className="x-icon" onClick={() => this.props.hide()}>&#10006;</span>
                    </div>
                </div>
            </div>
        )
    }
}
