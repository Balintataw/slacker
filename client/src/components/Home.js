import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {AddMessageForm} from './AddMessageForm'
import LeftBar from './LeftBar'
import RightBar from './RightBar'
import Header from './Header'
import {emojify} from 'react-emoji'
import TimeAgo from 'react-timeago'


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
                {this.props.isAuthenticated ? 
                <div className="feed-wrapper">
                    <div className="messages">
                        {this.props.messages.map((msg, i) => {
                            return  <div className="message-container" key={'siopao'+i}>
                            <Link to='/profile'><img src={msg.profile_image} alt="profile"/></Link>
                            <div className="message-right">
                                <div className="msg-right-top-wrapper"><h3 className="msg-username">{msg.username}</h3><TimeAgo date={msg.timestamp} minPeriod={10} className="timestamp"/></div>
                                <p className="msg-content">{emojify(msg.message)}</p>
                            </div>
                        </div>
                        })}
                    </div>
                <AddMessageForm />
                </div> : this.props.loginErrorMsg !== '' ? <h1 className="login-error-msg">{this.props.loginErrorMsg}</h1> : <h1 className="welcome-msg">Log in or sign up to start communicating</h1>}
                {this.state.rendering ? <RightBar {...this.props} sendRenderState={this.handleRenderChange}/> : ''}
                </div>
            </div>
        </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        messages: state.messages.filter(msg => msg.roomname === state.currentRoom),
        username: state.userName,
        isAuthenticated: state.isAuthenticated,
        loginErrorMsg: state.loginErrorMsg,
        profile_image: state.profile_image
    }
}

export default connect(mapStateToProps)(Home)
