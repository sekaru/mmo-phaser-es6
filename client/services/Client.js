import Game from '../states/Game'

export default class Client {
  constructor(app) {
    this.socket = io.connect();
    let game = app;

    this.socket.on('newplayer', data => {
      game.addPlayer(data.id, data.x, data.y);
    });

    this.socket.on('allplayers', data => {
      for(let i=0; i<data.length; i++) {
        game.addPlayer(data[i].id, data[i].x, data[i].y);
      }
    });

    this.socket.on('playermove', data => {
      game.movePlayer(data.id, data.x, data.y);
    });

    this.socket.on('remove', id => {
      game.removePlayer(id);
    });
  }

  requestJoin() {
    this.socket.emit('newplayer');
  }

  sendClick(x, y) {
    this.socket.emit('playermove', { x, y });
  }
}