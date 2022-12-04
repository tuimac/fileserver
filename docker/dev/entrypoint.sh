#!/bin/bash

BASE_DIR='/root'
PJT_NAME='fileserver'

cd $BASE_DIR
if [ -e $PJT_NAME ]; then
    cd $PJT_NAME
    git pull
else
    git clone https://github.com/tuimac/${PJT_NAME}
fi

cd ${BASE_DIR}/${PJT_NAME}/src/frontend
npm ci
npm start &

cd ${BASE_DIR}/${PJT_NAME}/src/backend
python3 manage.py runserver 0:8000 &

/usr/sbin/nginx -g 'daemon off;' -c /etc/nginx/nginx.conf
