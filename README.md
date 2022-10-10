# Symfony 4 with React JS Manage YAML file
## Installation Reference

```
```

## Render Multiple Component

```
var Encore = require('@symfony/webpack-encore');

Encore
    .setOutputPath('public/build/')
    .setPublicPath('/build')
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
    .addEntry('app', './assets/js/app.js')

// add second entry.
    .addEntry('second', './assets/js/second.js')
    .enableReactPreset();

module.exports = Encore.getWebpackConfig();
```

## Structure
```
.
├── ...
├── assets          
│      ├── config           # config files.
|   ├── controllers
│      ├── components    # other components.
|      ├── App.js        # first main .js file
|      ├── **
|        
│           
└── ..
```