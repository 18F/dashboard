import time
from fabric.api import run, execute, env, cd

"""
Manage auto-deploy webhooks remotely.

Staging hooks:

  forever start -l $HOME/hookshot.log -a deploy/hookshot.js -p 3001 -b staging -c "cd $HOME/staging/current && git pull && git submodule update && jekyll build >> $HOME/hookshot.log"
  forever restart deploy/hookshot.js -p 3001 -b staging -c "cd $HOME/staging/current && git pull && git submodule update && jekyll build >> $HOME/hookshot.log"
  forever stop deploy/hookshot.js -p 3001 -b staging -c "cd $HOME/staging/current && git pull && git submodule update && jekyll build >> $HOME/hookshot.log"

Production hook:

  forever start -l $HOME/hookshot.log -a deploy/hookshot.js -p 4001 -b production -c "cd $HOME/production/current && git pull && git submodule update && jekyll build >> $HOME/hookshot.log"
  forever restart deploy/hookshot.js -p 4001 -b production -c "cd $HOME/production/current && git pull && git submodule update && jekyll build >> $HOME/hookshot.log"
  forever stop deploy/hookshot.js -p 4001 -b production -c "cd $HOME/production/current && git pull && git submodule update && jekyll build >> $HOME/hookshot.log"
"""

# which hook to restart. defaults to staging, override with:
#   fab [command] --set env=production"
environment = env.get('env', 'staging')

port = {
  "staging": 3001,
  "production": 4001
}[environment]
# expects an SSH entry named '18f-site', rather than hardcoded server details
env.use_ssh_config = True
env.hosts = ["18f-site"]

home = "/home/site"
log = "%s/dashboard.log" % home
current = "%s/%s/dashboard" % (home, environment)
now = time.strftime("%Y-%m-%d", time.localtime())

# principal command to run upon update

if environment == 'staging':
  deploy_cmd = ("cd %s && git pull && bundle && "
    "git submodule update --remote && ./_data/import-public.rb && "
    "git add _data/projects.yml && git commit -m 'Update data for %s' && "
    "git push && ./go build >> %s" % (current, now, log))
elif environment == 'production':
  deploy_cmd = "cd %s && git pull && ./go build >> %s" % (current, log)
else:
  exit(1)

## can be run on their own

def start():
  if type(port) != int:
    exit(1)

  with cd(current):
    run(
      "forever start -l %s -a deploy/hookshot.js -p %i -b %s -c \"%s\""
      % (log, port, environment, deploy_cmd)
    )

def stop():
  with cd(current):
    run(
      "forever stop deploy/hookshot.js -p %i -b %s -c \"%s\""
      % (port, environment, deploy_cmd)
    )

def restart():
  with cd(current):
    run(
      "forever start -l %s -a deploy/hookshot.js -p %i -b %s -c \"%s\""
      % (log, port, environment, deploy_cmd)
    )
