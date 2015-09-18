/* jshint node: true */
/* jshint expr: true */
/* jshint mocha: true */
'use strict';

var path = require('path');
var teamApiImporter = require(
  path.resolve(path.dirname(__dirname), 'deploy', 'team-api-importer.js'));
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var childProcess = require('child_process');
var mockSpawn = require('mock-spawn');

var expect = chai.expect;
chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

describe ('isValidUpdate', function() {
  it('should return false if the payload is empty', function() {
    var payload = { };
    expect(teamApiImporter.isValidUpdate(payload, '18F/team-api')).to.be.false;
  });

  it('should return false if ref is undefined', function() {
    var payload = {
      'repository': {'full_name': '18F/team-api'},
    };
    expect(teamApiImporter.isValidUpdate(payload, '18F/team-api')).to.be.false;
  });

  it('should return false if not from the Team API repository', function() {
    var payload = {
      'ref': 'is present',
      'repository': {'full_name': 'mbland/team-api'}};
    expect(teamApiImporter.isValidUpdate(payload, '18F/team-api')).to.be.false;
  });

  it('should return true', function() {
    var payload = {
      'ref': 'is present',
      'repository': {'full_name': '18F/team-api'},
    };
    expect(teamApiImporter.isValidUpdate(payload, '18F/team-api')).to.be.true;
  });
});

describe('logResult', function() {
  beforeEach(function() {
    sinon.spy(console, 'log');
    sinon.spy(console, 'error');
  });

  afterEach(function() {
    console.error.restore();
    console.log.restore();
  });

  it('should log a normal message to the console if no error', function() {
    teamApiImporter.logResult();
    console.log.should.have.been.calledWith(
      'Importing Team API update succeeded');
    console.error.should.not.have.been.called;
  });

  it('should log an error message to the console if error present', function() {
    teamApiImporter.logResult('whoops');
    console.error.should.have.been.calledWith(
      'Error importing Team API update:', 'whoops');
    console.log.should.not.have.been.called;
  });
});

describe('buildSitesIfValidUpdate', function() {
  var origSpawn, mySpawn;

  beforeEach(function() {
    origSpawn = childProcess.spawn;
    mySpawn = mockSpawn();
    childProcess.spawn = mySpawn;
  });

  afterEach(function() { childProcess.spawn = origSpawn; });

  function validPayload() {
    return {
      'ref': 'is present',
      'repository': {'full_name': '18F/team-api'},
    };
  }

  function validConfig() {
    return {
      'bundler':     '/usr/bin/bundle',
      'teamApiRepo': '18F/team-api',
      'repoDirs':    [ '/staging', '/production' ]
    };
  }

  function spawnCalls() {
    return mySpawn.calls.map(function(value) {
      return value.opts.cwd + ': ' + value.command + ' ' + value.args.join(' ');
    });
  }

  it('should do nothing if the update is not valid', function() {
    return teamApiImporter.buildSitesIfValidUpdate({}, validConfig())
      .should.be.rejectedWith('update payload is not valid');
  });

  it('should do nothing if config.repoDirs is empty', function() {
    var config = validConfig();
    config.repoDirs = [];
    return teamApiImporter.buildSitesIfValidUpdate(validPayload(), config)
      .should.be.rejectedWith('config.repoDirs is empty');
  });

  it('should build a single repoDir', function(done) {
    var config = validConfig();
    config.repoDirs.pop();
    mySpawn.setDefault(mySpawn.simple(0));

    function validateSingleRepoDir() {
      expect(spawnCalls()).to.eql([
        '/staging: /usr/bin/bundle install',
        '/staging: /usr/bin/bundle exec jekyll build --trace'
      ]);
    }

    teamApiImporter.buildSitesIfValidUpdate(validPayload(), config)
      .should.be.fulfilled.then(validateSingleRepoDir).should.notify(done);
  });

  it('should build the second repoDir after the first', function(done) {
    mySpawn.setDefault(mySpawn.simple(0));

    function validateMultipleRepoDirs() {
      expect(spawnCalls()).to.eql([
        '/staging: /usr/bin/bundle install',
        '/staging: /usr/bin/bundle exec jekyll build --trace',
        '/production: /usr/bin/bundle install',
        '/production: /usr/bin/bundle exec jekyll build --trace'
      ]);
    }

    teamApiImporter.buildSitesIfValidUpdate(validPayload(), validConfig())
      .should.be.fulfilled.then(validateMultipleRepoDirs).should.notify(done);
  });

  it('should exit with a failure if a step fails', function(done) {
    mySpawn.sequence.add(mySpawn.simple(0));
    mySpawn.sequence.add(mySpawn.simple(0));
    mySpawn.sequence.add(mySpawn.simple(1));

    function validateFailure() {
      expect(spawnCalls()).to.eql([
        '/staging: /usr/bin/bundle install',
        '/staging: /usr/bin/bundle exec jekyll build --trace',
        '/production: /usr/bin/bundle install',
      ]);
    }

    teamApiImporter.buildSitesIfValidUpdate(validPayload(), validConfig())
      .should.be.rejectedWith(Error, '/production: bundle install')
      .then(validateFailure).should.notify(done);
  });
});
