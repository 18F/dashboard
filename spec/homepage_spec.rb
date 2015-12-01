projects = YAML.load_file('_data/project_filter.yml')
RSpec.describe "the homepage", :type => :feature do
  it "loads with the expected number of projects listed" do
    visit 'http://127.0.0.1:4000/dashboard/'
    expect(page).to have_selector('.dashboard-projects-content', count:projects.count)
  end
end
