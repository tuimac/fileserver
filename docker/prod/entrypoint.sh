#!/bin/bash

BASE_DIR='/root'

cd $BASE_DIR
if [ -e magic_packet ]; then
    cd magic_packet
    git pull
else
    git clone https://github.com/tuimac/magic_packet
fi

cd ${BASE_DIR}/magic_packet/src/frontend
npm ci
npm start &

cd $BASE_DIR/magic_packet/src/backend
gunicorn -c /etc/gunicorn/gunicorn.conf.py &

/usr/sbin/nginx -g 'daemon off;' -c /etc/nginx/nginx.conf
