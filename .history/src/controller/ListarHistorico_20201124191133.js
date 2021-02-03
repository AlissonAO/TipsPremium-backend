const connection = require('../database/connection');
const { format, parseISO } = require('date-fns');

module.exports = {
  async listarHistorico(req, res) {
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
      .where('HistoricoGB.dogname', 'IN', ['Court Reporter'])
      .limit(2);

    console.log(result);
    return res.json(result);
  },
};
