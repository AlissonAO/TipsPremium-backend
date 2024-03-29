const connection = require('../database/connection');
const { format, parseISO } = require('date-fns');
const { pt } = require('date-fns/locale/pt');

module.exports = {
  async listarHistorico(req, res) {
    const name = JSON.parse(req.query.name);
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

    return res.json(result);
  },

  async listaHist(list) {
    const listRetorno = [];
    const result = await connection
      .select(
        'dogname AS Nome',
        'date_corrida',
        'track',
        'dis',
        'trp',
        'fin',
        'split',
        'bends',
        'remaks',
        'wght AS peso',
        'grade',
        'caltm'
      )
      .from('HistoricoGB')
      .whereIn('HistoricoGB.dogname', Object.values(list))
      .orderBy('date_corrida', 'desc');

    for (const keylist in list) {
      var count = 0;
      var listDogHist = [];
      for (const keyResul in result) {
        if (list[keylist] === result[keyResul]['Nome']) {
          if (count >= 10) {
            break;
          } else {
            listDogHist.push(result[keyResul]);
            count += 1;
          }
        }
      }
      // listHist[keylist.toString()] = listDogHist;
      listRetorno.push(listDogHist);
    }
    // console.log(listRetorno);
    return listRetorno;
  },
};
