require 'json'
data = JSON.load(open('_data/projects.json').read())
expect_size = data.size
projectdir = Dir.new('_site/dashboard/project')
actual_size = projectdir.count-2
if expect_size == actual_size
  puts "Dashboard pages generated correctly. There are #{actual_size} projects."
  exit 0
else
  puts "Expected #{expect_size} projects generated but #{actual_size} were generated."
  exit 1
end
