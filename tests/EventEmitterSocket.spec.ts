import 'mocha';
import { expect } from 'chai';
import { EventEmitter } from 'events';
import { EventEmitterSocket } from '../src/EventEmitterSocket.js';

describe('EventEmitterSocket', () => {
  it('Should emit a request event once it gets a complete request', (done) => {
    const socket = new EventEmitter();
    const client = new EventEmitterSocket(socket);

    client.on('request', (request, _) => {
      expect(request.action).to.be.eql('list');
      done();
    });

    socket.emit('data', '{"action":"list","user":"');
    socket.emit('data', 'nestor","close":"CLO');
    socket.emit('data', 'SED"}');
  });

  it('Should emit a close event', (done) => {
    const socket = new EventEmitter();
    const client = new EventEmitterSocket(socket);

    client.on('close', () => {
      // Solo quiero ver que emita el close
      expect(true).to.be.eql(true);
      done();
    });

    socket.emit('close');
  });
});
