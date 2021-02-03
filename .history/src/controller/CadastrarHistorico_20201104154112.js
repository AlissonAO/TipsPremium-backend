const express = require('express');
const Betfair = require('../apiBetFair/index');
const GREYHOUND_EVENT_TYPE_ID = 4339;
const market_filters = require('../Util/market_filter');
const { response } = require('express');
const corridaFeitas = [];
var runnersID = [];
const client = require('../database/ConnectionMongoDB');

module.exports = {
  async obterProximaCorrida(req, res) {
    var inputDate = new Date();
    const query = {
      DataCorrida: {
        $dateFromString: {
          dateString: '$DataCorrida',
        },
      },
    };
    await client.connect();
    const database = client.db('premiumTips').collection('historicoCalculado');

    const resultado = await database.find(query).toArray();

    console.log(resultado);
    client.close();
    return res.json(resultado);

    // return res.json(resultado);
  },

  //   async obterProximaCorrida(req, res) {
  //     betfair = new Betfair(
  //       'XQzvGbEmSL9JwR7n',
  //       'psyalisson@gmail.com',
  //       'alisson198',
  //       true
  //     );
  //     let event_types = [4339]; // Horse racing event type only
  //     let countries = ['GB']; // GB markets ONLY
  //     let market_types = ['WIN']; // WIN markets only
  //     let start_time = new Date().toJSON(); // start time is NOW
  //     let end_time = ''; // no end time just market count limit
  //     const max_num_markets = 1; // request ONE market only
  //     const listcatalogo = await betfair
  //       .listMarketCatalogue(
  //         {
  //           eventTypeIds: [GREYHOUND_EVENT_TYPE_ID],
  //           marketCountries: ['GB'],
  //           marketTypeCodes: ['WIN'],
  //           marketStartTime: { from: new Date().toJSON() },
  //         },
  //         '1',
  //         {
  //           marketProjection: [
  //             'EVENT',
  //             'MARKET_START_TIME',
  //             'RUNNER_DESCRIPTION',
  //             'COMPETITION',
  //           ],
  //         }
  //       )
  //       .then((response) => {
  //         for (t in response) {
  //           response = response[t]['result'];
  //           for (r in response) {
  //             var runners = response[r]['runners'];
  //             for (id in runners) {
  //               let idGalgo = runners[id]['selectionId'];
  //               let name = runners[id]['runnerName'].substring(3);
  //               let track = runners[id]['sortPriority'];
  //               runnersID.push({ idGalgo, name, track });
  //             }
  //           }
  //         }
  //         return response;
  //       });
  //     var retorno = await calularTempoEntrada(listcatalogo);
  //     if (retorno) {
  //       await obterListMercado(listcatalogo);
  //     }
  //     return res.json(listcatalogo);
  //   },
  // };
  // obter os dados do mercado atual
  // async function obterListMercado(listcatalogo) {
  //   console.log('Obtendo Lista de mercados dos Galgos');
  //   for (proxima in listcatalogo) {
  //     var id = listcatalogo[proxima]['marketId'];
  //   }
  //   var status = true;
  //   while (status) {
  //     var retornoBook = await betfair.listMarketBook(
  //       [id],
  //       {
  //         priceData: ['EX_ALL_OFFERS', 'EX_BEST_OFFERS'],
  //         virtualise: true,
  //       },
  //       'ALL'
  //     );
  //     for (r in retornoBook) {
  //       var result = retornoBook[r]['result'];
  //       for (status in result) {
  //         if (result[status]['status'] === 'OPEN') {
  //           let listrunners = result[status]['runners'];
  //           for (list in listrunners) {
  //           }
  //           console.log(JSON.stringify(result[status]['runners']));
  //         } else {
  //           console.log(JSON.stringify(result));
  //         }
  //       }
  //     }
  //   }
  // }

  // async function calularTempoEntrada(listcatalogo) {
  //   for (proxima in listcatalogo) {
  //     var horaCorrida = new Date(listcatalogo[proxima]['marketStartTime']);
  //   }
  //   if (horaCorrida.getHours() === new Date().getHours()) {
  //     if (horaCorrida.getMinutes() === new Date().getMinutes()) {
  //       return true;
  //     }
  //   }
  //   return true;
  // }
};
