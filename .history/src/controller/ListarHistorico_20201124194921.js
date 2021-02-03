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
      .groupBy('HistoricoGB.dogname');

    console.log(result);
    return res.json(result);
  },
};
