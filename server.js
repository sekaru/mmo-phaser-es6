import express from 'express'
import http from 'http'
import Game from './server/Game'

let app = express();
let server = http.Server(app);

app.use('/', express.static(__dirname + '/bin/client'));
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/vendor', express.static(__dirname + '/vendor'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/bin/client/index.html');
});

server.listen(process.env.PORT || 8081, () => {
  console.log('Listening on ' + server.address().port);
});

let game = new Game(server);
