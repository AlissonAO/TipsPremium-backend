const connection = require('../database/connection');
const { format, parseISO } = require('date-fns');
const { da } = require('date-fns/locale');
// const { MongoClient } = require('mongodb');

module.exports = {
  async listarCorrida(req, res) {
    const { data } = req.query;
    // const formattedDate = format(new Date(data), 'yyyy-MM-dd HH:mm:ss');
    const dataHoraInicio =
      new Date(data).toISOString().split('T')[0] + ' 00:00:00';
    const dataHorarioFim =
      new Date(data).toISOString().split('T')[0] + ' 23:59:59';
    const result = await connection
      .select(
        'nomegalgo',
        'datainicio',
        'datafim',
        'Hist_pista_betfair.pista',
        'Hist_pista_betfair.grade',
        'trap',
        'odd_lay',
        'odd_back',
        'win',
        'odd_back_place',
        'odd_lay_place',
        'win_place'
      )
      .from('Hist_galgo_betfair')
      .innerJoin('Hist_pista_betfair', 'id_hist_pista', 'Hist_pista_betfair.id')
      .where('Hist_pista_betfair.pais', 'GB')
      .whereBetween('datainicio', [dataHoraInicio, dataHorarioFim])
      .orderBy('datainicio');

    for (item in result) {
      result[item]['datainicio'] = dataFormata(result[item]['datainicio']);
      result[item]['datafim'] = dataFormata(result[item]['datafim']);
      // result[item]['Total Galgo'] = moneyFormate(result[item]['Total Galgo']);
      // result[item]['Total da corrida'] = moneyFormate(
      //   result[item]['Total da corrida']
      // );
      // result[item]['probabilidade'] = porcentFormate(
      //   result[item]['probabilidade']
      // );
      if (result[item]['win'] === true) {
        result[item]['win'] = 'WIN';
      } else {
        result[item]['win'] = 'LOSS';
      }
      if (result[item]['win_place'] === true) {
        result[item]['win_place'] = 'WIN';
      } else {
        result[item]['win_place'] = 'LOSS';
      }
    }
    return res.json(result);
  },
};

const dataFormata = (data) => {
  return format(new Date(data), 'H:mm:ss a');
};

const moneyFormate = (valor) => {
  if (valor === null) {
    return '00.0';
  } else {
    return valor.toLocaleString('pt-BR');
  }
};

const porcentFormate = (dados) => {
  return dados + ' %';
};
