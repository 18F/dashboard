#! /usr/bin/env ruby
require 'safe_yaml'

data = Dir.glob('_data/projects/*.yml')
redirects = Dir.glob('pages/project/*.md')
expect_size = data.size + redirects.size
actual_size = Dir.glob('_site/dashboard/project/*').size
if expect_size == actual_size
  puts "Dashboard pages generated correctly. There are #{actual_size} projects."
  exit 0
else
  puts "Expected #{expect_size} projects generated but #{actual_size} were generated."
  exit 1
end
