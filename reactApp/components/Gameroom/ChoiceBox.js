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
  handleDeal() {
    this.props.socket.emit('DEAL', this.props.gameState)
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
  handleCheck() {
    this.props.socket.emit('CHECK', this.props.gameState)
  }
  render() {
    return (
    <div className={styles.choice_box_overall}>
      ChoiceBox
      <RaisedButton label="Call" primary={true}  />
      <RaisedButton label="Bet" primary={true} onClick={() => {this.handleBet()}}/>
      <RaisedButton label="Fold" primary={true} />
      <RaisedButton label="Start Game" onClick={() => {this.handleStart()}} />
      <RaisedButton label="Deal cards" onClick={() => {this.handleDeal()}} />
      <RaisedButton label="Update Me" onClick={() => {this.handleCheck()}} />
    </div>
  )
  }
}

module.exports = ChoiceBox
