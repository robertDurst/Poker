const React = require('react')
const {Link} = require('react-router-dom');
class Lobby extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
    <div className="LobbyPage__container--overall">
        <div className="LobbyPage__container--header">
          <h1> Lobby</h1>
        </div>
        <div className="LobbyPage__container--body">
          <Link to='/game' > Game  </Link>
        </div>
        <div className="LobbyPage__container--footer"></div>

    </div>
  )
  }
}

module.exports = Lobby
