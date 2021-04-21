const connection = require('../database/connection');
const { format, parseISO } = require('date-fns');
const client = require('../database/ConnectionMongoDB');
const { zonedTimeToUtc } = require('date-fns-tz');

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

  async listarResultado(req, res) {
    const { data } = req.query;
    console.log('Listar Resultados ' + new Date(data));
    const query = {
      DataCorrida: {
        // $gte: dateAtual,
        // $gte: new Date('2021-03-30T00:30:38.417Z'),
        // $lte: new Date('2021-03-30T18:31:38.417Z'),
        $gte: new Date(new Date(data)),
        $lte: new Date(new Date(data).setHours(new Date(data).getHours() + 23)),
      },
      statusResultado: { $in: ['C', 'P'] },
    };
    const sort = {
      DataCorrida: -1,
    };
    try {
      const database = await client
        .db('premiumTips')
        .collection('historicoCalculado');
      var resultado = await database.find(query).sort(sort).toArray();
      return res.json(resultado);
    } catch (e) {
      console.log('leaving catch block');
      console.log(e);
    }
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
