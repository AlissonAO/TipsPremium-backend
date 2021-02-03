const connection = require('../database/connection');
const { format, parseISO } = require('date-fns');

module.exports = {
  async listarHistorico(req, res) {
    const name = JSON.parse(req.query.name);
    console.log(name);
    const result = await connection
      .select(
        'dogname AS Nome',
        'date_corrida',
        'track',
        'dis',
        'trp',
        'split',
        'bends',
        'remaks',
        'wght AS peso',
        'grade'
      )
      .from('HistoricoGB')
      .whereIn('HistoricoGB.dogname', name)
      .orderBy('date_corrida', 'desc');

    console.log(result);
    return res.json(result);
  },

  async listaHist(list) {
    const listRetorno = {};
    // console.log(list);
    const result = await connection
      .select(
        'dogname AS Nome',
        'date_corrida',
        'track',
        'dis',
        'trp',
        'split',
        'bends',
        'remaks',
        'wght AS peso',
        'grade'
      )
      .from('HistoricoGB')
      .whereIn('HistoricoGB.dogname', Object.values(list))
      .orderBy('date_corrida', 'desc');

    var listHist = {};
    for (const keylist in list) {
      var count = 0;
      for (const keyResul in result) {
        var listDogHist = [];
        if (list[keylist] === result[keyResul]['Nome']) {
          if (count >= 10) {
            console.log(count + list[keylist]);
            break;
          } else {
            listDogHist.push(result[keyResul]);
            count += 1;
          }
        }
      }
      listHist[keylist.toString()] = listDogHist;
    }
    listRetorno.hist = listHist;
    // console.log(listRetorno);
    return listRetorno;
  },
};
