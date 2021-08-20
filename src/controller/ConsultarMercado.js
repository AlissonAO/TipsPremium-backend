const express = require('express');
const { response } = require('express');
const GREYHOUND_EVENT_TYPE_ID = 4339;
const serverio = require('../webSocket/webSocketio');

var tls = require('tls');

var options = {
  host: 'stream-api.betfair.com',
  port: 443,
};

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
          return res.json(response);
        });
    } catch (e) {
      console.log('leaving catch block');
      console.log(e);
    }
  },
};

exports.listaMercadoSocketiIO = async (req) => {
  console.log('iniciando a busca pelo dados do Mercado ' + req);
  try {
    await betfair
      .listMarketBook([req], {
        priceData: ['EX_BEST_OFFERS'],
      })
      .then((response) => {
        for (t in response) {
          response = response[t]['result'];
        }
        return response[0];
      });
  } catch (e) {
    console.log('leaving catch block');
    console.log(e);
  }
};
