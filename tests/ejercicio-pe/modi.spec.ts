import 'mocha';
import { expect } from 'chai';
import { showMagicCard } from '../../src/ejercicio-pe/modi.js';

describe('Asynchronous function showMagicCard tests', () => {
  it('should return the card correctly 1', (done) => {
    const card =
      '{"id":3,"name":"Hydra","manaCost":500,"color":"Multicolor","rarity":"Common","rulesText":"Tap: aaa","marketValue":20}';
    showMagicCard('nestor', 3, (error, result) => {
      if (result) {
        expect(result).to.be.equal(card);
        done();
      }
    });
  });

  it('should return the card correctly 2', (done) => {
    const card =
      '{"id":2,"name":"Meow","manaCost":500,"color":"Green","type":"Artifact","rarity":"Mythic","rulesText":"Tap: meow meow","marketValue":10}';
    showMagicCard('nestor', 2, (error, result) => {
      if (result) {
        expect(result).to.be.equal(card);
        done();
      }
    });
  });

  it('should return the card correctly 3', (done) => {
    const card =
      '{"id":2,"name":"Fenix","manaCost":1000,"color":"Green","type":"Artifact","rarity":"Mythic","rulesText":"Tap: meow meow","marketValue":10}';
    showMagicCard('juan', 2, (error, result) => {
      if (result) {
        expect(result).to.be.equal(card);
        done();
      }
    });
  });

  it('should not return a card if it doesnt exist', (done) => {
    const card = "Card not found at juan's collection";
    showMagicCard('juan', 1, (error, result) => {
      if (error) {
        expect(error).to.be.equal(card);
        done();
      }
    });
  });

  it('should not return a card if it doesnt exist', (done) => {
    const card = "Card not found at miau's collection";
    showMagicCard('miau', 1, (error, result) => {
      if (error) {
        expect(error).to.be.equal(card);
        done();
      }
    });
  });
});
