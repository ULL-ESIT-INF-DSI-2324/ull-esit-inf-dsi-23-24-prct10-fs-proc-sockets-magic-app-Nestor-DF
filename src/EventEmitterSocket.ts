import { EventEmitter } from 'events';

/**
 * Class to manage custom events of the server socket
 * Emits a request event when detects the client has send the full petititon
 */
export class EventEmitterSocket extends EventEmitter {
  constructor(connection: EventEmitter) {
    super();
    let wholeData = '';
    connection.on('data', (dataChunk) => {
      wholeData += dataChunk;

      if (wholeData.includes('CLOSED"}')) {
        this.emit('request', JSON.parse(wholeData), connection);
      }
    });

    connection.on('close', () => {
      this.emit('close');
    });
  }
}
