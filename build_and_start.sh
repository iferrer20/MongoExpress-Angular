#!/bin/bash
set -eo pipefail

is_frontend_built() {
	[[ ! -z "$(docker images -q truequepop-frontend)" ]];
	return $?;
}

is_backend_built() {
	[[ ! -z "$(docker images -q truequepop-backend)" ]];
	return $?;
}

has_backend_container() {
	[[ ! -z "$(docker ps -aqf name=truequepop-backend)" ]];
	return $?;
}

has_frontend_container() {
	[[ ! -z "$(docker ps -aqf name=truequepop-frontend)" ]];
	return $?;
}

has_db_container() {
	[[ ! -z "$(docker ps -aqf name=land_db)" ]];
	return $?;
}

build_frontend() {
	docker image build frontend-angular/ -t truequepop-frontend
}

build_backend() {
	docker image build backend-express/ -t truequepop-backend
}

if [[ $1 == "--help" ]]; then
	echo "Usage: $0 [--rebuild]"
	echo "Options:"
	echo "  --rebuild: Always build the images, even if already built."
fi

if ( ! is_frontend_built || [[ $1 == "--rebuild" ]] ) && ! build_frontend; then
	echo "Couldn't build the frontend!"
	exit 1
fi

if ( ! is_backend_built || [[ $1 == "--rebuild" ]] ) && ! build_backend; then
	echo "Couldn't build the backend!"
	exit 1
fi

docker network create truequepop_net &>/dev/null || true

if ! has_db_container; then
	docker run --network truequepop_net -d --name land_db -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=land mongo:4.4
else
	docker start land_db
fi

if ! has_backend_container; then
	docker run --network truequepop_net --name truequepop-backend -d -p 8081:80 truequepop-backend
else
	docker start truequepop-backend
fi

if ! has_frontend_container; then
        docker run --network truequepop_net --name truequepop-frontend -d -p 8080:80 truequepop-frontend
else
	docker start truequepop-frontend
fi
