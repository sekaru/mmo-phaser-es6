import Game from '../states/Game'

class Client {
  constructor(game) {
    this.socket = io.connect()

    this.socket.on('disconnect', () => {
      setTimeout(() => {
        location.reload()        
      }, 5000)
    })

    this.socket.on('myid', data => {
      game.myID = data.id
    })

    this.socket.on('newplayer', data => {
      game.gameObjectHandler.addPlayer(data.id, data.x, data.y)
    })

    this.socket.on('allplayers', data => {
      for(let i=0; i<data.length; i++) {
        game.gameObjectHandler.addPlayer(data[i].id, data[i].x, data[i].y)
      }
    })

    this.socket.on('playermove', data => {
      game.gameObjectHandler.movePlayer(data.id, data.x, data.y)
    })

    this.socket.on('remove', id => {
      game.gameObjectHandler.removePlayer(id)
    })
  }

  requestJoin() {
    this.socket.emit('newplayer')
  }

  sendMove(x, y) {
    this.socket.emit('playermove', { x, y })
  }
}

export default Client