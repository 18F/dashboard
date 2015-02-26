#! /usr/bin/env ruby
#
# Imports project data from the 18F Public Hub API.
#
# Author: Mike Bland (michael.bland@gsa.gov)
# Date:   2014-12-22

require 'open-uri'

DATA_DIR = File.dirname __FILE__
PROJECT_DATA_URL = 'https://18f.gsa.gov/hub/api/projects/'

open(PROJECT_DATA_URL) do |projects|
  open(File.join(DATA_DIR, 'projects.json'), 'w') {|f| f.write(projects.read)}
end
