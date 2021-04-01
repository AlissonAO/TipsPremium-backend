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
  async obterProximaCorrida(req, res) {
    let dateAtual = new Date();
    dateAtual.setHours(dateAtual.getHours()-2);
    const parsedDate = parseISO(dateAtual.toISOString());
    const znDate = zonedTimeToUtc(parsedDate, {
      timeZone: 'America/Sao_Paulo',
    });
    console.log('Data atual Consulta corridas ' + znDate);
    const query = {
      DataCorrida: {
        $gte: znDate,
        // $gte: new Date('2021-03-07T00:30:38.417Z'),
        // $lte: new Date('2021-01-19T18:31:38.417Z'),
      },
    };
    const sort = {
      DataCorrida: 1,
    };
    try {
      const database = await client
        .db('premiumTips')
        .collection('historicoCalculado');
      // await database.deleteMany(query);
      var resultado = await database.find(query).sort(sort).limit(10).toArray();

      for (const dog in resultado) {
        const listDogs = resultado[dog]['dogs'];
        var listName = {};
        for (const key in listDogs) {
          let trap = listDogs[key]['trap'].toString();
          listName[trap] = listDogs[key]['nome'];
        }
        const listHistDog = await listarHistorico.listaHist(listName);
        for (const keydog in listDogs) {
          listaRetorno = [];
          var listHist = {};
          Object.values(listHistDog).forEach((value) => {
            value.forEach((i) => {
              if (listDogs[keydog]['nome'] === i['Nome']) {
                listaRetorno.push(i);
              }
            });
            listHist['hist'] = listaRetorno;
            Object.assign(listDogs[keydog], listHist);
          });
        }
      }
      return res.json(resultado);
    } catch (e) {
      console.log('leaving catch block');
      console.log(e);
    }
  },

  async obterCorridaId(req, res) {
    const { id } = req.query;
    console.log('Obtento consulta pelo ID' + id);
    const query = {
      _id: ObjectID(id),
    };

    try {
      const database = await client
        .db('premiumTips')
        .collection('historicoCalculado');
      var resultado = await database.find(query).toArray();

      for (const dog in resultado) {
        const listDogs = resultado[dog]['dogs'];
        var listName = {};
        for (const key in listDogs) {
          let trap = listDogs[key]['trap'].toString();
          listName[trap] = listDogs[key]['nome'];
        }
        const listHistDog = await listarHistorico.listaHist(listName);
        for (const keydog in listDogs) {
          listaRetorno = [];
          var listHist = {};
          Object.values(listHistDog).forEach((value) => {
            value.forEach((i) => {
              if (listDogs[keydog]['nome'] === i['Nome']) {
                listaRetorno.push(i);
              }
            });
            listHist['hist'] = listaRetorno;
            Object.assign(listDogs[keydog], listHist);
          });
        }
      }
      return res.json(resultado);
    } catch (e) {
      console.log('leaving catch block');
      console.log(e);
    }
  },

  async obterTodasCorridas(req, res) {
    const dataHoje = format(new Date(), 'yyyy-MM-dd');
    const query = {
      DataCorrida: {
        // $gte: znDate,
        $gte: new Date(dataHoje),
        // $gte: new Date('2021-03-12T00:31:38.417Z'),
      },
    };
    const sort = {
      DataCorrida: 1,
    };
    try {
      const database = await client
        .db('premiumTips')
        .collection('historicoCalculado');
      var resultado = await database
        .find(query)
        .project({
          _id: 1,
          TrackName: 1,
          Grade: 1,
          Favoritos: 1,
          HoraCorridaBR: 1,
          HoraCorridaUK: 1,
          Dis: 1,
        })
        .sort(sort)
        .toArray();

      return res.json(resultado);
    } catch (e) {
      console.log('leaving catch block');
      console.log(e);
    }
  },
};
