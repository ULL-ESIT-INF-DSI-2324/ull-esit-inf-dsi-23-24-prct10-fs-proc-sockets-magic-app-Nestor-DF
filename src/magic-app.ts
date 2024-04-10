import yargs from 'yargs';
import chalk from 'chalk';
import { hideBin } from 'yargs/helpers';
import { MagiCard, Color, Type, Rarity } from './MagiCard.js';
import { colorCard } from './formatCards.js';
import net from 'net';

const client = net.connect({ port: 60300 });

/**
 * Command line interface for the Magic app that adds a card to the collection
 */
yargs(hideBin(process.argv))
  .command(
    'add',
    'Adds a card to the collection',
    {
      user: {
        description: 'user name',
        type: 'string',
        demandOption: true,
      },
      id: {
        description: 'Card ID',
        type: 'number',
        demandOption: true,
      },
      name: {
        description: 'Card name',
        type: 'string',
        demandOption: true,
      },
      manaCost: {
        description: 'Mana cost',
        type: 'number',
        demandOption: true,
      },
      color: {
        description: 'Color of the card',
        type: 'string',
        choices: ['White', 'Blue', 'Black', 'Red', 'Green', 'Colorless', 'Multicolor'],
        demandOption: true,
      },
      cardType: {
        description: 'Type of the card',
        type: 'string',
        choices: ['Land', 'Creature', 'Enchantment', 'Sorcery', 'Instant', 'Artifact', 'Planeswalker'],
        demandOption: true,
      },
      rarity: {
        description: 'Rarity of the card',
        type: 'string',
        choices: ['Common', 'Uncommon', 'Rare', 'Mythic'],
        demandOption: true,
      },
      rulesText: {
        description: 'Rules text of the card',
        type: 'string',
        demandOption: true,
      },
      powerToughness: {
        description: 'Power and Toughness of the card (for Creatures)',
        type: 'array',
        coerce: (arg) => arg.map(Number),
      },
      loyalty: {
        description: 'Loyalty of the card (for Planeswalkers)',
        type: 'number',
      },
      marketValue: {
        description: 'Market value of the card',
        type: 'number',
        demandOption: true,
      },
    },
    (argv) => {
      if (argv.cardType === 'Creature' && argv.powerToughness === undefined) {
        throw new Error('Creatures needs the powerToughness attribute');
      }
      if (argv.cardType === 'Planeswalker' && argv.loyalty === undefined) {
        throw new Error('Planeswalker needs the loyalty attribute');
      }
      const cardData: MagiCard = new MagiCard(
        argv.id,
        argv.name,
        argv.manaCost,
        argv.color as unknown as Color,
        argv.cardType as unknown as Type,
        argv.rarity as unknown as Rarity,
        argv.rulesText,
        argv.marketValue,
        argv.powerToughness,
        argv.loyalty,
      );
      const data = JSON.stringify({ action: 'add', user: argv.user, card: cardData, close: 'CLOSED' });
      client.write(data);
    },
  )
  .help().argv;

/**
 * Command line interface for the Magic app that updates a card of the collection
 */
