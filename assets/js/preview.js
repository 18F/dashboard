var yaml = require('yamljs');

// override global objects for validator
window.jsYaml = window.jsyaml = {};
window.jsYaml.safeLoad = yaml.parse;

var aboutYmlValidator = require('about-yml-npm');
var validator = new aboutYmlValidator();

var fs = require('fs');

var liquid = window.l = modifyLiquidIncludes(require('liquid.js'));

var url = cleanUrl(window.location.search);
var xhr = new XMLHttpRequest();
xhr.addEventListener("load", insertAboutYml);

xhr.open('GET', url);
xhr.send();

function insertAboutYml (e) {
  var res = e.target;
  if (res.status !== 200) return;

  var yml = yaml.parse(res.responseText);
  var template = compileLiquidTemplate();
  var html = template.render({ page: { project: yml }});
  document.querySelector('[role=main]').innerHTML = html;

  var validationErrors = validator.validate(res.responseText);
  console.log('validationErrors', validationErrors);
}

function cleanUrl (url) {
  return url.replace('?url=', '')
    .replace('https://github.com','https://raw.githubusercontent.com')
    .replace('blob/', '');
}

function compileLiquidTemplate () {
  var templateSrc = fs.readFileSync(__dirname + '/../../_layouts/project.html', 'utf8');
  templateSrc = templateSrc.replace(/---[\s\S]*---/, '');
  templateSrc = templateSrc.replace(/include (.*?) /g, "include '$1' ");

  return liquid.parse(templateSrc);
}

function modifyLiquidIncludes (liquid) {
  liquid.readTemplateFile = function(path) {
    console.log('path', path);
    var elem = $(path);
    if(elem) {
      return elem.innerHTML;
    } else {
      return path +" can't be found.";
      // Or throw and error, or whatever you want...
    }
  }

  return liquid;
}

function getIncludeFiles () {
  var includes = {};
  var basePath = __dirname + '/../../_includes';
  console.log('basePath', basePath);
  var files = fs.readFileSync(basePath);
  // console.log('files', files);
  console.log('includes', includes);

}
