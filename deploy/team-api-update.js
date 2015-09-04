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
var childProcess = require('child_process');
var config = require('./team-api-update-config.json');
var https = require('https');

var webhook = hookshot();

function TeamApiUpdater(repoDir) {
  this.repoDir = repoDir;
}

TeamApiUpdater.prototype.spawn = function spawn(actionDescription, path, args) {
  var that = this;
  return new Promise(function(resolve, reject) {
    var spawnOpts = { cwd: that.repoDir, stdio: 'inherit' };
    var childProc = childProcess.spawn(path, args, spawnOpts);
    childProc.on('close', function onProcessClose(exitStatus) {
      if (exitStatus !== 0) {
        reject(new Error(actionDescription));
      } else {
        resolve();
      }
    });
  });
};

TeamApiUpdater.prototype.bundleInstall = function bundleInstall() {
  return this.spawn('bundle install', config.bundler, ['install']);
};

TeamApiUpdater.prototype.jekyllBuild = function jekyllBuild() {
  return this.spawn('jekyll build', config.bundler,
    ['exec', 'jekyll', 'build', '--trace']);
};

function isValidUpdate(info) {
  return info.ref !== undefined &&
    info.repository.full_name === config.teamApiRepo;
}

function finish(err) {
  if (err) {
    console.log('Error importing Team API update: ' + err);
  } else {
    console.log('Importing Team API update succeeded');
  }
}

webhook.on('refs/heads/' + config.teamApiBranch, function(info) {
  if (!isValidUpdate(info)) {
    return;
  }

  var updatePromise = new Promise(function(resolve) { resolve(); });
  config.repoDirs.map(function (repoDir) {
    var updater = new TeamApiUpdater(config.repoDir);
    updatePromise.then(function() { return updater.bundleInstall(); })
      .then(function() { return updater.jekyllBuild(); });
  });

  updatePromise.then(finish, finish);
});

webhook.listen(config.port);

console.log('Listening on port ' + config.port + ' for Team API updates.');
