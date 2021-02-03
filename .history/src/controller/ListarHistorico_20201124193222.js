const connection = require('../database/connection');
const { format, parseISO } = require('date-fns');

module.exports = {
  async listarHistorico(req, res) {
    var subquery = await connection
      .select('dogname')
      .from('HistoricoGB')
      .where('HistoricoGB.dogname', [[req.query.name]]);
    console.log(subquery);
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
      .whereIn('HistoricoGB.dogname', subquery)
      .limit(100);

    console.log(result);
    return res.json(result);
  },
};
