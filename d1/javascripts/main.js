var modules = [];
var GITHUB_API = "https://api.github.com/";
var ORGANIZATION = "18f";
var GITHUB_AUTH = $.getJSON("auth.json");
var issues = "";

modules[0] = function(repo_name) {
  header = set_headers();
  var data = $.ajax({type: "GET", url: GITHUB_API+"repos/"+ORGANIZATION+"/"+repo_name+"/issues", dataType: "json", async: false, headers: header});
  if ( data.status === 200 ) {
    var num_issues = data.responseJSON.length;
    $("#"+repo_name+"_issues").append(num_issues);
  } else if ( data.status == 404 ) {
    $("#"+repo_name+"_issues").append("Not available.");
  } else {
    $("#"+repo_name+"_issues").append("Unauthorized.");
  }
}

modules[1] = function(repo_name) {
  header = set_headers();
  var data = $.ajax({ type: "GET", url: GITHUB_API+"repos/"+ORGANIZATION+"/"+repo_name+"/contents/status.txt", dataType: "json", async: false, headers: header}).responseJSON;
  if ( data.status === 200 ) {
    $("#"+repo_name+"_status").text(atob(data.content));
  } else {
    $("#"+repo_name+"_status").text("A status.txt file was not found for this project.");
  }
}

modules[2] = function(repo_name) {
  header = set_headers();
  var data = $.ajax({type: "GET", url: GITHUB_API+"repos/"+ORGANIZATION+"/"+repo_name+"/stargazers", dataType: "json", async: false, headers: header});
  if ( data.status === 200 ) {
    var stargazers = data.responseJSON.length;
    $("#"+repo_name+"_stars").append(stargazers);
  } else {
    console.log(data.responseJSON);
   $("#"+repo_name+"_stars").append("Not available"); 
  }
}

$(document).ready(function() {
//  $('#tab-container').easytabs();
  render_dashboard();
});

var set_headers = function() {
  if (typeof GITHUB_AUTH != 'undefined') {
    var header = {"Authorization": "BASIC "+btoa(GITHUB_AUTH.responseJSON.user +":"+GITHUB_AUTH.responseJSON.key)};
  } else {
    header = null;
  }
  return header;
}
var render_modules = function(projects) {
  
  _.map(projects,function(project) {
      modules[0](project.name);
  });
  
  _.map(projects,function(project) {
      modules[1](project.name);
  });
  
  _.map(projects,function(project) {
      modules[2](project.name);
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








    
