# lol-kafka

### Goal
This project is being built as a way to learn more about Kafka and its ecosystem, Micro-services and also experiment different languanges.

This will be done by creating a distributed, micro-service application that extracts that from Riot League of Legends API and performs all kinds of crazy things with it. First step will be to calculate some analytics for owr own game accounts. After that, the sky is the limit!

### Who can contribute

Literally anyone! I want to run this project in a production-like environment (AWS? Azure? Who knows...) and let anyone connect to the Kafka instance as well as create services in this repository. If you want to contribute, send out a message to `guitassinari@gmail.com` and we can talk about it.


## Running

1. Copy all env.sample files from `local-dev/envs` into that same folder but with only `.env` at the end of the file name (ie. remove the `.sample`). Put your envs in each `.env` file.

2. Run the docker-compose.yml file

```bash
docker-compose up
```

Then go to http://localhost:8080/ui. You should see something like:

<img width="1714" alt="image" src="https://user-images.githubusercontent.com/10967861/198699918-0390e503-8e22-4872-87a7-d93e320a8f74.png">
