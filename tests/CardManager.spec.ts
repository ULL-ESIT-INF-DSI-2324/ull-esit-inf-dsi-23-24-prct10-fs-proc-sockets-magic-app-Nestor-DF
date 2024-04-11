import { expect } from 'chai';
import { CardManager } from '../src/CardManager.js';
import { MagiCard, Color, Type, Rarity } from '../src/MagiCard.js';

describe('CardManager', () => {
  let cardManager: CardManager;

  beforeEach(() => {
    cardManager = CardManager.getInstance();
  });

  describe('addCard', () => {
    it('should add a card to the collection of a user', (done) => {
      const user = 'juan';
      const card = new MagiCard(1, 'Card Name', 3, Color.Blue, Type.Land, Rarity.Common, 'Card Rules Text', 10);
      cardManager.addCard(user, card, (error, result) => {
        expect(error).to.be.undefined;
        expect(result).to.equal(`Card added in ${user}'s collection`);
        done();
      });
    });

    it('should not add a card to the collection of a user', (done) => {
      const user = 'juan';
      const card = new MagiCard(2, 'Card Name', 3, Color.Blue, Type.Land, Rarity.Common, 'Card Rules Text', 10);
      cardManager.addCard(user, card, (error, result) => {
        expect(error).to.be.equal(`A card with the same ID already exists in ${user}'s collection`);
        expect(result).to.be.undefined;
        done();
      });
    });
  });

  describe('updateCard', () => {
    it('should update a card in the collection of a user', (done) => {
      const user = 'juan';
      const card = new MagiCard(1, 'MIAU MIAU', 3, Color.Blue, Type.Land, Rarity.Common, 'Card Rules Text', 10);
      cardManager.updateCard(user, card, (error, result) => {
        expect(error).to.be.undefined;
        expect(result).to.equal(`Card updated in ${user}'s collection`);
        done();
      });
    });

    it('should not update a card in the collection of a user', (done) => {
      const user = 'juan';
      const card = new MagiCard(99999, 'MIAU MIAU', 3, Color.Blue, Type.Land, Rarity.Common, 'Card Rules Text', 10);
      cardManager.updateCard(user, card, (error, result) => {
        expect(error).to.be.equal(`Card not found at ${user}'s collection`);
        expect(result).to.undefined;
        done();
      });
    });
  });

  describe('removeCard', () => {
    it('should remove a card from the collection of a user', (done) => {
      const user = 'juan';
      const cardID = 1;
      cardManager.removeCard(user, cardID, (error, result) => {
        expect(error).to.be.undefined;
        expect(result).to.equal(`Card removed in ${user}'s collection`);
        done();
      });
    });

    it('should not remove a card from the collection of a user', (done) => {
      const user = 'juan';
      const cardID = 99999;
      cardManager.removeCard(user, cardID, (error, result) => {
        expect(error).to.be.equal(`Card not found at ${user}'s collection`);
        expect(result).to.be.undefined;
        done();
      });
    });
  });

  describe('showCard', () => {
    it('should show a card from the collection of a user', (done) => {
      const user = 'juan';
      const cardID = 2;
      cardManager.showCard(user, cardID, (error, result) => {
        expect(error).to.be.undefined;
        expect(result).to.be.equal(
          '["{\\"id\\":2,\\"name\\":\\"Fenix\\",\\"manaCost\\":1000,\\"color\\":\\"Green\\",\\"type\\":\\"Artifact\\",\\"rarity\\":\\"Mythic\\",\\"rulesText\\":\\"Tap: meow meow\\",\\"marketValue\\":10}"]',
        );
        done();
      });
    });

    it('should not show a card from the collection of a user', (done) => {
      const user = 'juan';
      const cardID = 123;
      cardManager.showCard(user, cardID, (error, result) => {
        expect(error).to.be.equal(`Card not found at ${user}'s collection`);
        expect(result).to.be.undefined;
        done();
      });
    });
  });

  describe('listCollection', () => {
    it('should list the collection of a user', (done) => {
      const user = 'juan';
      cardManager.listCollection(user, (error, result) => {
        expect(error).to.be.undefined;
        expect(result).to.be.equal(
          '["{\\"id\\":2,\\"name\\":\\"Fenix\\",\\"manaCost\\":1000,\\"color\\":\\"Green\\",\\"type\\":\\"Artifact\\",\\"rarity\\":\\"Mythic\\",\\"rulesText\\":\\"Tap: meow meow\\",\\"marketValue\\":10}","{\\"id\\":3,\\"name\\":\\"Hydra\\",\\"manaCost\\":500,\\"color\\":\\"Multicolor\\",\\"type\\":\\"Planeswalker\\",\\"rarity\\":\\"Common\\",\\"rulesText\\":\\"Tap: aaa\\",\\"marketValue\\":20,\\"loyaltyMarks\\":5}"]',
        );
        done();
      });
    });

    it('should not list the collection of a user', (done) => {
      const user = 'PEPITO';
      cardManager.listCollection(user, (error, result) => {
        expect(error).to.be.equal(`User ${user} doesn't have a collection`);
        expect(result).to.be.undefined;
        done();
      });
    });
  });
});
