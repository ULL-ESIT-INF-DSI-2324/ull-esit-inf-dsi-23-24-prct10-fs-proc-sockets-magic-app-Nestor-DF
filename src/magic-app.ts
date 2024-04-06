import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { MagiCard, Color, Type, Rarity } from './MagiCard.js';
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
      const data = JSON.stringify({ action: 'add', user: argv.user, card: cardData });
      client.write(data);
      client.end();
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
      const data = JSON.stringify({ action: 'update', user: argv.user, card: cardData });
      client.write(data);
      client.end();
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
      const data = JSON.stringify({ action: 'remove', user: argv.user, cardID: argv.id });
      client.write(data);
      client.end();
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
      const data = JSON.stringify({ action: 'show', user: argv.user, cardID: argv.id });
      client.write(data);
      client.end();
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
      const data = JSON.stringify({ action: 'list', user: argv.user });
      client.write(data);
      client.end();
    },
  )
  .help().argv;

let wholeData = '';
client.on('data', (dataChunk) => {
  wholeData += dataChunk;
});

client.on('end', () => {
  console.log('Received from server:\n', wholeData.toString());
});

client.on('close', () => {
  console.log('Connection closed');
});
