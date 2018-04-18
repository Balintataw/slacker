import React, { Component } from 'react'
import {connect} from 'react-redux'
import {AddMessageForm} from './components/AddMessageForm'

import './App.css'

class App extends Component {

  render() {
    return (
      <div>
          <AddMessageForm />
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
