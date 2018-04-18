import React, { Component } from 'react'
import {connect} from 'react-redux'
import {sendMessage} from './actions/actions'

import './App.css'

class App extends Component {
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
      <div>
        <form onSubmit={this.handleSubmit}>
        <input type="text" name="message" value={this.state.message} onChange={this.handleChange} />
        <button type="submit">Send</button>
        </form>
        <div className="messages">
          {this.props.messages.map((msg, i) => {
            return  <div key={'siopao'+i}>
              <p>{msg.message}</p>
            </div>
          })}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages
  }
}

export default connect(mapStateToProps)(App)
