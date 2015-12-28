require 'jekyll'
require 'json'
require 'open-uri'

module Dashboard
  # Generates an individual project page from project data.
  class ProjectPage < Jekyll::Page
    private_class_method :new

    def initialize(site, project_id)
      @site = site
      @base = site.source
      @dir = File.join 'project', project_id
      @name = 'index.html'

      process @name
      read_yaml File.join(@base, '_layouts'), 'project.html'
    end

    # TODO(mbland): Remove this once the Team API is standardized.
    FIELDS_TO_TRANSLATE = {
      'project' => 'full_name',
      'mission' => 'description'
    }

    def self.munge_licenses(project_data)
      licenses = project_data['licenses']
      unless licenses.nil?
        project_data['licenses'] = licenses.map do |key, value|
          [key, (value.instance_of?(Hash) ? value['name'] : value)]
        end.to_h
      end
    end

    def self.munge_github(project_data)
      github = project_data['github']
      unless github.is_a?(Array) || github.nil?
        project_data['github'] = [github]
      end
    end

    def self.munge_project_data(project_data)
      FIELDS_TO_TRANSLATE.each do |from, to|
        project_data[to] = project_data[from] unless project_data[to]
      end
      original_name = project_data['name']
      if original_name.scan(/[A-Z]/).size > 0
        project_data['redirect_from'] = Array.new
        project_data['redirect_from'].push("dashboard/project/#{original_name}")
      end
      project_data['name'] = original_name.downcase
      munge_licenses project_data
      munge_github project_data
    end

    def self.create(site, project_id, project_data)
      unless project_id == "all"
        page = new site, project_id
        munge_project_data project_data

        page.data['project'] = project_data
        page.data['title'] = project_data['full_name']
        site.pages << page
      end
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
      site.data['projects'].delete('all')
      site.data['projects'].each do |project_id, project|
        ProjectPage.create site, project_id, project
      end
    end
  end
end
