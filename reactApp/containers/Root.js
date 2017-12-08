import PropTypes from 'prop-types';
import React from 'react';
import {Provider} from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Landing = require('../components/Landing/Landing.js')
import Lobby from '../components/Lobby/Lobby.js';
import GameRoom from '../components/Gameroom/Gameroom.js';

export default function Root({ store, history }) {
    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <HashRouter>
            <Switch>
              <Route exact path='/' component={Landing}/>
              <Route exact path='/lobby' render={()=><Lobby history={history}/>}/>
              <Route exact path='/game' render={()=><GameRoom history={history}/>}/>
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
