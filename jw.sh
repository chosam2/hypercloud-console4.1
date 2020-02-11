#!/usr/bin/env bash

if [ -z "${TAG}" ]; then
    echo "Please provide TAG env var and try again."
    exit 1
fi


#ARR=(`docker image ls | grep hypercloud-ori | grep v0.0.`)
#VAR=`echo ${ARR[1]} | sed -n "s/.*v0.0.\([0-9A-Za-z,]*\).*/\1/p"`
#TMP=`echo "${VAR} + 1" | bc`
#TAG="v0.0.${TMP}"
#echo Create build version is ${TAG}


git pull
git tag ${TAG}
git push origin --tags

./build.sh

docker build -t 192.168.6.110:5000/hypercloud-ori:${TAG} .
docker tag 192.168.6.110:5000/hypercloud-ori:${TAG} 192.168.6.110:5000/hypercloud-ori:latest
docker push 192.168.6.110:5000/hypercloud-ori:${TAG}

echo "192.168.6.110:5000/hypercloud-ori:${TAG} Created"