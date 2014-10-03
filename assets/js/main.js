var modules = [];
var GITHUB_API = "https://api.github.com/";
var GOVCODE_API = "http://api.govcode.org/"
var ORGANIZATION = "18f";

modules[0] = function(repo_name) {
  $.getJSON(GOVCODE_API+"repos/"+repo_name, function(data) {
      var issues = data['OpenIssues'];
      var stars = data['Stargazers'];
      var forks = data['Forks'];
      var name = repo_name.replace(/[\. ,:-]+/g, "-");
      $(".issues").append(""+issues);
      $(".stars").append(""+stars);
      $(".forks").append(""+forks);      
    }).error(function () {
      $(".issues").append("Not available.");
      $(".stars").append("Not available.");
      $(".forks").append("Not available.");
});
}

$(document).ready(function() {
  render_dashboard();
});

var render_modules = function(name) {
  modules[0](name);
}

var render_dashboard = function() {
  var ghUrl = $(".github-url").attr("href");
  var slugIndex = ghUrl.lastIndexOf("/");
  var name = ghUrl.substr(slugIndex+1);
  render_modules(name);
}    
