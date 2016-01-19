data = YAML.load_file('_data/project_filter.yml')
projects = data['projects']
RSpec.describe "project page", :type => :feature do
  projects.each_with_index do |project, index|
    it "#{project} should not have errors" do
      visit_url(project)
      expect(page).not_to have_selector(".project-errors")
    end
    it "#{project} should have the basic project header", :type => 'missing' do
      visit_url(project)
      page.should have_css(".dashboard-project")
    end

    it "#{project} should have a status", :type => 'missing' do
      visit_url(project)
      page.should have_css(".dashboard-project .status")
    end

    it "#{project} should have a contact", :type => 'missing' do
      visit_url(project)
      page.should have_css(".project-contact") # add css for "contact"
    end

    it "#{project} should have an impact statement", :type => 'missing' do
      visit_url(project)
      page.should have_css(".project-impact")
    end
  end
end

def visit_url(endpoint)
  visit "http://localhost:4000/dashboard/project/#{endpoint}/"
end
