import 'mocha';
import { expect } from 'chai';
import { MagiCard, Color, Type, Rarity } from '../src/MagiCard.js';

describe('MagiCard', () => {
  it('should create a new MagiCard instance', () => {
    const card = new MagiCard(1, 'Card Name', 3, Color.Blue, Type.Land, Rarity.Common, 'Card Rules Text', 10);
    expect(card).to.be.an.instanceOf(MagiCard);
    expect(card.getId()).to.equal(1);
    expect(card.getName()).to.equal('Card Name');
    expect(card.getManaCost()).to.equal(3);
    expect(card.getColor()).to.equal(Color.Blue);
    expect(card.getType()).to.equal(Type.Land);
    expect(card.getRarity()).to.equal(Rarity.Common);
    expect(card.getRulesText()).to.equal('Card Rules Text');
    expect(card.getMarketValue()).to.equal(10);
    expect(card.getPowerAndToughness()).to.be.undefined;
    expect(card.getLoyaltyMarks()).to.be.undefined;
  });

  it('should CREATE a new MagiCard instance', () => {
    const card = new MagiCard(1, 'Card Name', 3, Color.Blue, Type.Land, Rarity.Common, 'Card Rules Text', 10, [2, 2], 3);
    expect(card).to.be.an.instanceOf(MagiCard);
    expect(card.getId()).to.equal(1);
    expect(card.getName()).to.equal('Card Name');
    expect(card.getManaCost()).to.equal(3);
    expect(card.getColor()).to.equal(Color.Blue);
    expect(card.getType()).to.equal(Type.Land);
    expect(card.getRarity()).to.equal(Rarity.Common);
    expect(card.getRulesText()).to.equal('Card Rules Text');
    expect(card.getMarketValue()).to.equal(10);
    expect(card.getPowerAndToughness()).to.be.undefined;
    expect(card.getLoyaltyMarks()).to.be.undefined;
  });

  it('should create a new MagiCard instance with PowerAndToughness', () => {
    const card = new MagiCard(1, 'Card Name', 3, Color.Blue, Type.Creature, Rarity.Common, 'Card Rules Text', 10, [2, 2]);
    expect(card).to.be.an.instanceOf(MagiCard);
    expect(card.getId()).to.equal(1);
    expect(card.getName()).to.equal('Card Name');
    expect(card.getManaCost()).to.equal(3);
    expect(card.getColor()).to.equal(Color.Blue);
    expect(card.getType()).to.equal(Type.Creature);
    expect(card.getRarity()).to.equal(Rarity.Common);
    expect(card.getRulesText()).to.equal('Card Rules Text');
    expect(card.getMarketValue()).to.equal(10);
    expect(card.getPowerAndToughness()).to.deep.equal([2, 2]);
    expect(card.getLoyaltyMarks()).to.be.undefined;
  });

  it('should create a new MagiCard instance with LoyaltyMarks', () => {
    const card = new MagiCard(
      1,
      'Card Name',
      3,
      Color.Blue,
      Type.Planeswalker,
      Rarity.Common,
      'Card Rules Text',
      10,
      undefined,
      3,
    );
    expect(card).to.be.an.instanceOf(MagiCard);
    expect(card.getId()).to.equal(1);
    expect(card.getName()).to.equal('Card Name');
    expect(card.getManaCost()).to.equal(3);
    expect(card.getColor()).to.equal(Color.Blue);
    expect(card.getType()).to.equal(Type.Planeswalker);
    expect(card.getRarity()).to.equal(Rarity.Common);
    expect(card.getRulesText()).to.equal('Card Rules Text');
    expect(card.getMarketValue()).to.equal(10);
    expect(card.getPowerAndToughness()).to.be.undefined;
    expect(card.getLoyaltyMarks()).to.equal(3);
  });
});
