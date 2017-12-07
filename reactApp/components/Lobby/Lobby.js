const React = require('react')
const {Link} = require('react-router-dom');
const axios = require('axios');

import GameRoomTable from './GameRoomTable';
import { RaisedButton } from 'material-ui';
import startHost from '../../../backend/gameHost/GameHostConnect';
import styles from './Lobby.css'
import StartHostPopup from './StartHostPopup';
import GameRoomDetailsPopup from './GameRoomDetailsPopup';

class Lobby extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {
        username: '',
        balance: ''
      },
      hosting: false,
      open: false,
      open_game: false,
      gameName: '',
      hostedGames: [],
      curGame: {},
    }
  }

       handleStartHost() {
             startHost.connect(this.state.gameName)
             this.setState({
               open: false,
               hosting: true
             })
       }

   handleInputGameName(e) {
     this.setState({gameName: e.target.value})
   }

   handleGameHostClick(gameIndex){
     this.setState({
       open_game: true,
       curGame: this.state.hostedGames[gameIndex],
     })
   }

   componentDidMount() {
     this.timer = setInterval(()=>{
       axios.get('https://secure-depths-49472.herokuapp.com/games')
       .then( x => this.setState({
         hostedGames: x.data
       }))
       .catch( err => console.log(err))
     }, 1000)

   }

   handleClick() {
    if(this.state.hosting) {
      startHost.disconnect()
      this.setState({
        hosting: false
      })
    } else {
      this.setState({
        open: true,
      })
     }
   }

   handleClose() {
    this.setState({
      open: false,
      open_game: false,
      curGame: {},
    });
   }
  render() {
    return (
    <div className={styles.container_overall}>
        <div className={styles.container_header}>
          <div className={styles.hostbutton_top}>
            <RaisedButton
              label= {this.state.hosting ? "Disconnect" : "Host"}
              onClick={this.handleClick.bind(this)}
            />
            <Link to='/game'> Game</Link>
          </div>
          <h1 className={styles.username_top}> Welcome {this.state.currentUser.username}</h1>
          <p className={styles.balance_top}>Bank Account: {this.state.currentUser.balance} BTC</p>
        </div>
        <div className={styles.container_body}>
          <div className={styles.gamehost_table_container}>
            <div className={styles.gamehost_table}>
              <GameRoomTable
                handleGameHostClick={this.handleGameHostClick.bind(this)}
                hostedGames={this.state.hostedGames}
              />
            </div>

          </div>
          <div className={styles.body_footer_container}>
            <RaisedButton
              label="Direct Game Connection"
            />
          </div>
        </div>
        <div className={styles.container_footer}></div>
        <StartHostPopup
        open={this.state.open}
        handleStartHost={this.handleStartHost.bind(this)}
        handleClose={this.handleClose.bind(this)}
        handleInputGameName={this.handleInputGameName.bind(this)}
      />
      <GameRoomDetailsPopup
        open={this.state.open_game}
        handleClose={this.handleClose.bind(this)}
        game={this.state.curGame}
      />
    </div>
  )
  }
}

module.exports = Lobby
