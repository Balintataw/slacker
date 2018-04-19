import React, { Component } from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Registration} from './components/Registration'
import {FeedPage} from './components/FeedPage'
import 'normalize.css/normalize.css'
// import './App.css'


class App extends Component {

    render() {
      	return (
        	// <div className="master-wrapper">
			// <LeftBar />
			// 	<div className="test">
			// 		<Header />
			// 		<div className="test2">
			// 		<div className="feed-wrapper">
			// 			<div className="messages">
			// 				{this.props.messages.map((msg, i) => {
			// 					return  <div key={'siopao'+i}>
			// 								<div className="message-container">
			// 									<img src="http://placehold.it/50/50" />
			// 									<div className="message-right">
			// 										<h3>name of you</h3>
			// 										<p className="msg-content">{msg.message}</p>
			// 									</div>
			// 								</div>
			// 							</div>
			// 				})}
			// 			</div>
			// 		<AddMessageForm />
			// 		</div>
			// 		<RightBar />
			// 		</div>
			// 	</div>
			<div>
				<Router>
					<div>
						<Route path='/' exact component={FeedPage} />
						<Route path='/registration' exact component={Registration} />
					</div>
				</Router>
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
