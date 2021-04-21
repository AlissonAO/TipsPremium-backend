const { fileURLToPath } = require('url');

const express = require('express');
const Betfair = require('../apiBetFair/index');
const GREYHOUND_EVENT_TYPE_ID = 4339;
const market_filters = require('../Util/market_filter');
const client = require('../database/ConnectionMongoDB');
const { parseISO, format } = require('date-fns');
const { zonedTimeToUtc } = require('date-fns-tz');
const listarHistorico = require('../controller/ListarHistorico');
const ObjectID = require('mongodb').ObjectID;

module.exports = {
  async filtro(req, res) {
    const estadio = [];
    const grade = [];
    const sexo = [];
    const peso = [];
    const trap = [];
    const postPick = [];
    const rating = [];
    const favorito = [];
    const mediaPosicaoMaior = [];
    const topTime = [];
    const mediaPosicao = [];
    const ultimoTempo = [];
    const mediaTempo = [];
    const topSplit = [];
    const mediaSplit = [1];
    const recupMedia = [];

    where = {};
    where['$and'] = [];
    select = {};
    select['$and'] = [];

    const database = await client
      .db('premiumTips')
      .collection('historicoCalculado');

    if (favorito.length > 0) {
      where['$and'].push({ 'dogs.analitico.Favorito': { $in: favorito } }); // add to the query objec
      select['$and'].push({ $in: ['$$dog.analitico.Favorito', favorito] }); // add to the query objec
    }
    if (sexo.length > 0) {
      where['$and'].push({ 'dogs.dogSex': { $in: sexo } }); // add to the query objec
      select['$and'].push({ $in: ['$$dog.dogSex', sexo] }); // add to the query objec
    }
    if (grade.length > 0) {
      where['$and'].push({ Grade: { $in: grade } }); // add to the query objec
      // select['$and'].push({ $in: ['Grade', grade] }); // add to the query objec
    }
    if (estadio.length > 0) {
      where['$and'].push({ TrackName: { $in: estadio } }); // add to the query objec
      // select['$and'].push({ $in: ['Grade', grade] }); // add to the query objec
    }
    if (peso.length > 0) {
      where['$and'].push({ 'dogs.peso': { $in: peso } }); // add to the query objec
      select['$and'].push({ $in: ['$$dog.peso', peso] }); // add to the query objec
    }
    if (trap.length > 0) {
      where['$and'].push({ 'dogs.trap': { $in: trap } }); // add to the query objec
      select['$and'].push({ $in: ['$$dog.trap', trap] }); // add to the query objec
    }
    // if (postPick.length > 0) {
    //   where['$and'].push({ PostPick: { $in: postPick } }); // add to the query objec
    //   // select['$and'].push({ $in: ['Grade', grade] }); // add to the query objec
    // }
    if (mediaPosicao.length > 0) {
      where['$and'].push({ 'dogs.filtro.mediaPosicao': { $in: mediaPosicao } }); // add to the query objec
      select['$and'].push({
        $in: ['$$dog.filtro.mediaPosicao', mediaPosicao],
      }); // add to the query objec
    }
    if (topTime.length > 0) {
      where['$and'].push({ 'dogs.filtro.topTime': { $in: topTime } }); // add to the query objec
      select['$and'].push({
        $in: ['$$dog.filtro.topTime', topTime],
      }); // add to the query objec
    }

    if (ultimoTempo.length > 0) {
      where['$and'].push({ 'dogs.filtro.ultimoTempo': { $in: ultimoTempo } }); // add to the query objec
      select['$and'].push({
        $in: ['$$dog.filtro.ultimoTempo', ultimoTempo],
      }); // add to the query objec
    }

    if (mediaTempo.length > 0) {
      where['$and'].push({ 'dogs.filtro.mediaTempo': { $in: mediaTempo } }); // add to the query objec
      select['$and'].push({
        $in: ['$$dog.filtro.mediaTempo', mediaTempo],
      }); // add to the query objec
    }

    if (topSplit.length > 0) {
      where['$and'].push({ 'dogs.filtro.topSplit': { $in: topSplit } }); // add to the query objec
      select['$and'].push({
        $in: ['$$dog.filtro.topSplit', topSplit],
      }); // add to the query objec
    }
    if (mediaSplit.length > 0) {
      where['$and'].push({ 'dogs.filtro.mediaSplit': { $in: mediaSplit } }); // add to the query objec
      select['$and'].push({
        $in: ['$$dog.filtro.mediaSplit', mediaSplit],
      }); // add to the query objec
    }

    if (recupMedia.length > 0) {
      where['$and'].push({ 'dogs.filtro.recupMedia': { $in: recupMedia } }); // add to the query objec
      select['$and'].push({
        $in: ['$$dog.filtro.recupMedia', recupMedia],
      }); // add to the query objec
    }
    console.log('Aki' + JSON.stringify(select));
    const queryFavprito = [
      {
        //Where
        $match: {
          DataCorrida: { $gte: new Date('2021-03-16T00:30:38.417Z') },
          $and: [where],
        },
      },

      // Select

      {
        $project: {
          dogs: {
            $filter: {
              input: '$dogs',
              as: 'dog',
              cond: {
                $and: [select],
              },
            },
          },
        },
      },
      {
        $project: {
          'dogs.nome': 1,
        },
      },
    ];

    try {
      var resultado = await database.aggregate(queryFavprito).toArray();

      console.log(resultado);
      return res.json(resultado);
    } catch (error) {
      console.log(error);
    } finally {
      // client.close();
    }
  },
};
