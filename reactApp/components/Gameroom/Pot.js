const React = require('react')
const {Link} = require('react-router-dom');
import styles from './Gameroom.css'
//Components


class Pot extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
    <div className={styles.choice_box_overall}>
      <h1>
        Pot
      </h1>
      There is ... in the pot.
    </div>
  )
  }
}

module.exports = Pot
