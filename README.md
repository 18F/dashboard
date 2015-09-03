Dashboard
=========

A site to track our projects' status and much, much more...

Goal: Provide transparency and insight into 18F work and values.

Audience: 18F team, GSA, other government agencies, transparency community,
journalists, prospective 18Fers

## Editing the Dashboard

To edit project details on `18f.gsa.gov/dashboard`, update the `.about.yml` file
in the project's repo. If a project has multiple repos, create an
`.about.yml` in each one of them, and note the project's main repo in the
`parent:` field.

The info below under "Installing" is *not* required to update a repo's
`.about.yml` file.

Updates may take a few days to post to the public site, so reach out to the
`#outreach` team on Slack if there's any urgency.

## Data Fields for Project Details

Your `.about.yml` file must start with `---` on the first line. 

Lines that start with `#` are commented out (i.e. not part of the necessary code).
They are there to explain the content field below them and the specific
way the field's content must appear (when applicable). Some fields require content
to be described in lists with `-` marks, and those fields have a `-` mark after
the field's name.

Please note that some fields are required.

```
---
# Short name that acts as the project identifier (required)
name:

# Full proper name of the project (required)
full_name:

# The type of content in the repo
# values: app, docs, policy
type:

# Describes whether a project team, working group/guild, etc. owns the repo (required)
# values: guild, working-group, project
owner_type:

# Name of the main project repo if this is a sub-repo; name of the working group/guild repo if this is a working group/guild subproject
parent:

# Maturity stage of the project (required)
# values: discovery, alpha, beta, live
stage:

# Whether or not the project is actively maintained (required)
# values: active, deprecated
status:

# Description of the project
description:

# Should be 'true' if the project has a continuous build (required)
# values: true, false
testable:

# Team members contributing to the project (required)
# Items:
# - github: GitHub user name
#   id: Internal team identifier/user name
#   role: Team member's role; leads should be designated as 'lead'
team:
- 

# Partners for whom the project is developed
partners:
- 

# Brief descriptions of significant project developments
milestones:
- 

# Technologies used to build the project
stack:
- 

# Brief description of the project's outcomes
impact:

# Services used to supply project status information
# Items:
# - name: Name of the service
#   category: Type of the service
#   url: URL for detailed information
#   badge: URL for the status badge
services:
- 

# Licenses that apply to the project and/or its components (required)
# Items by property name pattern:
#   .*:
#     name: Name of the license from the Software Package Data Exchange (SPDX): https://spdx.org/licenses/
#     url: URL for the text of the license
licenses:
  placeholder_label:

# Blogs or websites associated with project development
blog:
- 

# Links to project artifacts
# Items:
# - url: URL for the link
#   text: Anchor text for the link
links:
- 

# Email addresses of points-of-contact
contact:
- 
```

## Installing

First clone this repo. Then, install the project and all its dependencies by
running `./go init` in your terminal. After that, run `./go serve` and visit
http://localhost:4000 in your web browser.

By default you get all of our projects, and you can refresh their information
by running the `_data/import-public.rb` script. Which is pretty cool, we
think.

If you're looking to make your own dashboard using this as an example, you can.
Update the `_data/projects.json` file by adding a new object (labeled with a
slugified version of your project name) with and filling in all the fields for
your project. Then create an html file in `pages/projects` and give it a name
matching the slugified object name in the JSON file.

### Structure of a project

Each project is represented in JSON as a set of fields. Some are required,
some optional, and some require a specific kind of formatting. Here is an
example of a project in our dashboard.

```json
{
  "myra": {
    "project": "myRA",
    "github": [
      "18F/myra"
    ],
    "partner": [
      "U.S. Department of Treasury"
    ],
    "impact": "Millions of Americans do not have access to an employer-sponsored retirement plan, which includes more than 50% of full-time and 75% of part-time workers.",
    "stage": "live",
    "milestones": [
      "August 2014: Project discovery stage started",
      "September 2014: Project moved from discovery to alpha"
    ],
    "contact": [
      "christopher.cairns@gsa.gov"
    ],
    "stack": "JavaScript, Jekyll",
    "licenses": {
      "myra": "Public Domain (CC0)"
    },
    "links": "https://myra.treasury.gov",
    "team": [
      "chrisc",
      "manger"
    ]
  },
}
```

#### Fields

- `project` The non-slugified name of the project
- `name` The project's handle (slugified version of project)
- `github` The organization and repo name for the project's code (e.g., 18F/myra)
- `description` A brief description of the work involved in this project
- `partner` A dashed list of the partners (or clients) this project serves
- `impact` A brief description of the project's outcomes
- `stage` Alpha? Beta? Discovery? See https://18f.gsa.gov/dashboard/stages for more definitions of these stages
- `milestones` Free format dashed list of important accomplishments during the project
- `contact` An email address or GitHub-relative URI for the project (e.g., 18F/myra/issues)
- `stack` What tech are you using here?
- `team` Who is on the project? Requires an api endpoint configured on your main site
- `licenses` A list of key-value pairs where the key is the github repo and the value is the license (e.g., myra: Public Domain (CC0))
- `links` A relevant links you want to include (despite the name we currently only support one here)
- `status` For now, set this to hidden to hide the project from the dashboard (you might want to do this if you have incomplete data, for example)

Except for `project` and `github` none of these will cause your dashboard to
fail if they're missing but the project's page will look a bit thin.

### JavaScript

There are three variables at the beginning of the `assets/js/main.js` file
that you'll want to set in order to grab data about your projects.

```javascript
var GITHUB_API = "https://api.github.com/";
var GOVCODE_API = "https://api.govcode.org/"
var ORGANIZATION = "18f";
```

You can probably leave most of these as they are, but the ORGANIZATION
variable you'll want to set to whatever org your repos are under. Right now
we only support pulling data from one organization's repos.

The JavaScript also assumes there's a json file accessible somewhere on your
server that is an index of your team. You'll want to set the TEAM variable
to wherever that might be.

```javascript
var TEAM = urlRoot+"/api/data/team.json"
```

With the code above we are assuming that json file is on the same server as
the Dashboard, but you should modify that section of code if that's not the
case for your server.


### HTML

Once you have the JSON in place, create an html file in the `pages/project`
directory that shares its name with the `name` field. For example,
`pages/project/myra.html`.

Then you need to include a small bit of YAML frontmatter for that project.

```yaml
---
layout: project
title: "api.data.gov"
permalink: /project/api-data-gov/
---
```

In the above YAML the title field should match the `project` field in
`projects.yml` and the permalink can be anything you like.

### Caveats

For now this dashboard will attempt to find project data from your
organization on GovCode. If you're not on GovCode, you'll have to try and
get that data from another source. A future version will likely handle these
data in a more robust way.

This site will also generate a publicly accessible `json` file at
`api/data/projects.json` if it is run on a non-GitHub pages server. Because
GitHub Pages runs Jekyll in safe mode, it will not generate on GitHub pages.
If you want to make that data accessible on GitHub pages, you could consider
following [the directions on this IRC
transcript.](https://botbot.me/freenode/jekyll/2014-10-17/?msg=23655667&page=1 ).

## Feedback

Give us your feedback! We'd love to hear it. [Open an issue and tell us what you think.](https://github.com/18f/dashboard/issues/new)


### Public domain

This project is in the worldwide [public domain](LICENSE.md). As stated in [CONTRIBUTING](CONTRIBUTING.md):

> This project is in the public domain within the United States, and copyright and related rights in the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
>
> All contributions to this project will be released under the CC0 dedication. By submitting a pull request, you are agreeing to comply with this waiver of copyright interest.
