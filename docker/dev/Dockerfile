FROM alpine:latest

WORKDIR /root

EXPOSE 80
EXPOSE 8000

ADD requirements.txt /root/requirements.txt
ADD nginx.conf /etc/nginx/nginx.conf
ADD gunicorn.conf.py /etc/gunicorn/gunicorn.conf.py
ADD entrypoint.sh /root/entrypoint.sh

RUN apk update && \
    apk upgrade && \
    apk add --no-cache bash git icu-dev ncurses icu-libs vim python3 python3-dev py3-pip nodejs npm curl tree nginx tzdata jq && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    echo "Asia/Tokyo" >  /etc/timezone && \
    apk del tzdata && \
    mkdir /etc/vim/backup && \
    mkdir /etc/vim/undo && \
    pip3 install -r requirements.txt && \
 	rm /etc/vim/vimrc && \
    curl -L https://raw.githubusercontent.com/tuimac/tools/master/vim/vimrc -o /etc/vim/vimrc && \
    curl -L https://raw.githubusercontent.com/tuimac/tools/master/linux/bashrc/.bashrc_node_docker -o /root/.bashrc && \
    curl -L https://raw.githubusercontent.com/tuimac/tools/master/git/setup.sh -o setup.sh && \
    chmod +x setup.sh && \
    mkdir /var/log/gunicorn && \
    touch /var/log/gunicorn/access.log && \
    touch /var/log/gunicorn/error.log && \
    mkdir /var/log/django && \
    touch /var/log/django/django_info.log

ENTRYPOINT ["/root/entrypoint.sh"]
