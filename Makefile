.DEFAULT_GOAL := all


all:
	docker build -f Docker/frontend.Dockerfile -t frontend .

deploy:
	docker build -f Docker/frontend-deploy.Dockerfile -t frontend-deploy .

prod:
	docker build -f Docker/frontend-prod.Dockerfile -t frontend-prod .
	docker run --rm -v $(pwd)/tmp:/tmp frontend-prod sh -c "cp -r /dockerize-me/build/* /tmp"
	sleep 1
	yes | rm -r /Users/indika/dev/reinforcement/client/react/*
	yes | cp -r tmp/* /Users/indika/dev/reinforcement/client/react
	rm -rf tmp


up:
	docker-compose --file Docker/docker-compose.yml down; docker-compose --file Docker/docker-compose.yml up

test:
	curl -s http://localhost:8083
