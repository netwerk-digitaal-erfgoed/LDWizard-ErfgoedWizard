# LD Wizard: Erfgoed Wizard

An [online GUI application](https://ldwizard.netwerkdigitaalerfgoed.nl) that makes it easy to create linked data from tabular data
from the cultural heritage domain.

This application uses [LD Wizard](https://github.com/pldn/LDWizard).

## 1. Usage

You can use this application online over at: https://ldwizard.netwerkdigitaalerfgoed.nl

## 2. Build locally

Follow these steps to build the application locally:

1. Install [Node.js](https://nodejs.org).

2. Clone this repository and go into its root directory.

3. Run `npm install` to install the dependencies.

4. Run `npm run build` to create the build locally

5. Start an HTTP server in the `lib/` subdirectory.  For example:

   ```sh
   cd lib
   http-server .
   ```
6. Run `npm install -g http-server` if http-server is not yet available on your system

7. Visit <http://127.0.0.1:8081> in a web browser.

## 3. Create a Docker container

Follow these steps to build a Docker container for this application.  This is an alternative for building the application locally, which does not require installing Node.js.  The alternative does require Docker as a prerequisite.

1. Build the Docker image:

   ```sh
   docker-compose -f ./docker/docker-compose.yml build
   ```

2. Start the service:

   ```sh
   docker-compose -f ./docker/docker-compose.yml up
   ```

3. Visit <http://localhost:4000> in a web browser.
