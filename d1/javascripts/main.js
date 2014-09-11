var modules = [];
var GITHUB_API = "https://api.github.com/";
var ORGANIZATION = "18f";
var GITHUB_AUTH = $.getJSON("auth.json");
var issues = "";

modules[0] = function(repo_name) {
  header = set_headers();
  var data = fetch_api_part(repo_name, 'issues');
  if ( data.status === 200 ) {
    var num_issues = data.responseJSON.length;
    $("#"+repo_name+"_issues").append(num_issues);
  } else if ( data.status === 404 ) {
    $("#"+repo_name+"_issues").append("Not available.");
  } else {
    $("#"+repo_name+"_issues").append("Unauthorized.");
  }
}

modules[1] = function(repo_name) {
  header = set_headers();
  var data = fetch_api_part(repo_name, 'contents');
  var match = _.matches({'name':'status.txt'});
  var check = _.filter(data.responseJSON, match);
  if ( ! $.isEmptyObject(check) ) {
    $("#"+repo_name+"_status").text(data.content);    
  } else {
    console.log("Empty");
    $("#"+repo_name+"_status").text("A status.txt file was not found for this project.");
  }
  // var data = $.ajax({ type: "GET", url: GITHUB_API+"repos/"+ORGANIZATION+"/"+repo_name+"/contents/status.txt", dataType: "json", async: false, headers: header}).responseJSON;
  if ( data.status === 200 ) {
    $("#"+repo_name+"_status").text(data.content);
  } else {
    $("#"+repo_name+"_status").text("A status.txt file was not found for this project.");
  }
}

modules[2] = function(repo_name) {
  header = set_headers();
  var data = fetch_api_part(repo_name, 'stargazers');
  if ( data.status === 200 ) {
    var stargazers = data.responseJSON.length;
    $("#"+repo_name+"_stars").append(stargazers);
  } else {
    console.log(data.responseJSON);
   $("#"+repo_name+"_stars").append("Not available"); 
  }
}

modules[3] = function(repo_name) {
  var data = fetch_api_part(repo_name, '');
  if ( data.status === 200 ) {
    var description = data.responseJSON.description;
    var element = $("#"+repo_name+"_desc");
    if ( element.html() === "Description: " ) {
      element.append(description);
    }
  } else if ( data.status == 403 || data.status == 401 || data.status == 404 ) {
    element.append("Not allowed");
  } else {
    console.log( data.status );
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

var fetch_api_part = function(repo_name, endpoint) {
  
  header = set_headers();
  if ( endpoint != '' ) {
    var endpoint = "/"+endpoint;
  }
  var data = $.ajax({type: "GET", url: GITHUB_API+"repos/"+ORGANIZATION+"/"+repo_name+endpoint, dataType: "json", async: false, headers: header});
  return data
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

  _.map(projects, function(project) {
    modules[3](project.name);
  })
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








    
