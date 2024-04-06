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
      connection.write(cardManager.addCard(request.user, cardData!));
      break;
    case 'update':
      connection.write(cardManager.updateCard(request.user, cardData!));
      break;
    case 'remove':
      connection.write(cardManager.removeCard(request.user, request.cardID));
      break;
    case 'show':
      connection.write(cardManager.showCard(request.user, request.cardID));
      break;
    case 'list':
      connection.write(cardManager.listCollection(request.user));
      break;
    default:
      connection.write(console.log('Invalid action'));
  }
  connection.end();
});
