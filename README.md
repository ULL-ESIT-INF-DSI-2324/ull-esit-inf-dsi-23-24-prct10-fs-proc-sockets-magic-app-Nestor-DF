# Práctica 9 - Aplicación para coleccionistas de cartas Magic

- Néstor Delgado Feliciano ([alu0101488998@ull.edu.es](mailto:alu0101488998@ull.edu.es))

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-Nestor-DF/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-Nestor-DF?branch=main)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2324_ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-Nestor-DF&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2324_ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-Nestor-DF)




## **Índice**
- [Práctica 9 - Aplicación para coleccionistas de cartas Magic](#práctica-9---aplicación-para-coleccionistas-de-cartas-magic)
  - [**Índice**](#índice)
  - [**Introducción**](#introducción)
  - [**Desarrollo**](#desarrollo)
  - [**Ejercicio PE**](#ejercicio-pe)
  - [**Conclusiones**](#conclusiones)
  - [**Recursos Empleados**](#recursos-empleados)




## **Introducción**
En esta práctica se desarrollará una aplicación para gestionar información sobre cartas del juego Magic: The Gathering pertenecientes a un usuario específico. La aplicación permitirá llevar a cabo diversas operaciones, como añadir, modificar, eliminar, listar y leer la información asociada a estas cartas. Toda la información de cada carta se almacenará en formato JSON en el sistema de archivos de la máquina donde se ejecute la aplicación. Además, se enfatiza que la interacción con la aplicación se realizará exclusivamente a través de la línea de comandos, sin la existencia de un menú interactivo para simplificar la experiencia de usuario.





## **Desarrollo**
En primer lugar, desarrollé una clase **MagiCard** para guardar la información necesaria para cada carta, además de poder gestionar los atributos opcionales dependiendo del tipo de carta. Por poder podría haber trabajado directamente con la información *clave: valor* a partir de los comandos pero llegué a la conclusión que encapsular la entidad de una carta es más cómodo y elegante.

```ts
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

  // Más getters

  public getMarketValue(): number {
    return this.marketValue;
  }

  public getPowerAndToughness(): [number, number] | undefined {
    return this.powerAndToughness;
  }

  public getLoyaltyMarks(): number | undefined {
    return this.loyaltyMarks;
  }
}
```

Cabe destacar que use tipos enumerados para definir ciertos atributos de las cartas como el color, tipo o la rareza.

```ts
export enum Color {
  White = 'White',
  Blue = 'Blue',
  Black = 'Black',
  Red = 'Red',
  Green = 'Green',
  Colorless = 'Colorless',
  Multicolor = 'Multicolor',
}

export enum Type {
  Land = 'Land',
  Creature = 'Creature',
  Enchantment = 'Enchantment',
  Sorcery = 'Sorcery',
  Instant = 'Instant',
  Artifact = 'Artifact',
  Planeswalker = 'Planeswalker',
}

export enum Rarity {
  Common = 'Common',
  Uncommon = 'Uncommon',
  Rare = 'Rare',
  Mythic = 'Mythic',
}
```

A continuación, definí la estructura de comandos del programa principal haciendo uso del paquete **yargs**. Como todos los comandos siguen la misma estructura voy a mostrar dos de ejemplo:
```ts
yargs(hideBin(process.argv))
  .command(
    'list',
    'List the collection',
    {
      user: {
        description: 'user name',
        type: 'string',
        demandOption: true,
      },
    },
    (argv) => {
      cardManager.listCollection(argv.user);
    },
  )
  .help().argv;

yargs(hideBin(process.argv))
  .command(
    'add',
    'Adds a card to the collection',
    {
      user: {
        description: 'user name',
        type: 'string',
        demandOption: true,
      },
      id: {
        description: 'Card ID',
        type: 'number',
        demandOption: true,
      },
      name: {
        description: 'Card name',
        type: 'string',
        demandOption: true,
      },
      manaCost: {
        description: 'Mana cost',
        type: 'number',
        demandOption: true,
      },
      color: {
        description: 'Color of the card',
        type: 'string',
        choices: ['White', 'Blue', 'Black', 'Red', 'Green', 'Colorless', 'Multicolor'],
        demandOption: true,
      },
      cardType: {
        description: 'Type of the card',
        type: 'string',
        choices: ['Land', 'Creature', 'Enchantment', 'Sorcery', 'Instant', 'Artifact', 'Planeswalker'],
        demandOption: true,
      },
      rarity: {
        description: 'Rarity of the card',
        type: 'string',
        choices: ['Common', 'Uncommon', 'Rare', 'Mythic'],
        demandOption: true,
      },
      rulesText: {
        description: 'Rules text of the card',
        type: 'string',
        demandOption: true,
      },
      powerToughness: {
        description: 'Power and Toughness of the card (for Creatures)',
        type: 'array',
        coerce: (arg) => arg.map(Number),
      },
      loyalty: {
        description: 'Loyalty of the card (for Planeswalkers)',
        type: 'number',
      },
      marketValue: {
        description: 'Market value of the card',
        type: 'number',
        demandOption: true,
      },
    },
    (argv) => {
      if (argv.cardType === 'Creature' && argv.powerToughness === undefined) {
        throw new Error('Creatures needs the powerToughness attribute');
      }
      if (argv.cardType === 'Planeswalker' && argv.loyalty === undefined) {
        throw new Error('Planeswalker needs the loyalty attribute');
      }
      const cardData: MagiCard = new MagiCard(
        argv.id,
        argv.name,
        argv.manaCost,
        argv.color as unknown as Color,
        argv.cardType as unknown as Type,
        argv.rarity as unknown as Rarity,
        argv.rulesText,
        argv.marketValue,
        argv.powerToughness,
        argv.loyalty,
      );
      cardManager.addCard(argv.user, cardData);
    },
  )
  .help().argv;
```

Se puede ver como cada comando tiene sus argumentos obligatorios con la opción **demandOption: true** y cómo después de obtener la información por línea de comandos esta se procesa, por ejemplo, en el comando **add** se comprueba los tipos de las cartas, se crea el objeto **MagiCard** y se llama al método correspondiente de la clase que maneja las cartas.

Al final la magia del programa la hace la clase **CardManager**, la cual decidí hacer singleton ya que en realidad solo la quiero para encapsular las distintas operaciones que se pueden hacer con las cartas por lo que no hace falta tener más de una instancia de esta.

```ts
class CardManager {
  private static instance: CardManager;

  private constructor() {}

  public static getInstance(): CardManager {
    if (!CardManager.instance) {
      CardManager.instance = new CardManager();
    }
    return CardManager.instance;
  }

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

  public updateCard(user: string, card: MagiCard): void {
    const cardFilePath = `./data/${user}/${card.getId()}.json`;

    if (fs.existsSync(cardFilePath)) {
      fs.writeFileSync(cardFilePath, JSON.stringify(card));
      console.log(chalk.green.bold(`Card updated in ${user}'s collection`));
    } else {
      console.log(chalk.red.bold(`Card not found at ${user}'s collection`));
    }
  }

  public removeCard(user: string, cardID: number): void {
    const cardFilePath = `./data/${user}/${cardID}.json`;

    if (fs.existsSync(cardFilePath)) {
      fs.unlinkSync(cardFilePath);
      console.log(chalk.green.bold(`Card removed in ${user}'s collection`));
    } else {
      console.log(chalk.red.bold(`Card not found at ${user}'s collection`));
    }
  }

  public showCard(user: string, cardID: number): void {
    const cardFilePath = `./data/${user}/${cardID}.json`;

    if (fs.existsSync(cardFilePath)) {
      const content = fs.readFileSync(cardFilePath).toString();
      this.printCard(content);
    } else {
      console.log(chalk.red.bold(`Card not found at ${user}'s collection`));
    }
  }

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
```

Para hacer el código lo más limpio y simple posible hice que los nombres de los ficheros sean ID_de_la_carta.json, de esta manera, al ser el ID único para cada carta se simplifican muchas cosas como por ejemplo buscar una carta, verificar que no se repitan los IDs y demás ya que no tengo que acceder al contenido del fichero en sí ni parsear los nombres de estos para obtener la información.

La disposición de directorios sería la siguiente:
```
data
    └── usuario1
        ├── 1.json
        └── 2.json
    └── usuario2
        ├── 1.json
        └── 9.json
  .....
```




## **Ejercicio PE**
Primero creé la clase "plantilla" **FilterMapReduceTemplate** con su método run que hace uso de los métodos "plantillas" de los cuales podemos diferenciar *filter* y *map* que están implementados, *reduce* que es abstracto para obligar a implementarlo en las subclases y los métodos *showStateAfterFilter* y *showStateAfterMap* vacíos ya que su implementación es opcional. Se destaca como todos lo métodos son protected para que puedan ser usados en las clases hijas.
```ts
export abstract class FilterMapReduceTemplate {
  public run(list: number[], predicate: (num: number) => boolean, transform: (num: number) => number): number {
    const filteredList = this.filter(list, predicate);
    this.showStateAfterFilter(filteredList);
    const mappedList = this.map(filteredList, transform);
    this.showStateAfterMap(mappedList);
    const reducedResult = this.reduce(mappedList);
    return reducedResult;
  }

  protected filter(list: number[], predicate: (num: number) => boolean): number[] {
    const filteredList: number[] = [];
    for (const num of list) {
      if (predicate(num)) {
        filteredList.push(num);
      }
    }
    return filteredList;
  }

  protected map(list: number[], transform: (num: number) => number): number[] {
    const mappedList: number[] = [];
    for (const num of list) {
      mappedList.push(transform(num));
    }
    return mappedList;
  }

  protected abstract reduce(list: number[]): number;

  protected showStateAfterFilter(arr: number[]) {}

  protected showStateAfterMap(arr: number[]) {}
}
```

Después, implementé las clases hijas específicas que heredan de esta clase "plantilla" implementando el método obligatorio *reduce* y en una de ellas un método opcional o *hook*.
```ts
export class FilterMapAddReduce extends FilterMapReduceTemplate {
  reduce(list: number[]): number {
    let acc = 0;
    for (let i = 0; i < list.length; ++i) {
      acc += list[i];
    }
    return acc;
  }
  protected showStateAfterFilter(arr: number[]): void {
    console.log('I am a hook method, this is the result after filtering: ', arr);
  }
}

export class FilterMapSubReduce extends FilterMapReduceTemplate {
  reduce(list: number[]): number {
    let acc = 0;
    for (let i = 0; i < list.length; ++i) {
      acc -= list[i];
    }
    return acc;
  }
}

export class FilterMapProdReduce extends FilterMapReduceTemplate {
  reduce(list: number[]): number {
    let acc = 1;
    for (let i = 0; i < list.length; ++i) {
      acc *= list[i];
    }
    return acc;
  }
}

export class FilterMapDivReduce extends FilterMapReduceTemplate {
  reduce(list: number[]): number {
    let acc = list[0];
    for (let i = 1; i < list.length; ++i) {
      acc /= list[i];
    }
    return acc;
  }
}
```




## **Conclusiones**
En conclusión, la resolución de esta práctica me ha permitido aprender acerca de la API síncrona proporcionada por Node.js para trabajar con el sistema de ficheros, los paquetes yargs y chalk y en general a estar más cómodo trabajando con documentación de paquetes y APIs.




## **Recursos Empleados**

1. OpenAI Chat: [https://chat.openai.com/](https://chat.openai.com/) - Plataforma de IA conversacional proporcionada por OpenAI para tareas y aplicaciones de procesamiento de lenguaje natural.

2. W3Schools JavaScript Reference: [https://www.w3schools.com/jsrEF/default.asp](https://www.w3schools.com/jsrEF/default.asp) - Recurso en línea completo para aprender y consultar conceptos, sintaxis y mejores prácticas del lenguaje de programación JavaScript.

3. MDN Web Docs - JavaScript Reference: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) - Documentación oficial de la Red de Desarrolladores de Mozilla que proporciona explicaciones detalladas, ejemplos y referencias para las características del lenguaje JavaScript y las API.

4. API síncrona proporcionada por Node.js para trabajar con el sistema de archivos: [https://nodejs.org/docs/latest/api/fs.html](https://nodejs.org/docs/latest/api/fs.html)

5. Yargs: [https://www.npmjs.com/package/yargs](https://www.npmjs.com/package/yargs)

6. Yargs: [https://www.npmjs.com/package/yargs](https://www.npmjs.com/package/yargs)