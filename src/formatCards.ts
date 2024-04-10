import chalk from 'chalk';
import { Color } from './MagiCard.js';

/**
 * Function to format a card in a string (for console output nicely)
 * @param card Card to format
 * @returns Formatted card
 */
export function formatCardString(card: string): string {
  const JSONcard = JSON.parse(card);
  let content = '';
  content += `ID: ${JSONcard.id}\n`;
  content += `Name: ${JSONcard.name}\n`;
  content += `Mana cost: ${JSONcard.manaCost}\n`;
  content += `Color: ${JSONcard.color}\n`;
  content += `Type: ${JSONcard.type}\n`;
  content += `Rarity: ${JSONcard.rarity}\n`;
  content += `Rules text: ${JSONcard.rulesText}\n`;
  content += `Market value: ${JSONcard.marketValue}\n`;
  if (JSONcard.type === 'Creature') {
    content += `Power/Toughness: ${JSONcard.powerAndToughness}\n`;
  }
  if (JSONcard.type === 'Planeswalker') {
    content += `Loyalty: ${JSONcard.loyaltyMarks}\n`;
  }
  return content;
}

/**
 * Function to color a card (first is formated to string)
 * @param card Card to color
 * @returns Colored card
 */
export function colorCard(card: string): string {
  const JSONcard = JSON.parse(card);
  const cardInfo = formatCardString(card);
  switch (JSONcard.color) {
    case Color.White:
      return chalk.white.bold.italic(cardInfo);
    case Color.Blue:
      return chalk.blue.bold.italic(cardInfo);
    case Color.Black:
      return chalk.black.bold.italic(cardInfo);
    case Color.Red:
      return chalk.red.bold.italic(cardInfo);
    case Color.Green:
      return chalk.green.bold.italic(cardInfo);
    case Color.Colorless:
      return chalk.gray.bold.italic(cardInfo);
    case Color.Multicolor:
      return chalk.yellow.bold.italic.bgBlack(cardInfo);
    default:
      return chalk.bold('Unknown color');
  }
}
