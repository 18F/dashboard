var modules = [];
var GITHUB_API = "https://api.github.com/";
var GOVCODE_API = "http://api.govcode.org/"
var ORGANIZATION = "18f";

var issues = "";

modules[0] = function(repo_name) {
  $.getJSON(GOVCODE_API+"repos/"+repo_name, function(data) {
      issues = data['OpenIssues'];
      stars = data['Stargazers'];
      forks = data['Forks'];
      $("#"+repo_name+" .issues").append(""+issues);
      $("#"+repo_name+" .stars").append(""+stars);
      $("#"+repo_name+" .forks").append(""+forks);

      
    }).error(function () {
      $("#"+repo_name+" .issues").append("Not available.");
});
}

modules[1] = function(repo_name) {
  $.getJSON(GITHUB_API+"repos/"+ORGANIZATION+"/"+repo_name+"/contents/status.txt", 
// { ref: "master" },
 function(data) {
      status = data.content;
      if (typeof data.content != 'undefined' ) {
	  $("#"+repo_name+" .status").text(atob(data.content));
      } else {
	  $("#"+repo_name+" .status").text("No status available for this repo yet. Check back soon.");
      }
    }).error(function () {
	   $("#"+repo_name+" .status").text("No status available for this repo yet. Check back soon.");
    });
}

modules[2] = function(name, desc) {
  $("#"+name+" .description").text(desc);
}

modules[3] = function(name, client) {
  $("#"+name+" .client").text(client);
}

modules[4] = function(name, full_name) {
  $("#"+name+" h1").text(full_name);
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
  _.map(projects, function(project) {
    modules[2](project.name, project.description);
  });
  _.map(projects, function(project) {
    modules[3](project.name, project.client);
  });
  _.map(projects, function(project) {
    modules[4](project.name, project.title)
  })
}

var render_dashboard = function() {
  $.getJSON("/d1/projects.json", function(data) {
    var type_pairs = data.projects;
    var projects = [];
    var content = _.map(type_pairs, function(p) {
      var title = p[0];
      var name = p[1];
      var url = p[2];
      var client = p[3];
      var desc = p[4];
      var project = {name: name,title: title, url: url, description: desc, client: client};
      projects.push(project); 
    }).join("");
    render_modules(projects);
  });
}








    
