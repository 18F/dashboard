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
  // render_chris();
  // render_etams();
  // render_par();
  // render_pegasys();
  render_dashboard();
};

// var render = function(path, element) {
//   $.getJSON(path, function(data) {
//     var types = data.types;
//     var content = _.map(types, function(my_type) {
//       var my_value = get_value_from_types(my_type);
//       return li(my_type+": " + my_value);
//     }).join("");
//     $(element).html(content);
//   });
// };

// var render_chris = function() {
//   render("data/chris.json", "#chris");
// };

// var render_etams = function() {
//   render("data/etams.json", "#etams");
// };

// var render_par = function() {
//   render("data/par.json", "#par");
// };

// var render_pegasys = function() {
//   render("data/pegasys.json", "#pegasys");
// };

var strong = function(content) {
  return "<strong>" + content + "</strong>";
};

var link = function(href, content) {
  return "<a href=" + href + ">" + content + "</a>"
};

var render_dashboard = function() {
  $.getJSON("projects.json").done(function( json ) {
    console.log( "JSON Data: " + json );
  })
  .fail(function( jqxhr, textStatus, error ) {
    var err = textStatus + ", " + error;
    console.log( "Request Failed: " + err );
    
  });
  
  $.getJSON("projects.json", function(data) {
    var type_pairs = data.projects;
    var content = _.map(type_pairs, function(my_type_pair) {
      var my_type = my_type_pair[0];
      var my_source = my_type_pair[1];
      var my_value = get_value_from_types(my_type);
      return li(strong(my_type)+": " + my_value + " (source: " + link("#", my_source) + ")");
    }).join("");
    $("#dashboard").html(content);
  });
};







    
