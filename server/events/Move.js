class MoveEvent {
  constructor(game, socket) {
    socket.on('playermove', data => {
      socket.player.x = data.x - 30;
      socket.player.y = data.y - 40;
      game.io.emit('playermove', socket.player);
    });
  }
}

export default MoveEvent
