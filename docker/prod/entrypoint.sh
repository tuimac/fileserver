#!/bin/bash

function config_variable(){
    if [ $# -ne 2 ]; then
        echo 'Need the argument which are PJT_NAME and WORK_DIR.'
        exit 1
    fi
    BACKEND_DIR=$1
}

function start_backend(){
    cd ${BACKEND_DIR}
    python3 manage.py runserver 0:8000 &
}

function start_nginx(){
    /usr/sbin/nginx -g 'daemon off;' -c /etc/nginx/nginx.conf
}

function main(){
    start_backend
    start_nginx
}


main $1
