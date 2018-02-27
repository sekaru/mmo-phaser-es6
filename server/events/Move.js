class MoveEvent {
  constructor(game, socket) {
    socket.on('playermove', data => {
      let moved = !(data.x==socket.player.x && data.y==socket.player.y)

      if(moved) {
        socket.player.x = data.x
        socket.player.y = data.y
        socket.broadcast.emit('playermove', socket.player)
      }
    })
  }
}

export default MoveEvent
