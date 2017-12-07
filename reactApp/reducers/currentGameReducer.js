function rootReducer(state = {}, action) {
    switch (action.type) {
       case 'GAME_UPDATE':
           return action.game;
       default:
          return state;
    }
}

export default rootReducer;
