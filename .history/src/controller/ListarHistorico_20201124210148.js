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
    const listRetorno = [];
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
      .whereIn('HistoricoGB.dogname', list)
      .orderBy('date_corrida', 'desc');

    for (const keylist in list) {
      console.log(' retorno 1' + list[keylist]);
      for (const keyResul in result) {
        console.log(result[keyResul]['Nome']);
        break;
        if (keylist === result[keyResul]['Nome']) {
          console.log(' entrou');
        }
      }
    }
    // console.log(result);
    return null;
  },
};
