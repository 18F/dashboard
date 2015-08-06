#! /usr/bin/env ruby
#
# Imports project data from the 18F Public Hub API.
#
# Author: Mike Bland (michael.bland@gsa.gov)
# Date:   2014-12-22

require 'json'
require 'open-uri'

DATA_DIR = File.dirname __FILE__
PROJECT_DATA_URL = 'https://team-api.18f.gov/public/api/projects/'

def pretty_format_json(input)
  json = JSON.parse(input)
  JSON.pretty_generate(json)
end

open(PROJECT_DATA_URL) do |projects|
  open(File.join(DATA_DIR, 'projects.json'), 'w') do |f|
    input = projects.read
    output = pretty_format_json(input)
    f.write(output)
  end
end
