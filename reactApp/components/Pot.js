const React = require('react')
const {Link} = require('react-router-dom');
//Components


class Pot extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
    <div className="GameRoomPage__Table--overall">
      <h1>
        Pot
      </h1>
      There is ... in the pot.
    </div>
  )
  }
}

module.exports = Pot
