#! /usr/bin/env node
/* jshint node: true */
/* jshint bitwise: false */
//
// Webhook listener triggering 18F Dashboard rebuilds upon Team API updates
//
// Author: Mike Bland (michael.bland@gsa.gov)
// Date:   2015-09-03
'use strict';

var hookshot = require('hookshot');
var teamApiImporter = require('./team-api-importer');
var config = require('./team-api-importer-config.json');

hookshot().on('refs/heads/' + config.teamApiBranch, function(info) {
  teamApiImporter.buildSitesIfValidUpdate(info, config)
    .then(teamApiImporter.logResult, teamApiImporter.logResult);
}).listen(config.port);

console.log('Listening on port ' + config.port + ' for Team API updates.');
