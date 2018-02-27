import MoveEvent from './Move'
import DisconnectEvent from './Disconnect'

class NewPlayerEvent {
  constructor(game, socket) {
    socket.on('newplayer', () => {
      socket.player = {
        id: ++game.lastPlayerID,
        x: game.rand(100, 400),
        y: game.rand(100, 400)
      }

      socket.emit('myid', {id: game.lastPlayerID})
      socket.emit('allplayers', game.getAllPlayers())
      socket.broadcast.emit('newplayer', socket.player)

      new MoveEvent(game, socket)
      new DisconnectEvent(game, socket)
    })
  }
}

export default NewPlayerEvent
