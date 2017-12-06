const React = require('react')
const {Link} = require('react-router-dom');
//Components
const Table = require('./Table.js');
const Pot = require('./Pot.js');
const Hand = require('./Hand.js');
const ChoiceBox = require('./ChoiceBox.js');

class Game extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
    <div className="GameRoomPage__container--overall">
      <div className="GameRoomPage__container--header">
        <div className="GameRoomPage__container--header--item">Game</div>
        <div className="GameRoomPage__container--header--item">Messages</div>
        <div className="GameRoomPage__container--header--item">Options</div>
        <div className="GameRoomPage__container--header--item">About</div>
        <Link to='/Lobby'><div className="GameRoomPage__container--header--item">Leave Game</div></Link>
      </div>
      <div className="GameRoomPage__container--body">
        <div className="GameRoomPage__container--body-top">
          <Table />
        </div>
        <div className="GameRoomPage__container--body-bottom">
          <div className="GameRoomPage__info-item">
            <Pot />
          </div>
          <div className="GameRoomPage__info-item">
            <Hand />
          </div>
          <div className="GameRoomPage__info-item">
            <ChoiceBox />
          </div>
        </div>
      </div>
      <div className="GameRoomPage__container--footer">
      </div>
    </div>
  )
  }
}

module.exports = Game
