projects = YAML.load_file('_data/project_filter.yml')
RSpec.describe "individual project pages", :type => :feature do
  for project in projects
    it "should not have errors" do
      visit "http://127.0.0.1:4000/dashboard/project/#{project}/"
      !page.should have_content(" .about.yml errors")
    end
  end
end
