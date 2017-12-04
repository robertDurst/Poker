const React = require('react')
const {Link} = require('react-router-dom');
class Lobby extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
    <div>
      <h1>Lobby</h1>
      <Link to='/game' > Game  </Link>

    </div>
  )
  }
}

module.exports = Lobby
