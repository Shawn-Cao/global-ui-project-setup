/*eslint-env node*/
"use strict";
var sass = require('node-sass');
var fs = require('fs');
var copy = require('copy');
var watch = require('node-watch');
var liveServer = require("live-server");

var sassMasterFile = 'scss/master.scss';
var outputFile = 'assets/css/master.minified.css';
var outoutFileReadable = 'assets/css/master.nested.css';
var errorInFirstStep = false;
var serverParam = require('./config/live-server.json');
var buildConfig = require('./config/build-config.json');

copyStaticResources(buildConfig.staticResources);

compileLayouts(buildConfig.layouts);

buildMinified();
buildReadable();
if(process.env.npm_lifecycle_event === "start") {
  console.log("Starting live-server and watching changes below:");
  console.log(serverParam.watches);
  setTimeout(() => {
    liveServer.start(serverParam);
  }, 1000);  //TODO: merge scss build and start live-server in callback?
}
// watch(serverParam.watches, function(filename) {
//   console.log(filename, ' changed. building again');
//   buildReadable();
// });



function compileLayouts(resources) {
  //TODO: support string concatenation
    let resource = "all";
    let path = resources[resource];
    copy(path[0], path[1], function(err){
    if(err){ console.log(err); } else { console.log(`copied ${resource} from ${path[0]} and serve from ${path[1]}`); }
    });
}
//copy font-awesome into assets/css/font-awesome
function copyStaticResources(resources) {
  for (var resource in resources) {
    if (!resources.hasOwnProperty(resource)) { continue; }
    let path = resources[resource];
    copy(path[0], path[1], function(err){
    if(err){ console.log(err); } else { console.log(`copied ${resource} from ${path[0]} and serve from ${path[1]}`); }
    });
  }
};

//build a minified version to import to projects in production
function buildMinified() {
  sass.render({
    file: sassMasterFile,
    outputStyle: 'compressed',
    sourceMap: false,
    outFile: outputFile
  }, function(error, result) { // node-style callback from v3.0.0 onwards
    if (error) {
      console.log(error);
      errorInFirstStep = true;
    }
    else {
      console.log(result.css.toString());
      console.log(result.stats);
      console.log(JSON.stringify(result.map)); // note, JSON.stringify accepts Buffer too  //TODO: sourceMap
      fs.writeFile(outputFile, result.css, function(err){
        if(!err){
          console.log("converted SASS to minified.css file: " + outputFile);//file written on disk
          errorInFirstStep = true;
        } else {
          console.log(err);
        }
      });
    }
  });
};

//Below: build a human readble version to import to projects also
function buildReadable() {
  sass.render({
    file: sassMasterFile,
    outputStyle: 'nested',
    sourceMap: outoutFileReadable,
    outFile: outoutFileReadable
  }, function(error, result) { // node-style callback from v3.0.0 onwards
    console.log("build a human readble version to import to projects also :-)");
    fs.writeFile(outoutFileReadable, result.css, function(err){
      if(!err){
        console.log("converted SASS to nested.css file: " + outoutFileReadable);  //file written on disk
      } else {
        console.log(err);
      }
    });
    fs.writeFile(outoutFileReadable+'.map', result.map, function(err){
      if(!err){
        console.log("converted SASS to nested.css file: " + outoutFileReadable+'.map');  //file written on disk
      } else {
        console.log(err);
      }
    });
  });
};
