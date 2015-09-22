'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var mkdirp = require('mkdirp');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();
    this.log(yosay(
      'Welcome to the neat ' + chalk.red('NpmSimple') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'What is the name of your module?',
      default: this.appname
    },{
      type: 'input',
      name: 'author',
      message: 'What is your name?',
      default: 'nameless one'
    } ];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
     
      var context = { 
        modName:  _.camelCase(this.props.name),
        author: this.props.author 
      };

      this.fs.copyTpl(this.templatePath('_package.json'),
                      this.destinationPath('package.json'),
                      context);
      this.fs.copyTpl(this.templatePath('bower.json'),
                      this.destinationPath('bower.json'),
                      context);
      /*
       *this.fs.copyTpl(this.templatePath('index.js'), 
       *                this.destinationPath('index.js'),
       *                context);
       */
      this.fs.copyTpl(this.templatePath('index.jade'),
                      this.destinationPath('assets/views/index.jade'),
                      context);
      this.fs.copyTpl(this.templatePath('base.js'),
                      this.destinationPath('assets/scripts/' + context.modName + '.js'),
                      context);

      this.fs.write(this.destinationPath('assets/styles/main.scss'), '.klass { color: purple; }');
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );

      mkdirp('dist');
      mkdirp('test');
    }
  },

  install: function () {
    this.installDependencies();
  }
});
