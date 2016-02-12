Dashboard
=========

The 18F dashboard provides data and information about our projects, including their current status.

Our goal is to provide transparency and insight into 18F work for anyone who is curious about what we do. We see the audience as including, but not limited to, members of the 18F team, GSA and other government agencies, journalists, and people who are interested in working both for and with 18F.


## Dashboard Content

The Dashboard, first created in 2014, shows data that was prioritized based on user research and interviews. We balanced what the audiences listed above would need with level of effort required to obtain or incorporate that data.

Is there data that you'd like to see about our projects that's not listed in [the Dashboard](https://18f.gsa.gov/dashboard/)? Create an [issue](https://github.com/18F/dashboard/issues/new)! The Dashboard is a living project and we incorporate feedback as we receive it.

## Installing

1. Clone the dashboard repo. 
1. Install all its dependencies by running `./go init` in your terminal. 
1. Run `./go update` and `./go serve` to serve the site locally in your browser.
1. Visit http://localhost:4000/dashboard/ in your web browser to see the local site.

By default you get all of our projects. You can refresh their information by running the `_data/import-public.rb` script.

### Deploying on Linux and Docker
1. Clone the dashboard repo
1. Build the docker image by running `docker build -t yourname/dashboard .`
1. Run the docker container `docker run -p 4000:4000 -t yourname/dashboard bash --login -c "cd /home/dashboard/dashboard && ./go serve"`
1. Visit http://localhost:4000/dashboard/ in your web browser to see the local site

## Editing the 18F Dashboard

The [18F dashboard](https://18f.gsa.gov/dashboard) content is curated by the 18F Outreach team.  Our editorial staff is available to review text to help explain and promote your project.  We strive for a fast and light-weight review process to ensure that the dashboard makes sense and looks good to its thousands of monthly visitors.

18F Product Leads are responsible for maintaining and updating their Dashboard page. The Dashboard page should be created at the start of your project and reviewed monthly with regular updates of milestones achieved, news and other information.

Putting your information on the dashboard is a three step process. First, you'll create the content for your entry. Next, you'll preview this material. And finally, the material will be added to the dashboard. The process is detailed below.

## Creating content for your dashboard entry

1. *Provide your project's basic information.*

   A. If a project has a GitHub repository, create or edit an `.about.yml` file in the main repo.  For more information about this format, check out the [team-api README](https://github.com/18F/team-api.18f.gov/blob/master/README.md), which explains how to create a YAML file so that your project appears in the dashboard.

2. *Preview your dashboard page.*  You will be able to see what your page will look like before starting the review process.  The dashboard preview feature allows the display of a page based on external data hosted on GitHub.

Right now, the easiest way to preview is to first submit a pull request to your own project or data-private with new about.yml content for your own team members to review.  You can also drop your project's about.yml details into the #writing-lab Slack channel or ask those folks to review your PR as well. 

You will also able to preview your project in the dashboard using the example URL below. Just replace the GitHub link after the '?url=' part of the URL with a link to your about.yml file. Then paste the entire URL into your browser. (Make sure you delete the extra apostrophe at the end.) If you have any questions about this, please drop by the #dashboard channel in Slack. `https://18f.gsa.gov/dashboard/project/preview?url=YOUR_ABOUT_YML`. 

### Example preview link

The [Open Opps about.yml](https://github.com/18F/openopps-platform/blob/dev/.about.yml) can be previewed at: [https://18f.gsa.gov/dashboard/project/preview?url=https://github.com/18F/openopps-platform/blob/dev/.about.yml](https://18f.gsa.gov/dashboard/project/preview?url=https://github.com/18F/openopps-platform/blob/dev/.about.yml)

## Add your project to the dashboard

3. When the content looks good to you and your team, it is time to propose to 18F Comms that your project be showcased on the dashboard.  You can do this by:

  A. Editing the [project_filter.yml](https://github.com/18F/dashboard/blob/staging/_data/project_filter.yml) to add your project to the list. Then submit as a pull request to have your changes integrated.  

  B. Filing an [issue](https://github.com/18F/dashboard/issues/new) with a link to your about.yml github URL, and we'll queue it up for the next sprint.  

New content is reviewed at least once a week and the website is updated subsequently. Keep an eye on your pull-requests, editorial folk will make comments there with suggested improvements.  

### Contact information and help

If you are eager for a quick response on any of these steps or have questions, please don't hesitate to shout out on the #dashboard channel.

The info below under "Installing" is *not* required to update a repo's
`.about.yml` file.

## Copying the dashboard for other use cases

**If you're looking to make your own dashboard using this dashboard as an example, you can:**

1. Copy the `_data/projects.json.example` file to `_data/projects.json`
2. Update it by adding a new object (labeled with a slugified version of your project name) and filling in all the fields for your project. 
3. In the `_config.yml` file, change the `team_api:` property to `_team_api:` to disable fetching from the Team API server.

## Data for the Dashboard

**If you're trying to stand up your own version of Dashboard,** you'll want to include a file in the `_data` directory called `projects.json` or `projects.yml`. There is an example `projects.json` file in the `_data` directory you can adapt to your needs, be sure to read the [Installing](#installing) section first, though. **If you're an 18F team member updating your project** keep reading.

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
