const React = require('react')
const {Link} = require('react-router-dom');
//Components
const Card = require('./Card.js');

class Hand extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
    <div className="GameRoomPage__Hand--overall">
      Hand
      <Card
        card="7D"
      />
      <Card
        card="AD"
      />
    </div>
  )
  }
}

module.exports = Hand
