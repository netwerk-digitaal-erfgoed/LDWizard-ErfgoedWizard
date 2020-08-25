# LDWizard ErfgoedWizard

## Prerequisites / Getting started

- Install Node.js and Yarn:

  ```sh
  curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
  sudo apt update
  sudo apt install nodejs yarn
  ```

- Run `yarn` (and `yarn build`?) to install dependencies.

## Local development

### Running locally

```sh
yarn run dev
```

Go to <http://localhost:4000>

## Production docker deployment

1. Build the image:

```bash
docker-compose -f ./docker/docker-compose.yml build
```

2. Start the service:

```bash
docker-compose -f ./docker/docker-compose.yml up
```

Goto <http://localhost:4000>

## Releasing

To mark a version as 'stable', run `yarn run util:markStable`.
