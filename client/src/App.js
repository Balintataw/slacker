import React, { Component } from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Registration from './components/Registration'
import Login from './components/Login'
import Home from './components/Home'
import Profile from './components/Profile'
import 'normalize.css/normalize.css'
// import './App.css'


class App extends Component {

    render() {
      	return (
			<div>
				<Router>
					<div>
						<Route path='/' exact component={Home} />
						<Route path='/registration' exact component={Registration} />
						<Route path='/login' component={Login} />
						<Route path='/profile' component={Profile} />
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
