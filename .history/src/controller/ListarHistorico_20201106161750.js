const connection = require('../database/connection');
const { format, parseISO } = require('date-fns');

module.exports = {
  async listarHistorico(req, res) {
    const result = await connection
      .select()
      .from('HistoricoGB')
      .where('HistoricoGB.dogname', 'Court Reporter')
      .orderBy('date_corrida', 'desc')
      .limit(10);

    console.log(result);
    return res.json(result);
  },
};
