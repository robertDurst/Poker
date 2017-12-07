import React from 'react'
import {Link} from 'react-router-dom'
//Components
import Card from './Card.js'
import Player from './Player.js'

import styles from './Table.css'


class Table extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
    <div className={styles.Table_overall}>
      <div className={styles.Table_player_bar}>
        <Player title="King" name="Poker" />
        <Player title="Duke" name="Ashbury" />
        <Player title="Mr." name="Pickle" />
      </div>
      <div className={styles.Table_table}>
        <div className={styles.Table_table_top}>
          Table Top
          <Card
            card="7C"
          />
          <Card
            card="QD"
          />
          <Card
            card="JS"
          />
          <Card
            card="3H"
          />
        </div>
      </div>
    </div>
  )
  }
}

module.exports = Table
