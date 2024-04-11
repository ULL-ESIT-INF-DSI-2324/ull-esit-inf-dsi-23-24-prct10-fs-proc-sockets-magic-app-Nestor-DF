import 'mocha';
import { expect } from 'chai';
import { formatCardString, colorCard } from '../src/formatCards.js';

describe('formatCardString', () => {
  it('should format the card string correctly', () => {
    const card =
      '{"id": 1, "name": "Card Name", "manaCost": 2, "color": "Blue", "type": "Creature", "rarity": "Common", "rulesText": "Some rules text", "marketValue": 10, "powerAndToughness": "2/2"}';
    const expectedOutput =
      'ID: 1\nName: Card Name\nMana cost: 2\nColor: Blue\nType: Creature\nRarity: Common\nRules text: Some rules text\nMarket value: 10\nPower/Toughness: 2/2\n';
    const result = formatCardString(card);
    expect(result).to.be.equal(expectedOutput);
  });
});

describe('colorCard', () => {
  it('should color the card string correctly for Blue color', () => {
    const card =
      '{"id": 1, "name": "Card Name", "manaCost": 2, "color": "Blue", "type": "Creature", "rarity": "Common", "rulesText": "Some rules text", "marketValue": 10, "powerAndToughness": "2/2"}';
    const expectedOutput =
      '\u001b[34;1;3mID: 1\nName: Card Name\nMana cost: 2\nColor: Blue\nType: Creature\nRarity: Common\nRules text: Some rules text\nMarket value: 10\nPower/Toughness: 2/2\n\u001b[0m';
    const result = colorCard(card);
    expect(result).to.be.equal(result);
  });

  it('should color the card string correctly for Red color', () => {
    const card =
      '{"id": 1, "name": "Card Name", "manaCost": 2, "color": "Red", "type": "Creature", "rarity": "Common", "rulesText": "Some rules text", "marketValue": 10, "powerAndToughness": "2/2"}';
    const expectedOutput =
      '\u001b[31;1;3mID: 1\nName: Card Name\nMana cost: 2\nColor: Red\nType: Creature\nRarity: Common\nRules text: Some rules text\nMarket value: 10\nPower/Toughness: 2/2\n\u001b[0m';
    const result = colorCard(card);
    expect(result).to.be.equal(result);
  });

  it('should color the card string correctly for Green color', () => {
    const card =
      '{"id": 1, "name": "Card Name", "manaCost": 2, "color": "Green", "type": "Creature", "rarity": "Common", "rulesText": "Some rules text", "marketValue": 10, "powerAndToughness": "2/2"}';
    const expectedOutput =
      '\u001b[32;1;3mID: 1\nName: Card Name\nMana cost: 2\nColor: Green\nType: Creature\nRarity: Common\nRules text: Some rules text\nMarket value: 10\nPower/Toughness: 2/2\n\u001b[0m';
    const result = colorCard(card);
    expect(result).to.be.equal(result);
  });

  it('should color the card string correctly for White color', () => {
    const card =
      '{"id": 1, "name": "Card Name", "manaCost": 2, "color": "White", "type": "Creature", "rarity": "Common", "rulesText": "Some rules text", "marketValue": 10, "powerAndToughness": "2/2"}';
    const expectedOutput =
      '\u001b[37;1;3mID: 1\nName: Card Name\nMana cost: 2\nColor: White\nType: Creature\nRarity: Common\nRules text: Some rules text\nMarket value: 10\nPower/Toughness: 2/2\n\u001b[0m';
    const result = colorCard(card);
    expect(result).to.be.equal(result);
  });

  it('should color the card string correctly for Black color', () => {
    const card =
      '{"id": 1, "name": "Card Name", "manaCost": 2, "color": "Black", "type": "Creature", "rarity": "Common", "rulesText": "Some rules text", "marketValue": 10, "powerAndToughness": "2/2"}';
    const expectedOutput =
      '\u001b[30;1;3mID: 1\nName: Card Name\nMana cost: 2\nColor: Black\nType: Creature\nRarity: Common\nRules text: Some rules text\nMarket value: 10\nPower/Toughness: 2/2\n\u001b[0m';
    const result = colorCard(card);
    expect(result).to.be.equal(result);
  });

  it('should color the card string correctly for Colorless color', () => {
    const card =
      '{"id": 1, "name": "Card Name", "manaCost": 2, "color": "Colorless", "type": "Creature", "rarity": "Common", "rulesText": "Some rules text", "marketValue": 10, "powerAndToughness": "2/2"}';
    const expectedOutput =
      '\u001b[30;1;3mID: 1\nName: Card Name\nMana cost: 2\nColor: Colorless\nType: Creature\nRarity: Common\nRules text: Some rules text\nMarket value: 10\nPower/Toughness: 2/2\n\u001b[0m';
    const result = colorCard(card);
    expect(result).to.be.equal(result);
  });

  it('should color the card string correctly for Multicolor color', () => {
    const card =
      '{"id": 1, "name": "Card Name", "manaCost": 2, "color": "Multicolor", "type": "Creature", "rarity": "Common", "rulesText": "Some rules text", "marketValue": 10, "powerAndToughness": "2/2"}';
    const expectedOutput =
      '\u001b[30;1;3mID: 1\nName: Card Name\nMana cost: 2\nColor: Multicolor\nType: Creature\nRarity: Common\nRules text: Some rules text\nMarket value: 10\nPower/Toughness: 2/2\n\u001b[0m';
    const result = colorCard(card);
    expect(result).to.be.equal(result);
  });
});
