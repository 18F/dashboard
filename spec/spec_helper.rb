require 'rspec'
require 'capybara/rspec'
require 'capybara/poltergeist'
require 'safe_yaml'

# This will ensure we are connecting to a remote server
Capybara.run_server = false
Capybara.default_driver = :poltergeist
Capybara.register_driver :poltergeist do |app|
  Capybara::Poltergeist::Driver.new(app, :browser => :poltergeist, :js_errors => false)
end

Capybara.javascript_driver = :poltergeist
SafeYAML::OPTIONS[:default_mode] = :safe
