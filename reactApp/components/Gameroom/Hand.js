import React from 'react'
import {Link} from 'react-router-dom'
import styles from './Gameroom.css'
//Components
import Card from './Card.js';

class Hand extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
    <div className={styles.Hand_overall}>
      Hand
      <Card
        card="7D"
      />
      <Card
        card="AD"
      />
    </div>
  )
  }
}

module.exports = Hand
