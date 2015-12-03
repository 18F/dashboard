// var aboutYmlValidator = require('about-yml-npm');
// var validator = new aboutYmlValidator();

var fs = require('fs');

var liquid = window.l = require('liquid.js');

var url = cleanUrl(window.location.search);
var xhr = new XMLHttpRequest();
xhr.addEventListener("load", insertAboutYml);

xhr.open('GET', url);
xhr.send();

function insertAboutYml (e) {
  var res = e.target;
  if (res.status !== 200) return;

  var yml = jsyaml.safeLoad(res.responseText);
  var template = compileLiquidTemplate();
  var html = template.render({ page: { project: yml }});

  document.querySelector('[role=main]').innerHTML = html;
}

function cleanUrl (url) {
  return url.replace('?url=', '')
    .replace('https://github.com','https://raw.githubusercontent.com')
    .replace('blob/', '');
}

function compileLiquidTemplate () {
  var templateSrc = fs.readFileSync(__dirname + '/../../_layouts/project.html').toString();
  templateSrc = templateSrc.replace(/---[\s\S]*---/, '');
  return liquid.parse(templateSrc);
}
