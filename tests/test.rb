#! /usr/bin/env ruby
require 'safe_yaml'

data = SafeYAML.load_file '_data/project_filter.yml', safe: true
redirects = Dir.glob('pages/project/*')
# we expect one page generated for each project in the project filter, plus any redirects, plus 1 for the preview page.
expect_size = data.size + redirects.size + 1
actual_size = Dir.glob('_site/dashboard/project/*').size
if expect_size == actual_size
  puts "Dashboard pages generated correctly. There are #{actual_size} projects."
  exit 0
else
  puts "Expected #{expect_size} projects generated but #{actual_size} were generated."
  exit 1
end
