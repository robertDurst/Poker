import { store } from '../store/configureStore';
import { gameUpdate } from '../actions/index';

export default (socket) => {

  socket.on('GAME_UPDATE', (game) => {
    store.dispatch(gameUpdate(game))
  })
<<<<<<< HEAD
  socket.on('LOG', (data) => {
    console.log('LOG RECEIVED:',data);
  })
=======
>>>>>>> 5125960b30a9a7ac95a3cd9450ca67d9d21e8e88

}
