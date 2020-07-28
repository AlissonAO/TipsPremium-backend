const express = require('express')
const Betfair = require('../apiBetFair/index');
const { response } = require('express');
const corridaFeitas = [];
var runnersID = [];
const GREYHOUND_EVENT_TYPE_ID = 4339;
module.exports ={
    async listaProximaCorridasBetfair(req, res){

        betfair = new Betfair('XQzvGbEmSL9JwR7n', 'psyalisson@gmail.com', 'alisson1985', true);
        await betfair.listMarketCatalogue({
            "eventTypeIds": [GREYHOUND_EVENT_TYPE_ID],
            "marketCountries": ["GB"],
            "marketTypeCodes": ["WIN"],
            "marketStartTime": { "from": new Date().toJSON() },
        }, "1", { "marketProjection": ["EVENT", "MARKET_START_TIME", "RUNNER_DESCRIPTION", "COMPETITION"] }
        ).then((response) => {
            for (t in response) {
                response = response[t]["result"]
            }
            return res.json(response)
        })
    }
}