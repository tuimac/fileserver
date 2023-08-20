#!/bin/bash

NAME='fileserver'

function runContainer(){
    docker build -t ${NAME} . --no-cache
    docker run -itd --name ${NAME} \
            -h ${NAME} \
            -v $(pwd)/${NAME}:/${NAME} \
            -p 8000:80 \
            ${NAME}
}

function cleanup(){
    docker image prune -f
    docker logs ${NAME}
    docker container prune -f
}

function deleteAll(){
    docker stop ${NAME}
    docker rm ${NAME}
    docker rmi ${NAME}
    cleanup
}


function userguide(){
    echo -e "usage: ./run.sh [help | create | delete]"
    echo -e "
optional arguments:
create              Create image and container after that run the container.
delete              Delete image and container.
    "
}

function main(){
    [[ -z $1 ]] && { userguide; exit 1; }
    if [ $1 == "create" ]; then
        runContainer
    elif [ $1 == "delete" ]; then
        deleteAll
    elif [ $1 == "help" ]; then
        userguide
    else
        { userguide; exit 1; }
    fi
}

main $1
