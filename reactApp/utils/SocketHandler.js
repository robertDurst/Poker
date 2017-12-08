import { store } from '../store/configureStore';
import { gameUpdate } from '../actions/index';

export default (socket) => {
  socket.on('GAME_UPDATE', (game) => {
    store.dispatch(gameUpdate(game))
  })
}
