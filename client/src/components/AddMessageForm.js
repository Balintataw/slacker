import React, { Component } from 'react';
import {connect} from 'react-redux'
import {sendMessage} from '../actions/actions'
import TextArea from "react-textarea-autosize"

import 'font-awesome/css/font-awesome.min.css'
import EmojiPicker from 'emoji-picker-react'
import {emojify} from 'react-emoji'
// import JSEMOJI from 'emoji-js'
import 'normalize.css/normalize.css'
import './AddMessageForm.css'
// const emoji = new JSEMOJI()


export class AddMessageForm extends Component {
    state = {
        message: ' ',
        renderEmoji: false
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
    toggleEmoji = (e) => {
        console.log(e.target)
        this.setState({
            renderEmoji: !this.state.renderEmoji
        })
    }
    myCallback = (code, data) => {
        var output = `:${data.name}:`
        this.setState({
            message: this.state.message +' '+ output,
            renderEmoji: false
        })
    }
    render() {
        return (
            <div className="form-input-container">
                <form onSubmit={this.handleSubmit} id="message-form" ref={el => this.myFormRef = el}>
                <div className="btn-input">
                    {/* <input type="text" name="message" placeholder="Message" value={this.state.message} onChange={this.handleChange} /> */}
                    <TextArea name="message" placeholder="Message" value={this.state.message} onChange={this.handleChange} onKeyDown={this.handleKeypress} id="textarea" />
                    <button type="submit" id="btn-hidden"></button>
                        <div className="dropdown-content">
                            {this.state.renderEmoji ? <EmojiPicker onEmojiClick={this.myCallback}/> : ''}
                        </div>
                    <button type="button" id="btn-emoji" onClick={this.toggleEmoji}><i className="fa fa-smile-o"></i></button>
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
