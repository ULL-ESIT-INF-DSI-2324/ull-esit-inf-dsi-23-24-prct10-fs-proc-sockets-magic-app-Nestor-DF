import chalk from 'chalk';
import fs from 'fs';
import { MagiCard } from './MagiCard.js';
import { Color } from './MagiCard.js';

/**
 * Class to manage the card collection
 */
export class CardManager {
  private static instance: CardManager;

  private constructor() {}

  /**
   * Method to get the instance of the CardManager
   * @returns the instance of the CardManager
   */
  public static getInstance(): CardManager {
    if (!CardManager.instance) {
      CardManager.instance = new CardManager();
    }
    return CardManager.instance;
  }

  /**
   * Method to add a card to the collection of an user
   * @param user The user to add the card to
   * @param card The card to add
   * @returns A string indicating the result of the operation
   */
  public addCard(user: string, card: MagiCard): string {
    const userDirectory = `./data/${user}`;
    const cardFilePath = `${userDirectory}/${card.getId()}.json`;

    if (!fs.existsSync(userDirectory)) {
      fs.mkdirSync(userDirectory, { recursive: true });
    }

    if (fs.existsSync(cardFilePath)) {
      return chalk.red.bold(`A card with the same ID already exists in ${user}'s collection`);
    } else {
      fs.writeFileSync(cardFilePath, JSON.stringify(card));
      return chalk.green.bold(`Card added in ${user}'s collection`);
    }
  }

  /**
   * Method to modify a card in the collection of an user
   * @param user The user to modify the card for
   * @param card The card to modify
   * @returns A string indicating the result of the operation
   */
  public updateCard(user: string, card: MagiCard): string {
    const cardFilePath = `./data/${user}/${card.getId()}.json`;

    if (fs.existsSync(cardFilePath)) {
      fs.writeFileSync(cardFilePath, JSON.stringify(card));
      return chalk.green.bold(`Card updated in ${user}'s collection`);
    } else {
      return chalk.red.bold(`Card not found at ${user}'s collection`);
    }
  }

  /**
   * Method to remove a card in the collection of an user
   * @param user The user to remove the card for
   * @param cardID The card to remove
   * @returns A string indicating the result of the operation
   */
  public removeCard(user: string, cardID: number): string {
    const cardFilePath = `./data/${user}/${cardID}.json`;

    if (fs.existsSync(cardFilePath)) {
      fs.unlinkSync(cardFilePath);
      return chalk.green.bold(`Card removed in ${user}'s collection`);
    } else {
      return chalk.red.bold(`Card not found at ${user}'s collection`);
    }
  }

  /**
   * Method to show a card in the collection of an user
   * @param user The user to show the card for
   * @param cardID The card to show
   * @returns A string representing the card information or an error message
   */
  public showCard(user: string, cardID: number): string {
    const cardFilePath = `./data/${user}/${cardID}.json`;

    if (fs.existsSync(cardFilePath)) {
      const content = fs.readFileSync(cardFilePath).toString();
      return this.colorCard(content);
    } else {
      return chalk.red.bold(`Card not found at ${user}'s collection`);
    }
  }

  /**
   * Method to list the collection of an user
   * @param user The user of the collection to list
   * @returns A string representing the collection or an error message
   */
  public listCollection(user: string): string {
    const dirPath = `./data/${user}`;

    if (fs.existsSync(dirPath)) {
      let collection = '';
      const files = fs.readdirSync(dirPath);
      files.forEach((file) => {
        const content = fs.readFileSync(`${dirPath}/${file}`).toString();
        collection += this.colorCard(content) + '\n';
      });
      return collection;
    } else {
      return chalk.red.bold(`User ${user} doesn't have a collection`);
    }
  }

  /**
   * Method to format a card
   * @param card The card to format
   * @returns Formatted card as a string
   */
  private formatCard(card: string): string {
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
   * Method to  a card
   * @param card The card to color
   */
  private colorCard(card: string): string {
    const JSONcard = JSON.parse(card);
    const cardInfo = this.formatCard(card);
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
        return chalk.red.bold('Unknown color');
    }
  }
}
