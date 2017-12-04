var React = require('react');
var ReactDOM = require('react-dom');
//Socket Import
const io = require('socket.io-client');
var socket = io.connect('http://localhost:3000');
//Root Component
const AppContainer = require('./components/AppContainer');
/* This can check if your electron app can communicate with your backend */
// fetch('http://localhost:3000')
// .then(resp => resp.text())
// .then(text => console.log(text))
// .catch(err => {throw err})

ReactDOM.render(<AppContainer socket={socket}/>,
   document.getElementById('root'));
