const React = require('react')
const {Link} = require('react-router-dom');
//Components
import RaisedButton from 'material-ui/RaisedButton';

class ChoiceBox extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
    <div className="GameRoomPage__Table--overall">
      ChoiceBox
      <RaisedButton label="Call" primary={true}  />
      <RaisedButton label="Bet" primary={true} />
      <RaisedButton label="Fold" primary={true} />
    </div>
  )
  }
}

module.exports = ChoiceBox
