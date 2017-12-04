const React = require('react')
const {Link} = require('react-router-dom');

class Landing extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
    <div>
      <h1>Landing</h1>
      <Link to='/lobby'> Lobby  </Link>

    </div>
  )
  }
}

module.exports = Landing
