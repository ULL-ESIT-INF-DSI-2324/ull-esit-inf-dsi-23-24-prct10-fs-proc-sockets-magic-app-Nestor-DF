import fs from 'fs';

/**
 * Asynchronous function to get a card from a user using callback patron
 * @param user User owner of the card
 * @param cardID Cards ID
 * @param callback
 */
export function showMagicCard(
  user: string,
  cardID: number,
  callback: (error: string | undefined, result: string | undefined) => void,
): void {
  const cardFilePath = `./data/${user}/${cardID}.json`;

  fs.stat(cardFilePath, (err) => {
    if (err) {
      callback(`Card not found at ${user}'s collection`, undefined);
    } else {
      fs.readFile(cardFilePath, (err, data) => {
        if (err) {
          callback(err.message, undefined);
        } else {
          callback(undefined, data.toString());
        }
      });
    }
  });
}
