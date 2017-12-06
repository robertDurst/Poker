const React = require('react')
const {Link} = require('react-router-dom');
//Components
const Card = require('./Card.js');
const Player = require('./Player.js');


class Table extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
    <div className="GameRoomPage__Table--overall">
      <div className="GameRoomPage__Table--player-bar" >
        <Player title="King" name="Poker" />
        <Player title="Duke" name="Ashbury" />
        <Player title="Mr." name="Pickle" />
      </div>
      <div className="GameRoomPage__Table--table" >
        <div className="GameRoomPage__Table--table-top" >
          Table Top
          <Card
            card="7C"
          />
          <Card
            card="QD"
          />
          <Card
            card="JS"
          />
          <Card
            card="3H"
          />
        </div>
      </div>
    </div>
  )
  }
}

module.exports = Table
