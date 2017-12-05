const React = require('react')
const {Link} = require('react-router-dom');

class Landing extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
    <div className="LandingPage__container--overall">
      <div className="LandingPage__container--header">
        <h1>Landing</h1>
      </div>
      <div className="LandingPage__container--body">
        <Link to='/lobby'> Lobby  </Link>
      </div>
      <div className="LandingPage__container--footer">
      </div>
    </div>
  )
  }
}

module.exports = Landing
