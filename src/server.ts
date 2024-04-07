import { MagiCard } from './MagiCard.js';
import { CardManager } from './CardManager.js';
import { EventEmitterServer } from './eventEmitterServer.js';

const cardManager = CardManager.getInstance();
const eventEmitterServer = new EventEmitterServer();

eventEmitterServer.on('request', (request, connection) => {
  let cardData;
  if (request.action === 'add' || request.action === 'update') {
    cardData = new MagiCard(
      request.card.id,
      request.card.name,
      request.card.manaCost,
      request.card.color,
      request.card.cardType,
      request.card.rarity,
      request.card.rulesText,
      request.card.marketValue,
      request.card.powerToughness,
      request.card.loyalty,
    );
  }

  console.log('Received request: ', request.action);
  switch (request.action) {
    case 'add':
      cardManager.addCard(request.user, cardData!, (error, result) => {
        if (error) {
          connection.write(error);
        } else {
          connection.write(result);
        }
        connection.end();
      });
      break;
    case 'update':
      cardManager.updateCard(request.user, cardData!, (error, result) => {
        if (error) {
          connection.write(error);
        } else {
          connection.write(result);
        }
        connection.end();
      });
      break;
    case 'remove':
      cardManager.removeCard(request.user, request.cardID, (error, result) => {
        if (error) {
          connection.write(error);
        } else {
          connection.write(result);
        }
        connection.end();
      });
      break;
    case 'show':
      cardManager.showCard(request.user, request.cardID, (error, result) => {
        if (error) {
          connection.write(error);
        } else {
          connection.write(result);
        }
        connection.end();
      });
      break;
    case 'list':
      cardManager.listCollection(request.user, (error, result) => {
        if (error) {
          connection.write(error);
        } else {
          connection.write(result);
        }
        connection.end();
      });
      break;
    default:
      connection.write(console.log('Invalid action'));
      connection.end();
  }
});
