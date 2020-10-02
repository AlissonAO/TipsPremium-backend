const express = require('express');
const Betfair = require('../apiBetFair/index');
const { response } = require('express');
const corridaFeitas = [];
var runnersID = [];
const GREYHOUND_EVENT_TYPE_ID = 4339;
module.exports = {
  async listaProximaCorridasBetfair(req, res) {
    console.log('iniciando a busca');
    await betfair
      .listMarketCatalogue(
        {
          eventTypeIds: [GREYHOUND_EVENT_TYPE_ID],
          marketCountries: ['GB'],
          marketTypeCodes: ['WIN'],
          marketStartTime: { from: new Date().toJSON() },
        },
        '5',
        {
          marketProjection: [
            'EVENT',
            'MARKET_START_TIME',
            'RUNNER_DESCRIPTION',
            'COMPETITION',
          ],
        }
      )
      .then((response) => {
        for (t in response) {
          response = response[t]['result'];
          for (i in response) {
            console.log(response[i]['marketId']);
          }
        }
        return res.json(response);
      });
  },
};
