import PropTypes from 'prop-types';
import React from 'react';
import {Provider} from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Landing = require('../components/Landing/Landing.js')
const Lobby = require('../components/Lobby/Lobby.js')
const Gameroom = require('../components/Gameroom/Gameroom.js')

export default function Root({ store, history }) {
    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <HashRouter>
            <Switch>
              <Route exact path='/' component={Landing}/>
              <Route exact path='/lobby' component={Lobby}/>
              <Route exact path='/game' component={Gameroom}/>
            </Switch>
          </HashRouter>
        </MuiThemeProvider>
      </Provider>
    );
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};
