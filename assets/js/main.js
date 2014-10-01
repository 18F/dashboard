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
});
}

modules[1] = function(repo_name) {
  $.getJSON(GITHUB_API+"repos/"+ORGANIZATION+"/"+repo_name+"/contents/status.txt", 
    function(data) {
        status = data.content;
        var repo_name = repo_name.replace(/[\. ,:-]+/g, "-");
        if (typeof data.content != 'undefined' ) {
      	  $(".status").text(atob(data.content));
        } else {
      	  $(".status").text("No status available for this repo yet. Check back soon.");
        }
      }).error(function () {
       $(".status").text("No status available for this repo yet. Check back soon.");
    }
  );
}

$(document).ready(function() {
  render_dashboard();
});

var render_modules = function(projects) {
  _.map(projects,function(project) {
      modules[0](project.name);
  });
}

var render_dashboard = function() {
  var elements = $(document);
  var projects = []
  var content = _.map(elements, function(e) {
    var ghUrl = $(".github-url").attr("href");
    var slugIndex = ghUrl.lastIndexOf("/");
    var name = ghUrl.substr(slugIndex+1);
    console.log(name);
    var project = {name: name};
    projects.push(project);
  }).join("");
  render_modules(projects);
}    
