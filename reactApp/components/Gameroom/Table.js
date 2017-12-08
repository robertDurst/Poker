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
    let retStr = ""
    switch(value) {
      case 1:
        retStr = 'A';
        break;
      case 11:
        retStr = 'J';
        break;
      case 12:
        retStr = 'Q';
        break;
      case 13:
        retStr = 'K';
        break;
      default:
        retStr = value.toString();
    }

<<<<<<< HEAD
    retStr = retStr + suite[0];
    // console.log(retStr);
    return retStr;
=======
    return retStr + suite[0];
>>>>>>> 5125960b30a9a7ac95a3cd9450ca67d9d21e8e88
  }

  render() {
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
              return <Card  card={this.cardTranslator(x.value, x.suite)} />
            }) : <div></div>
          }
        </div>
      </div>
    </div>
  )
  }
}

module.exports = Table
