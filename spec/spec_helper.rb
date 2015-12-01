require 'rspec'
require 'capybara/rspec'
require 'selenium-webdriver'
require 'safe_yaml'

# This will ensure we are connecting to a remote server
Capybara.run_server = false
Capybara.default_driver = :selenium
Capybara.register_driver :chrome do |app|
  Capybara::Selenium::Driver.new(app, :browser => :chrome)
end

Capybara.javascript_driver = :chrome
SafeYAML::OPTIONS[:default_mode] = :safe
