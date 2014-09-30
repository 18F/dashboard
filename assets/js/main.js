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
      $("#"+name+" .issues").append(""+issues);
      $("#"+name+" .stars").append(""+stars);
      $("#"+name+" .forks").append(""+forks);      
    }).error(function () {
      $("#"+name+" .issues").append("Not available.");
});
}

modules[1] = function(repo_name) {
  $.getJSON(GITHUB_API+"repos/"+ORGANIZATION+"/"+repo_name+"/contents/status.txt", 
 function(data) {
      status = data.content;
      var repo_name = repo_name.replace(/[\. ,:-]+/g, "-");
      if (typeof data.content != 'undefined' ) {
    	  $("#"+repo_name+" .status").text(atob(data.content));
      } else {
    	  $("#"+repo_name+" .status").text("No status available for this repo yet. Check back soon.");
      }
    }).error(function () {
	   $("#"+repo_name+" .status").text("No status available for this repo yet. Check back soon.");
  });
}

$(document).ready(function() {
//  $('#tab-container').easytabs();
  render_dashboard();
});

var render_modules = function(projects) {
  _.map(projects,function(project) {
      modules[0](project.name);
  });
  _.map(projects,function(project) {
      modules[1](project.name);
  });
}

var render_dashboard = function() {
  var elements = $(".dashboard-projects-content");
  var projects = []
  var content = _.map(elements, function(e) {
    var name = $(e).attr("id");
    var project = {name: name};
    projects.push(project);
  }).join("");
  render_modules(projects);
}    
