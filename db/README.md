# Steps to spin up local postgres db using docker

1. build the image with: `docker build -t postgres-db .`

2. Run the docker image: `docker run --name pg-container -p 2233:5432 -e POSTGRES_USER=postgres -e POSTGRES_DB=numerics_db -e POSTGRES_PASSWORD=postgres postgres-db`