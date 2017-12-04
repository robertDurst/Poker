const React = require('react')
const Landing = require('./Landing.js')
const Lobby = require('./Lobby.js')
const Gameroom = require('./Gameroom.js')
const {HashRouter, Switch, Route} = require('react-router-dom');

class AppContainer extends React.Component {
  constructor(props) {
    super(props)
    props.socket.on('news', function(data) {
      console.log(data);
      props.socket.emit('my other event', {my: 'data'});
    });
  }
  render() {
    return (
    <HashRouter>
      <Switch>
        <Route path='/' component={Landing}/>
        <Route path='/lobby' component={Lobby}/>
        <Route path='/game' component={Gameroom}/>
      </Switch>
    </HashRouter>);
  }
}

module.exports = AppContainer
