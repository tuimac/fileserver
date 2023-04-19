#!/bin/bash

function start_backend(){
    gunicorn --config /etc/gunicorn/gunicorn.conf.py --chdir /root/backend &
}

function start_nginx(){
    /usr/sbin/nginx -g 'daemon off;' -c /etc/nginx/nginx.conf
}

function main(){
    start_backend
    start_nginx
}

main
