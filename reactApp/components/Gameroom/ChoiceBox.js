import React from 'react'
import {Link} from 'react-router-dom'
import styles from './Gameroom.css'
//Components
import RaisedButton from 'material-ui/RaisedButton';

class ChoiceBox extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
    <div className={styles.choice_box_overall}>
      ChoiceBox
      <RaisedButton label="Call" primary={true}  />
      <RaisedButton label="Bet" primary={true} />
      <RaisedButton label="Fold" primary={true} />
    </div>
  )
  }
}

module.exports = ChoiceBox
