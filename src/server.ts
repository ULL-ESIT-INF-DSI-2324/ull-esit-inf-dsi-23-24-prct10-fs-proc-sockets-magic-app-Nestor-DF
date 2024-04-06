import { MagiCard } from './MagiCard.js';
import { CardManager } from './CardManager.js';
import net from 'net';

const cardManager = CardManager.getInstance();

const server = net.createServer({ allowHalfOpen: true }, (connection) => {
  console.log('A client has connected.');

  let wholeData = '';
  connection.on('data', (dataChunk) => {
    wholeData += dataChunk;
  });

  connection.on('end', () => {
    const jsonData = JSON.parse(wholeData.toString());
    let cardData;
    if (jsonData.action === 'add' || jsonData.action === 'update') {
      cardData = new MagiCard(
        jsonData.card.id,
        jsonData.card.name,
        jsonData.card.manaCost,
        jsonData.card.color,
        jsonData.card.cardType,
        jsonData.card.rarity,
        jsonData.card.rulesText,
        jsonData.card.marketValue,
        jsonData.card.powerToughness,
        jsonData.card.loyalty,
      );
    }
    switch (jsonData.action) {
      case 'add':
        connection.write(cardManager.addCard(jsonData.user, cardData!));
        connection.end();
        break;
      case 'update':
        connection.write(cardManager.updateCard(jsonData.user, cardData!));
        connection.end();
        break;
      case 'remove':
        connection.write(cardManager.removeCard(jsonData.user, jsonData.cardID));
        connection.end();
        break;
      case 'show':
        connection.write(cardManager.showCard(jsonData.user, jsonData.cardID));
        connection.end();
        break;
      case 'list':
        connection.write(cardManager.listCollection(jsonData.user));
        connection.end();
        break;
      default:
        connection.write('Invalid action');
        connection.end();
    }
  });

  connection.on('close', () => {
    console.log('A client has disconnected.');
  });
});

server.listen(60300, () => {
  console.log('Waiting for clients to connect.');
});
