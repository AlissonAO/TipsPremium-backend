
const connection = require('../database/connection');
const { format, parseISO } = require('date-fns');
const { da } = require('date-fns/locale');

module.exports = {

    async listarCorrida(req, res) {
        const { data } = req.query
        const dataHoraInicio = new Date(data).toISOString().split("T")[0] + " 00:00:00";
        const dataHorarioFim = new Date(data).toISOString().split("T")[0] + " 23:59:59";
        const result = await connection.select(
            'nomegalgo', 'datainicio', 'datafim', 'Hist_pista_betfair.pista', 'Hist_pista_betfair.grade', 'trap', 'odd_lay', 'odd_back'
            , 'probabilidade', 'din_investido AS Total Galgo', 'win', 'total_dinheiro AS total da corrida '
        ).from('Hist_galgo_betfair')
            .innerJoin('Hist_pista_betfair', 'id_hist_pista', 'Hist_pista_betfair.id')
            .where('Hist_pista_betfair.pais', 'GB')
            .whereBetween('datainicio', [dataHoraInicio, dataHorarioFim])
            .orderBy('datainicio')

        for (item in result) {
            result[item]['datainicio'] = dataFormata(result[item]['datainicio'])
            result[item]['datafim'] = dataFormata(result[item]['datafim'])
            if (result[item]['win'] === true) {
                result[item]['win'] = "Venceu"
            } else {
                result[item]['win'] = "Perdeu"
            }
        }

        console.log(result)
        return res.json(result);
    }


}

const dataFormata = (data) => {
    return format(new Date(data), "H:mm:ss a");
}

