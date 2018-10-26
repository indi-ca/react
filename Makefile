.DEFAULT_GOAL := all


all:
	docker build -f Docker/frontend.Dockerfile -t frontend .


up:
	docker-compose --file Docker/docker-compose.yml down; docker-compose --file Docker/docker-compose.yml up

test:
	curl -s http://localhost:8083
