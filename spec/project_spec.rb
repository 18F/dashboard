projects = YAML.load_file('_data/project_filter.yml')
RSpec.describe "project page", :type => :feature do
  projects.each_with_index do |project, index|
    it "#{project} should not have errors" do
      visit_url(project)
      expect(page).not_to have_content(" .about.yml errors")
    end
    skip "#{project} should have the basic project header" do
      visit_url(project)
      page.should have_css(".dashboard-project")
    end

    skip "#{project} should have a status" do
      visit_url(project)
      page.should have_css(".dashboard-project .status")
    end

    skip "#{project} should have a contact" do
      visit_url(project)
      page.should have_css(".project-contact") # add css for "contact"
    end

    skip "#{project} should have an impact statement" do
      visit_url(project)
      page.should have_css(".project-impact")
    end
  end
end

def visit_url(endpoint)
  visit "http://localhost:4000/dashboard/project/#{endpoint}/"
end
