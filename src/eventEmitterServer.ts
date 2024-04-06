import { EventEmitter } from 'events';
import net from 'net';

export class EventEmitterServer extends EventEmitter {
  constructor() {
    super();

    console.log('Creating server');
    const server = net.createServer((connection) => {
      console.log('A client has connected.');

      let wholeData = '';
      connection.on('data', (dataChunk) => {
        wholeData += dataChunk;

        console.log('Received from client:', dataChunk.toString());
        if (wholeData.includes('CLOSED')) {
          this.emit('request', JSON.parse(wholeData), connection);
        }
      });

      connection.on('close', () => {
        console.log('A client has disconnected.');
      });
    });

    server.listen(60300, () => {
      console.log('Waiting for clients to connect.');
    });
  }
}
