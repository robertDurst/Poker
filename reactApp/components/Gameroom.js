const React = require('react')
const {Link} = require('react-router-dom');
class Game extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
    <div>
      <h1>Game</h1>
      <Link to='/' >Landing </Link>
      <Link to='/Lobby'>Lobby  </Link>

    </div>)
  }
}

module.exports = Game
