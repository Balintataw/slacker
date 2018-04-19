import React, { Component } from 'react';
import {connect} from 'react-redux'
import {sendMessage} from '../actions/actions'
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
                <form onSubmit={this.handleSubmit} id="message-form">
                <div className="btn-input">
                    <input type="text" name="message" placeholder="Message" value={this.state.message} onChange={this.handleChange} />
                    <button type="submit">Send</button>
                </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        messages: state.messages
    }
}

export default connect(mapStateToProps)(AddMessageForm)
