#! /bin/sh

/usr/bin/ssh site@18f.gsa.gov \
  /usr/local/bin/forever start -l /home/site/team-api-importer.log \
  -a /home/site/staging/dashboard/deploy/team-api-importer-server.js
