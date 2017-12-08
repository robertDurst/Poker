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

  cardTranslator(value, suite) {
    console.log(value, suite);
    let retStr = ""
    switch(value) {
      case 1:
        return 'A' + suite.split("").slice(0,1);
      case 11:
        return 'J' + suite.split("").slice(0,1);
      case 12:
        return 'Q' + suite.split("").slice(0,1);
      case 13:
        return 'K' + suite.split("").slice(0,1);
      default:
        return value + suite.split("").slice(0,1);
    }
  }

  render() {
    console.log("HERE", this.props.gameState.spread);
    return (
    <div className={styles.Table_overall}>
      <div className={styles.Table_player_bar}>
        {
          this.props.gameState.players ? this.props.gameState.players.map( player => {
            return <Player  name={player.pubKey} key={player.pubKey} />
          }) : <div></div>
        }
      </div>
      <div className={styles.Table_table}>
        <div className={styles.Table_table_top}>
          {
            this.props.gameState.spread ? this.props.gameState.spread.map( x => {
              var thing = this.cardTranslator=(x.value, x.suite)
              console.log("THEHEHE",thing);
              // return <Card  card=)} />
            }) : <div></div>
          }
        </div>
      </div>
    </div>
  )
  }
}

module.exports = Table
