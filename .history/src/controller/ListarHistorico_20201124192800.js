const connection = require('../database/connection');
const { format, parseISO } = require('date-fns');

module.exports = {
  async listarHistorico(req, res) {
    var subquery = knex
      .select('dogname')
      .from('HistoricoGB.dogname')
      .where(req.query.name);
    console.log(req.query.name);
    const name = req.query.name;
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
      .whereIn('HistoricoGB.dogname', ['Court Reporter', 'Phat Pop'])
      .limit(100);

    console.log(result);
    return res.json(result);
  },
};
