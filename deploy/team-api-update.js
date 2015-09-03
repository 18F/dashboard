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

function isValidUpdate(info) {
  return info.ref !== undefined &&
    info.repository.full_name === config.teamApiRepo;
}

function gitCheckoutDefault() {
  return spawn('checkout ' + config.defaultBranch, config.git,
    ['checkout', config.defaultBranch]);
}

function gitPull() {
  return spawn('pull ' + config.defaultBranch, config.git, ['pull']);
}

function gitCheckoutNewBranch() {
  return spawn('checkout ' + config.teamApiBranch, config.git,
    ['checkout', '-b', config.teamApiBranch]);
}

function runUpdateScript() {
  return spawn('run update script', config.updateScript, []);
}

function gitCommit() {
  return spawn('commit update', config.git,
    ['commit', '-m', config.commitMessage]);
}

function gitPush() {
  return spawn('push to repo', config.git, ['push']);
}

function createPullRequest() {
  return new Promise(function(resolve, reject) {
    var request = https.request(config.gitHubApiOptions, function(response) {
      response.on('data', function(data) { resolve(data); });
    });
    request.on('error', function(error) { reject(error); });
  });
}

function gitDeleteBranch() {
  return spawn('delete ' + config.teamApiBranch, config.git,
    ['branch', '-d', config.teamApiBranch]);
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
  gitCheckoutDefault()
    .then(function() { gitPull(); })
    .then(function() { gitCheckoutNewBranch(); })
    .then(function() { runUpdateScript(); })
    .then(function() { gitCommit(); })
    .then(function() { gitPush(); })
    .then(function() { createPullRequest(); })
    .then(function() { gitCheckoutDefault(); })
    .then(function() { gitDeleteBranch(); })
    .then(finish, finish);
});

webhook.listen(config.port);

console.log('Listening on port ' + config.port + ' for Team API updates.');
