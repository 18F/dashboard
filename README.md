Dashboard
=========

A site to track our projects' status and much, much more...

Goal: Provide transparency and insight into 18F work and values.

Audience: 18F team, GSA, other government agencies, transparency community,
journalists, prospective 18Fers

## Dashboard Content

The data points for this project are listed as GitHub
[issues](http://github.com/18f/dashboard/issues). Milestone
[1](https://github.com/18F/dashboard/milestones/Sprint%201%20-%20MVP) issues
are the most basic info that we intend to display in the initial list view
of the dashboard. When users click on a project in that list, they will see
the the data points listed under Milestones
[2](https://github.com/18F/dashboard/milestones/2nd%20Sprint) and
[3](https://github.com/18F/dashboard/milestones/3rd%20Sprint) on individual
project pages. The [Backlog
Milestone](https://github.com/18F/dashboard/milestones/Backlog) includes
data points that need further research or are currently not a priority.

Data was prioritized based on our initial interviews, research, and guesses
about how many of the audiences listed above would be interested in a data
point, and then balanced against level of effort required to obtain or
incorporate a data point.

Is there data that you'd like to see about our projects that's not listed
here? Create an issue! We value feedback.

## Installing

First clone this repo. Then, install all its dependencies by running `./go init` in your terminal. After that, run `./go update` and `./go serve` and visit http://localhost:4000/dashboard/ in your web browser.

By default you get all of our projects, and you can refresh their information by running the `_data/import-public.rb` script. Which is pretty cool, we think.

**If you're looking to make your own dashboard using this as an example, you can.**

Copy the `_data/projects.json.example` file to `_data/projects.json` and update
it by adding a new object (labeled with a
slugified version of your project name) and filling in all the fields for
your project. Then, in the `_config.yml` file, change the `team_api:` property
to `_team_api:` to disable fetching from the Team API server.

## Editing the Dashboard

To edit project details on `18f.gsa.gov/dashboard`, update the `.about.yml` file
in the project's repo. If a project has multiple repos, create an
`.about.yml` in each one of them, and note the project's main repo in the
`parent:` field (in this case, this is the only required field).

The info below under "Installing" is *not* required to update a repo's
`.about.yml` file.

Updates _should be automatic_. Shortly after your repo's `.about.yml` file is updated the changes should show up on the live site. Reach out to the `#outreach` team on Slack if this doesn't happen.

## Data for the Dashboard

**If you're trying to stand up your own version of Dashboard,** you'll want to include a file in the `_data` directory called `projects.json` or `projects.yml`. There is an example `projects.json` file in the `_data` directory you could adapt to your needs, be sure to read the [Installing](#installing) section first, though. **If you're an 18F team member updating your project** keep reading.

For each piece of content about your project on the 18F Dashboard, there is a different data field (such as `name` or `description`) followed by a `:` to fill in the `.about.yml` file.

Your `.about.yml` file must start with `---` on the first line. [The Dashboard's](.about.yml) for a working example. Lines that start with `#` are there to explain the data field on the next line and specific way the data field's content must appear (when applicable). (They are "commented out," i.e., not part of the actual code, so you can copy and paste the whole thing into the `.about.yml` file in your repo.) Some fields require data to be described in lists with `-` marks, and those fields have a `-` mark after the field's name.

Please note that some fields are required.

### JavaScript

There are three variables at the beginning of the `assets/js/main.js` file that you'll want to set in order to grab data about your projects.

```javascript
var GITHUB_API = "https://api.github.com/";
var GOVCODE_API = "https://api.govcode.org/"
var ORGANIZATION = "18f";
```

You can probably leave most of these as they are, but the ORGANIZATION variable you'll want to set to whatever org your repos are under. Right now we only support pulling data from one organization's repos.

The JavaScript also assumes there's a json file accessible somewhere on your server that is an index of your team. You'll want to set the TEAM variable to wherever that might be.

```javascript
var TEAM = urlRoot+"/api/data/team.json"
```

With the code above we are assuming that json file is on the same server as
the Dashboard, but you should modify that section of code if that's not the
case for your server.

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
