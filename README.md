# LDWizard ErfgoedWizard

A wizard that makes it easy to create linked data from tabular data
from the cultural heritage domain.

## Prerequisites / Getting started

## Prerequisites / Getting started

1. Install [Node.js](https://nodejs.org) and [Yarn](https://yarnpkg.com).

   On Ubuntu this is done with the following commands.  Check the project
   websites for installation on other operating systems.

   ```sh
   curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
   curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
   echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
   sudo apt update
   sudo apt install nodejs yarn
   ```

2. Clone this repository and go into its root directory.

3. Run `yarn` to install the dependencies.

## Local use / development

1. Run `yarn dev` to start the LD Wizard application.

2. Go to <http://localhost:4000> in your favorite web browser.

## Production Docker deployment

1. Build the Docker image:

   ```bash
   docker-compose -f ./docker/docker-compose.yml build
   ```

2. Start the service:

   ```bash
   docker-compose -f ./docker/docker-compose.yml up
   ```

3. Go to <http://localhost:4000> in your favorite web browser.

## Releasing

To mark a version as stable, run `yarn run util:markStable`.

## Details

This is an implementation of the generic [LD Wizard
Interface](https://github.com/netwerk-digitaal-erfgoed/LDWizard).
