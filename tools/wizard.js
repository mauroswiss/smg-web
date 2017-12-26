const wizard = require('commander');
const fs = require('fs-extra');
const colors = require('colors/safe');
const log = console.log;


let capitalizeComponentName = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

let packageFile = (name) => {
  return `
  {
    "name": "${name}",
    "version": "0.0.0",
    "private": true,
    "main": "${name}.js"
  }
  `
}

let componentFile = (name, type) => {
  return `
  ${type === 'container' ? `import { connect } from 'react-redux';` : ''}
  import React from 'react';
  import withStyles from 'isomorphic-style-loader/lib/withStyles';
  import s from './${name}.css';

  class ${name} extends React.Component {
    componentDidMount() {
    }

    render() {
      return (
        <div className={s.container}>
        ${name} ${type === 'container' ? 'Container' : 'Component'} created
        </div>
      );
    }
  }

  ${type === 'container' ? `
  const mapStateToProps = state => ({
    auth: state.auth,
  });

  export default connect(mapStateToProps, null)(
    withStyles(s)(${name}),
  );`
  :`export default ${name};`}
  `
}

let stylesFile = () => {
  return `
  @import '../variables.css';

  .container {
    color: red
  }
  `
}

const createComponent = (name, type) => {
  name = capitalizeComponentName(name);
  let w = fs.outputFileSync;
  let componentRoute = `src/components/${name}`;

  if (type !== 'component' && type !== 'container') {
    log(colors.red(`type parameter must be either component or container`))
    return false;
  }

  log(``);
  log(``);
  log(colors.green(`Creating ${componentRoute}/package.js file...`));
  w(`${componentRoute}/package.js`, packageFile(name), 'utf8');
  log(colors.green(`${componentRoute}/package.js file successfully created.`));
  log(``);
  log(colors.green(`Creating ${componentRoute}/${name}.js file...`));
  w(`${componentRoute}/${name}.js`, componentFile(name, type), 'utf8');
  log(colors.green(`${componentRoute}/${name}.js file successfully created`));
  log(``);
  log(colors.green(`Creating ${componentRoute}/${name}.css file...`));
  w(`${componentRoute}/${name}.css`, stylesFile(), 'utf8');
  log(colors.green(`${componentRoute}/${name}.js file successfully created`));
  log(``);
  log(colors.rainbow(`${type} successfully created at ${componentRoute}/${name}`));
  log(``);
  log(``);
}

const createRoute = (path) => {
  log(`created route with path ${path}`);
}


wizard
  .version('0.0.1 author: Juan Carlos Cancela <cancela.juancarlos@gmail.com>')
  .description('Wizard tool to generate React components and routes')

wizard
  .command('createComponent <name> <type>')
  .alias('cc')
  .description('Creates a React Component with name <name> that can be whether a Container or Component <type>')
  .action((name, type) => {
    createComponent(name, type);
  })

wizard
  .command('createRoute <path>')
  .alias('cr')
  .description('Creates an application Route with path <path>')
  .action((path) => {
    createRoute(path);
  })

wizard.parse(process.argv);

