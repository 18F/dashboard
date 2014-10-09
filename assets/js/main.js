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
      $("."+repo_name + " .issues").append(""+issues);
      $("."+repo_name + " .stars").append(""+stars);
      $("."+repo_name + " .forks").append(""+forks);
    }).error(function () {
      $("."+repo_name + " .issues").append("Not available.");
      $("."+repo_name + " .stars").append("Not available.");
      $("."+repo_name + " .forks").append("Not available.");
});
}

$(document).ready(function() {
  render_dashboard();
});

var render_modules = function(name) {
  modules[0](name);
}

var render_dashboard = function() {
  var ghURLs = $(".github-url");
  _.each(ghURLs, function(ghURL) {
    var url = $(ghURL).attr("href");
    var slugIndex = url.lastIndexOf("/");
    var name = url.substr(slugIndex+1);
    render_modules(name);
  });
}
