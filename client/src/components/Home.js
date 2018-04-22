import React, { Component } from 'react'
import {connect} from 'react-redux'
import {AddMessageForm} from './AddMessageForm'
import {LeftBar} from './LeftBar'
import {RightBar} from './RightBar'
import {Header} from './Header'
import {emojify} from 'react-emoji'

import 'normalize.css/normalize.css'
import './home.css'

export class Home extends Component {
    state = {
        rendering: true
    }
    static defaultProps = {
        messages: []
    }
    handleRenderChange = (renderState) => {
        this.setState({
            rendering: renderState
        })
    }

  render() {
    return (
        <div className="master-wrapper">
        <LeftBar />
            <div className="test">
                <Header />
                <div className="test2">
                <div className="feed-wrapper">
                    <div className="messages">
                        {this.props.messages.map((msg, i) => {
                            return  <div className="message-container" key={'siopao'+i}>
                            <img src="http://placehold.it/50/50" alt=""/>
                            <div className="message-right">
                                <h3>name of you</h3>
                                <p className="msg-content">{emojify(msg.message)}</p>
                            </div>
                        </div>
                                        
                                    
                        })}
                    </div>
                <AddMessageForm />
                </div>
                {this.state.rendering ? <RightBar sendRenderState={this.handleRenderChange}/> : ''}
                </div>
            </div>
        
        </div>
        )
    }
};

function mapStateToProps(state) {
    return {
        messages: state.messages
    }
}

export default connect(mapStateToProps)(Home)
