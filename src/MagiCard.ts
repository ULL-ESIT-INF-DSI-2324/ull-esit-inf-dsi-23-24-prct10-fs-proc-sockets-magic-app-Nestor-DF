/**
 * Enum for card colors
 */
export enum Color {
  White = 'White',
  Blue = 'Blue',
  Black = 'Black',
  Red = 'Red',
  Green = 'Green',
  Colorless = 'Colorless',
  Multicolor = 'Multicolor',
}

/**
 * Enum for card types
 */
export enum Type {
  Land = 'Land',
  Creature = 'Creature',
  Enchantment = 'Enchantment',
  Sorcery = 'Sorcery',
  Instant = 'Instant',
  Artifact = 'Artifact',
  Planeswalker = 'Planeswalker',
}

/**
 * Enum for card rarity
 */
export enum Rarity {
  Common = 'Common',
  Uncommon = 'Uncommon',
  Rare = 'Rare',
  Mythic = 'Mythic',
}

/**
 * Represents a Magic card.
 */
export class MagiCard {
  constructor(
    private id: number,
    private name: string,
    private manaCost: number,
    private color: Color,
    private type: Type,
    private rarity: Rarity,
    private rulesText: string,
    private marketValue: number,
    private powerAndToughness?: [number, number],
    private loyaltyMarks?: number,
  ) {
    this.id = id;
    this.name = name;
    this.manaCost = manaCost;
    this.color = color;
    this.type = type;
    this.rarity = rarity;
    this.rulesText = rulesText;
    this.marketValue = marketValue;
    if (type === Type.Creature) {
      this.powerAndToughness = powerAndToughness;
    } else if (type === Type.Planeswalker) {
      this.loyaltyMarks = loyaltyMarks;
    } else {
      this.powerAndToughness = undefined;
      this.loyaltyMarks = undefined;
    }
  }

  /**
   * Gets the ID of the card.
   * @returns The ID of the card.
   */
  public getId(): number {
    return this.id;
  }

  /**
   * Gets the name of the card.
   * @returns The name of the card.
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Gets the mana cost of the card.
   * @returns The mana cost of the card.
   */
  public getManaCost(): number {
    return this.manaCost;
  }

  /**
   * Gets the color of the card.
   * @returns The color of the card.
   */
  public getColor(): Color {
    return this.color;
  }

  /**
   * Gets the type of the card.
   * @returns The type of the card.
   */
  public getType(): Type {
    return this.type;
  }

  /**
   * Gets the rarity of the card.
   * @returns The rarity of the card.
   */
  public getRarity(): Rarity {
    return this.rarity;
  }

  /**
   * Gets the rules text of the card.
   * @returns The rules text of the card.
   */
  public getRulesText(): string {
    return this.rulesText;
  }

  /**
   * Gets the market value of the card.
   * @returns The market value of the card.
   */
  public getMarketValue(): number {
    return this.marketValue;
  }

  /**
   * Gets the power and toughness of the card (if it's a creature).
   * @returns The power and toughness of the card, or undefined if it's not a creature.
   */
  public getPowerAndToughness(): [number, number] | undefined {
    return this.powerAndToughness;
  }

  /**
   * Gets the loyalty marks of the card (if it's a planeswalker).
   * @returns The loyalty marks of the card, or undefined if it's not a planeswalker.
   */
  public getLoyaltyMarks(): number | undefined {
    return this.loyaltyMarks;
  }
}
