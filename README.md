# Diagram Tool

This tool is a infrastructure diagram tool. The goal of the Diagram Tool is to be able to clearly lay out diagrams for infrastructure which you want to create, allowing you to be able to visualise your plans.

## Development/Building
To setup the build/develop environment, you will need to run `npm i` with Node 12+ installed (you can use `nvm` to do this). This will install the dependencies to allow you to build the project.

To develop for this tool run `npm start`. This will start a development server that will automatically reload the codebase when changes occur.

If you wish to host this tool on a service, simply run `npm run build`. This will run all the necessary build scripts automatically to build the tool.
You can then take the dist folder and put it on your web server/bucket.

GitHub Actions is setup to do this automatically for this repository to deploy to gh-pages. It is also configured to deploy each PR commit to DigitalOcean Spaces for PR previews.

## Contributing
If you are contributing, please read the [contributing file](CONTRIBUTING.md) before submitting your pull requests.

## Source Structure

### [`src`](./src)

#### [`src/styles`](./src/styles)
Any stylesheets which are required. Right now, this folder only contains 1 file, but this can be expanded over time.

#### [`src/data`](./src/data)
This defines the data which is used within the application. When new data is created which the application should use, it should be added there. If you wish to create a new node, you should run `mk_node.py`.

#### [`src/components`](./src/components)
This defines the React components that are used within the application. All components which are used should, therefore, be within this folder.

#### [`src/actions`](./src/actions)
This is used to handle the actions within the application.
