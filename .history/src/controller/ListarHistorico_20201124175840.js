const connection = require('../database/connection');
const { format, parseISO } = require('date-fns');

module.exports = {
  async listarHistorico(req, res) {
    const name = req.query.name;
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
      .where('HistoricoGB.dogname', name)
      .orderBy('date_corrida', 'desc')
      .limit(10);

    console.log(result);
    return res.json(result);
  },
};
