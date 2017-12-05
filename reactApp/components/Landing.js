const React = require('react')
const {Link} = require('react-router-dom');
const axios = require('axios');

class Landing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      games: []
    }
  }

  componentWillMount(){

    setInterval( async() => {
      const resp = await axios.get("https://secure-depths-49472.herokuapp.com/games");
      this.setState({
        games: resp.data
      })
    }, 1000)

  }

  render() {
    return (
    <div>
      <h1>Landing</h1>
      {/* <Link to='/lobby'> Lobby  </Link> */}
      {
        this.state.games.map( (x,i) => <div><h1>Game {1}: {x.game_name}</h1><br /> <p>Active Players: {x.activePlayers} </p></div>)
      }

    </div>
  )
  }
}

module.exports = Landing
