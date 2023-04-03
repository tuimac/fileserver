FROM alpine:latest

WORKDIR /root

EXPOSE 80

ADD requirements.txt /root/requirements.txt
ADD nginx.conf /etc/nginx/nginx.conf
ADD gunicorn.conf.py /etc/gunicorn/gunicorn.conf.py
ADD entrypoint.sh /root/entrypoint.sh
ADD backend

RUN apk update && \
    apk upgrade && \
    apk add --no-cache bash python3 python3-dev py3-pip nginx tzdata && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    echo "Asia/Tokyo" > /etc/timezone && \
    apk del tzdata && \
    pip3 install -r requirements.txt && \
    mkdir /var/log/gunicorn && \
    touch /var/log/gunicorn/access.log && \
    touch /var/log/gunicorn/error.log && \
    mkdir /var/log/fileserver && \
	touch /var/log/fileserver/main.log && \
    echo '\n\
echo -en "\e[1m\e[34m" \n\
cat << "EOF" \n\
\n\
>=======>      >=>                   >=>>=>                                                   \n\
>=>        >>  >=>                 >=>    >=>                                                 \n\
>=>            >=>   >==>           >=>         >==>    >> >==> >=>     >=>   >==>    >> >==> \n\
>=====>   >=>  >=> >>   >=>           >=>     >>   >=>   >=>     >=>   >=>  >>   >=>   >=>    \n\
>=>       >=>  >=> >>===>>=>             >=>  >>===>>=>  >=>      >=> >=>   >>===>>=>  >=>    \n\
>=>       >=>  >=> >>              >=>    >=> >>         >=>       >=>=>    >>         >=>    \n\
>=>       >=> >==>  >====>           >=>>=>    >====>   >==>        >=>      >====>   >==>    \n\
                                                                                              
  \n\
EOF' >> /root/.bashrc

ENTRYPOINT ["/root/entrypoint.sh"]
