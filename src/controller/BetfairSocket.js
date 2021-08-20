var tls = require('tls');

/*	Socket connection options */

var client;
var options = {
  host: 'stream-api.betfair.com',
  port: 443,
};
exports.conectarBetfairSocket = (idMarcket) => {
  // var clientBetfair = tls.connect(options, function () {
  //   console.log('Connected');
  // });
  // clientBetfair.write(
  //   '{"op": "authentication", "appKey": "XQzvGbEmSL9JwR7n", "session": ' +
  //     '"' +
  //     betfair.authKey +
  //     '"' +
  //     '}\r\n'
  // );
  // clientBetfair.write(
  //   '{"op":"marketSubscription","id":2,"marketFilter":{"marketIds":[' +
  //     idMaket +
  //     ']},  "bspMarket": true, "marketDataFilter":{"fields":["EX_ALL_OFFERS"]}}\r\n'
  // );
  // clientBetfair.on('data', function (data) {
  //   var retorno = JSON.parse(data.toString('utf8'));
  //   for (const key in retorno.mc) {
  //     var result = retorno.mc[key].rc;
  //     console.log('Received: ' + result);
  //     for (const k in result) {
  //       console.log('ID: ' + result[k].id);
  //       console.log('BAck: ' + result[k].atb);
  //       console.log('lay: ' + result[k].atl);
  //     }
  //   }
  //   var retortno;
  //   console.log('id que chegou da tela ' + idMarcket);
  //   /*	Establish connection to the socket */
  //   client = tls.connect(options, function () {
  //     console.log('Connected');
  //   });
  //   /*	Send authentication message */
  //   client.write(
  //     '{"op": "authentication", "appKey": "XQzvGbEmSL9JwR7n", "session": "dq5McaP+qTHFcq0Jx9xLJSkiNr0eS86q9OVCNcqjq70="}\r\n'
  //   );
  //   /*	Subscribe to order/market stream */
  //   client.write(
  //     '{"op":"marketSubscription","id":2,"marketFilter":{"marketIds":["' +
  //       '1.120684740' +
  //       '"]},  "bspMarket": true, "marketDataFilter":{"fields":["EX_BEST_OFFERS_DISP","SP_TRADED","SP_PROJECTED"]}}\r\n'
  //   );
  //   client.on('data', (data) => {
  //     // console.log('ID tela ' + idMarcket);
  //     console.log('Received: ' + data);
  //   });
  //   client.on('close', function () {
  //     console.log('Connection closed');
  //   });
  //   client.on('error', function (err) {
  //     console.log('Error:' + err);
  //   });
  //   return retortno;
};

exports.test = () => {
  return 'testess';
};
