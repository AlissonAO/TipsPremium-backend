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
    var listDogHist = [];
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

    for (const keylist in list) {
      var count = 0;
      let listHist = {};
      for (const keyResul in result) {
        if (list[keylist] === result[keyResul]['Nome']) {
          if (count >= 10) {
            break;
          } else {
            listDogHist.push(result[keyResul]);
            count++;
          }
        }
        listHist[keylist.toString()] = listDogHist;
      }
      console.log(keylist.toString());
      listRetorno.hist = listHist;
    }
    console.log(listRetorno);
    return listRetorno;
  },
};
