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

    const dataInicio = new Date(
      new Date(data).setHours(new Date(data).getHours() - 4)
    );

    const dataFm = new Date(
      new Date(data).setHours(new Date(data).getHours() + 23)
    );
    const retorno = [];
    const corridaFormatada = [];
    const result = await connection
      .select('*')
      .from('Hist_pista_betfair')
      .innerJoin(
        'Hist_galgo_betfair',
        'Hist_pista_betfair.id',
        'Hist_galgo_betfair.id_hist_pista'
      )
      .whereBetween('Hist_pista_betfair.data_corrida', [dataInicio, dataFm])
      .whereIn('Hist_pista_betfair.statusresultado', ['C', 'P'])
      .whereNotIn('Hist_pista_betfair.pista', [
        'Limerick',
        'Youghal',
        'Newbridge',
      ])
      .orderBy('Hist_pista_betfair.data_corrida', 'desc');

    var id = 0;
    for (const corrida in result) {
      if (id !== result[corrida].id_hist_pista) {
        objetoRetorno = {};
        listDogs = [];
        objetoRetorno.TrackName = result[corrida].pista;
        objetoRetorno.Grade = String(result[corrida].grade).substring(0, 2);
        objetoRetorno.Dis = String(result[corrida].grade).substring(3);
        objetoRetorno.HoraCorridaUK = result[corrida].horacorrida_uk;
        objetoRetorno.HoraCorridaBR = result[corrida].horacorrida_br;
        objetoRetorno.DataCorrida = result[corrida].data_corrida;
        objetoRetorno.statusResultado = result[corrida].statusresultado;
        for (const i in result) {
          if (result[corrida].id_hist_pista === result[i].id_hist_pista) {
            var dog = {};
            dog.nome = result[i].nomegalgo;
            dog.trap = result[i].trap;
            dog.resultado =
              result[i].posicaofinal !== null ? result[i].posicaofinal : '';
            if (result[i].posicaofinal === null && result[i].win === true) {
              dog.resultado = '1';
            } else if (
              result[i].posicaofinal === null &&
              result[i].win_place === true
            ) {
              dog.resultado = '2';
            }
            dog.odd_Back =
              result[i].odd_back !== null ? result[i].odd_back : '';
            dog.odd_Lay = result[i].odd_lay !== null ? result[i].odd_lay : '';
            listDogs.push(dog);
            id = result[corrida].id_hist_pista;
          }
        }
        objetoRetorno.dogs = listDogs;
        corridaFormatada.push(objetoRetorno);
      }
    }

    console.log(corridaFormatada);
    return res.json(corridaFormatada);

    // const query = {
    //   DataCorrida: {
    //     // $gte: dateAtual,
    //     // $gte: new Date('2021-03-30T00:30:38.417Z'),
    //     // $lte: new Date('2021-03-30T18:31:38.417Z'),
    //     $gte: new Date(new Date(data)),
    //     $lte: new Date(new Date(data).setHours(new Date(data).getHours() + 23)),
    //   },
    //   statusResultado: { $in: ['C', 'P'] },
    // };
    // const sort = {
    //   DataCorrida: -1,
    // };
    // try {
    //   const database = await client
    //     .db('premiumTips')
    //     .collection('historicoCalculado');
    //   var resultado = await database.find(query).sort(sort).toArray();
    //   return res.json(resultado);
    // } catch (e) {
    //   console.log('leaving catch block');
    //   console.log(e);
    // }
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
