#! /bin/sh

/usr/bin/ssh site@18f.gsa.gov \
  /usr/local/bin/forever start -l /home/site/team-api-update.log \
  -a /home/site/staging/dashboard/deploy/team-api-update.js
