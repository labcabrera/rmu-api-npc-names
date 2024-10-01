#!/bin/bash

docker stop rmu-api-npc-names

docker rm rmu-api-npc-names

docker rmi labcabrera/rmu-api-npc-names:latest

docker build -t labcabrera/rmu-api-npc-names:latest .

docker run -d -p 3007:3007 --network rmu-network --name rmu-api-npc-names -h rmu-api-npc-names -e PORT='3007' labcabrera/rmu-api-npc-names:latest

docker logs -f rmu-api-npc-names
