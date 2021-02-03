const express = require('express');
const connection = require('./database/connection');
const tls = require('tls');
const { json } = require('express');

const routers = express.Router();
const corrida = require('./controller/ConsultarCorrida');
const corridasBetfair = require('./controller/CorridasBetfair');
const listarResultado = require('./controller/ListarResultado');
const ConsultarMercado = require('./controller/ConsultarMercado');
const listarHistorico = requere('./controller/ListarHistorico');
const serve = require('../src/index');

routers.get('/teste', async (request, response) => {
  // const { nome } = request.query;
  // console.log(nome);

  const result = await connection.select().from('Hist_galgo_betfair');

  return response.json(result);
});

//Obter a proxima corrida
routers.get('/listarCorridas', corridasBetfair.listaProximaCorridasBetfair);

//Obter os mercaod da corrida
routers.get('/listarMercado', ConsultarMercado.listaMercado);

//Obter Historico
routers.get('/listaCorrida', corrida.obterProximaCorrida);

routers.get('/listarResultados', listarResultado.listarCorrida);
//Obter Historico dos Galgos
routers.get('/listarHistorico', listarHistorico.listarHistorico);

// routers.get('/testebet', (req, res) => {
//   /*	Socket connection options */

//   var options = {
//     host: 'stream-api.betfair.com',
//     port: 443,
//   };

//   client.write(
//     '{"op": "authentication", "appKey": "XQzvGbEmSL9JwR7n", "session": "53mTRdIl2RayfAt1+f6MwEVJUluBBOYIOGJsFy+FIZI="}\r\n'
//   );

//   //  client.write('{"op":"orderSubscription","orderFilter":{"includeOverallPosition":false,"customerStrategyRefs":["betstrategy1"],"partitionMatchedByStrategyRef":true},"segmentationEnabled":true}\r\n');

//   client.write(
//     '{"op":"marketSubscription","id":2,"marketFilter":{"marketIds":["1.171809827"]},  "bspMarket": true, "marketDataFilter":{"fields":["EX_BEST_OFFERS_DISP","SP_TRADED","SP_PROJECTED"]}}\r\n'
//   );

//   //client.write ( '{"op": "marketSubscription", "id": 2, "marketFilter": {"marketIds": ["1.170870854"], "bspMarket": true, "bettingTypes": ["ODDS"], " eventTypeIds ": [" 1 "]," eventIds ": [" 27540841 "]," turnInPlayEnabled ": true," marketTypes ": [" MATCH_ODDS "]," countryCodes ": [" ES "]}," marketDataFilter ": {}} \ r \ n ' ) ;

//   //  client.write('{"op":"marketSubscription","id":2,"marketFilter":{"eventTypeIds":["4339"],"countryCodes":["GB"]}}\r\n');
//   console.log(serve);
//   var retortno;
//   client.on('data', function (data) {
//     console.log(JSON.parse(data));
//     const data1 = JSON.parse(data);
//     console.log(data1['mc']);
//     const mc = data1['mc'];
//     for (i in mc) {
//       retortno = JSON.stringify(mc[i].id);
//       console.log(retortno);
//       const rc = mc[i].rc;
//       for (r in rc) {
//         console.log(rc[r]);
//       }
//       //   const rc = i[rc]
//     }
//   });
//   client.on('close', function () {
//     console.log('Connection closed');
//   });

//   client.on('error', function (err) {
//     // console.log('Error:" + err)
//   });

//   return res.json(retortno);
// });

module.exports = routers;
