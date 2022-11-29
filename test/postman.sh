#!/bin/bash

#curl -X GET http://localhost/api/sendpacket/02:42:ac:11:00:02/ | jq
#curl -X GET http://localhost/api/ping/10.0.222.7/ | jq
#curl -X GET http://localhost/api/arp/10.0.222.7/ | jq
#curl -X GET http://localhost/api/interface/list/ | jq
#curl -X GET http://localhost/api/interface/info/lo/ | jq
curl -X GET http://node-master/api/arp/167828999/ | jq
