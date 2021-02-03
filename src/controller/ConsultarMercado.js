const express = require('express');
const { response } = require('express');
const GREYHOUND_EVENT_TYPE_ID = 4339;
const Betfair = require('../../src/apiBetFair/index');

module.exports = {
  async listaMercado(req, res) {
    const { id } = req.query;
    console.log('iniciando a busca pelo dados do Mercado ' + id);
    try {
      await betfair
        .listMarketBook([id], {
          priceData: ['EX_BEST_OFFERS'],
        })
        .then((response) => {
          for (t in response) {
            response = response[t]['result'];
          }

          console.log('retorno dentro de casa ' + response);
          return res.json(response);
        });
    } catch (e) {
      console.log('leaving catch block');
      console.log(e);
    }
  },
};
