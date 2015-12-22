#! /usr/bin/env ruby
#
# 18F Hub - Docs & connections between team members, projects, and skill sets
#
# Written in 2015 by Mike Bland (michael.bland@gsa.gov)
# on behalf of the 18F team, part of the US General Services Administration:
# https://18f.gsa.gov/
#
# To the extent possible under law, the author(s) have dedicated all copyright
# and related and neighboring rights to this software to the public domain
# worldwide. This software is distributed without any warranty.
#
# You should have received a copy of the CC0 Public Domain Dedication along
# with this software. If not, see
# <https://creativecommons.org/publicdomain/zero/1.0/>.
#
# @author Mike Bland (michael.bland@gsa.gov)
#
# ----
#
# ./go script: unified development environment interface
#
# Inspired by:
# http://www.thoughtworks.com/insights/blog/praise-go-script-part-i
# http://www.thoughtworks.com/insights/blog/praise-go-script-part-ii
#
# Author: Mike Bland (michael.bland@gsa.gov)
# Date:   2015-01-10
def exec_cmd(cmd)
  exit $?.exitstatus unless system(cmd)
end

def init
  begin
    require 'bundler'
  rescue LoadError
    puts "Installing Bundler gem..."
    exec_cmd 'gem install bundler'
    puts "Bundler installed; installing gems"
  end
  exec_cmd 'bundle_install'
end

def install_gems
  exec_cmd 'bundle install'
  exec_cmd 'git add Gemfile.lock'
end

def install_node_modules
  exec_cmd 'npm install'
end

def update_data
  exec_cmd 'bundle exec ruby _data/import-public.rb'
end

def serve
  puts 'Updating from the team API'
  update_data
  exec_cmd 'npm run watchify &'
  exec_cmd 'bundle exec jekyll serve --trace'
end

def build
  update_data
  puts 'Building the site...'
  exec_cmd('npm run browserify')
  exec_cmd('bundle exec jekyll b --trace')
  puts 'Site built successfully.'
end

def ci_build
  puts 'Building the site...'
  exec_cmd('npm run browserify')
  exec_cmd('bundle exec jekyll b --trace')
  exec_cmd('bundle exec jekyll serve --detach')
  puts 'Testing the build'
  ci_test 
  puts 'Killing Jekyll'
  exec_cmd('pkill -f jekyll')
  puts 'Done!'
end

def deploy
  puts 'Updating data from Team-API'
  update_data
  puts 'Pulling the latest changes...'
  exec_cmd('git pull')
  puts 'Building the site...'
  exec_cmd('npm install && npm run browserify')
  exec_cmd('/opt/install/rbenv/shims/bundle exec jekyll b --trace')
  puts 'Site built successfully.'
  require 'time'
  puts Time.now()
end

def test_build
  exec_cmd 'rspec'
end

def ci_test
  exec_cmd 'bundle exec rspec --tag "~type:missing"'
end

COMMANDS = {
  :init => 'Set up the Hub dev environment',
  :install_gems => 'Execute Bundler to update gem set',
  :install_node_modules => 'Install Node dependencies',
  :update_data => 'Updates data files from data-private',
  :serve => 'Serves the site at localhost:4000',
  :build => 'Builds the site',
  :ci_build => 'Builds the site for a CI system',
  :deploy => 'Pulls the latest changes and rebuilds the site',
  :test_build => 'Tests the build generated the correct number of project pages.'
  }

def usage(exitstatus: 0)
  puts <<EOF
Usage: #{$0} [options] [command]

options:
  -h,--help  Show this help

commands:
EOF

  padding = COMMANDS.keys.max_by {|i| i.size}.size + 2
  COMMANDS.each do |name, desc|
    puts "  %-#{padding}s#{desc}" % name
  end
  exit exitstatus
end

usage(exitstatus: 1) unless ARGV.size == 1
command = ARGV.shift
usage if ['-h', '--help'].include? command

command = command.to_sym
unless COMMANDS.member? command
  puts "Unknown option or command: #{command}"
  usage(exitstatus: 1)
end
send command
