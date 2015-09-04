#!/usr/bin/env node

var hookshot = require('hookshot');
var childProcess = require('child_process');
var config = require('./team-api-update-config.json');
var https = require('https');

var webhook = hookshot();

function spawn(action_description, path, args) {
  return new Promise(function(resolve, reject) {
    var spawnOpts = { cwd: config.repoDir, stdio: 'inherit' };
    var childProc = childProcess.spawn(path, args, spawnOpts);
    childProc.on('close', function onProcessClose(exitStatus) {
      if (exitStatus !== 0) {
        reject(new Error(action_description));
      } else {
        resolve();
      }
    });
  });
}

function bundleInstall() {
  return spawn('bundle install', config.bundler, ['install']);
}

function jekyllBuild() {
  return spawn('jekyll build', config.bundler,
    ['exec', 'jekyll', 'build', '--trace']);
}

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
  bundleInstall()
    .then(function() { return jekyllBuild(); })
    .then(finish, finish);
});

webhook.listen(config.port);

console.log('Listening on port ' + config.port + ' for Team API updates.');
