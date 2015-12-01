var url = cleanUrl(window.location.search);
var xhr = new XMLHttpRequest();
xhr.addEventListener("load", insertAboutYml);

xhr.open('GET', url);
xhr.send();

function cleanUrl (url) {
  return url.replace('?url=', '')
    .replace('https://github.com','https://raw.githubusercontent.com')
    .replace('blob/', '');
}

function insertAboutYml (e) {
  var res = e.target;
  if (res.status !== 200) return;

  var yml = jsyaml.safeLoad(res.responseText);

  var fullName = $('#project-full-name');
  fullName.text(yml['full_name']);

  var stageSpan = $('<span id="project-status" class="status">unknown</span');
  if (yml['stage']) {
    stageSpan.addClass(yml['stage']);
    stageSpan.text(yml['stage']);
  }
  fullName.append(stageSpan);

  $('#project-description').text(yml['description']);

  var contact = $('#project-contact');
  yml['contact'].map(function(c) {
    var cEl = makeContactElement(c);
    contact.append($(cEl));
  });

  if (yml['impact']) {
    $('#project-impact').show();
    $('#project-impact p').text(yml['impact']);
  }

  if (yml['partners']) {
    var projectPartners = $('#project-partners');
    projectPartners.show();
    if (yml['partners'].length > 1) {
      $('#project-partners h1').append('partners');
    } else {
      $('#project-partners h1').append('partner');
    }
  }

  if (yml['milestones']) {
    var projectMilestonesList = $('#project-milestones ul');
    $('#project-milestones').show();

    yml['milestones'].map(function(m) {
      var html = _.template('<li><%- m %></li>')({ m: m});
      projectMilestonesList.append(html);
    });

  }

  if (yml['errors']) {
    var projectErrorsList = $('#project-errors ul');
    $('#project-errors').show();

    yml['errors'].map(function(e) {
      var html = _.template('<li><%- e %></li>')({ e: e });
      projectMilestonesList.append(html);
    });
  }

  console.log('end', yml);
}

function makeContactElement(c) {
  var template;

  if (c.url && c.text) {
    template = _.template('<a href="<%- c.url %>"><%- c.text %></a>');
    return template({ c: c });
  }
  else if (c.match('@')) {
    template = _.template('<a href="mailto:<%- mail %>"><%- mail %></a>');
    return template({ mail: c.replace('mailto:', '') });
  }
  else {
    template = _.template('<a href="https://www.github.com/<%- url %>"><%- url %></a>');
    return template({ url: c.replace(/https:\w*\.*github.com/, '') })
  }
}