yargs(hideBin(process.argv))
  .command(
    'update',
    'Updates a card of the collection',
    {
      user: {
        description: 'user name',
        type: 'string',
        demandOption: true,
      },
      id: {
        description: 'Card ID',
        type: 'number',
        demandOption: true,
      },
      name: {
        description: 'Card name',
        type: 'string',
        demandOption: true,
      },
      manaCost: {
        description: 'Mana cost',
        type: 'number',
        demandOption: true,
      },
      color: {
        description: 'Color of the card',
        type: 'string',
        choices: ['White', 'Blue', 'Black', 'Red', 'Green', 'Colorless', 'Multicolor'],
        demandOption: true,
      },
      cardType: {
        description: 'Type of the card',
        type: 'string',
        choices: ['Land', 'Creature', 'Enchantment', 'Sorcery', 'Instant', 'Artifact', 'Planeswalker'],
        demandOption: true,
      },
      rarity: {
        description: 'Rarity of the card',
        type: 'string',
        choices: ['Common', 'Uncommon', 'Rare', 'Mythic'],
        demandOption: true,
      },
      rulesText: {
        description: 'Rules text of the card',
        type: 'string',
        demandOption: true,
      },
      powerToughness: {
        description: 'Power and Toughness of the card (for Creatures)',
        type: 'array',
        coerce: (arg) => arg.map(Number),
      },
      loyalty: {
        description: 'Loyalty of the card (for Planeswalkers)',
        type: 'number',
      },
      marketValue: {
        description: 'Market value of the card',
        type: 'number',
        demandOption: true,
      },
    },
    (argv) => {
      if (argv.cardType === 'Creature' && argv.powerToughness === undefined) {
        throw new Error('Creatures needs the powerToughness attribute');
      }
      if (argv.cardType === 'Planeswalker' && argv.loyalty === undefined) {
        throw new Error('Planeswalker needs the loyalty attribute');
      }
      const cardData: MagiCard = new MagiCard(
        argv.id,
        argv.name,
        argv.manaCost,
        argv.color as unknown as Color,
        argv.cardType as unknown as Type,
        argv.rarity as unknown as Rarity,
        argv.rulesText,
        argv.marketValue,
        argv.powerToughness,
        argv.loyalty,
      );
      const data = JSON.stringify({ action: 'update', user: argv.user, card: cardData, close: 'CLOSED' });
      client.write(data);
    },
  )
  .help().argv;

/**
 * Command line interface for the Magic app that removes a card of the collection
 */
yargs(hideBin(process.argv))
  .command(
    'remove',
    'Removes a card of the collection',
    {
      user: {
        description: 'user name',
        type: 'string',
        demandOption: true,
      },
      id: {
        description: 'Card ID',
        type: 'number',
        demandOption: true,
      },
    },
    (argv) => {
      const data = JSON.stringify({ action: 'remove', user: argv.user, cardID: argv.id, close: 'CLOSED' });
      client.write(data);
    },
  )
  .help().argv;

/**
 * Command line interface for the Magic app that show a card of the collection
 */
yargs(hideBin(process.argv))
  .command(
    'show',
    'Show a card of the collection',
    {
      user: {
        description: 'user name',
        type: 'string',
        demandOption: true,
      },
      id: {
        description: 'Card ID',
        type: 'number',
        demandOption: true,
      },
    },
    (argv) => {
      const data = JSON.stringify({ action: 'show', user: argv.user, cardID: argv.id, close: 'CLOSED' });
      client.write(data);
    },
  )
  .help().argv;

/**
 * Command line interface for the Magic app that list the collection
 */
yargs(hideBin(process.argv))
  .command(
    'list',
    'List the collection',
    {
      user: {
        description: 'user name',
        type: 'string',
        demandOption: true,
      },
    },
    (argv) => {
      const data = JSON.stringify({ action: 'list', user: argv.user, close: 'CLOSED' });
      client.write(data);
    },
  )
  .help().argv;

let wholeData = '';
client.on('data', (dataChunk) => {
  wholeData += dataChunk;
});

client.on('end', () => {
  console.log('Received from server:\n');
  const answer = JSON.parse(wholeData);
  // Las diferentes cartas se envían en formato JSON válido de tal forma: ["card1", "card2", "card3"]
  // A su vez, cada carta se envía en formato JSON válido de tal forma: {"id": 1, "name": "cardName", ...}
  // Así se puede parsear cada carta y mostrarla en consola con el formato deseado
  // En mi caso se lo paso a la función colorCard y esta se encarga de parsearla y darle color a la carta
  let receivedData: string[];
  switch (answer.status) {
    case 'Error':
      console.log(chalk.red.bold(answer.answer));
      break;
    case 'Success':
      console.log(chalk.green.bold(answer.answer));
      break;
    case 'CardsReceived':
      receivedData = JSON.parse(answer.answer);
      receivedData.forEach((card: string) => {
        console.log(colorCard(card));
      });
      break;
  }
});

client.on('close', () => {
  console.log('Connection closed');
});
