const express = require('express');
const Betfair = require('../apiBetFair/index');
const { response } = require('express');
const GREYHOUND_EVENT_TYPE_ID = 4339;

module.exports = {
  async listaMercado(req, res) {
    const { id } = req.query;
    console.log('iniciando a busca pelo dados do Mercado ' + id);
    await betfair
      .listMarketBook([id], {
        priceData: ['EX_BEST_OFFERS'],
      })
      .then((response) => {
        for (t in response) {
          response = response[t]['result'];
        }

        console.log(response);
        response.setHeader('Access-Control-Allow-Origin', '*');
        return res.json(response);
      });
  },
};
