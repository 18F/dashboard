# Imports project data from the 18F Public Hub API.
#
# Author: Mike Bland (michael.bland@gsa.gov)
# Date:   2014-12-22
require 'json'
require 'open-uri'
require 'safe_yaml'
require 'fileutils'

def load_from_team_api(project)
  open(project) { |api_data|
    unless api_data.status[0] == "404"
      JSON.load(api_data.read)
    end
  }
end

def update_from_api(local, api_data)
  unless local == api_data
    local.merge(api_data)
  else
    local
  end
end

# merges the "all projects" hash with the hash sourced from a YAML file and
# returns writes the new hash back to the file.
def merge_local_with_api(filename)
  project = YAML.safe_load_file(filename)
  api_data = JSON.parse(open("_data/projects/all.json").read)
  unless project.nil?
    new_data = update_from_api(project, api_data[project['name']])
  end
end

def filter_dashboard_fields(project)
  filter = YAML.safe_load_file('_data/project_filter.yml')['fields']
  project.keep_if { |key, value|
    filter.include? key
  }
end

if File.exists?('_config.yml')
  config = YAML.safe_load_file('_config.yml')
  filter = YAML.safe_load_file('_data/project_filter.yml')['projects']
  PROJECT_DATA_URL = "#{config['team_api']['baseurl']}projects/"

  # Get a dump of all the projects in the Team API
  open(PROJECT_DATA_URL) do |projects|
    open(File.join('_data', 'projects', 'all.json'), 'w') do |f|
      f.write JSON.pretty_generate(
        JSON.parse(projects.read)['results'].map { |p| [p['name'], p] }.to_h)
    end
  end

  # Create a YML file for all the projects listed in the project_filter
  # if the file doesn't exist already, it is sourced 100% from the team_api,
  # if it does exist, merge it with the team api's data.
  filter.each do |d|
    filename = File.join('_data', 'projects', "#{d}.yml")
    if File.exists?(filename)
      project = merge_local_with_api(filename)
    else
      projects = JSON.parse(open("_data/projects/all.json").read)
      project = projects[d]
    end
    # Filter the project data against the fields we use on the Dashboard
    unless project.nil?
      clean_data = filter_dashboard_fields(project)
      File.open(filename, 'w') { |f| f.write YAML.dump(clean_data) }
    end
  end

  # If any of the files still contain errors, let us know about them.
  files = Dir.glob('_data/projects/*.yml')
  files.each do |file|
    yaml = YAML.safe_load_file(file)
    if yaml['errors']
      puts "There are errors in the #{yaml['name']} file."
    end
  end
end
