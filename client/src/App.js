import React, { Component } from 'react'
import {connect} from 'react-redux'
import {AddMessageForm} from './components/AddMessageForm'
import {LeftBar} from './components/LeftBar'
import {RightBar} from './components/RightBar'
import {Header} from './components/Header'
import 'normalize.css/normalize.css'
import './App.css'


class App extends Component {

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
								return  <div key={'siopao'+i}>
											<p>{msg.message}</p>
										</div>
							})}
						</div>
					<AddMessageForm />
					</div>
					<RightBar />
					</div>
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
