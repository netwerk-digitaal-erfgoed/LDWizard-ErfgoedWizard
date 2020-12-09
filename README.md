# LD Wizard: Erfgoed Wizard

A GUI application that makes it easy to create linked data from tabular data
from the cultural heritage domain.

This application uses [LD Wizard](https://github.com/netwerk-digitaal-erfgoed/LDWizard).

## 1. Usage

You can use this application online over at: https://ldwizard.netwerkdigitaalerfgoed.nl

## 2. Build locally

Follow these steps to build the application locally:

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

5. Start an HTTP server in the `lib/` subdirectory.  For example:

   ```sh
   cd lib
   http-server .
   ```

6. Visit <http://localhost:4000> in a web browser.

## 3. Create a Docker container

Follow these steps to build a Docker container for this application.  This is an alternative for building the application locally, which does not require installing Node.js and Yarn prerequisites.  The alternative does require Docker as a prerequisite.

1. Build the Docker image:

   ```sh
   docker-compose -f ./docker/docker-compose.yml build
   ```

2. Start the service:

   ```sh
   docker-compose -f ./docker/docker-compose.yml up
   ```

3. Visit <http://localhost:4000> in a web browser.
