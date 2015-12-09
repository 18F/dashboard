var fs = require('fs');

var _ = require('underscore');
var yaml = require('yamljs');
var liquid = require('liquid.js');

liquid.readTemplateFile = function(path) {
  console.log('path', path);
  if (includes[path]) return includes[path];
  return '';
}

var aboutYmlValidator = require('about-yml-validator');
var validator = new aboutYmlValidator();

var includes = window.zz = {
  'list-partners.html': fs.readFileSync(__dirname + '/../../_includes/list-partners.html', 'utf8')
};

var url = cleanGithubUrl(window.location.search);
var xhr = new XMLHttpRequest();
xhr.addEventListener("load", handleAboutYml);

xhr.open('GET', url);
xhr.send();

function handleAboutYml (e) {
  var res = e.target;
  if (res.status !== 200) return;

  var aboutYml = yaml.parse(res.responseText);
  var name = aboutYml.name;
  fetchTeamApi(name, function (r) {
    if (r.status !== 200) return;

    var teamApi = yaml.parse(r.responseText);
    var together = _.extend({}, teamApi, aboutYml);
    insertYmlInHtml(together);
  });
}

function fetchTeamApi (name, cb) {
  var base = 'https://team-api.18f.gov/public/api/projects',
      url = [base, name.toLowerCase() + '/'].join('/'),
      xhr = new XMLHttpRequest();

  xhr.addEventListener("load", function (e) {
    if (cb) cb(e.target);
  });

  xhr.open('GET', url);
  xhr.send();
}

function insertYmlInHtml (yml) {
  var template = compileLiquidTemplate();
  var html = template.render({ page: { project: yml }});
  document.querySelector('[role=main]').innerHTML = html;
}

function compileLiquidTemplate () {
  var templateSrc = fs.readFileSync(__dirname + '/../../_layouts/project.html', 'utf8');
  templateSrc = templateSrc.replace(/---[\s\S]*---/, '');
  templateSrc = templateSrc.replace(/include (.*?) /g, "include '$1' ");

  return liquid.parse(templateSrc);
}

function cleanGithubUrl (url) {
  return url.replace('?url=', '')
    .replace('https://github.com','https://raw.githubusercontent.com')
    .replace('blob/', '');
}
