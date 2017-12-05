const React = require('react')
const {Link} = require('react-router-dom');
class Game extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
    <div className="GameRoomPage__container--overall">
      <div className="GameRoomPage__container--header">
        <h1>Game</h1>
      </div>
      <div className="GameRoomPage__container--body">
        <Link to='/' >Landing </Link>
        <Link to='/Lobby'>Lobby  </Link>
      </div>
      <div className="GameRoomPage__container--footer">
      </div>
    </div>
  )
  }
}

module.exports = Game
