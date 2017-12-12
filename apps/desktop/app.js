// const io = require('socket.io-client');
// var socket = io.connect('http://localhost:3000');

import React from 'react';
import { render } from 'react-dom';
import { configureStore, history, store } from '../../reactApp/store/configureStore';
import Root from '../../reactApp/containers/Root';

console.log("HERE");

render(
   <Root store={store} history={history} />,
   document.getElementById('root')
);
