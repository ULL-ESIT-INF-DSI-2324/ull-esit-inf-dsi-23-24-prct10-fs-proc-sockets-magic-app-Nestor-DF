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
   */
  public addCard(user: string, card: MagiCard): void {
    const userDirectory = `./data/${user}`;
    const cardFilePath = `${userDirectory}/${card.getId()}.json`;

    if (!fs.existsSync(userDirectory)) {
      fs.mkdirSync(userDirectory, { recursive: true });
    }

    if (fs.existsSync(cardFilePath)) {
      console.log(chalk.red.bold(`A card with the same ID already exists in ${user}'s collection`));
    } else {
      fs.writeFileSync(cardFilePath, JSON.stringify(card));
      console.log(chalk.green.bold(`Card added in ${user}'s collection`));
    }
  }

  /**
   * Method to modify a card in the collection of an user
   * @param user The user to modify the card for
   * @param card The card to modify
   */
  public updateCard(user: string, card: MagiCard): void {
    const cardFilePath = `./data/${user}/${card.getId()}.json`;

    if (fs.existsSync(cardFilePath)) {
      fs.writeFileSync(cardFilePath, JSON.stringify(card));
      console.log(chalk.green.bold(`Card updated in ${user}'s collection`));
    } else {
      console.log(chalk.red.bold(`Card not found at ${user}'s collection`));
    }
  }

  /**
   * Method to remove a card in the collection of an user
   * @param user The user to remove the card for
   * @param cardID The card to remove
   */
  public removeCard(user: string, cardID: number): void {
    const cardFilePath = `./data/${user}/${cardID}.json`;

    if (fs.existsSync(cardFilePath)) {
      fs.unlinkSync(cardFilePath);
      console.log(chalk.green.bold(`Card removed in ${user}'s collection`));
    } else {
      console.log(chalk.red.bold(`Card not found at ${user}'s collection`));
    }
  }

  /**
   * Method to show a card in the collection of an user
   * @param user The user to show the card for
   * @param cardID The card to show
   */
  public showCard(user: string, cardID: number): void {
    const cardFilePath = `./data/${user}/${cardID}.json`;

    if (fs.existsSync(cardFilePath)) {
      const content = fs.readFileSync(cardFilePath).toString();
      this.printCard(content);
    } else {
      console.log(chalk.red.bold(`Card not found at ${user}'s collection`));
    }
  }

  /**
   * Method to list the collection of an user
   * @param user The user of the collection to list
   */
  public listCollection(user: string): void {
    const dirPath = `./data/${user}`;

    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      files.forEach((file) => {
        const content = fs.readFileSync(`${dirPath}/${file}`).toString();
        this.printCard(content);
      });
    } else {
      console.log(chalk.red.bold(`User ${user} doesn't have a collection`));
    }
  }

  /**
   * Method to format a card
   * @param card The card to format
   * @returns Formated card
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
   * Method to print a card
   * @param card The card to print
   */
  private printCard(card: string): void {
    const JSONcard = JSON.parse(card);
    const cardInfo = this.formatCard(card);
    switch (JSONcard.color) {
      case Color.White:
        console.log(chalk.white.bold.italic(cardInfo));
        break;
      case Color.Blue:
        console.log(chalk.blue.bold.italic(cardInfo));
        break;
      case Color.Black:
        console.log(chalk.black.bold.italic(cardInfo));
        break;
      case Color.Red:
        console.log(chalk.red.bold.italic(cardInfo));
        break;
      case Color.Green:
        console.log(chalk.green.bold.italic(cardInfo));
        break;
      case Color.Colorless:
        console.log(chalk.gray.bold.italic(cardInfo));
        break;
      case Color.Multicolor:
        console.log(chalk.yellow.bold.italic.bgBlack(cardInfo));
        break;
      default:
        console.log(chalk.red.bold('Unknown color'));
        break;
    }
  }
}