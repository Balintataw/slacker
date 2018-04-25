import React, { Component } from 'react'
import {connect} from 'react-redux'
import {joinRoom, createRoom} from '../actions/actions'
import './roomlist.css'

class RoomList extends Component {
    state = {
        roomname: ''
    }
    callRoom = (room) => {
        joinRoom(room)
    }
    handleChange = (e) => {
        this.setState({
            roomname: e.target.value
        })
    }
    createRoomSubmit = (e) => {
        e.preventDefault()
        createRoom(this.state.roomname)
        this.setState({
            roomname: ''
        })
    }
  render() {
    return (
      <div className="roomlist-container">
        <form onSubmit={this.createRoomSubmit} id="add-room-form">
            <input type="text" onChange={this.handleChange} placeholder="Create Room" value={this.state.roomname} className="room-input"/>
            <button type="submit">+</button>
        </form>
        <ul>
            {this.props.rooms.map((room,i) => {
                return <li key={'room' + i} onClick={() => this.callRoom(room)} className={room === this.props.currentRoom ? 'current' : ''}>
                {console.log(room)}
                    {room}
                </li>
            })}

        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
    console.log('RoomList ' + state.rooms)
    return {
        rooms: state.rooms,
        currentRoom: state.currentRoom
    }
}

export default connect(mapStateToProps)(RoomList)
