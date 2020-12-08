# LDWizard ErfgoedWizard

A wizard that makes it easy to create linked data from tabular data
from the cultural heritage domain.

## Details

This is a configuration of the generic [LD Wizard
Interface](https://github.com/netwerk-digitaal-erfgoed/LDWizard).

## Getting started

1. Install [Node.js](https://nodejs.org) and [Yarn](https://yarnpkg.com).

   On Ubuntu this is done with the following commands. Check the project
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

4. Run `yarn build` to create the build locally

### Local use / development

To start using a local instance for testing/development follow these steps

1. Run `yarn build` to generate the ErfgoedWizard application.
2. Host the lib folder statically

## Docker deployment

In order to test the deployed LD-Wizard version use the following steps. You can also use these steps to test the ErfgoedWizard without installing the other prerequisites (Except docker)

1. Build the Docker image:

   ```bash
   docker-compose -f ./docker/docker-compose.yml build
   ```

2. Start the service:

   ```bash
   docker-compose -f ./docker/docker-compose.yml up
   ```

3. Go to <http://localhost:4000> in your favorite web browser.
