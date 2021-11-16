#!/bin/sh

#Perms
uid=`stat -c '%u' .`
gid=`stat -c '%g' .`

sed -i -e "s/^node:x:[0-9]*:[0-9]*:/node:x:${uid}:${gid}:/" /etc/passwd
chown ${uid}:${gid} /home/node
chown ${uid}:${gid} /home/node/app/dist

s="npm start"
if [ $1 -eq 1 ]; then
  s="npm run prod"
fi

# Install and run
su node -c "id && npm install && ${s}"
