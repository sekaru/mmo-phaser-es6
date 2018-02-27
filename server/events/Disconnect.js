class DisconnectEvent {
  constructor(game, socket) {
    socket.on('disconnect', () => {
      game.io.emit('remove', socket.player.id)
    })
  }
}

export default DisconnectEvent
