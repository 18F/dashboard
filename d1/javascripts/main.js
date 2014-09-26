var modules = [];
var GITHUB_API = "https://api.github.com/";
var ORGANIZATION = "18f";

var issues = "";

modules[0] = function(repo_name) {
  $.getJSON(GITHUB_API+"repos/"+ORGANIZATION+"/"+repo_name+"/issues", function(data) {
      issues = data;
      var num_issues = issues.length
      $("#"+repo_name+"_issues").append(""+num_issues);
      
    }).error(function () {
      $("#"+repo_name+"_issues").append("Not available.");
});
}

modules[1] = function(repo_name) {
  $.getJSON(GITHUB_API+"repos/"+ORGANIZATION+"/"+repo_name+"/contents/status.txt", 
// { ref: "master" },
 function(data) {
      status = data.content;
      if (typeof data.content != 'undefined' ) {
	  $("#"+repo_name+"_status").text(atob(data.content));
      } else {
	  $("#"+repo_name+"_status").text("Status.txt file not found in master for repo: "+repo_name);
      }
    }).error(function () {
	   $("#"+repo_name+"_status").text("Status.txt file not found in master for repo: "+repo_name);
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
  $.getJSON("projects.json", function(data) {
    var type_pairs = data.projects;
    var projects = [];
    var content = _.map(type_pairs, function(p) {
      var title = p[0];
      var name = p[1];
      var url = p[2];
      var desc = p[3];
      var client = p[4];
      var project = {name: name,title: title, url: url, description: desc, client: client};
      projects.push(project); 
    }).join("");
    render_modules(projects);
  });
}








    
