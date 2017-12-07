const React = require('react')
const {Link} = require('react-router-dom');
import GameRoomTable from './GameRoomTable';
import { RaisedButton } from 'material-ui';
import startHost from '../../../backend/gameHost/GameHostConnect';
import styles from './Lobby.css'

class Lobby extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {
        username: '',
        balance: ''
      },
      hosting: false
    }
  }
  render() {
    return (
    <div className={styles.container_overall}>
        <div className={styles.container_header}>
          <div className={styles.hostbutton_top}>
            <RaisedButton
              label= {this.state.hosting ? "Disconnect" : "Host"}
              onClick={() => {
                if(this.state.hosting) {
                  startHost.disconnect()
                  this.setState({
                    hosting: false
                  })
                } else {
                  startHost.connect()
                  this.setState({
                    hosting: true
                  })
                }

              }}
            />
            <Link to='/game'> Game</Link>
          </div>
          <h1 className={styles.username_top}> Welcome {this.state.currentUser.username}</h1>
          <p className={styles.balance_top}>Bank Account: {this.state.currentUser.balance} BTC</p>
        </div>
        <div className={styles.container_body}>
          <div className={styles.gamehost_table_container}>
            <div className={styles.gamehost_table}>
              <GameRoomTable />
            </div>

          </div>
          <div className={styles.body_footer_container}>
            <RaisedButton
              label="Direct Game Connection"
            />
          </div>
        </div>
        <div className={styles.container_footer}></div>
    </div>
  )
  }
}

module.exports = Lobby
