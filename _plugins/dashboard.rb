require 'jekyll'
require 'json'
require 'open-uri'

module Dashboard
  class ProjectPage < Jekyll::Page
    private_class_method :new

    def initialize(site, project_id)
      @site = site
      @base = site.source
      @dir = File.join 'project', project_id
      @name = 'index.html'

      self.process @name
      self.read_yaml File.join(@base, '_layouts'), 'project.html'
    end

    # TODO(mbland): Remove this once the Team API is standardized.
    FIELDS_TO_TRANSLATE = {
      'project' => 'full_name',
      'mission' => 'description',
    }

    def self.munge_project_data(project_data)
      FIELDS_TO_TRANSLATE.each do |from, to|
        project_data[to] = project_data[from] unless project_data[to]
      end
    end

    def self.create(site, project_id, project_data)
      page = new site, project_id
      munge_project_data project_data
      page.data['project'] = project_data
      page.data['title'] = project_data['full_name']
      site.pages << page
    end
  end

  # Processes site data, generates authorization artifacts, publishes an API,
  # and generates cross-linked Hub pages.
  class Generator < ::Jekyll::Generator
    safe true

    # Executes all of the data processing and artifact/page generation phases
    # for the Hub.
    def generate(site)
      generate_project_pages site
    end

    def generate_project_pages(site)
      site.data['projects'].each do |project_id, project|
        ProjectPage.create site, project_id, project
      end
    end
  end
end
