const React = require('react')
const {Link} = require('react-router-dom');
// const Accessibility = require('material-ui/svg-icons/action/accessibility')
import Accessibility from 'material-ui/svg-icons/action/accessibility'
//Components

class Player extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
    <div className="GameRoomPage__Player">
      {this.props.title}{this.props.name}
      <Accessibility />
    </div>
  )
  }
}

module.exports = Player
