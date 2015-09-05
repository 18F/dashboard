#! /usr/bin/env node
/* jshint node: true */
/* jshint bitwise: false */
//
// Author: Mike Bland (michael.bland@gsa.gov)
// Date:   2015-09-03
'use strict';

var childProcess = require('child_process');

var exports = module.exports = {};

function TeamApiImporter(repoDir, bundler) {
  this.repoDir = repoDir;
  this.bundler = bundler;
}

TeamApiImporter.prototype.spawn = function (actionDescription, path, args) {
  var that = this;
  return new Promise(function(resolve, reject) {
    var spawnOpts = { cwd: that.repoDir, stdio: 'inherit' };
    var childProc = childProcess.spawn(path, args, spawnOpts);
    childProc.on('close', function onProcessClose(exitStatus) {
      if (exitStatus !== 0) {
        reject(new Error(that.repoDir + ': ' + actionDescription));
      } else {
        resolve();
      }
    });
  });
};

TeamApiImporter.prototype.bundleInstall = function () {
  return this.spawn('bundle install', this.bundler, ['install']);
};

TeamApiImporter.prototype.jekyllBuild = function () {
  return this.spawn('jekyll build', this.bundler,
    ['exec', 'jekyll', 'build', '--trace']);
};

exports.isValidUpdate = function(info, teamApiRepo) {
  return info.ref !== undefined &&
    info.repository.full_name === teamApiRepo;  // jshint ignore:line
};

exports.logResult = function(err) {
  if (err) {
    console.error('Error importing Team API update:', err);
  } else {
    console.log('Importing Team API update succeeded');
  }
};

function createImporterPromise(repoDir, bundler) {
  var updater = new TeamApiImporter(repoDir, bundler);
  return updater.bundleInstall()
    .then(function() { return updater.jekyllBuild(); });
}

exports.buildSitesIfValidUpdate = function (info, config) {
  if (!exports.isValidUpdate(info, config.teamApiRepo)) {
    return Promise.reject('update payload is not valid');
  }
  if (config.repoDirs.length === 0) {
    return Promise.reject('config.repoDirs is empty');
  }

  var repoDirs = config.repoDirs.slice(0);
  var updatePromise = createImporterPromise(repoDirs.shift(), config.bundler);

  repoDirs.map(function (repoDir) {
    updatePromise = updatePromise.then(
      function() { return createImporterPromise(repoDir, config.bundler); });
  });

  return updatePromise;
};

exports.TeamApiImporter = TeamApiImporter;
