import React from 'react'
import {Link} from 'react-router-dom'
//Components
import styles from './Gameroom.css'

class Pot extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (<div className={styles.choice_box_overall}>
      <h1>
        Pot
      </h1>
      There is {this.props.gameState.getPotValue ? this.props.gameState.getPotValue() : 0} in the pot.</div>)
  }
}



export default Pot
