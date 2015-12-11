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

var includes = {
  'list-partners.html': fs.readFileSync(__dirname + '/../../_includes/list-partners.html', 'utf8')
};

var url = cleanGithubUrl(window.location.search);
var xhr = new XMLHttpRequest();
xhr.addEventListener("load", handleAboutYml);

xhr.open('GET', url);
xhr.send();

function handleAboutYml (e) {
  var res = e.target,
      aboutYml, errors, yml;
  if (res.status !== 200) return;

  aboutYml = window.a = yaml.parse(res.responseText);
  console.log('aboutYml', aboutYml);

  errors = validator.validate(res.responseText);
  console.log('errors', errors);

  if (errors) aboutYml['errors'] = errors;

  yml = addMissingNotices(aboutYml);
  console.log('yml', yml);
  insertYmlInHtml(yml);
}

function addMissingNotices (yml) {
  var whitelist = window.w = {
      'full_name': 'Missing full_name',
      'description': 'Missing description',
      'contact': 'Missing contact',
      'blog': 'Missing blog',
      'impact': 'Missing impact',
      'partners': ['Missing partners'],
      'milestones': ['Missing milestones'],
      'github': ['Missing github'],
      'links': ['Missing links']
    };

  return _.defaults({}, yml, whitelist);
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
