projects = YAML.load_file('_data/project_filter.yml')
RSpec.describe "project page", :type => :feature do
  projects.each_with_index do |project, index|
    it "#{project} should not have errors" do
      visit "http://127.0.0.1:4000/dashboard/project/#{project}/"
      page.should_not have_content(" .about.yml errors")
    end
  end
end
