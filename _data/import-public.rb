#! /usr/bin/env ruby
#
# Imports data from _data/private into _data/public.
#
# Expects to be run directly within the _data directory with the _data/private
# submodule present. All 'private:' data is stripped from the _data/private
# files before it is dumped into _data/public.
#
# Author: Mike Bland (michael.bland@gsa.gov)
# Date:   2014-12-22

require 'open-uri'

DATA_DIR = File.dirname __FILE__
PROJECT_DATA_URL = 'https://18f.gsa.gov/hub/api/projects/'

open(PROJECT_DATA_URL) do |projects|
  open(File.join(DATA_DIR, 'projects.json'), 'w') {|f| f.write(projects.read)}
end
