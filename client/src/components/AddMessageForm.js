import React, { Component } from 'react';
import {connect} from 'react-redux'
import {sendMessage} from '../actions/actions'
import TextArea from "react-textarea-autosize"
import 'normalize.css/normalize.css'
import './AddMessageForm.css'

export class AddMessageForm extends Component {
    state = {
        message: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleKeypress = (e) => {
        if(e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault()
            this.handleSubmit(e)
        }
    }
    handleSubmit = (e) => {
        e.preventDefault()
        sendMessage(this.state.message)
        this.setState({
            message: ''
        })
    }
    render() {
        return (
            <div className="form-input-container">
                <form onSubmit={this.handleSubmit} id="message-form" ref={el => this.myFormRef = el}>
                <div className="btn-input">
                    {/* <input type="text" name="message" placeholder="Message" value={this.state.message} onChange={this.handleChange} /> */}
                    <TextArea name="message" placeholder="Message" value={this.state.message} onChange={this.handleChange} onKeyDown={this.handleKeypress} id="textarea" style="height: 40px"/>
                    <button type="submit">Send</button>
                </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        messages: state.messages
    }
}

export default connect(mapStateToProps)(AddMessageForm)
