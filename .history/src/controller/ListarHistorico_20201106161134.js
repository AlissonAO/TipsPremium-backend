const connection = require('../database/connection');
const { format, parseISO } = require('date-fns');

module.exports = {
  async listarHistorico(req, res) {
    // const { data } = req.query;
    // const dataHoraInicio =
    //   new Date(data).toISOString().split('T')[0] + ' 00:00:00';
    // const dataHorarioFim =
    //   new Date(data).toISOString().split('T')[0] + ' 23:59:59';
    const result = await connection
      .select()
      .from('HistoricoGB')
      .where('HistoricoGB.dogname', 'Court Reporter')
      .orderBy('date_corrida')
      .limit(1);

    // for (item in result) {
    //   result[item]['datainicio'] = dataFormata(result[item]['datainicio']);
    //   result[item]['datafim'] = dataFormata(result[item]['datafim']);
    //   result[item]['Total Galgo'] = moneyFormate(result[item]['Total Galgo']);
    //   result[item]['Total da corrida'] = moneyFormate(
    //     result[item]['Total da corrida']
    //   );
    //   result[item]['probabilidade'] = porcentFormate(
    //     result[item]['probabilidade']
    //   );
    //   if (result[item]['win'] === true) {
    //     result[item]['win'] = 'WIN';
    //   } else {
    //     result[item]['win'] = 'LOSS';
    //   }
    // }

    console.log(result);
    return res.json(result);
  },
};
