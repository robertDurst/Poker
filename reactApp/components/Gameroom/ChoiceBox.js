import React from 'react'
import {Link} from 'react-router-dom'
import styles from './Gameroom.css'
//Components
import RaisedButton from 'material-ui/RaisedButton';

class ChoiceBox extends React.Component {
  constructor(props) {
    super(props)
  }
  handleStart() {
    this.props.socket.emit('START_GAME', this.props.gameState)
  }
  handleReady() {
    this.props.socket.emit('READY', this.props.gameState)
  }
  handleCall() {
    this.props.socket.emit('CALL', this.props.gameState)
  }
  handleBet() {
    this.props.socket.emit('BET', this.props.gameState)
  }
  handleFold() {
    this.props.socket.emit('FOLD', this.props.gameState)
  }
  render() {
    return (
    <div className={styles.choice_box_overall}>
      ChoiceBox
      <RaisedButton label="Call" primary={true}  />
      <RaisedButton label="Bet" primary={true} />
      <RaisedButton label="Fold" primary={true} />
      <RaisedButton label="Sit Down" onClick={() => {this.handleReady()}} />
      <RaisedButton label="Start Game" onClick={() => {this.handleStart()}} />
    </div>
  )
  }
}

module.exports = ChoiceBox
