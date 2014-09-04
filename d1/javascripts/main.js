var modules = [];
var GITHUB_API = "https://api.github.com/";
var ORGANIZATION = "18f";

var issues = "";

modules[0] = function(repo_name) {
  $.getJSON(GITHUB_API+"repos/"+ORGANIZATION+"/"+repo_name+"/issues", function(data) {
      issues = data;
      var num_issues = issues.length
      $("#"+repo_name+"_issues").text(""+num_issues);
      
    });
}


$(document).ready(function() {
//  $('#tab-container').easytabs();
  render_all();
});

var li = function(content) {
  return "<li>" + content + "</li>";
};

var get_value_from_types = function(key, callback) {
  var value = "";
  
  $.ajax({
    url: "data/types.json",
    async: false,
    success: function(res) {
      value = res[key];
    }
  });
  
  return value;
};

var render_all = function() {
  render_dashboard();
};

var strong = function(content) {
  return "<strong>" + content + "</strong>";
};

var link = function(href, content) {
  return "<a href=" + href + ">" + content + "</a>"
};

var span = function(id, content) {
  return "<span id=" + id + ">" + content + "</span>";
}

var render_modules = function(projects) {
  _.map(projects,function(project) {
      modules[0](project.name);
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
      var project = {name: name,title: title, url: url};
      projects.push(project);
       return li(strong(title)+": " + name + " (source: " + link("#", url) + ")" + 
		 " issues: " + span(name+"_issues",""));
    }).join("");
    $("#dashboard").html(content);
    render_modules(projects);
  });
}








    
