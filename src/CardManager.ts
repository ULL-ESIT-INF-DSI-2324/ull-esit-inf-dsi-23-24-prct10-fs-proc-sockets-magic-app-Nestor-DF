import fs from 'fs';
import { MagiCard } from './MagiCard.js';

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
   * @callback
   */
  public addCard(user: string, card: MagiCard, callback: (error: string | undefined, result: string | undefined) => void): void {
    const userDirectory = `./data/${user}`;
    const cardFilePath = `${userDirectory}/${card.getId()}.json`;

    fs.mkdir(userDirectory, { recursive: true }, (err) => {
      if (err) {
        callback(err.message, undefined);
      } else {
        fs.stat(cardFilePath, (err) => {
          if (err) {
            fs.writeFile(cardFilePath, JSON.stringify(card), (err) => {
              if (err) {
                callback(err.message, undefined);
              } else {
                callback(undefined, `Card added in ${user}'s collection`);
              }
            });
          } else {
            callback(`A card with the same ID already exists in ${user}'s collection`, undefined);
          }
        });
      }
    });
  }

  /**
   * Method to modify a card in the collection of an user
   * @param user The user to modify the card for
   * @param card The card to modify
   * @callback
   */
  public updateCard(
    user: string,
    card: MagiCard,
    callback: (error: string | undefined, result: string | undefined) => void,
  ): void {
    const cardFilePath = `./data/${user}/${card.getId()}.json`;

    fs.stat(cardFilePath, (err) => {
      if (err) {
        callback(`Card not found at ${user}'s collection`, undefined);
      } else {
        fs.writeFile(cardFilePath, JSON.stringify(card), (err) => {
          if (err) {
            callback(err.message, undefined);
          } else {
            callback(undefined, `Card updated in ${user}'s collection`);
          }
        });
      }
    });
  }

  /**
   * Method to remove a card in the collection of an user
   * @param user The user to remove the card for
   * @param cardID The card to remove
   * @callback
   */
  public removeCard(
    user: string,
    cardID: number,
    callback: (error: string | undefined, result: string | undefined) => void,
  ): void {
    const cardFilePath = `./data/${user}/${cardID}.json`;

    fs.stat(cardFilePath, (err) => {
      if (err) {
        callback(`Card not found at ${user}'s collection`, undefined);
      } else {
        fs.unlink(cardFilePath, (err) => {
          if (err) {
            callback(err.message, undefined);
          } else {
            callback(undefined, `Card removed in ${user}'s collection`);
          }
        });
      }
    });
  }

  /**
   * Method to show a card in the collection of an user
   * @param user The user to show the card for
   * @param cardID The card to show
   * @callback
   */
  public showCard(user: string, cardID: number, callback: (error: string | undefined, result: string | undefined) => void): void {
    const cardFilePath = `./data/${user}/${cardID}.json`;

    fs.stat(cardFilePath, (err) => {
      if (err) {
        callback(`Card not found at ${user}'s collection`, undefined);
      } else {
        fs.readFile(cardFilePath, (err, data) => {
          if (err) {
            callback(err.message, undefined);
          } else {
            // Por compatibilidad con el método listCollection, así el cliente no se preocupa por el número de cartas (formato)
            const card = [data.toString()];
            callback(undefined, JSON.stringify(card));
          }
        });
      }
    });
  }

  /**
   * Method to list the collection of an user
   * @param user The user of the collection to list
   * @callback
   */
  public listCollection(user: string, callback: (error: string | undefined, result: string | undefined) => void): void {
    const dirPath = `./data/${user}`;

    fs.stat(dirPath, (err) => {
      if (err) {
        callback(`User ${user} doesn't have a collection`, undefined);
      } else {
        fs.readdir(dirPath, (err, files) => {
          if (err) {
            callback(err.message, undefined);
          } else {
            const collection: string[] = [];
            let filesProcessed = 0; // Track how many files have been processed
            files.forEach((file) => {
              fs.readFile(`${dirPath}/${file}`, (err, data) => {
                if (err) {
                  callback(err.message, undefined);
                  return; // Stop processing further if an error occurs
                }
                collection.push(data.toString());
                filesProcessed++;

                // Check if all files have been processed
                if (filesProcessed === files.length) {
                  callback(undefined, JSON.stringify(collection));
                }
              });
            });
          }
        });
      }
    });
  }
}
