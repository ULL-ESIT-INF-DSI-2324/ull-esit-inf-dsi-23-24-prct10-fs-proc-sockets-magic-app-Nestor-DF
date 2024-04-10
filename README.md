# Práctica 10 - Aplicación cliente-servidor para coleccionistas de cartas Magic

- Néstor Delgado Feliciano ([alu0101488998@ull.edu.es](mailto:alu0101488998@ull.edu.es))


[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-Nestor-DF/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-Nestor-DF?branch=main)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Nestor-DF_DSI-2023-2024-Practica10-PE-&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Nestor-DF_DSI-2023-2024-Practica10-PE-)



## **Índice**
- [Práctica 10 - Aplicación cliente-servidor para coleccionistas de cartas Magic](#práctica-10---aplicación-cliente-servidor-para-coleccionistas-de-cartas-magic)
  - [**Índice**](#índice)
  - [**Introducción**](#introducción)
  - [**Desarrollo**](#desarrollo)
  - [**Conclusiones**](#conclusiones)
  - [**Recursos Empleados**](#recursos-empleados)




## **Introducción**
En esta práctica se desarrollará una aplicación cliente-servidor para gestionar información sobre cartas del juego Magic: The Gathering. La aplicación permitirá llevar a cabo diversas operaciones desde el cliente, como añadir, modificar, eliminar, listar y leer la información asociada a estas cartas. Toda la información de cada carta se almacenará en formato JSON en el sistema de archivos del servidor. Además, se enfatiza que la interacción con la aplicación se realizará exclusivamente a través de la línea de comandos.




## **Desarrollo**
Partiendo de la clase que había creado en la la práctica anterior cambié todos los métodos síncronos por métodos **asíncronos basados en callbacks**:

```ts
export class CardManager {
  private static instance: CardManager;

  private constructor() {}

  public static getInstance(): CardManager {
    if (!CardManager.instance) {
      CardManager.instance = new CardManager();
    }
    return CardManager.instance;
  }

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
  // Demás código
}
```

Se puede apreciar como uso el patrón de callbacks de tal manera que si hay un error la variable *error* contendrá una string con la descripción del error mientras *result* será undefined. Si todo va bien *error* contendrá undefined y *result* contendrá un mensaje con el resultado.

A continuación, modifiqué el programa pricipal para que actúe como cliente usando el módulo net de Node.js:

```ts
const client = net.connect({ port: 60300 });

yargs(hideBin(process.argv))
  .command(
    'show',
    'Show a card of the collection',
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
    },
    (argv) => {
      const data = JSON.stringify({ action: 'show', user: argv.user, cardID: argv.id, close: 'CLOSED' });
      client.write(data);
    },
  )
  .help().argv;

  // Demás código para manejar las otras acciones

let wholeData = '';
client.on('data', (dataChunk) => {
  wholeData += dataChunk;
});

client.on('end', () => {
  console.log('Received from server:\n');
  const answer = JSON.parse(wholeData);
  let receivedData: string[];
  switch (answer.status) {
    case 'Error':
      console.log(chalk.red.bold(answer.answer));
      break;
    case 'Success':
      console.log(chalk.green.bold(answer.answer));
      break;
    case 'CardsReceived':
      receivedData = JSON.parse(answer.answer);
      receivedData.forEach((card: string) => {
        console.log(colorCard(card));
      });
      break;
  }
});

client.on('close', () => {
  console.log('Connection closed');
});
```

Se puede observar como uso la función connect del módulo net para conectarme al servidor a través del puerto 60300 y como se hace un **client.write(data)** dentro del manejador de comandos de yargs tras obtener la información y ***serializarla*** usando **JSON.stringify**. El resto de comandos siguen la misma la estructura.

Por otro lado, el cliente se encarga de reconstruir la respuesta del servidor en caso de que esta venga dada en **varios** eventos *data*. Cuando el servidor cierre la conexión tras enviar la respuesta el cliente la gestiona a través del evento *end* mostrando los resultados de la petición. Se distinguen tres casos claros que vienen dados por el campo **status** de la respuesta del servidor:
- Error: Ocurre cuando se produce un error en el servidor
- Sucess: Ocurre cuando todo va bien en la petición
- CardsReceived: Ocurre en los casos en los que la respuesta del servidor son cartas, es decir, cuando el cliente hace peticiones de *show* o *list* sobre su colección de cartas.

Se recalca como el cliente procesa la ***respuesta***, **la cual es una representación en cadena de un objeto JSON válido**, deserializándola primero con **JSON.parse** y después haciendo uso del paquete **chalk** para mostrar por consola los mensajes. Para mostrar las cartas se usan dos funciones específicas:
```ts
export function formatCardString(card: string): string {
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

export function colorCard(card: string): string {
  const JSONcard = JSON.parse(card);
  const cardInfo = formatCardString(card);
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
      return chalk.bold('Unknown color');
  }
} 
```

Ya yéndonos al lado del servidor, implementé una clase que **hereda** de **EventEmitter** para así poder emitir un evento propio **request** en el socket del servidor y detectar cuando un cliente ha enviado una petición completa.

```ts
export class EventEmitterSocket extends EventEmitter {
  constructor(connection: EventEmitter) {
    super();
    let wholeData = '';
    connection.on('data', (dataChunk) => {
      wholeData += dataChunk;

      console.log('Received from client:', dataChunk.toString());
      if (wholeData.includes('CLOSED"}')) {
        this.emit('request', JSON.parse(wholeData), connection);
      }
    });

    connection.on('close', () => {
      this.emit('close', connection);
    });
  }
}
```

La manera más sencilla que se me ocurrió de detectar cuando un mensaje ya ha sido enviado por completo por el cliente fue añadirle un atributo CLOSED al final del json que envía el cliente. De esta forma cuando el servidor lea la cadena **CLOSED"}** significa que ha llegado el final de la petición. Seguí la misma lógica que en el ejemplo de clase donde se usaba el caracter **\n** para detectar el final de una petición.

En lo que es el servidor en sí, lo creo con el método **createServer** de net y dentro de manejador uso el único parámetro *connection* que es un net.Socket (un EventEmitter) para pasárselo a la clase **EventEmitterSocket**

Después, uso el objeto que me crea mi clase **EventEmitterSocket** para poder gestionar el evento **request**. Dentro del manejador de **request** tengo un **switch** que comprueba el campo ***request.action*** para así poder gestionar las distintas acciones posibles que puede realizar el servidor. Las acciones están encapsuladas en la clase **CardManager** que sigue el patrón **callback** en sus métodos. Al finalizar la ejecución de los manejadores y por tanto **finalizar** la **respuesta** del servidor se cierra el socket con un **end()** para *notificar al cliente de que la respuesta está completa.*

```ts
const server = net.createServer((connection) => {
  console.log('A client has connected.');
  const serverSocket = new EventEmitterSocket(connection);

  serverSocket.on('close', () => {
    console.log('A client has disconnected.\n');
  });

  serverSocket.on('request', (request, connection) => {
    let cardData;
    if (request.action === 'add' || request.action === 'update') {
      cardData = new MagiCard(
        request.card.id,
        request.card.name,
        request.card.manaCost,
        request.card.color,
        request.card.cardType,
        request.card.rarity,
        request.card.rulesText,
        request.card.marketValue,
        request.card.powerToughness,
        request.card.loyalty,
      );
    }

    console.log('Received request: ', request.action);
    switch (request.action) {
      case 'add':
        cardManager.addCard(request.user, cardData!, (error, result) => {
          if (error) {
            connection.write(JSON.stringify({ status: 'Error', answer: error }));
          } else {
            connection.write(JSON.stringify({ status: 'Success', answer: result }));
          }
          connection.end();
        });
        break;
      case 'update':
        cardManager.updateCard(request.user, cardData!, (error, result) => {
          if (error) {
            connection.write(JSON.stringify({ status: 'Error', answer: error }));
          } else {
            connection.write(JSON.stringify({ status: 'Success', answer: result }));
          }
          connection.end();
        });
        break;
      case 'remove':
        cardManager.removeCard(request.user, request.cardID, (error, result) => {
          if (error) {
            connection.write(JSON.stringify({ status: 'Error', answer: error }));
          } else {
            connection.write(JSON.stringify({ status: 'Success', answer: result }));
          }
          connection.end();
        });
        break;
      case 'show':
        cardManager.showCard(request.user, request.cardID, (error, result) => {
          if (error) {
            connection.write(JSON.stringify({ status: 'Error', answer: error }));
          } else {
            connection.write(JSON.stringify({ status: 'CardsReceived', answer: result }));
          }
          connection.end();
        });
        break;
      case 'list':
        cardManager.listCollection(request.user, (error, result) => {
          if (error) {
            connection.write(JSON.stringify({ status: 'Error', answer: error }));
          } else {
            connection.write(JSON.stringify({ status: 'CardsReceived', answer: result }));
          }
          connection.end();
        });
        break;
      default:
        connection.write(console.log('Invalid action'));
        connection.end();
    }
  });
});

server.listen(60300, () => {
  console.log('Waiting for clients to connect.');
});
```




## **Conclusiones**
En conclusión, esta práctica me ha proporcionado una comprensión más profunda de las capacidades de Node.js, desde la manipulación de eventos asíncronos hasta la interacción con el sistema de archivos y la creación de aplicaciones de red, además de haber reforzado el uso de herramientas como yargs y chalk para mejorar la experiencia del usuario en la línea de comandos.




## **Recursos Empleados**

1. OpenAI Chat: [https://chat.openai.com/](https://chat.openai.com/) - Plataforma de IA conversacional proporcionada por OpenAI para tareas y aplicaciones de procesamiento de lenguaje natural.

2. W3Schools JavaScript Reference: [https://www.w3schools.com/jsrEF/default.asp](https://www.w3schools.com/jsrEF/default.asp) - Recurso en línea completo para aprender y consultar conceptos, sintaxis y mejores prácticas del lenguaje de programación JavaScript.

3. MDN Web Docs - JavaScript Reference: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) - Documentación oficial de la Red de Desarrolladores de Mozilla que proporciona explicaciones detalladas, ejemplos y referencias para las características del lenguaje JavaScript y las API.

4. API asíncrona proporcionada por Node.js para trabajar con el sistema de archivos: [https://nodejs.org/docs/latest/api/fs.html](https://nodejs.org/docs/latest/api/fs.html)

5. Yargs: [https://www.npmjs.com/package/yargs](https://www.npmjs.com/package/yargs)

6. Yargs: [https://www.npmjs.com/package/yargs](https://www.npmjs.com/package/yargs)