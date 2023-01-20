# zazametr

## Installation

1. Create `.env`-file in root dir. Check `.env.example`
2. Get [Docker](https://www.docker.com/products/docker-desktop/) and run

```bash
$ docker compose up -d
```

## Usage

```bash
# Stop running services
$ docker compose stop

# Start again
$ docker compose start

# Remove containers and volumes
$ docker compose down
```

## Local development without Docker

Get [NodeJS](https://nodejs.org/) >= 18.10.0 and [yarn](https://yarnpkg.com/)  
Setup [MongoDB](https://www.mongodb.com/try/download/community)

```bash
# Install dependencies
$ yarn install

# Start the bot
$ DB_URI=mongodb://... TOKEN=1234567890:... yarn dev
```
