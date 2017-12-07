import React from 'react'
import {Link} from 'react-router-dom';
//Components
import Table from './Table.js';
import Pot from './Pot.js';
import Hand from './Hand.js';
import ChoiceBox from './ChoiceBox.js';
//styles
import styles from './Gameroom.css'

class Game extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
    <div className={styles.container_overall}>
      <div className={styles.container_header}>
        <div className={styles.container_header_item}>Game</div>
        <div className={styles.container_header_item}>Messages</div>
        <div className={styles.container_header_item}>Options</div>
        <div className={styles.container_header_item}>About</div>
        <Link to='/Lobby'><div className={styles.container_header_item}>Leave Game</div></Link>
      </div>
      <div className={styles.container_body}>
        <div className={styles.container_body_top}>
          <Table />
        </div>
        <div className={styles.container_body_bottom}>
          <div className={styles.info_item}>
            <Pot />
          </div>
          <div className={styles.info_item}>
            <Hand />
          </div>
          <div className={styles.info_item}>
            <ChoiceBox />
          </div>
        </div>
      </div>
      <div className={styles.container_footer}>
      </div>
    </div>
  )
  }
}

module.exports = Game
