import { EventEmitter } from 'events';

export class EventEmitterServer extends EventEmitter {
  constructor(connection: EventEmitter) {
    super();
    let wholeData = '';
    connection.on('data', (dataChunk) => {
      wholeData += dataChunk;

      console.log('Received from client:', dataChunk.toString());
      if (wholeData.includes('CLOSED"}')) {
        this.emit('request', JSON.parse(wholeData), connection);
      }
    });

    connection.on('close', () => {
      this.emit('close', connection);
    });
  }
}
