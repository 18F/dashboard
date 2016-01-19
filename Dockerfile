FROM ubuntu:latest
MAINTAINER "steven.harms@gsa.gov"
EXPOSE 4000
RUN locale-gen en_US.UTF-8  
ENV LANG en_US.UTF-8  
ENV LANGUAGE en_US:en  
ENV LC_ALL en_US.UTF-8  
RUN apt-get -y update && apt-get -y upgrade
RUN apt-get install -y git-core curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev python-software-properties libffi-dev build-essential
RUN useradd -ms /bin/bash dashboard
ADD . /home/dashboard/dashboard/
RUN chown -R dashboard /home/dashboard
USER dashboard
WORKDIR /home/dashboard
RUN git clone git://github.com/sstephenson/rbenv.git /home/dashboard/.rbenv
RUN echo 'export PATH="$HOME/.rbenv/bin:$PATH"' | tee -a /home/dashboard/.bashrc /home/dashboard/.bash_profile
RUN echo 'eval "$(rbenv init -)"' | tee -a /home/dashboard/.bashrc /home/dashboard/.bash_profile
RUN git clone git://github.com/sstephenson/ruby-build.git /home/dashboard/.rbenv/plugins/ruby-build
RUN echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' | tee -a /home/dashboard/.bashrc /home/dashboard/.bash_profile
RUN git clone https://github.com/sstephenson/rbenv-gem-rehash.git ~/.rbenv/plugins/rbenv-gem-rehash
RUN bash --login -c "/home/dashboard/.rbenv/bin/rbenv install 2.2.3"
RUN bash --login -c "/home/dashboard/.rbenv/bin/rbenv global 2.2.3"
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.30.1/install.sh | bash
RUN echo 'export NVM_DIR="$HOME/.nvm"' | tee -a $HOME/.bash_profile
RUN echo '[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"' | tee -a $HOME/.bash_profile  
RUN bash --login -c "nvm install 5.4.0 && nvm alias default 5.4.0"
RUN bash --login -c "gem install bundle"
RUN bash --login -c "cd /home/dashboard/dashboard && nvm use 5.4.0 && ./go init"
RUN sed -i -e "s/^  exec_cmd 'bundle exec jekyll serve --trace'\$/  exec_cmd 'bundle exec jekyll serve -H 0.0.0.0 --trace'/" /home/dashboard/dashboard/go
