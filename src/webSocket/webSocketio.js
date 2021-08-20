var tls = require('tls');
const { conectarBetfairSocket, test } = require('../controller/BetfairSocket');
const { json } = require('express');
const ConsultarMercado = require('../controller/ConsultarMercado');
const { response } = require('express');
const url = require('url');
const socketio = require('socket.io');
const Betfair = require('../apiBetFair');
const ConsultarCorrida = require('../controller/ConsultarCorrida');

var options = {
  host: 'stream-api.betfair.com',
  port: 443,
};

exports.setupWebSocket = (server) => {
  const io = socketio(server, {
    cors: { origin: '*' },
  });
  var tempo;
  var id = '0';
  io.on('connection', (socket) => {
    // socket.on('disconnecte', (reason) => {
    //   console.log('disconecting ');
    //   // clearTimeout(tempo);
    //   console.log('disconect');
    //   return true;
    // });

    console.log('Fora ' + socket.handshake.query.idMaket);
    clearTimeout(tempo);
    updateAllClients();

    async function updateAllClients() {
      console.log('Conectando a betfair iD ' + socket.handshake.query.idMaket);
      await betfair
        .listMarketBook(['1.185715894'], {
          priceData: ['EX_BEST_OFFERS'],
        })
        .then((response) => {
          for (t in response) {
            response = response[t]['result'];
          }
          socket.emit('mensagem', response);
          tempo = setTimeout(updateAllClients, 5000);
          console.log(response);
          return response;
        });
    }
  });
};

/*	Subscribe to order/market stream */
// const io = socketio(server);
// io.of('').on('connection', (socket) => {
//   const { marketId } = socket.handshake.query;
//   // socket.on('cliente', (teste) => {
//   var i = 1;
//   console.log('Chegou ' + marketId);
//   var retornoBetfair;
//   console.log('ID que chegou ', marketId);
//   if (client == null) {
//     client = tls.connect(options, function () {
//       console.log('Connected');
//     });
//     client.write(
//       '{"op": "authentication", "appKey": "XQzvGbEmSL9JwR7n", "session": "8uiRrC3Om7OmIUnTOyCv5DRTzghmj7kDjkwojmjShYE="}\r\n'
//     );
//   }
//   io.of('/' + '1.172787814').on('connection', (socket) => {
//     console.log('salas criadas ' + namespacesCreated);
//     client.write(
//       '{"op":"marketSubscription","id":"' +
//         2 +
//         '" ,"marketFilter":{"marketIds":[ ' +
//         marketId +
//         ']},  "bspMarket": true, "marketDataFilter":{"fields":["EX_BEST_OFFERS_DISP","SP_TRADED","SP_PROJECTED"]}}\r\n'
//     );
//     console.log('Ta aki');
//     client.on('data', function (data) {
//       retornoBetfair = JSON.parse(data.toString('utf8'));
//       console.log(retornoBetfair);
//       socket.emit('mensagem', retornoBetfair);
//     });
//   });
//   io.of('/' + '1.172788462').on('connection', (socket) => {
//     // console.log('salas criadas ' + namespacesCreated);
//     // if (!namespacesCreated.includes(marketId)) {
//     //   namespacesCreated.push(marketId);
//     // } else {
//     client.write(
//       '{"op":"marketSubscription","id":"' +
//         3 +
//         '" ,"marketFilter":{"marketIds":[ ' +
//         marketId +
//         ']},  "bspMarket": true, "marketDataFilter":{"fields":["EX_BEST_OFFERS_DISP","SP_TRADED","SP_PROJECTED"]}}\r\n'
//     );
//     // for (let retornoSala of namespacesCreated) {
//     //   if (retornoSala === marketId) {
//     //     console.log('Ta aki');
//     client.on('data', function (data) {
//       retornoBetfair = JSON.parse(data.toString('utf8'));
//       console.log(retornoBetfair);
//       socket.emit('mensagem', retornoBetfair);
//     });
//     //   }
//     // }
//     // }
//   });
// });

// exports.closeBetfair = () => {
//   console.log('fechando');
//   if (client != null) {
//     client.on('close', function () {
//       console.log('Connection closed');
//     });
//   }
// };

// async function listaProximaCorridasBetfair() {
//   console.log('iniciando a busca');

//   betfair = new Betfair(
//     'XQzvGbEmSL9JwR7n',
//     'psyalisson@gmail.com',
//     'alisson1985',
//     true
//   );
//   betfair.connect;
//   let retorno = await betfair.listMarketCatalogue(
//     {
//       eventTypeIds: [4339],
//       marketCountries: ['GB'],
//       marketTypeCodes: ['WIN'],
//       marketStartTime: { from: new Date().toJSON() },
//     },
//     '1',
//     {
//       marketProjection: [
//         'EVENT',
//         'MARKET_START_TIME',
//         'RUNNER_DESCRIPTION',
//         'COMPETITION',
//       ],
//     }
//   );
//   return retorno;
// }
