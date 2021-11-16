#!/bin/sh

#Perms
uid=`stat -c '%u' .`
gid=`stat -c '%g' .`
# other
jwtpath=src/private/jwt-key.js

sed -i -e "s/^node:x:[0-9]*:[0-9]*:/node:x:${uid}:${gid}:/" /etc/passwd
chown ${uid}:${gid} /home/node

if ! [ -f $jwtpath ]; then # JWT
  jwt=$(cat /dev/urandom | head -c 20 | md5sum | cut -d ' ' -f 1)
  su node -c "echo \"export default '${jwt}'\"" > $jwtpath
fi

s="npm run dev"
if [ $1 -eq 1 ]; then
  s="npm run prod"
fi

# Install and run
su node -c "id && npm install && ${s}"
