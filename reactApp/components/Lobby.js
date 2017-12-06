const React = require('react')
const {Link} = require('react-router-dom');
import GameRoomTable from './GameRoomTable';
import { RaisedButton } from 'material-ui';

class Lobby extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {
        username: '',
        balance: ''
      }
    }
  }
  render() {
    return (
    <div className="LobbyPage__container--overall">
        <div className="LobbyPage__container--header">
          <div className="LobbyPage__hostbutton_top">
            <RaisedButton
              label="Host"
            />
          </div>
          <h1 className="LobbyPage__username_top"> Welcome {this.state.currentUser.username}</h1>
          <p className="LobbyPage__balance_top">Bank Account: {this.state.currentUser.balance} BTC</p>
        </div>
        <div className="LobbyPage__container--body">
          <div className="LobbyPage__gamehost_table_container">
            <div className="LobbyPage__gamehost_table">
              <GameRoomTable />
            </div>

          </div>
          <div className="LobbyPage__body_footer_container">
            <RaisedButton
              label="Direct Game Connection"
            />
          </div>
        </div>
        <div className="LobbyPage__container--footer"></div>
    </div>
  )
  }
}

module.exports = Lobby
