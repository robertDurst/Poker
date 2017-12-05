import createHistory from 'history/createBrowserHistory';
import {createStore } from 'redux';
import rootReducer from '../reducers/index';

export const history = createHistory();

export function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
    );
}

export const store = configureStore()
