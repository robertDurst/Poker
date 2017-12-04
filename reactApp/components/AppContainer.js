const React = require('react')
class AppContainer extends React.Component {
  constructor(props) {
    super(props)
    props.socket.on('news', function (data) {
      console.log(data);
      props.socket.emit('my other event', { my: 'data' });
    });
  }
  render() {
    return <h1>Hello, Nate</h1>;
  }
}

module.exports = AppContainer
